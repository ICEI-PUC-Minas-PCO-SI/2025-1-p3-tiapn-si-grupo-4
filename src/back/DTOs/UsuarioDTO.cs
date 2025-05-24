namespace back.DTOs;

public class UsuarioDTO
{
    public required string Nome { get; set; }
    public required string Email { get; set; }
    public required string CPF { get; set; }
    public required string Celular { get; set; }

    public int? NivelAcesso { get; set; }
}

public class UsuarioCreateDTO
{
    public required string Nome { get; set; }
    public required string Email { get; set; }
    public required string CPF { get; set; }
    public required string Celular { get; set; }

    public required string Password { get; set; }
}