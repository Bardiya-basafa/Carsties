namespace Auction.Application.Auctions.Cache;

using Domain.Entities;
using Domain.RepositoryContracts;
using MediatR;

public record CacheDelete(Guid Id) : IRequest;


public class DeleteHandler(IAuctionCache cache) : IRequestHandler<CacheDelete> {

    public async Task Handle(CacheDelete request, CancellationToken cancellationToken)
    {
        await cache.DeleteAuction(request.Id);
    }

}
