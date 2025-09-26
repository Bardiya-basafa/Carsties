namespace Auction.Api.Requests;

public record CreateAuctionRequest(
    string Make,
    string Model,
    int Year,
    string Color,
    int Mileage,
    string ImageUrl,
    int ReservePrice,
    DateTime AuctionEnd
);
