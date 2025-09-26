namespace Search.Api.Consumers;

using System;
using System.Threading.Tasks;
using Entities;
using MassTransit;
using MongoDB.Entities;
using Shared.ContractMessages.Bid;


public class BidPlacedConsumer : IConsumer<BidPlaced> {

    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        var auction = await DB.Find<Auction>().OneAsync(context.Message.AuctionId);

        if (context.Message.BidStatus.Contains("Accepted", StringComparison.OrdinalIgnoreCase) && context.Message.Amount > auction.CurrentHighBid){
            auction.CurrentHighBid = context.Message.Amount;
            await auction.SaveAsync();
        }
    }

}
