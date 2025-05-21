using back.DTOs;
using back.Entities;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

public static class ExempleController
{
    public static void ExempleRoutes(this WebApplication app)
    {

        var rout = app.MapGroup("exemplo");
        
        rout.MapGet("", async (SqlServerContext context) =>
        {
            try
            {
                var exemples = await context.Exemple.ToListAsync();
                return Results.Ok(exemples);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.Problem(e.Message);
            }
        });
        
        rout.MapPost("", async (ExempleDTO req, SqlServerContext context) =>
        {
            try
            {
                var exemple = new ExempleModel(req.Name);
                await context.AddAsync(exemple);
                await context.SaveChangesAsync();
                return Results.Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.Problem(e.Message);
            }
        });
        
        rout.MapPut("{id:int}", async (int id, ExempleDTO req, SqlServerContext context) =>
        {
            try
            {
                var exemple = await context.Exemple.FindAsync(id);
                if (exemple == null)
                    return Results.NotFound();
                exemple.UpdateName(req.Name);
                await context.SaveChangesAsync();
                return Results.Ok(exemple);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.Problem(e.Message);
            }
        });
        
        rout.MapDelete("{id:int}", async (int id, SqlServerContext context) =>
        {
            try
            {
                var exemple = await context.Exemple.FindAsync(id);
                if (exemple == null)
                    return Results.NotFound();
                exemple.SetInactive();
                await context.SaveChangesAsync();
                return Results.Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.Problem(e.Message);
            }
        });
    }
}