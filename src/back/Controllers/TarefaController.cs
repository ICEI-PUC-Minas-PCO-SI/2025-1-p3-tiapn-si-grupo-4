using back.DTOs;
using back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using back.Entities;

namespace back.Controllers;

public static class TarefaController
{
    public static void TarefaRoutes(this WebApplication app)
    {
        var route = app.MapGroup("tarefa").RequireAuthorization("AuthenticatedUser");

        route.MapGet("", GetAllTarefas);
        route.MapGet("{id:int}", GetTarefaById);
        route.MapPost("", CreateTarefa);
        route.MapPut("{id:int}", UpdateTarefa);
        route.MapDelete("{id:int}", DeleteTarefa);

        route.MapGet("filtrar", FiltrarTarefas);
    }

    private static async Task<IResult> GetAllTarefas(MyDbContext context)
    {
        try
        {
            var tarefas = await context.Tarefas.ToListAsync();
            return Results.Ok(tarefas);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar tarefas: {e.Message}");
            return Results.Problem("Ocorreu um erro ao buscar as tarefas.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetTarefaById(int id, MyDbContext context)
    {
        try
        {
            var tarefa = await context.Tarefas.FindAsync(id);
            if (tarefa == null)
                return Results.NotFound($"Tarefa com ID {id} não encontrada.");

            return Results.Ok(tarefa);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar tarefa por ID: {e.Message}");
            return Results.Problem($"Ocorreu um erro ao buscar a tarefa com ID {id}.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> CreateTarefa(TarefaDTO req, MyDbContext context)
    {
        try
        {
            var tarefa = new TarefaModel
            {
                // IdTarefa = req.IdTarefa,
                Nome = req.Nome,
                Descricao = req.Descricao,
                FoiExecutada = req.FoiExecutada,
                DataInicio = req.DataInicio,
                DataFim = req.DataFim
            };

            await context.Tarefas.AddAsync(tarefa);
            await context.SaveChangesAsync();
            return Results.Created($"/tarefa/{tarefa.ID}", tarefa);
        }
        catch (ArgumentException e)
        {
            return Results.BadRequest(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao criar tarefa: {e.Message}");
            return Results.Problem("Ocorreu um erro ao criar a tarefa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> UpdateTarefa(int id, TarefaDTO req, MyDbContext context)
    {
        try
        {
            var tarefa = await context.Tarefas.FindAsync(id);
            if (tarefa == null)
                return Results.NotFound($"Tarefa com ID {id} não encontrada.");

            // tarefa.UpdateName(req.Nome);
            // tarefa.UpdateDescricao(req.Descricao);

            // if (req.FoiExecutada)
            // {
            //     tarefa.SetExecutada();
            // }
            // else
            // {
            //     tarefa.SetNaoExecutada();
            // }

            // if (req.DataInicio.HasValue)
            // {
            //     tarefa.SetDataInicio(req.DataInicio.Value);
            // }
            // else
            // {
            //     tarefa.SetDataInicio(null);
            // }

            // if (req.DataFim.HasValue)
            // {
            //     tarefa.SetDataFim(req.DataFim.Value);
            // }
            // else
            // {
            //     tarefa.SetDataFim(null);
            // }

            await context.SaveChangesAsync();
            return Results.Ok(tarefa);
        }
        catch (ArgumentException e)
        {
            return Results.BadRequest(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao atualizar tarefa: {e.Message}");
            return Results.Problem("Ocorreu um erro ao atualizar a tarefa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> DeleteTarefa(int id, MyDbContext context)
    {
        try
        {
            var tarefa = await context.Tarefas.FindAsync(id);
            if (tarefa == null)
                return Results.NotFound($"Tarefa com ID {id} não encontrada.");

            context.Tarefas.Remove(tarefa);
            await context.SaveChangesAsync();
            return Results.NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao excluir tarefa: {e.Message}");
            return Results.Problem("Ocorreu um erro ao excluir a tarefa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> FiltrarTarefas([AsParameters] TarefaFiltroDTO filtro, MyDbContext context)
    {
        try
        {
            var query = context.TarefaTemplates
                .Include(t => t.Rotina)
                    .ThenInclude(r => r.Empresa)
                .AsQueryable();

            if (filtro.EmpresaId is not null)
            {
                query = query.Where(t => t.Rotina.EmpresaId == filtro.EmpresaId);
            }

            if (filtro.RotinaId is not null)
            {
                query = query.Where(t => t.IdRotina == filtro.RotinaId);
            }

            var tarefas = await query.Select(t => new
                {
                    t.ID,
                    t.Nome,
                    Rotina  = t.Rotina.Nome,
                    Empresa = t.Rotina.Empresa.Nome
                })
                .ToListAsync();

            return Results.Ok(tarefas);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao filtrar tarefas: {e.Message}");
            return Results.Problem("Ocorreu um erro ao filtrar as tarefas.",
                                   statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}