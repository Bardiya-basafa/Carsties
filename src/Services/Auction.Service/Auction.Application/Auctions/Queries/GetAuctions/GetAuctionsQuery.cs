namespace Auction.Application.Auctions.Queries.GetAuctions;

using Domain.Entities;
using Shared.Abstractions.CQRS;

public record GetAuctionsQuery() : IQuery<GetAuctionsResult>;

public record GetAuctionsResult(List<Auction> Auctions);
