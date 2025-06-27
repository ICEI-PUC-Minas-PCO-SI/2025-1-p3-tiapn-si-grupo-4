// using back.DTOs;
// using back.Entities;
// using back.Models;
// using Microsoft.EntityFrameworkCore;

// namespace back.Controllers
// {
//     public static class FuncionarioController
//     {
        
//         public static void FuncionarioRoutes(this WebApplication app)
//         {
//             var route = app.MapGroup("funcionario");

//             route.MapGet("", async (MyDbContext context) =>
//             {
//                 try
//                 {
//                     var funcionarios = await context.Funcionarios.ToListAsync();
//                     return Results.Ok(funcionarios);
//                 }
//                 catch (Exception e)
//                 {
//                     Console.WriteLine(e);
//                     return Results.Problem(e.Message);
//                 }
//             });

//             route.MapPost("",
//                 async (FuncionarioDTO req, MyDbContext context) =>
//                 {
//                     try
//                     {
//                         var funcionario = new FuncionarioModel();
//                         if (req.UsuarioId > 0)
//                         {
//                             funcionario.UpdateUser(req.UsuarioId);
//                         }
//                         if (req.EmpresaId > 0)
//                         {
//                             funcionario.UpdateEmpresa(req.EmpresaId);
//                         }
//                         await context.AddAsync(funcionario);
//                         await context.SaveChangesAsync();
//                         return Results.Ok();
//                     }
//                     catch (Exception e)
//                     {
//                         Console.WriteLine(e);
//                         return Results.Problem(e.Message);
//                     }
//                 });

//             route.MapPut("{id:int}", async (int id, FuncionarioDTO req, SqlServerContext context) =>
//             {
//                 try
//                 {
//                     var funcionario = await context.Funcionario.FindAsync(id);
//                     if (funcionario == null)
//                         return Results.NotFound();

//                     if (req.UsuarioId > 0)
//                     {
//                         funcionario.UpdateUser(req.UsuarioId);
//                     }
//                     if (req.EmpresaId > 0)
//                     {
//                         funcionario.UpdateEmpresa(req.EmpresaId);
//                     }

//                     await context.SaveChangesAsync();
//                     return Results.Ok(funcionario);
//                 }
//                 catch (Exception e)
//                 {
//                     Console.WriteLine(e);
//                     return Results.Problem(e.Message);
//                 }
//             });

//             route.MapDelete("{id:int}", async (int id, SqlServerContext context) =>
//             {
//                 try
//                 {
//                     var funcionario = await context.Funcionario.FindAsync(id);
//                     if (funcionario == null)
//                         return Results.NotFound();
//                     context.Funcionario.Remove(funcionario);
//                     await context.SaveChangesAsync();
//                     return Results.Ok();
//                 }
//                 catch (Exception e)
//                 {
//                     Console.WriteLine(e);
//                     return Results.Problem(e.Message);
//                 }
//             });
//         }
//     }
// }
