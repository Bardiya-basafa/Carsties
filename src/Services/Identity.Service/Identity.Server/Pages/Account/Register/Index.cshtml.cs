using Microsoft.AspNetCore.Mvc.RazorPages;


namespace Identity.Server.Pages.Account.Register;

using System.Security.Claims;
using Duende.IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;


[AllowAnonymous]
[SecurityHeaders]
public class Index(UserManager<ApplicationUser> userManager) : PageModel {

    [BindProperty]
    public RegisterViewModel Input { get; set; }

    [BindProperty]
    public bool RegisterSuccess { get; set; }

    public IActionResult OnGet(string returnUrl)
    {
        Input = new RegisterViewModel
        {
            ReturnUrl = returnUrl,
        };

        return Page();
    }

    public async Task<IActionResult> OnPost()
    {
        if (Input.Button != "register"){
            return Redirect("/");
        }

        var user = new ApplicationUser()
        {
            UserName = Input.Username,
            Email = Input.Email,
            EmailConfirmed = true,
        };

        var result = await userManager.CreateAsync(user, Input.Password);

        if (result.Succeeded){
            await userManager.AddClaimsAsync(user,
            new Claim[]
            {
                new Claim("name", Input.FullName),
                new Claim("username", Input.Email),
                
            });

            RegisterSuccess = true;
        }

        return Page();
    }

}
