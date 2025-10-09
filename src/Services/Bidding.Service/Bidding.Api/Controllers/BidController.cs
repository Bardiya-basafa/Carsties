using Microsoft.AspNetCore.Mvc;


namespace Bidding.Api.Controllers;

using Entities;
using Mapster;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Entities;
using Services;
using Shared.ContractMessages.Bid;


[ApiController]
[Route("api/[controller]")]
public class BidController(IPublishEndpoint publishEndpoint, GrpcAuctionClient grpcAuctionClient) : ControllerBase {

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> PlaceBid(string auctionId, int amount)
    {
        var auction = await DB.Find<Auction>().OneAsync(auctionId);

        if (auction == null){
            auction = grpcAuctionClient.GetAuction(auctionId);

            if (auction is null){
                return BadRequest("Auction not found");
            }
        }

        if (auction.Seller == User.Identity?.Name){
            return BadRequest("You cannot bid on your own item");
        }

        if (User.Identity?.Name is null){
            return Unauthorized();
        }

        var bid = new Bid()
        {
            Amount = amount,
            AuctionId = auctionId,
            Bidder = User.Identity?.Name ?? string.Empty,
        };

        if (auction.AuctionEnd < DateTime.UtcNow){
            bid.BidStatus = BidStatus.Finished;
        }
        else{
            var highBid = await DB.Find<Bid>()
                .Match(a => a.AuctionId == auctionId)
                .Sort(b => b.Descending(x => x.Amount))
                .ExecuteFirstAsync();

            if (highBid != null && amount > highBid.Amount || highBid is null){
                bid.BidStatus = amount > auction.ReservePrice ? BidStatus.Accepted : BidStatus.AcceptedBelowReserve;
            }

            if (highBid is not null && bid.Amount <= highBid.Amount){
                bid.BidStatus = BidStatus.TooLow;
            }
        }

        await DB.SaveAsync(bid);
        await publishEndpoint.Publish(bid.Adapt<BidPlaced>());

        return Ok(bid);
    }

    [HttpGet("{auctionId}")]
    public async Task<IActionResult> GetBidsForAuction(string auctionId)
    {
        var bids = await DB.Find<Bid>()
            .Match(a => a.AuctionId == auctionId)
            .Sort(b => b.Descending(x => x.BidTime))
            .ExecuteAsync();

        return Ok(bids);
    }

}
