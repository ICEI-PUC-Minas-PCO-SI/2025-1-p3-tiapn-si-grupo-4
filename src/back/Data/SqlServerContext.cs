using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Entities;

public class SqlServerContext : DbContext
{
    //para cada tabela/model adicionar um DbSet<Model>
    public DbSet<ExempleModel> Exemple { get; set; }
    public DbSet<UsuarioModel> Usuario { get; set; }
    public DbSet<FuncionarioModel> Funcionario { get; set; }

    public SqlServerContext(DbContextOptions<SqlServerContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Opcional: manter como fallback, mas idealmente a configuração vem do construtor
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=master;User Id=sa;Password=Routix123321!;");
        }
        base.OnConfiguring(optionsBuilder);
    }
}