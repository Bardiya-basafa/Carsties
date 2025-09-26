namespace Search.Api.Consumers;

using System;
using System.Threading.Tasks;
using Entities;
using Mapster;
using MassTransit;
using MongoDB.Entities;
using Shared.ContractMessages;
using Shared.ContractMessages.Auction;


public class AuctionCreatedConsumer : IConsumer<AuctionCreated> {

    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        var auction = context.Message.Adapt<Auction>();
        auction.ID = context.Message.Id.ToString();

        // if (auction.Model == "Foo"){
        //     throw new ArgumentException("Invalid model");
        // }

        await auction.SaveAsync();
    }

}
