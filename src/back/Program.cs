using back.Controllers;
using back.Entities;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>();

builder.Services.AddScoped<service.AuthService>();

var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? "A_VERY_LONG_AND_SECURE_KEY_FOR_PRODUCTION_MINIMUM_32_BYTES";
var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "yourdomain.com";
var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "youraudiencedomain.com";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

Console.WriteLine(Env.GetString("FRONT_URL") ?? "ERROOOOO");

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "front-origin", policy =>
    {
        policy.WithOrigins(Environment.GetEnvironmentVariable("FRONT_URL") ?? "").AllowAnyHeader().AllowAnyMethod();
    });
});

    builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUser", policy =>
        policy.RequireAuthenticatedUser());

    options.AddPolicy("AdminRole", policy =>
        policy.RequireRole("Admin"));
});

var app = builder.Build();

app.UseCors("front-origin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.AuthRoutes();
app.UsuarioRoutes(); 
app.HelloRoutes();
app.TarefaRoutes();
app.TarefaTemplateRoutes();
app.RotinaTemplateRoutes();
app.RotinaRoutes();

 app.LogRoutes(); // Uncomment if you have this defined as well

app.Run("http://localhost:3000");