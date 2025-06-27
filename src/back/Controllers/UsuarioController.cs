using back.DTOs;
using back.Entities;
using back.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace back.Controllers;

public static class UsuarioController
{
    public static void UsuarioRoutes(this WebApplication app)
    {
        var route = app.MapGroup("user").RequireAuthorization("AuthenticatedUser");

        // GET all users
        route.MapGet("", async (MyDbContext context) =>
        {
            try
            {
                var usuarios = await context.Users
                                    .Where(u => u.Ativo)
                                    //join com a tabela funcionario e 
                                    // empresa para trazer os dados
                                    // refente somente aos da empresa que o usuario pertence
                                    .ToListAsync();
                return Results.Ok(usuarios);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao buscar usuários: {e.Message}");
                return Results.Problem("Ocorreu um erro ao buscar os usuários.");
            }
        });

        route.MapGet("{id:int}", async (int id, MyDbContext context) =>
        {
            try
            {
                var usuario = await context.Users
                                .Where(u => u.ID == id && u.Ativo)
                                .FirstOrDefaultAsync();

                if (usuario == null)
                    return Results.NotFound($"Usuário com ID {id} não encontrado ou inativo.");

                return Results.Ok(usuario);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao buscar usuário por ID: {e.Message}");
                return Results.Problem($"Ocorreu um erro ao buscar o usuário com ID {id}.");
            }
        });


        _ = route.MapPost("", async (UsuarioCreateDTO req, MyDbContext context) => // Changed to UsuarioCreateDTO for specific creation needs
        {
            try
            {
                if (await context.Login.AnyAsync(l => l.Login == req.Email))
                {
                    return Results.Conflict("Já existe um usuário com este e-mail.");
                }
                if (await context.Users.AnyAsync(u => u.CPF == req.CPF))
                {
                    return Results.Conflict("Já existe um usuário com este CPF.");
                }

                var newUser = new UserModel
                {
                    Nome = req.Nome,
                    Email = req.Email,
                    CPF = req.CPF,
                    Celular = req.Celular,
                    NivelAcesso = 1,
                    Ativo = true,
                };


                context.Users.Add(newUser);
                await context.SaveChangesAsync();

                var userRef = await context.Users.FirstOrDefaultAsync(l => l.Email == newUser.Email);

                if (userRef == null)
                {
                    return Results.Problem();
                }

                // 2. Create LoginModel
                var newLogin = new LoginModel
                {
                    Login = req.Email,
                    Senha = BCrypt.Net.BCrypt.HashPassword(req.Password),
                    Usuario = userRef
                };

                context.Login.Add(newLogin);

                await context.SaveChangesAsync();

                return Results.Created($"/usuario/{newUser.ID}", newUser);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao criar usuário: {e.Message}");
                return Results.Problem("Ocorreu um erro ao criar o usuário.", statusCode: StatusCodes.Status500InternalServerError);
            }
        }).AllowAnonymous();

        // PUT - Update an existing user
        route.MapPut("{id:int}", async (int id, UsuarioDTO req, MyDbContext context) =>
        {
            try
            {
                var usuario = await context.Users.FindAsync(id);
                if (usuario == null)
                    return Results.NotFound($"Usuário com ID {id} não encontrado.");

                if (!string.IsNullOrWhiteSpace(req.Nome))
                {
                    usuario.Nome = req.Nome;
                }
                if (!string.IsNullOrWhiteSpace(req.Email))
                {
                    var loginModel = await context.Login.FirstOrDefaultAsync(l => l.Usuario.ID == usuario.ID);
                    if (loginModel != null)
                    {
                        loginModel.Login = req.Email;
                    }
                    usuario.Email = req.Email;
                }

                if (!string.IsNullOrWhiteSpace(req.Celular))
                {
                    usuario.Celular = req.Celular;
                }
                if (req.NivelAcesso.HasValue)
                {
                    usuario.NivelAcesso = req.NivelAcesso.Value; // Use .Value when HasValue is true
                }

                await context.SaveChangesAsync();
                return Results.Ok(usuario);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao atualizar usuário: {e.Message}");
                return Results.Problem("Ocorreu um erro ao atualizar o usuário.");
            }
        });

        // DELETE - Soft delete (deactivate) a user
        route.MapDelete("{id:int}", async (int id, MyDbContext context) =>
        {
            try
            {
                var usuario = await context.Users.FindAsync(id);
                if (usuario == null)
                    return Results.NotFound($"Usuário com ID {id} não encontrado.");

                usuario.Ativo = false; // soft-delete
                await context.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao (desativar) excluir usuário: {e.Message}");
                return Results.Problem("Ocorreu um erro ao (desativar) excluir o usuário.");
            }
        });

        route.MapGet("{id:int}/empresa", async (int id, MyDbContext context) =>
            {
                try{
                var funcionario = await context.Funcionarios
                    .Where(f => f.UsuarioId == id)
                    .Select(f => new
                    {
                        f.EmpresaId
                    })
                    .FirstOrDefaultAsync();

                if (funcionario == null)
                    return Results.NotFound("Usuário não associado a nenhuma empresa");

                return Results.Ok(funcionario);
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Erro ao buscar empresa do usuário {id}: {e.Message}");
                    return Results.Problem($"Erro ao buscar a empresa do usuário com ID {id}.");
                }
            });

    }
}