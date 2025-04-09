### 3.3.1 Processo 1 – Aluguel de Máquinas

#### Oportunidades de melhoria:

- Paralelização de atividades para reduzir tempo de espera.
- Implementação de comunicação com clientes não aprovados.
- Melhor alocação de reunião para garantir melhor tomada de decisões.
 
Modelo AS-IS:

![image](https://github.com/user-attachments/assets/23e768d0-e995-417e-bfe4-8dd06cd7abbd)

Modelo TO-BE:

![image](https://github.com/user-attachments/assets/4bd5bbfc-dfdc-4fef-a621-d7c96b1bc16b)

#### Detalhamento das atividades

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

**Analisar risco do cliente**

| **Campo**          | **Tipo**      | **Restrições**     | **Valor default** |
| ---                | ---           | ---                | ---               |
| possui_dividendos  | Seleção única | Verdadeiro / Falso |                   |
| dividendo_de_risco | Seleção única | Verdadeiro / Falso |                   |
| resultado_análise  | Seleção única | Verdadeiro / Falso |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| aprovar              | Atividade/processo de destino  | default           |
| reprovar             | Fim do processo                | default           |
