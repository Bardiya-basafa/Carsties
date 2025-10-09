namespace Auction.Application.Auctions.Commands.SaveChanges;


using Shared.Abstractions.CQRS;

public record SaveChangesCommand : ICommand<bool>;
