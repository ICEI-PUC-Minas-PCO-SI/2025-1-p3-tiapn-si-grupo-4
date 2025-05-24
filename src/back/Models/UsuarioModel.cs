// namespace back.Models
// {
//     public class UsuarioModel
//     {
//         public UsuarioModel(string nome)
//         {
//             Nome = nome;
//             Ativo = true;
//         }

//         public int Id { get; init; }
//         public string Nome { get; private set; }
//         public string? Email { get; private set; }
//         public string? CPF { get; private set; }
//         public string? Celular { get; private set; }
//         public int? NivelAcesso { get; private set; }
//         public bool Ativo {  get; private set; }

//         //Métodos Set
//         public void UpdateName(string nome) => Nome = nome;
//         public void UpdateEmail(string? email) => Email = email;
//         public void UpdateCPF(string? cpf) => CPF = cpf;
//         public void UpdateCelular(string? celular) => Celular = celular;
//         public void UpdateNivelAcesso(int? nivelAcesso) => NivelAcesso = nivelAcesso;
//         public void SetInactive() => Ativo = false;
//     }
// }
