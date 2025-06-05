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

  [Required]
  [ForeignKey("idTarefa")]
  public TarefaModel Tarefa { get; set; }

  [Required]
  [StringLength(255)]
  public string Nome { get; set; }

  [Required]
  [StringLength(255)]
  public string Descricao { get; set; }

  [Required]
  public bool FoiExecutada { get; set; }

  [Column(TypeName = "date")]
  public DateTime? DataInicio { get; set; }

  [Column(TypeName = "date")]
  public DateTime? DataFim { get; set; }

//   //Métodos Set
//   public void SetDataInicio(DateTime? dataInicio) => DataInicio = dataInicio;
//   public void SetDataFim(DateTime? dataFim) => DataFim = dataFim;
//   public void UpdateName(string nome)
//   {
//     if (string.IsNullOrWhiteSpace(nome))
//     {
//       throw new ArgumentException("O nome da tarefa não pode ser vazio ou nulo.", nameof(nome));
//     }
//     Nome = nome;
//   }

//   public void UpdateDescricao(string descricao)
//   {
//     if (descricao == null)
//     {
//       throw new ArgumentNullException(nameof(descricao), "A descrição não pode ser nula.");
//     }
//     Descricao = descricao;
//   }
//   public void SetExecutada()
//   {
//     FoiExecutada = true;
//     DataFim = DateTime.Now; // Ou DateTime.UtcNow, não sei o que funciona
//   }

//   public void SetNaoExecutada()
//   {
//     FoiExecutada = false;
//     DataFim = null;
//   }
}