namespace back.DTOs
{
    public class TarefaExecucaoCreateDTO
    {
        public int IdTarefa { get; set; }
        public string Nome { get; private set; }
        public string Descricao { get; private set; }     
        public bool FoiExecutada { get; private set; }   
        public int? DataInicio { get; private set; }   
        public int? DataFim { get; private set; }
    }
}
