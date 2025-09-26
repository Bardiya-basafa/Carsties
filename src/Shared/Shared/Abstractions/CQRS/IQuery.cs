namespace Shared.Abstractions.CQRS;

using Entities;
using MediatR;


public interface IQuery<TResponse> : IRequest<Result<TResponse>> {

}
