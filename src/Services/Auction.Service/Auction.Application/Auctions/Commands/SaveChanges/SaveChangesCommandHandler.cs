namespace Auction.Application.Auctions.Commands.SaveChanges;

using Domain.RepositoryContracts;
using Shared.Abstractions.CQRS;
using Shared.Entities;


public class SaveChangesCommandHandler(IAuctionRepository auctionRepository) : ICommandHandler<SaveChangesCommand, bool> {

    public async Task<Result<bool>> Handle(SaveChangesCommand request, CancellationToken cancellationToken)
    {
        var result = await auctionRepository.SaveChangesAsync();

        return result ? Result.Success(result) : Result.Failure<bool>(Error.None);
    }

}
