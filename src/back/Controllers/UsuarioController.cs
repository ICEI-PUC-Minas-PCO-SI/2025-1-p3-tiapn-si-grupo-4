using back.DTOs;
using back.Entities;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public static class UsuarioController
    {
        public static void UsuarioRoutes(this WebApplication app)
        {
            var route = app.MapGroup("usuario");

            route.MapGet("", async (SqlServerContext context) =>
            {
                try
                {
                    var usuarios = await context.Usuario.ToListAsync();
                    return Results.Ok(usuarios);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return Results.Problem(e.Message);
                }
            });

            route.MapPost("", 
                async (UsuarioDTO req, SqlServerContext context) => 
                {
                    try
                    {
                        var usuario = new UsuarioModel(req.Nome);
                        await context.AddAsync(usuario);
                        await context.SaveChangesAsync();
                        return Results.Ok();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        return Results.Problem(e.Message);
                    }
                });

            route.MapPut("{id:int}", async (int id, UsuarioDTO req, SqlServerContext context) =>
            {
                try
                {
                    var usuario = await context.Usuario.FindAsync(id);
                    if(usuario == null)
                        return Results.NotFound();

                    if (!string.IsNullOrWhiteSpace(req.Nome))
                    {
                        usuario.UpdateName(req.Nome);
                    }
                    if (!string.IsNullOrWhiteSpace(req.Email))
                    {
                        usuario.UpdateEmail(req.Email);
                    }
                    if (!string.IsNullOrWhiteSpace(req.CPF))
                    {
                        usuario.UpdateCPF(req.CPF);
                    }
                    if (!string.IsNullOrWhiteSpace(req.Celular))
                    {
                        usuario.UpdateCelular(req.Celular);
                    }
                    if (req.NivelAcesso.HasValue)
                    {
                        usuario.UpdateNivelAcesso(req.NivelAcesso);
                    }

                    await context.SaveChangesAsync();
                    return Results.Ok(usuario);
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
                    var usuario = await context.Usuario.FindAsync(id);
                    if(usuario == null)
                        return Results.NotFound();
                    usuario.SetInactive();
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
