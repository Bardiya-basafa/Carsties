namespace Auction.Application.Auctions.Commands.DeleteAuction;

using FluentValidation;
using Shared.Abstractions.CQRS;

public record DeleteAuctionCommand(Guid Id) : ICommand<DeleteAuctionResult>;

public record DeleteAuctionResult(bool Success);


public class DeleteAuctionValidator : AbstractValidator<DeleteAuctionCommand> {

    public DeleteAuctionValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id cannot be empty")
            .NotEqual(Guid.Empty).WithMessage("Id cannot be empty");
    }

}
