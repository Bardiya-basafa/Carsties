namespace Auction.Application.Errors;

using Shared.Entities;


public static class AuctionUpdateError {

    public static Error CreateError(Guid auctionId)
    {
        return new Error("AuctionUpdateError", $"Auction with id {auctionId} cant be updated.");
    }

}
