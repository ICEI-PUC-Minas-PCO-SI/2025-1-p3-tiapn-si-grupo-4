using back.DTOs;
using back.Models;
using Microsoft.EntityFrameworkCore;
using back.Entities;

namespace back.Controllers;

public static class EmpresaController
{
    public static void EmpresaRoutes(this WebApplication app)
    {
        var route = app.MapGroup("empresa"); //adicionar .RequireAuthorization("AuthenticatedUser")

        route.MapGet("", GetAllEmpresas);
        route.MapGet("{id:int}", GetEmpresaById);
        route.MapPost("", CreateEmpresa);
        route.MapPut("{id:int}", UpdateEmpresa);
        route.MapDelete("{id:int}", DeleteEmpresa);

        route.MapGet("{empresaId:int}/funcionarios", GetFuncionarios);
        route.MapPost("{empresaId:int}/funcionarios", AddFuncionario);
    }

    private static async Task<IResult> GetAllEmpresas(MyDbContext context)
    {
        try
        {
            var empresas = await context.Empresas.ToListAsync();
            return Results.Ok(empresas);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar empresas: {e.Message}");
            return Results.Problem("Erro ao buscar empresas.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetEmpresaById(int id, MyDbContext context)
    {
        try
        {
            var empresa = await context.Empresas.FindAsync(id);
            return empresa is null ? Results.NotFound() : Results.Ok(empresa);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar empresa: {e.Message}");
            return Results.Problem("Erro ao buscar empresa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> CreateEmpresa(EmpresaModel req, MyDbContext context)
    {
        try
        {
            var newEmpresa = new EmpresaModel
            {
                Ativo = true,
                CNPJ = req.CNPJ,
                Funcionarios = [],
                Nome = req.Nome,
            };
            
            await context.Empresas.AddAsync(newEmpresa);

            await context.SaveChangesAsync();
            var empresa = await context.Empresas.FindAsync(req.ID);
            return Results.Created($"/empresa/{req.ID}", req);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao criar empresa: {e.Message}");
            return Results.Problem("Erro ao criar empresa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> UpdateEmpresa(int id, EmpresaModel req, MyDbContext context)
    {
        try
        {
            var empresa = await context.Empresas.FindAsync(id);
            if (empresa is null) return Results.NotFound();

            empresa.Nome = req.Nome;
            empresa.CNPJ = req.CNPJ;

            await context.SaveChangesAsync();
            return Results.Ok(empresa);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao atualizar empresa: {e.Message}");
            return Results.Problem("Erro ao atualizar empresa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> DeleteEmpresa(int id, MyDbContext context)
    {
        try
        {
            var empresa = await context.Empresas.FindAsync(id);
            if (empresa is null) return Results.NotFound();

            context.Empresas.Remove(empresa);
            await context.SaveChangesAsync();
            return Results.NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao deletar empresa: {e.Message}");
            return Results.Problem("Erro ao deletar empresa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetFuncionarios(int empresaId, MyDbContext context)
    {
        try
        {
            var funcionarios = await context.Funcionarios
                .Include(f => f.Usuario)
                .Where(f => f.EmpresaId == empresaId)
                .ToListAsync();

            var result = funcionarios.Select(f => new FuncionarioDTO
            {
                UsuarioId = f.UsuarioId,
                EmpresaId = f.EmpresaId,
                Nome = f.Usuario.Nome,
                CPF = f.Usuario.CPF,
                NivelAcesso = f.Usuario.NivelAcesso
            });

            return Results.Ok(result);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar funcionários: {e.Message}");
            return Results.Problem("Erro ao buscar funcionários.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> AddFuncionario(int empresaId, FuncionarioDTO dto, MyDbContext context)
    {
        try
        {
            var empresa = await context.Empresas.FindAsync(empresaId);
            if (empresa is null) return Results.NotFound("Empresa não encontrada.");

            var usuario = await context.Users.FindAsync(dto.UsuarioId);
            if (usuario is null) return Results.NotFound("Usuário não encontrado.");

            var jaExiste = await context.Funcionarios.AnyAsync(f => f.EmpresaId == empresaId && f.UsuarioId == dto.UsuarioId);
            if (jaExiste) return Results.Conflict("Funcionário já cadastrado na empresa.");

            var funcionario = new FuncionarioModel
            {
                UsuarioId = dto.UsuarioId,
                EmpresaId = empresaId
            };

            await context.Funcionarios.AddAsync(funcionario);
            await context.SaveChangesAsync();

            return Results.Created($"/empresa/{empresaId}/funcionarios/{dto.UsuarioId}", dto);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao adicionar funcionário: {e.Message}");
            return Results.Problem("Erro ao adicionar funcionário.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}
