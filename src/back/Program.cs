using back.Controllers;
using back.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<SqlServerContext>(provider =>
{
    var configuration = provider.GetRequiredService<IConfiguration>();
    var connectionString = configuration.GetConnectionString("LocalHost");
    
    var optionsBuilder = new DbContextOptionsBuilder<SqlServerContext>();
    optionsBuilder.UseSqlServer(connectionString);
    
    return new SqlServerContext(optionsBuilder.Options);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ExempleRoutes();
app.EmpresaRoutes();
app.RotinaTemplateRoutes();

app.UseHttpsRedirection();
app.Run();
