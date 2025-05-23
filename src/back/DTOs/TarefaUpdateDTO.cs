namespace back.DTOs
{
    public class TarefaUpdateDTO
    {
        public string Nome { get; private set; }
        public int Pai { get; set; }      
        public int? Prioridade { get; private set; }
        public bool Ativo { get; private set; }
    }
}
