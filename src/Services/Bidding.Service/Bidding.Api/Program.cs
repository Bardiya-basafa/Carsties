using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using MongoDB.Entities;
using Polly;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddMassTransit(x => {
    x.AddConsumersFromNamespaceContaining<>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));

    x.UsingRabbitMq((context, cfg) => {
        cfg.UseMessageRetry(r => {
            r.Handle<RabbitMqConnectionException>();
            r.Interval(5, TimeSpan.FromSeconds(10));
        });

        cfg.Host(builder.Configuration["RabbitMQ:Host"],
        "/",
        h => {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

builder.Services.AddHostedService<CheckAuctionFinishedService>();
builder.Services.AddScoped<GrpcAuctionClient>();

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

await Policy.Handle<TimeoutException>()
    .WaitAndRetryAsync(5, retryAttempt => TimeSpan.FromSeconds(10))
    .ExecuteAndCaptureAsync(async () => {
        await DB.InitAsync("BidDb", MongoClientSettings.FromConnectionString("BidDb"));
    });

app.Run();
