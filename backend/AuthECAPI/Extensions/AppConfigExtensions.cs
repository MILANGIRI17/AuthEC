using AuthECAPI.Models;

namespace AuthECAPI.Extensions
{
    public static class AppConfigExtensions
    {
        public static WebApplication ConfigureCORS(this WebApplication app, IConfiguration config)
        {
            app.UseCors(options =>
            {
                options.WithOrigins("http://localhost:4200")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });

            return app;
        }

        public static IServiceCollection AddAppConfig(this IServiceCollection service, IConfiguration config)
        {
            service.Configure<AppSettings>(config.GetSection("AppSettings"));
            
            return service;
        }

    }
}
