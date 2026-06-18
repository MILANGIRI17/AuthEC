using Microsoft.AspNetCore.Authorization;

namespace AuthECAPI.Controllers
{
    public static class AccountEndpoints
    {
        public static IEndpointRouteBuilder MapAccountEndpoints(this IEndpointRouteBuilder app)
        {
            //app.Map("/UserProfile", GetUserProfile).RequireAuthorization(); this or the [Authorize ]
            app.MapGet("/UserProfile", GetUserProfile);
            return app;
        }

        [Authorize]
        private static string GetUserProfile()
        {
            return "This is a protected endpoint. You are authenticated.";
        }

        //private static async Task<IResult> GetUserProfile(ClaimsPrincipal user, UserManager<AppUser> userManager)
        //{
        //    var userId = user.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
        //    if (userId == null) return Results.BadRequest(new { message = "Invalid token." });
        //    var appUser = await userManager.FindByIdAsync(userId);
        //    if (appUser == null) return Results.NotFound(new { message = "User not found." });
        //    return Results.Ok(new
        //    {
        //        appUser.UserName,
        //        appUser.Email,
        //        appUser.FullName
        //    });
        //}
    }
}
