namespace Search.Api.Data;

using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Entities;
using Mapster;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Entities;


public class DbInitializer {

    private readonly HttpClient _httpClient;

    private readonly ILogger<DbInitializer> _logger;

    public DbInitializer(IHttpClientFactory factory, ILogger<DbInitializer> logger)
    {
        _logger = logger;
        _httpClient = factory.CreateClient("AuctionApi");
    }

    public async Task InitializeDb(WebApplication application, IConfiguration configuration)
    {
        await DB.InitAsync("SearchDb", MongoClientSettings.FromConnectionString(configuration.GetConnectionString("MongoDb")));

        await DB.Index<Auction>()
            .Key(x => x.Make, KeyType.Text)
            .Key(x => x.Model, KeyType.Text)
            .Key(x => x.Color, KeyType.Text)
            .CreateAsync();


        var count = await DB.CountAsync<Auction>();
        using var scope = application.Services.CreateScope();

        var response = await _httpClient.GetAsync("api/auctions");
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();


        var items = JsonSerializer.Deserialize<List<AuctionResponse>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        List<Auction> auctions = [];
        Auction auction;

        foreach (var item in items){
            auction = item.Adapt<Auction>();
            auction.ID = item.Id;
            auctions.Add(auction);
        }

        await DB.SaveAsync(auctions);
    }

}
