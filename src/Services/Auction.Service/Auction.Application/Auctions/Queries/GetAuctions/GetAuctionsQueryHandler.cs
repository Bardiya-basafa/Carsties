namespace Auction.Application.Auctions.Queries.GetAuctions;

using Domain.RepositoryContracts;
using Microsoft.Extensions.Logging;
using Shared.Abstractions.CQRS;
using Shared.Entities;


public class GetAuctionsQueryHandler(IAuctionRepository auctionRepository, ILogger<GetAuctionsQueryHandler> logger) : IQueryHandler<GetAuctionsQuery, GetAuctionsResult> {

    public async Task<Result<GetAuctionsResult>> Handle(GetAuctionsQuery query, CancellationToken cancellationToken)
    {
        var result = await auctionRepository.GetAll();


        logger.LogInformation($"GetAuctionsQueryHandler result: {result}");

        return Result.Success(new GetAuctionsResult(result));
    }

}
