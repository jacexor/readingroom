using ReadingRoom.Service;

namespace ReadingRoom.Config
{
    public static class StartupServices
    {
        public static IUmbracoBuilder SetupServices(this IUmbracoBuilder builder)
        {
            builder.Services.AddScoped<IReadingTimeService, ReadingTimeService>();

            return builder;
        }
    }
}
