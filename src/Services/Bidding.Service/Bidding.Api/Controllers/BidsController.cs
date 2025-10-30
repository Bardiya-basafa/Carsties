using Microsoft.AspNetCore.Mvc;


namespace Bidding.Api.Controllers;

using System.Security.Claims;
using Entities;
using Mapster;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Entities;
using RequestHelpers;
using Services;
using Shared.ContractMessages.Bid;


[ApiController]
[Route("api/[controller]")]
public class BidsController(IPublishEndpoint publishEndpoint, GrpcAuctionClient grpcAuctionClient, ILogger<BidsController> logger) : ControllerBase {

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> PlaceBid([FromBody] PlaceBidRequest request)
    {
        logger.LogInformation($"placing bid auction id '{request.AuctionId}' for amount '{request.Amount}' ");
        var auction = await DB.Find<Auction>().OneAsync(request.AuctionId);

        if (auction == null){
            auction = grpcAuctionClient.GetAuction(request.AuctionId);

            if (auction is null){
                return BadRequest("Auction not found");
            }
        }

        if (auction.Seller == User.Identity?.Name){
            return BadRequest("You cannot bid on your own item");
        }

        var bid = new Bid()
        {
            BidTime = DateTime.UtcNow,
            Bidder = User.FindFirst(ClaimTypes.Email)?.Value!,
            Amount = request.Amount,
            AuctionId = request.AuctionId,
        };

        if (auction.AuctionEnd < DateTime.UtcNow){
            bid.BidStatus = BidStatus.Finished;
        }
        else{
            var highBid = await DB.Find<Bid>()
                .Match(a => a.AuctionId == request.AuctionId)
                .Sort(b => b.Descending(x => x.Amount))
                .ExecuteFirstAsync();

            if (highBid != null && request.Amount > highBid.Amount || highBid is null){
                bid.BidStatus = request.Amount > auction.ReservePrice ? BidStatus.Accepted : BidStatus.AcceptedBelowReserve;
            }

            if (highBid is not null && bid.Amount <= highBid.Amount){
                bid.BidStatus = BidStatus.TooLow;
            }
        }

        await DB.SaveAsync(bid);
        var adaptedBid = bid.Adapt<BidPlaced>();
        adaptedBid.BidStatus = bid.BidStatus.ToString();
        adaptedBid.Id = bid.ID;
        await publishEndpoint.Publish(adaptedBid);
        return Ok(adaptedBid);
    }

    [HttpGet("{auctionId}")]
    public async Task<IActionResult> GetBidsForAuction(string auctionId)
    {
        var bids = await DB.Find<Bid>()
            .Match(a => a.AuctionId == auctionId)
            .Sort(b => b.Descending(x => x.BidTime))
            .ExecuteAsync();


        var newBids = bids.Select(
        bid => new
        {
            id = bid.ID,
            auctionId = bid.AuctionId,
            bidTime = bid.BidTime,
            bidder = bid.Bidder,
            amount = bid.Amount,
            bidStatus = bid.BidStatus.ToString(),

        }).ToList();
        return Ok(newBids);
    }

}
