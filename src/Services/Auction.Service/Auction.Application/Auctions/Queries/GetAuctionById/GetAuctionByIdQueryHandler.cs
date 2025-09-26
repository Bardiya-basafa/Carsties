namespace Auction.Application.Auctions.Queries.GetAuctionById;

using Domain.RepositoryContracts;
using Mapster;
using Shared.Abstractions.CQRS;
using Shared.Entities;


public class GetAuctionByIdQueryHandler(IAuctionRepository auctionRepository) : IQueryHandler<GetAuctionByIdQuery, GetAuctionByIdResult> {

    public async Task<Result<GetAuctionByIdResult>> Handle(GetAuctionByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await auctionRepository.GetById(query.Id);

        if (result is null){
            return Result.Failure<GetAuctionByIdResult>(new Error("AuctionNotFound", $"Auction with id: {query.Id} was not found"));
        }

        return Result.Success(result.Adapt<GetAuctionByIdResult>());
    }

}
