namespace Shared.Abstractions.CQRS;

using Entities;
using MediatR;


public interface ICommand : IRequest<Result> {

}


public interface ICommand<TResponse> : IRequest<Result<TResponse>> {

}
