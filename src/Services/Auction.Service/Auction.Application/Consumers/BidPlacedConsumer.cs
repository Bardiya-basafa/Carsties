namespace Auction.Application.Consumers;

using Domain.Entities;
using Domain.RepositoryContracts;
using Mapster;
using MassTransit;
using Shared.ContractMessages.Bid;


public class BidPlacedConsumer(IAuctionRepository auctionRepository) : IConsumer<BidPlaced> {

    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        var oldAuction = await auctionRepository.GetById(context.Message.AuctionId);

        if (oldAuction.CurrentHighBid == null ||
            context.Message.BidStatus.Contains("Accepted", StringComparison.InvariantCultureIgnoreCase)
            && context.Message.Amount > oldAuction.CurrentHighBid){
            var auction = oldAuction.Adapt<Auction>();
            auction.CurrentHighBid = context.Message.Amount;
            auctionRepository.Update(auction, oldAuction);
            await auctionRepository.SaveChangesAsync();
        }
    }

}
