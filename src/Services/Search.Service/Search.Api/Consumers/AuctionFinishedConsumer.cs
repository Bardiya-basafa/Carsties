namespace Search.Api.Consumers;

using System.Threading.Tasks;
using Entities;
using MassTransit;
using MongoDB.Entities;
using Shared.ContractMessages.Auction;


public class AuctionFinishedConsumer : IConsumer<AuctionFinished> {

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        var auction = await DB.Find<Auction>().OneAsync(context.Message.AuctionId);

        if (context.Message.ItemSold){
            auction.Winner = context.Message.Winner;
            if (context.Message.SoldAmount != null) auction.SoldAmount = (int)context.Message.SoldAmount;
        }

        auction.Status = "Finished";
        await auction.SaveAsync();
    }

}
