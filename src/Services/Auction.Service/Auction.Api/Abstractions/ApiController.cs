namespace Auction.Api.Abstractions;

using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shared.Entities;


[ApiController]
public abstract class ApiController : ControllerBase {

    protected readonly IMediator Sender;

    protected ApiController(IMediator sender)
    {
        Sender = sender;
    }

    protected IActionResult HandleFailure(Result result)
    {
        return result switch
        {
            { IsSuccess: true } => throw new InvalidOperationException(),
            IValidationResult validationResult =>
                BadRequest(
                CreateProblemDetails(
                "Validation Error",
                StatusCodes.Status400BadRequest,
                result.Error,
                validationResult.Errors)),
            _ => BadRequest(CreateProblemDetails(
            "Bad Request",
            StatusCodes.Status400BadRequest,
            result.Error))
        };
    }

    private static ProblemDetails CreateProblemDetails(
        string title,
        int status,
        Error error,
        Error[] errors = null) =>
        new()
        {
            Title = title,
            Type = error.Code,
            Detail = error.Message,
            Status = status,
            Extensions = { { nameof(errors), errors } }
        };

}
