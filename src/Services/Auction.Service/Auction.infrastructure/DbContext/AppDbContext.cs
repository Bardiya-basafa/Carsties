namespace Auction.infrastructure.DbContext;

using Domain.Entities;
using MassTransit;
using Microsoft.EntityFrameworkCore;


public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options) {

    public DbSet<Auction> Auctions { get; set; }


    override protected void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.AddInboxStateEntity();
        modelBuilder.AddOutboxMessageEntity();
        modelBuilder.AddOutboxStateEntity();
    }

}
