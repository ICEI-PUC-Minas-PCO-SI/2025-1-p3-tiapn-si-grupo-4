### 3.3.1 Processo 1 – Aluguel de Máquinas

####Oportunidades de melhoria:

- Paralelização de atividades para reduzir tempo de espera.
- Implementação de comunicação com clientes não aprovados.
- Melhor alocação de reunião para garantir melhor tomada de decisões.
 
Modelo AS-IS:

![image](https://github.com/user-attachments/assets/23e768d0-e995-417e-bfe4-8dd06cd7abbd)

Modelo TO-BE:

![image](https://github.com/user-attachments/assets/4bd5bbfc-dfdc-4fef-a621-d7c96b1bc16b)


#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Hora** - campo do tipo hora (hh:mm:ss)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

_* **Tabela** - campo formado por uma matriz de valores_


**Receber solicitação de aluguel**

| **Campo**          | **Tipo**         | **Restrições**       | **Valor default** |
| ---                | ---              | ---                  | ---               |
| nome_cliente       | Caixa de Texto   | obrigatório          |                   |
| documento_cliente  | Caixa de Texto   | CPF ou CNPJ válido   |                   |
| tipo_maquina       | Caixa de Texto   | máquinas solicitadas |                   |
| data_necessaria    | Data             | data futura válida   |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| enviar               | Análise de risco               | default           |
| cancelar             | Fim do processo                | cancel            |

**Nome da atividade 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
