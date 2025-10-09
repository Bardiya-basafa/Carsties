using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Notification.Service.Hubs;
using Shared.ContractMessages.Bid;

namespace Notification.Service.Consumers;

public class BidPlacedConsumer(IHubContext<NotificationHub> hubContext) : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        await hubContext.Clients.All.SendAsync("BidPlaced", context.Message);
    }
}