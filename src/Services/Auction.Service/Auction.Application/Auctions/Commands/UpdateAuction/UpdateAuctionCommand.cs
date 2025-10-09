namespace Auction.Application.Auctions.Commands.UpdateAuction;

using Domain.Entities;
using Domain.Enums;
using FluentValidation;
using Shared.Abstractions.CQRS;


public record UpdateAuctionCommand(Guid Id, string Make, string Model, int Year, string Color, int Mileage, string Seller) : ICommand<UpdateAuctionResult> {

    public string Seller { get; set; } = null!;

    public Guid Id { get; set; }

}


public record UpdateAuctionResult(Auction Auction);


public class UpdateAuctionCommandValidator : AbstractValidator<UpdateAuctionCommand> {

}
