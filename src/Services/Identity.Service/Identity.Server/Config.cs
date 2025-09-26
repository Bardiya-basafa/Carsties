using Duende.IdentityServer.Models;


namespace Identity.Server;

public static class Config {

    public static IEnumerable<IdentityResource> IdentityResources =>
    [
        new IdentityResources.OpenId(),
        new IdentityResources.Profile()
    ];

    public static IEnumerable<ApiScope> ApiScopes =>
    [
        new ApiScope("auctionApp", "Auction api full access")
    ];

    public static IEnumerable<Client> Clients =>
    [
        new Client
        {
            ClientId = "postman",
            ClientName = "postman",
            AllowedScopes = { "auctionApp", "openid", "profile" },
            RedirectUris = { "http://localhost:5000" },
            AllowedGrantTypes = { GrantType.ResourceOwnerPassword },
            ClientSecrets = [new Secret("NotASecret".Sha256())],
        },
        new Client()
        {
            ClientId = "nextApp",
            ClientName = "nextApp",
            ClientSecrets = { new Secret("secret".Sha256()) },
            AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
            RequirePkce = false,
            RedirectUris = { "http://localhost:3000/api/auth/callback/id-server" },
            AllowedScopes = { "openid", "profile", "auctionApp" },
            AccessTokenLifetime = 3600 * 24 * 30,
        }
    ];

}
