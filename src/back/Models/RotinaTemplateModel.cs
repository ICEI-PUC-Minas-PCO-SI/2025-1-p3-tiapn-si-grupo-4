/*
CREATE TABLE TEMPLATE_ROTINA (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Empresa INT NOT NULL,
    Prioridade INT,
    Descricao VARCHAR(255),
    Ativo BIT DEFAULT 1,
    FOREIGN KEY (Empresa) REFERENCES EMPRESA(ID)
);
CREATE INDEX idx_template_rotina_nome ON TEMPLATE_ROTINA(Nome);
*/

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace back.Models;

[Index(nameof(Nome), Name = "idx_template_rotina_nome")]
public class RotinaTemplateModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public string Nome { get; set; } = string.Empty;
    
    public int EmpresaId { get; set; }
    public EmpresaModel Empresa { get; set; }
    
    public int Prioridade { get; set; }
    
    public string Descricao { get; set; }
    
    public bool Ativo { get; set; }
    
    public ICollection<TarefaTemplateModel> TarefasTemplates { get; private set; } =  new List<TarefaTemplateModel>();
}
