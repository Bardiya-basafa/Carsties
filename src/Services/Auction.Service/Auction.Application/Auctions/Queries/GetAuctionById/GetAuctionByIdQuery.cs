namespace Auction.Application.Auctions.Queries.GetAuctionById;

using Domain.Enums;
using FluentValidation;
using Shared.Abstractions.CQRS;

public record GetAuctionByIdQuery(Guid Id) : IQuery<GetAuctionByIdResult>;

public record GetAuctionByIdResult(Guid Id, string Seller, int SoldAmount, DateTime UpdatedAt, DateTime AuctionEnd, Status Status, string Make, string Model, int Year, string Color, int Mileage, string ImageUrl,int ReservePrice);


public class GetAuctionByIdQueryValidator : AbstractValidator<GetAuctionByIdQuery> {

    public GetAuctionByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id cannot be empty")
            .NotEqual(Guid.Empty).WithMessage("Id cannot be empty");
    }

}
