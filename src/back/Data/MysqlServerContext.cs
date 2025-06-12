using Microsoft.EntityFrameworkCore;
using back.Models;
using DotNetEnv;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace back.Entities;

public partial class MyDbContext : DbContext
{
    public DbSet<LogModel> Logs { get; set; }
    public DbSet<EmpresaModel> Empresas { get; set; }
    public DbSet<RotinaTemplateModel> RotinaTemplates { get; set; } 
    public DbSet<UserModel> Users { get; set; } 
    public DbSet<LoginModel> Login { get; set; } 
    public DbSet<TarefaTemplateModel> TarefaTemplates { get; set; } 
    public DbSet<TarefaModel> Tarefas { get; set; }
    public DbSet<FuncionarioModel> Funcionarios { get; set; }


    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            DotNetEnv.Env.Load();
            var host = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "db";
            var port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "3306";
            var database = Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "routix";
            var user = Environment.GetEnvironmentVariable("DATABASE_USER") ?? "routix";
            var password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "1234"; 

            var connectionString = $"Server={host};Port={port};Database={database};User Id={user};Password={password};";
            Console.WriteLine($"Connection String: {connectionString}");
            optionsBuilder.UseMySql(
                connectionString,
                new MySqlServerVersion(new Version(8, 0, 21)),
                mySqlOptions => mySqlOptions.SchemaBehavior(MySqlSchemaBehavior.Ignore)
            );
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RotinaTemplateModel>().ToTable("TEMPLATE_ROTINAS", "dbo");
        modelBuilder.Entity<EmpresaModel>().ToTable("EMPRESAS", "dbo");
        modelBuilder.Entity<LogModel>().ToTable("LOGS", "dbo");
        modelBuilder.Entity<UserModel>().ToTable("USERS", "dbo");
        modelBuilder.Entity<LoginModel>().ToTable("LOGIN", "dbo");
        modelBuilder.Entity<TarefaTemplateModel>().ToTable("TAREFA_TEMPLATES", "dbo"); 
        modelBuilder.Entity<TarefaModel>().ToTable("TAREFAS", "dbo");

            modelBuilder.Entity<RotinaTemplateModel>()
        .HasOne(r => r.Empresa)
        .WithMany() // ou .WithMany(e => e.Rotinas) se tiver navegação reversa
        .HasForeignKey(r => r.EmpresaId);

        base.OnModelCreating(modelBuilder);
    }
}