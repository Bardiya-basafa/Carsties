using System;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Search.Api.Consumers;
using Search.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient<DbInitializer>();
builder.Services.AddScoped<DbInitializer>();

builder.Services.AddHttpClient("AuctionApi",
    c =>
        c.BaseAddress = new Uri("http://auction.api:8080/"));


builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.UseRetry(r =>
        {
            r.Handle<RabbitMqConnectionException>();
            r.Interval(5, TimeSpan.FromSeconds(10));
        });


        cfg.Host("rabbitmq",
            "/",
            h =>
            {
                h.Username("guest");
                h.Password("guest");
            });


        cfg.ReceiveEndpoint("search-auction-created",
            e =>
            {
                e.UseMessageRetry(r => r.Interval(5, 5));
                e.ConfigureConsumer<AuctionCreatedConsumer>(context);
            });

        cfg.ConfigureEndpoints(context);
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "http://identity.server:8080";
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Lifetime.ApplicationStarted.Register(async void () =>
{
    await Policy.Handle<TimeoutException>()
        .WaitAndRetryAsync(5, retryAttempt => TimeSpan.FromSeconds(10))
        .ExecuteAndCaptureAsync(async () =>
        {
            using var scope = app.Services.CreateScope();
            var initializer = scope.ServiceProvider.GetRequiredService<DbInitializer>();
            await initializer.InitializeDb(app, app.Configuration);
        });
});

//
// using var scope = app.Services.CreateScope();
// var initializer = scope.ServiceProvider.GetRequiredService<DbInitializer>();
// await initializer.InitializeDb(app, app.Configuration);
app.Run();