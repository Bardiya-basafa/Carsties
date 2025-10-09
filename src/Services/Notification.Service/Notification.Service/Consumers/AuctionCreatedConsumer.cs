using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Notification.Service.Hubs;
using Shared.ContractMessages.Auction;

namespace Notification.Service.Consumers;

public class AuctionCreatedConsumer(IHubContext<NotificationHub> hubContext) : IConsumer<AuctionCreated>
{
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        await hubContext.Clients.All.SendAsync("AuctionCreated", context.Message);
    }
}