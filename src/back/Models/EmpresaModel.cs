namespace back.Models;

public class EmpresaModel
{
    public EmpresaModel(string nome, string cnpj)
    {
        Nome = nome;
        Cnpj = cnpj;
    }
    public string id { get; init; }
    public string? Nome { get; private set; }
    public string? Cnpj { get; private set; }
    public bool Ativo { get; private set; }

    public void UpdateName(string nome) => Nome = nome;
    public void UpdateEmail(string? email) => Email = email;
    public void UpdateCPF(string? cnpj) => Cnpj = cnpj;
    public void SetInactive() => Ativo = false;
    
}