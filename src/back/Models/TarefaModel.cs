namespace back.Models;

public class TarefaTemplateModel
{
public TarefaTemplateModel(string nome, int prioridade)
{
    Nome = nome;
    Prioridade = prioridade;
    Ativo = true;
}

  public int Id { get; init; }
  public string Nome { get; private set; }
  public int IdRotina { get; set; }
  public int Pai { get; set; }      
  public int? Prioridade { get; private set; }
  public bool Ativo { get; private set; }

  //Métodos Set
  public void UpdateName(string nome) => Nome = nome;
  public void SetInactive() => Ativo = false;
}