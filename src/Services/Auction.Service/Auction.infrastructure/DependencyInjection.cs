namespace Auction.infrastructure;

using DbContext;
using Domain.RepositoryContracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repositories;


public static class DependencyInjection {

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options => {
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<IAuctionCache, AuctionCache>();
        services.AddScoped<IAuctionRepository, AuctionRepository>();
        services.Decorate<IAuctionRepository, AuctionRepositoryCached>();

        services.AddStackExchangeRedisCache(options => {
            options.Configuration = configuration.GetConnectionString("Redis");
        });

        return services;
    }

}
