namespace Identity.Server.Services;

using System.Security.Claims;
using Duende.IdentityModel;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Identity;
using Models;


public class CustomProfileService(UserManager<ApplicationUser> userManager) : IProfileService {

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await userManager.GetUserAsync(context.Subject);

        if (user is null){
            return;
        }

        var existingClaims = await userManager.GetClaimsAsync(user);

        var claims = new List<Claim>()
        {
            new Claim("username", user.UserName),
        };

        context.IssuedClaims.AddRange(claims);
        context.IssuedClaims.Add(existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name));
    }


    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }

}
