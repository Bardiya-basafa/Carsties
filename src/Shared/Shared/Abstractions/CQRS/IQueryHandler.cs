namespace Shared.Abstractions.CQRS;

using Entities;
using MediatR;


public interface IQueryHandler<TQuery, TResponse>
    : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse> {

}
