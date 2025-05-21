using back.DTOs;
using back.Models;

namespace back.Mappers.ToModel;

public static class MapperRotinaTemplateModel
{
    public static RotinaTemplateModel execute(RotinaTemplateCreateDTO createDto)
    {
        var model = new RotinaTemplateModel();
        model.Nome = createDto.Nome;
        model.Empresa = createDto.EmpresaId;
        model.Descricao = createDto.Descricao;
        model.Prioridade = createDto.Prioridade;
        return model;
    }
}