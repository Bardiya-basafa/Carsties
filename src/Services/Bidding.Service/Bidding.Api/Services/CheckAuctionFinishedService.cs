namespace Bidding.Api.Services;

using Entities;
using MassTransit;
using MongoDB.Entities;
using Shared.ContractMessages.Auction;


public class CheckAuctionFinishedService(ILogger<CheckAuctionFinishedService> logger, IServiceProvider services) : BackgroundService {

    override protected async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("start checking for finished auctions");
        stoppingToken.Register(() => logger.LogInformation("stop checking for finished auctions"));

        while (!stoppingToken.IsCancellationRequested){
            await CheckAuctions(stoppingToken);
            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task CheckAuctions(CancellationToken stoppingToken)
    {
        var finishedAuctions = await DB.Find<Auction>()
            .Match(a => a.AuctionEnd <= DateTime.UtcNow)
            .Match(x => !x.Finished)
            .ExecuteAsync(stoppingToken);

        if (finishedAuctions.Count == 0){
            return;
        }

        logger.LogInformation($"finished auctions found {finishedAuctions.Count}");
        using var scope = services.CreateScope();
        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

        foreach (var auction in finishedAuctions){
            auction.Finished = true;
            await auction.SaveAsync(null, stoppingToken);

            var winningBid = await DB.Find<Bid>()
                .Match(a => a.AuctionId == auction.ID)
                .Match(b => b.BidStatus == BidStatus.Accepted)
                .Sort(x => x.Descending(s => s.Amount))
                .ExecuteFirstAsync(stoppingToken);

            await endpoint.Publish(
            new AuctionFinished()
            {
                ItemSold = winningBid != null,
                AuctionId = Guid.Parse(auction.ID),
                Winner = winningBid?.Bidder,
                SoldAmount = winningBid?.Amount,
                Seller = auction.Seller,
            },
            stoppingToken);
        }
    }

}
