namespace Search.Api.Consumers;

using System;
using System.Threading.Tasks;
using Entities;
using Mapster;
using MassTransit;
using MongoDB.Entities;
using Shared.ContractMessages;
using Shared.ContractMessages.Auction;


public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated> {

    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        var auction = context.Message.Adapt<Auction>();
        auction.ID = context.Message.Id.ToString();

        var result = await DB.Update<Auction>()
            .Match(a => a.ID == auction.ID)
            .ModifyOnly(x => new
            {
                x.Color,
                x.Model,
                x.Make,
                x.Year,
                x.Mileage
            },
            auction)
            .ExecuteAsync();

        if (!result.IsAcknowledged){
            throw new InvalidOperationException($"Failed to update auction: {auction.ToString()}");
        }
    }

}
