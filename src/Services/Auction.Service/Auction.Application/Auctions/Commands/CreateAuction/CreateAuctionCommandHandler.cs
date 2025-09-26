namespace Auction.Application.Auctions.Commands.CreateAuction;

using Domain.Entities;
using Domain.RepositoryContracts;
using Mapster;
using Shared.Abstractions.CQRS;
using Shared.Entities;


public class CreateAuctionCommandHandler(IAuctionRepository auctionRepository) : ICommandHandler<CreateAuctionCommand, CreateAuctionResult> {

    public async Task<Result<CreateAuctionResult>> Handle(CreateAuctionCommand command, CancellationToken cancellationToken)
    {
        var auction = command.Adapt<Auction>();
        await auctionRepository.Add(auction);


        return Result.Create(new CreateAuctionResult(auction));
    }

}
