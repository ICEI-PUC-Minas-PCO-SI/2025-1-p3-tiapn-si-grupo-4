using Microsoft.EntityFrameworkCore;
using back.Entities;

namespace back.Controllers;

public static class LogsController
{
    public static void LogRoutes(this WebApplication app)
    {
        var route = app.MapGroup("logs");

        route.MapGet("", GetAllLogs);
    }

    private static async Task<IResult> GetAllLogs(MyDbContext context)
    {
        try
        {
            var logs = await context.Logs.ToListAsync();
            return Results.Ok(logs);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Results.Problem(
                detail: e.Message,
                statusCode: 500,
                title: "Erro interno do servidor"
            );
        }
    }
}