using back.DTOs;
using back.Entities;
using back.Mappers.ToModel;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

public static class RotinaTemplateController
{
    public static void RotinaTemplateRoutes(this WebApplication app)
    {
        var route = app.MapGroup("Rotina");

        route.MapGet("", async (SqlServerContext context) =>
        {
            var rotinas = await context.RotinaTemplate.ToListAsync();
            return Results.Ok(rotinas);
        });

        route.MapPost("", async (RotinaTemplateCreateDTO createDTO, SqlServerContext context) =>
        {
            var empresa = await context.Empresa.FindAsync(createDTO.EmpresaId.ToString());
            if (empresa == null)
            {
                return Results.BadRequest("Empresa invalida");
            }
            var newRotinaTemplate = MapperRotinaTemplateModel.execute(createDTO);
            var addedRotina = await context.RotinaTemplate.AddAsync(newRotinaTemplate);
            await context.SaveChangesAsync();
            return Results.Ok(addedRotina);
        });
    }
}