namespace Auction.Application.Auctions.Commands.DeleteAuction;

using Domain.RepositoryContracts;
using Errors;
using Shared.Abstractions.CQRS;
using Shared.Entities;


public class DeleteAuctionCommandHandler(IAuctionRepository auctionRepository) : ICommandHandler<DeleteAuctionCommand, DeleteAuctionResult> {

    public async Task<Result<DeleteAuctionResult>> Handle(DeleteAuctionCommand command, CancellationToken cancellationToken)
    {
        var result = await auctionRepository.GetById(command.Id);

        if (result is null){
            return Result.Failure<DeleteAuctionResult>(AuctionNotFound.Error(command.Id));
        }

        auctionRepository.Delete(result);


        return Result.Create(new DeleteAuctionResult(true));
    }

}
