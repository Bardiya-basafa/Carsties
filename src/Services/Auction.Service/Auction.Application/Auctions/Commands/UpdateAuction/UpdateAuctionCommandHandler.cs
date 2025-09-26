namespace Auction.Application.Auctions.Commands.UpdateAuction;

using Domain.Entities;
using Domain.RepositoryContracts;
using Errors;
using Mapster;
using Shared.Abstractions.CQRS;
using Shared.Entities;


public class UpdateAuctionCommandHandler(IAuctionRepository auctionRepository) : ICommandHandler<UpdateAuctionCommand, UpdateAuctionResult> {

    public async Task<Result<UpdateAuctionResult>> Handle(UpdateAuctionCommand command, CancellationToken cancellationToken)
    {
        var oldAuction = await auctionRepository.GetById(command.Id);
        var auction = command.Adapt<Auction>();

        // if (oldAuction.Seller != auction.Seller){
        //     return Result.Failure<UpdateAuctionResult>(UnauthorizedAccess.CreateError());
        // }

        await auctionRepository.Update(auction, oldAuction);


        return Result.Create(new UpdateAuctionResult(oldAuction));
    }

}
