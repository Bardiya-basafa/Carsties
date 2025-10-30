namespace Bidding.Api.Services;

using AuctionService;
using Entities;
using Grpc.Net.Client;


public class GrpcAuctionClient(IConfiguration config, ILogger<GrpcAuctionClient> logger) {

    public Auction? GetAuction(string id)
    {
        logger.LogInformation($"Getting auction with id: {id}");
        var channel = GrpcChannel.ForAddress("http://auction.api:8081");
        var client = new GrpcAuction.GrpcAuctionClient(channel);
        var request = new GetAuctionRequest() { Id = id };

        try{
            var reply = client.GetAuction(request);

            var auction = new Auction()
            {
                ID = reply.Auction.Id,
                AuctionEnd = DateTime.Parse(reply.Auction.AuctionEnd),
                Seller = reply.Auction.Seller,
                ReservePrice = reply.Auction.ReservePrice,
            };

            return auction;
        }
        catch (Exception e){
            logger.LogError(e, "An error occured while getting auction from GrpcAuctionClient");

            return null;
        }
    }

}
