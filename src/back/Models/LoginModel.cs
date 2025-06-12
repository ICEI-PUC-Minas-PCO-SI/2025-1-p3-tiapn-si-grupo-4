// -- Tabela LOGIN
// CREATE TABLE LOGIN (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     Login VARCHAR(255) NOT NULL,
//     Senha VARCHAR(255) NOT NULL,
//     Usuario INT NOT NULL,
//     FOREIGN KEY (Usuario) REFERENCES USUARIO(ID) ON DELETE CASCADE
// );


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back.Models;

public class LoginModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; init; }

    [Required]
    [StringLength(255)]
    public string Login { get; set; } = string.Empty;

    [Required]
    [StringLength(255)]
    public string Senha { get; set; } = string.Empty;

    [Required]
    [ForeignKey("UsuarioID")]
    public required UserModel Usuario { get; set; }

}