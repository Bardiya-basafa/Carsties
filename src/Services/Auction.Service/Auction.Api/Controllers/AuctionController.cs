namespace Auction.Api.Controllers;

using System.Security.Authentication;
using Abstractions;
using Application.Auctions.Cache;
using Application.Auctions.Commands;
using Application.Auctions.Commands.CreateAuction;
using Application.Auctions.Commands.DeleteAuction;
using Application.Auctions.Commands.SaveChanges;
using Application.Auctions.Commands.UpdateAuction;
using Application.Auctions.Queries.GetAuctionById;
using Application.Auctions.Queries.GetAuctions;
using Application.Errors;
using Domain.Entities;
using Mapster;
using MassTransit;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Requests;
using Shared.ContractMessages;
using Shared.ContractMessages.Auction;
using Shared.Entities;


[Route("api/auctions")]
public class AuctionController : ApiController {

    private readonly ILogger<AuctionController> _logger;

    private readonly IPublishEndpoint _publishEndpoint;

    public AuctionController(IMediator sender, ILogger<AuctionController> logger, IPublishEndpoint publishEndpoint) : base(sender)
    {
        _logger = logger;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<IActionResult> GetAuctions()
    {
        _logger.LogInformation("GetAuctions called");
        var query = new GetAuctionsQuery();

        var result = await Sender.Send(query);
        _logger.LogInformation($"Get Auctions Result : {result.ToString()}");


        return Ok(result.Value().Auctions);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetAuctionById(Guid id)
    {
        var query = new GetAuctionByIdQuery(id);
        var result = await Sender.Send(query);

        if (result.IsFailure){
            return HandleFailure(result);
        }

        return Ok(result.Value());
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateAuction([FromBody] CreateAuctionRequest request)
    {
        var command = request.Adapt<CreateAuctionCommand>();

        if (User.Identity is { Name: not null }) command.Seller = User.Identity.Name;

        var result = await Sender.Send(command);
        await _publishEndpoint.Publish(result.Value().Auction.Adapt<AuctionCreated>());
        var savingResult = await Sender.Send(new SaveChangesCommand());

        if (savingResult.IsFailure){
            return HandleFailure(Result.Failure<CreateAuctionResult>(new Error("AuctionCreationFailure", "Unable to create auction.")));
        }

        await Sender.Send(new CacheAdd(result.Value().Auction));

        return Ok(result.Value());
    }


    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateAuction(Guid id, [FromBody] UpdateAuctionRequest request)
    {
        var command = request.Adapt<UpdateAuctionCommand>();
        command.Id = id;

        if (User.Identity is { Name: not null }) command.Seller = User.Identity.Name;
        var result = await Sender.Send(command);

        if (result.IsFailure){
            return HandleFailure(result);
        }

        await _publishEndpoint.Publish(result.Value().Auction.Adapt<AuctionUpdated>());
        var savingResult = await Sender.Send(new SaveChangesCommand());


        if (savingResult.IsFailure){
            return HandleFailure(Result.Failure<UpdateAuctionRequest>(AuctionUpdateError.CreateError(id)));
        }

        await Sender.Send(new CacheUpdate(request.Adapt<Auction>()));

        return Ok(result.Value());
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteAuction(Guid id)
    {
        var command = new DeleteAuctionCommand(id);
        await _publishEndpoint.Publish(command.Adapt<AuctionDeleted>());
        var result = await Sender.Send(command);

        if (result.IsFailure){
            return HandleFailure(result);
        }

        var savingResult = await Sender.Send(new SaveChangesCommand());

        if (savingResult.IsFailure){
            return HandleFailure(Result.Failure<DeleteAuctionResult>(AuctionDeleteError.CreateError(id)));
        }

        await Sender.Send(new CacheDelete(id));

        return Ok(result.Value());
    }

}
