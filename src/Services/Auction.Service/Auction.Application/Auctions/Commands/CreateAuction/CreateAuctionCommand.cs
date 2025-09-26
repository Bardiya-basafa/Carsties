namespace Auction.Application.Auctions.Commands.CreateAuction;

using Auction.Domain.Entities;
using FluentValidation;
using Shared.Abstractions.CQRS;


public sealed record CreateAuctionCommand(string Make, string Model, int Year, string Color, int Mileage, string ImageUrl, int ReservePrice, DateTime AuctionEnd, string Seller) : ICommand<CreateAuctionResult> {

    public string Seller { get; set; } = string.Empty;

}


public sealed record CreateAuctionResult(Auction Auction);


public class CreateAuctionValidator : AbstractValidator<CreateAuctionCommand> {

    public CreateAuctionValidator()
    {
        RuleFor(x => x.Make)
            .NotEmpty().WithMessage("Make is required")
            .NotNull().WithMessage("Make is required");

        RuleFor(x => x.Model)
            .NotNull().WithMessage("Model is required")
            .NotEmpty().WithMessage("Model is required");

        RuleFor(x => x.Color)
            .NotEmpty().WithMessage("Color is required")
            .NotNull().WithMessage("Color is required");

        RuleFor(x => x.ImageUrl)
            .NotEmpty().WithMessage("Image url is required")
            .NotNull().WithMessage("Image url is required");
    }

}
