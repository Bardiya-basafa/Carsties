namespace Bidding.Api.Consumers;

using Entities;
using Mapster;
using MassTransit;
using MongoDB.Entities;
using Shared.ContractMessages.Auction;


public class AuctionCreatedConsumer : IConsumer<AuctionCreated> {

    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        var auction = context.Message.Adapt<Auction>();
        auction.ID = context.Message.Id.ToString();


        await auction.SaveAsync();
    }

}
