namespace Auction.Api.Services;

using System.Globalization;
using Application.Auctions.Queries.GetAuctionById;
using AuctionService;
using Grpc.Core;
using MediatR;


public class GrpcAuctionService(ISender sender) : GrpcAuction.GrpcAuctionBase {

    public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request, ServerCallContext context)
    {
        var command = new GetAuctionByIdQuery(Guid.Parse(request.Id));
        var result = await sender.Send(command);

        if (result.IsFailure){
            throw new RpcException(new Status(StatusCode.Internal, result.Error));
        }

        var response = new GrpcAuctionResponse()
        {
            Auction = new GrpcAuctionModel()
            {
                Id = result.Value().Id.ToString(),
                AuctionEnd = result.Value().AuctionEnd.ToString(CultureInfo.InvariantCulture),
                ReservePrice = result.Value().ReservePrice,
                Seller = result.Value().Seller,
            }
        };

        return response;
    }

}
