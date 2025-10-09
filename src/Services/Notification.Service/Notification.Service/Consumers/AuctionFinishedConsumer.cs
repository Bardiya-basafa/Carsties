using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Notification.Service.Hubs;
using Shared.ContractMessages.Auction;

namespace Notification.Service.Consumers;

public class AuctionFinishedConsumer(IHubContext<NotificationHub> hubContext) : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        await hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);
    }
}