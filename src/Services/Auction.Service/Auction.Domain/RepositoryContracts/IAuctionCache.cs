namespace Auction.Domain.RepositoryContracts;

using Auction.Domain.Entities;


public interface IAuctionCache {

    Task CreateAuction(Auction auction);

    Task UpdateAuction(Auction auction);

    Task DeleteAuction(Guid id);

}
