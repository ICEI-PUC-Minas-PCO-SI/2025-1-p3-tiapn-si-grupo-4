namespace back.Models
{
    public class FuncionarioModel
    {
        public int Id { get; init; }
        public int UsuarioId { get; set; }
        public int EmpresaId { get; set; }

        //Métodos Set
        public void UpdateUser(int usuarioId) => UsuarioId = usuarioId;
        public void UpdateEmpresa(int empresaId) => EmpresaId = empresaId; 

    }
}
