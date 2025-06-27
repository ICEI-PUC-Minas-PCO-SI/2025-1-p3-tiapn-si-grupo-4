using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
namespace back.Models;

public class TarefaModel
{

  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int ID { get; init; }

  [ForeignKey("TarefaID")]
  public int? TarefaID { get; set; }
  
  public int IdRotina { get; set; }
  
  [Required]
  [ForeignKey("IdRotina")]
  public virtual RotinaModel Rotina { get; set; } = null!;

  [Required]
  [StringLength(255)]
  public string Nome { get; set; } = "";

  [Required]
  [StringLength(255)]
  public string Descricao { get; set; } = "";

  [Required]
  public bool FoiExecutada { get; set; }

  [Column(TypeName = "date")]
  public DateTime? DataInicio { get; set; }

  [Column(TypeName = "date")]
  public DateTime? DataFim { get; set; }
  
  public int Prioridade { get; set; }
}