namespace Auction.infrastructure.Repositories;

using System.Text.Json;
using Domain.Entities;
using Domain.RepositoryContracts;
using Microsoft.Extensions.Caching.Distributed;


public class AuctionCache(IDistributedCache cache, IAuctionRepository decorated) : IAuctionCache {

    public async Task CreateAuction(Auction auction)
    {
        var key = $"auction:{auction.Id}";
        await cache.SetStringAsync(key, JsonSerializer.Serialize(auction));
    }

    public async Task UpdateAuction(Auction auction)
    {
        var key = $"auction:{auction.Id}";

        var cachedAuctionString = await cache.GetStringAsync(key);

        if (!string.IsNullOrEmpty(cachedAuctionString)){
            var cachedAuction = JsonSerializer.Deserialize<Auction>(cachedAuctionString);

            if (cachedAuction is not null){
                UpdateAuctionProperties(auction, cachedAuction);
                await cache.SetStringAsync(key, JsonSerializer.Serialize(cachedAuction));

                return;
            }

            await cache.SetStringAsync(key, JsonSerializer.Serialize(auction));
        }

        await cache.SetStringAsync(key, JsonSerializer.Serialize(auction));
    }

    public async Task DeleteAuction(Guid id)
    {
        var key = $"auction:{id}";
        await cache.RemoveAsync(key);
    }

    private static void UpdateAuctionProperties(Auction newAuction, Auction oldAuction)
    {
        oldAuction.Make = string.IsNullOrEmpty(newAuction.Make) ? oldAuction.Make : newAuction.Make;
        oldAuction.Model = string.IsNullOrEmpty(newAuction.Model) ? oldAuction.Model : newAuction.Model;
        oldAuction.Year = newAuction.Year < 1 ? oldAuction.Year : newAuction.Year;
        oldAuction.Color = string.IsNullOrEmpty(newAuction.Color) ? oldAuction.Color : newAuction.Color;
        oldAuction.Mileage = newAuction.Mileage < 1 ? oldAuction.Mileage : newAuction.Mileage;
    }

}
