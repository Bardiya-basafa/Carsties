namespace Auction.Application.Errors;

using Shared.Entities;


public static class AuctionNotFound {

    public static Error Error(Guid auctionId)
    {
        return new Error("AuctionNotFound", $"Auction with id {auctionId} not found.");
    }

}
