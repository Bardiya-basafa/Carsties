namespace Identity;

using Microsoft.AspNetCore.Identity;


public class ApplicationUser : IdentityUser {

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    [PersonalData]
    public string? FullName => $"{FirstName} {LastName}";
    

}
