namespace back.Models;

public class TarefaModel
{
public TarefaModel(string nome,string descricao)
  {
    Nome = nome;
    Descricao = descricao; 
  }

  public int Id { get; init; }
  public int IdTarefa { get; set; }
  public string Nome { get; private set; }
  public string Descricao { get; private set; }     
  public bool FoiExecutada { get; private set; }   
  public int? DataInicio { get; private set; }   
  public int? DataFim { get; private set; }

  //Métodos Set
  public void UpdateName(string nome) => Nome = nome;
}