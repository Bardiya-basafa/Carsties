namespace Auction.Application.Auctions.Cache;

using Domain.Entities;
using Domain.RepositoryContracts;
using MediatR;

public record CacheUpdate(Auction Auction) : IRequest;


public class UpdateHandler(IAuctionCache cache) : IRequestHandler<CacheUpdate> {

    public async Task Handle(CacheUpdate request, CancellationToken cancellationToken)
    {
        await cache.UpdateAuction(request.Auction);
    }

}
