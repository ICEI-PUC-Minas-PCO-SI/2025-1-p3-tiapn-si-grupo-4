using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using back.DTOs;
using back.Entities;
using back.Models;   
using dto;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using service; 

namespace back.Controllers;

public static class AuthController
{
    public static void AuthRoutes(this WebApplication app)
    {
        var authGroup = app.MapGroup("/auth");

        authGroup.MapPost("/login", (
            LoginRequest request,
            AuthService authService,
            IConfiguration configuration
        ) =>
        {
            try
            {
                var usuario = authService.Autenticar(request.Login, request.Senha);

                if (usuario == null)
                    return Results.Unauthorized();

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured."));

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.ID.ToString()),
                    new Claim(ClaimTypes.Name, usuario.Nome),
                    new Claim(ClaimTypes.Email, usuario.Email)               
                };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                    Issuer = configuration["Jwt:Issuer"] ?? throw new InvalidOperationException("JWT Issuer not configured."),
                    Audience = configuration["Jwt:Audience"] ?? throw new InvalidOperationException("JWT Audience not configured.")
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Results.Ok(new
                {
                    Token = tokenString,
                    User = new
                    {
                        usuario.ID,
                        usuario.Nome,
                        usuario.Email,
                        usuario.NivelAcesso
                    }
                });
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Erro de configuração JWT: {ex.Message}");
                return Results.Problem("Erro de configuração do servidor. Contate o administrador.", statusCode: StatusCodes.Status500InternalServerError);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro durante o login: {e.Message}");
                return Results.Problem("Ocorreu um erro inesperado durante o login.", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        // authGroup.MapPost("/signup", ...);
    }
}