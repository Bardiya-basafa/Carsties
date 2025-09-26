namespace Auction.Application.Consumers;

using MassTransit;
using Serilog;
using Shared.ContractMessages;
using Shared.ContractMessages.Auction;


public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>> {

    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        var exception = context.Message.Exceptions.FirstOrDefault();

        if (exception is null){
            return;
        }

        if (exception.ExceptionType == "System.ArgumentException"){
            context.Message.Message.Model = "FooBar";
            await context.Publish(context.Message.Message);
        }
        else{
            Log.Information("No exception was thrown");
        }
    }

}
