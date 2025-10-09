namespace Auction.Application.Auctions.Cache;

using Domain.Entities;
using Domain.RepositoryContracts;
using MediatR;

public record CacheAdd(Auction Auction) : IRequest;


public class AddHandler(IAuctionCache cache) : IRequestHandler<CacheAdd> {

    public async Task Handle(CacheAdd request, CancellationToken cancellationToken)
    {
        await cache.CreateAuction(request.Auction);
    }

}
