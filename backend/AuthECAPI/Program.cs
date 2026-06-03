using AuthECAPI.Controllers;
using AuthECAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerExplorer()
                .InjectDbContext(builder.Configuration)
                .AddAppConfig(builder.Configuration)
                .AddIdentityHandlerAndStores()
                .ConfigureIdentityOptions()
                .AddIdentityAuth(builder.Configuration);

var app = builder.Build();

app.ConfigureSwagerExplorer()
    .ConfigureCORS(builder.Configuration)
    .AddIdentityAuthMiddlewares();

app.UseHttpsRedirection();
app.MapControllers();
app.MapGroup("/api").MapIdentityUserEndpoints();

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