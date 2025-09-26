namespace Auction.Api.Requests;

public record UpdateAuctionRequest(
    string Make,
    string Model,
    int Year,
    string Color,
    int Mileage
);
