namespace Auction.infrastructure.Repositories;

using System.Security.Authentication;
using DbContext;
using Domain.Entities;
using Domain.RepositoryContracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


public class AuctionRepository(AppDbContext context, ILogger<AuctionRepository> logger) : IAuctionRepository {

    public async Task<Auction?> GetById(Guid id)
    {
        return await context.Auctions.FindAsync(id);
    }

    public async Task<List<Auction>> GetAll()
    {
        var auctions = await context.Auctions
            .ToListAsync();

        logger.LogDebug(auctions.ToString(), "GetAll auctions");

        return auctions;
    }

    public Task Add(Auction auction)
    {
        context.Auctions.Add(auction);

        return Task.CompletedTask;
    }

    public Task Update(Auction auction, Auction oldAuction)
    {
        oldAuction.Make = string.IsNullOrEmpty(auction.Make) ? oldAuction.Make : auction.Make;
        oldAuction.Model = string.IsNullOrEmpty(auction.Model) ? oldAuction.Model : auction.Model;
        oldAuction.Year = auction.Year < 1 ? oldAuction.Year : auction.Year;
        oldAuction.Color = string.IsNullOrEmpty(auction.Color) ? oldAuction.Color : auction.Color;
        oldAuction.Mileage = auction.Mileage < 1 ? oldAuction.Mileage : auction.Mileage;
        context.Auctions.Update(oldAuction);

        return Task.CompletedTask;
    }

    public Task Delete(Auction auction)
    {
        context.Auctions.Remove(auction);

        return Task.CompletedTask;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

}
