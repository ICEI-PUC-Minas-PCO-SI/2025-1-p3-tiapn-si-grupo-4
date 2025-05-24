using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace back.Models;

[Index(nameof(Email), Name = "idx_usuario_email", IsUnique = true)]
[Index(nameof(Nome), Name = "idx_usuario_nome")]
[Index(nameof(CPF), Name = "idx_usuario_cpf", IsUnique = true)]
public class UserModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; init; }


    [Required]
    [StringLength(255)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(14)]
    public string CPF { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string Celular { get; set; } = string.Empty;

    public int NivelAcesso { get; set; }

    public Boolean Ativo { get; set; } = true;
}