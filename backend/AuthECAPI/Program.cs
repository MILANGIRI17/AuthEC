using AuthECAPI.Extensions;
using AuthECAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerExplorer()
                .InjectDbContext(builder.Configuration)
                .AddIdentityHandlerAndStores()
                .ConfigureIdentityOptions()
                .AddIdentityAuth(builder.Configuration);

var app = builder.Build();

app.ConfigureSwagerExplorer()
    .ConfigureCORS(builder.Configuration)
    .AddIdentityAuthMiddlewares();

app.UseHttpsRedirection();
app.MapControllers();



app.MapGroup("/api").MapIdentityApi<AppUser>();

app.MapPost("/api/signup", async (
    UserManager<AppUser> userManager,
    [FromBody] UserRegistrationModel userRegistrationModel) =>
{
    AppUser user = new AppUser()
    {
        UserName = userRegistrationModel.UserName,
        Email = userRegistrationModel.Email,
        FullName = userRegistrationModel.FullName,
    };
    var result = await userManager.CreateAsync(user, userRegistrationModel.Password);
    if (result.Succeeded) return Results.Ok(result);
    else return Results.BadRequest(result);
});

app.MapPost("/api/signin", async (
    UserManager<AppUser> userManager,
    [FromBody] LoginModel loginModel) =>
{
    var user = await userManager.FindByEmailAsync(loginModel.Email);
    if (user != null && await userManager.CheckPasswordAsync(user, loginModel.Password))
    {
        var signInKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:JWTSecret"]!));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim("UserId", user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddMinutes(10),
            SigningCredentials = new SigningCredentials(
                signInKey, SecurityAlgorithms.HmacSha256Signature
                )
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);
        return Results.Ok(new { token });
    }
    else return Results.BadRequest(new { message = "Username or password is incorrect." });
});

app.Run();


public class UserRegistrationModel
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FullName { get; set; }
    public string UserName { get; set; }
}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}