namespace Auction.Application.Errors;

using Shared.Entities;


public static class AuctionDeleteError {

    public static Error CreateError(Guid auctionId)
    {
        return new Error("AuctionDeleteError", $"Auction with id {auctionId}  cant be deleted.");
    }

}
