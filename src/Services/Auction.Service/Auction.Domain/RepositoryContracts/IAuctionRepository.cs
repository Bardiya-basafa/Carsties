namespace Auction.Domain.RepositoryContracts;

using Entities;


public interface IAuctionRepository {

    Task<Auction> GetById(Guid id);

    Task<List<Auction>> GetAll();

    Task Add(Auction auction);

    Task Update(Auction auction, Auction oldAuction);

    Task Delete(Auction auction);

    Task<bool> SaveChangesAsync();

}
