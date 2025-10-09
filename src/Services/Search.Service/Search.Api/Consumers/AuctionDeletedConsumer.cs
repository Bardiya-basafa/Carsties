namespace Search.Api.Consumers;

using System.Threading.Tasks;
using Entities;
using MassTransit;
using Microsoft.Extensions.Logging;
using MongoDB.Entities;
using Shared.ContractMessages;
using Shared.ContractMessages.Auction;


public class AuctionDeletedConsumer : IConsumer<AuctionDeleted> {

    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        var result = await DB.DeleteAsync<Auction>(context.Message.Id.ToString());

        if (!result.IsAcknowledged){
            throw new MessageException(typeof(AuctionDeleted), "Problem deleting auction");
        }
    }

}
