namespace Auction.Application.Errors;

using Shared.Entities;


public static class UnauthorizedAccess {

    public static Error CreateError()
    {
        return new Error("UnauthorizedAccess", "You are not authorized to access this resource.");
    }

}
