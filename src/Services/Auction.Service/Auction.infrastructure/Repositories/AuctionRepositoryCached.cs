namespace Auction.infrastructure.Repositories;

using System.Text.Json;
using Domain.Entities;
using Domain.RepositoryContracts;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;


public class AuctionRepositoryCached(IAuctionRepository decorated, IDistributedCache cache) : IAuctionRepository {

    public async Task<Auction?> GetById(Guid id)
    {
        var key = $"auction:{id}";
        var cachedAuction = await cache.GetStringAsync(key);

        if (string.IsNullOrEmpty(cachedAuction)){
            var auction = await decorated.GetById(id);

            await cache.SetStringAsync(key, JsonSerializer.Serialize(auction));

            return auction;
        }

        return JsonSerializer.Deserialize<Auction>(cachedAuction);
    }

    public async Task<List<Auction>> GetAll()
    {
        return await decorated.GetAll();
    }

    public async Task Add(Auction auction)
    {
        await decorated.Add(auction);
    }

    public async Task Update(Auction auction, Auction oldAuction)
    {
        
        await decorated.Update(auction, oldAuction);
    }

    public async Task Delete(Auction auction)
    {
        // var key = $"auction:{auction.Id}";
        // await decorated.Delete(auction);
        //
        // await cache.RemoveAsync(key);
        await decorated.Delete(auction);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await decorated.SaveChangesAsync();
    }

    
}
