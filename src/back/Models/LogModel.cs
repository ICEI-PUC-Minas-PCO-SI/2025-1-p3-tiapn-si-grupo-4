namespace back.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class LogModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public DateTime DataHora { get; set; }
    
    public string Tabela { get; set; } = string.Empty;
    
    public int Operacao { get; set; }
    
    public string ValorAnterior { get; set; } = string.Empty;
    
    public string ValorPosterior { get; set; } = string.Empty;
}
