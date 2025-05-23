

using Sprache;

namespace back.Controllers;

public static class HelloController
{
    public static void HelloRoutes(this WebApplication app)
    {
        app.MapGet("/{message}", (string message) =>
        {
            return Results.Ok($"You sent: {message}");
        });
    }
}