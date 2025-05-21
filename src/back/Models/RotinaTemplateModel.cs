namespace back.Models;

public class RotinaTemplateModel
{

    public RotinaTemplateModel(){}
    
    public int Id { get; set; }
    public string Nome { get; set; }
    public int Empresa { get; set; }
    public int Prioridade { get; set; }
    public string Descricao { get; set; }
    public bool Ativo { get; set; }
}