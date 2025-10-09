namespace Auction.Application.Consumers;

using Domain.Entities;
using Domain.Enums;
using Domain.RepositoryContracts;
using Mapster;
using MassTransit;
using Shared.ContractMessages.Auction;


public class AuctionFinishedConsumer(IAuctionRepository auctionRepository) : IConsumer<AuctionFinished> {

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        var oldAuction = await auctionRepository.GetById(context.Message.AuctionId);
        var auction = oldAuction.Adapt<Auction>();


        if (context.Message.ItemSold){
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = context.Message.SoldAmount;
        }

        auction.Status = auction.SoldAmount > auction.ReservePrice ? Status.Finished : Status.ReserveNotMet;
        auctionRepository.Update(auction, oldAuction);
    }

}
