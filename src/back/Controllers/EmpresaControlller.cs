using back.DTOs;
using back.Entities;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public static class EmpresaController
    {
        public static void EmpresaRoutes(this WebApplication app)
        {
            var route = app.MapGroup("empresa");

            route.MapGet("", async (SqlServerContext context) =>
            {
                try
                {
                    var empresa = await context.Empresa.ToListAsync();
                    return Results.Ok(empresa);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return Results.Problem(e.Message);
                }
            });

            route.MapPost("", 
                async (EmpresaDTO req, SqlServerContext context) => 
                {
                    try
                    {
                        var empresa = new EmpresaModel(req.Nome,req.Cnpj);
                        await context.AddAsync(empresa);
                        await context.SaveChangesAsync();
                        return Results.Ok();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        return Results.Problem(e.Message);
                    }
                });

            route.MapPut("{id:int}", async (int id, EmpresaDTO req, SqlServerContext context) =>
            {
                try
                {
                    var empresa = await context.Empresa.FindAsync(id);
                    if(empresa == null)
                        return Results.NotFound();

                    if (!string.IsNullOrWhiteSpace(req.Nome))
                    {
                        empresa.UpdateName(req.Nome);
                    }
                    if (!string.IsNullOrWhiteSpace(req.Cnpj))
                    {
                        empresa.UpdateName(req.Cnpj);
                    }
                    await context.SaveChangesAsync();
                    return Results.Ok(empresa);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return Results.Problem(e.Message);
                }
            });

            route.MapDelete("{id:int}", async (int id, SqlServerContext context) =>
            {
                try
                {
                    var empresa = await context.Empresa.FindAsync(id);
                    if(empresa == null)
                        return Results.NotFound();
                    empresa.SetInactive();
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
}