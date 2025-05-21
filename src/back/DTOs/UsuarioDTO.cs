namespace back.DTOs
{
    public class UsuarioDTO
    {
        public string Nome { get; set; }
        public string? Email { get; set; }
        public string? CPF { get; set; }
        public string? Celular { get; set; }
        public int? NivelAcesso { get; set; }
        public bool? Ativo { get; set; }
    }
}
