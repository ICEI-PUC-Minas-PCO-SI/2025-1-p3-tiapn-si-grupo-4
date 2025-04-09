# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS)

### Processo 1 - Aluguel de Máquinas:

![image](https://github.com/user-attachments/assets/97971174-d859-4a5d-b74b-2c3707f25dfa)

#### Gargalos encontrados:

- O check-up das máquinas somente é realizado após o recebimento do contrato assinado, criando uma janela para atraso se não estiver tudo ok com as mesmas após confirmação do cliente sobre o aluguel.

- Caso o dividendo seja considerado como risco, não é realizado contato com o cliente. Aumentando a frustração do mesmo e prejudicando a fidelização.

- Somente é realizada reunião sobre o escopo do projeto após recebimento do contrato assinado pelo cliente, diminuindo a flexibilidade administrativa na tomada de decisões.

### Processo 2 - Troca de Peças:

![image](https://github.com/user-attachments/assets/2510bc89-fc11-43f0-a34e-d36ddeea6c9b)

#### Gargalos encontrados:

- Tarefa de buscar peça para troca e informar o administrativo sobre falta da mesma delegada ao mecânico, diminuindo produtividade de mão de obra especializada.

- Mecânico solicita a peça que está em falta, porém não existe um controle proativo de estoque para minimizar futuras ocorrências.

## Descrição geral da proposta (Modelagem TO BE)

### Processo 1 - Aluguel de Máquinas:

![image](https://github.com/user-attachments/assets/c60a333b-daa3-4c52-bddd-6ceb971814bc)

#### Melhorias implementadas:

- Criado fluxo paralelo de verificação das máquinas e rotina administrativa para mais agilidade.

- Incrementado feedback para o cliente informando sobre a decisão de não continuar com a solicitação caso sejam encontrados dividendos e os mesmos sejam considerados de risco.

- Reunião sobre o escopo do projeto foi movida para antes do envio de contrato, possibilitando assim uma melhor tomada de decisões.

### Processo 2 - Troca de Peças:

![image](https://github.com/user-attachments/assets/78e310ab-99cd-4f25-8f89-123b51d30a00)

#### Melhorias implementadas:

- Delegado função de verificar estoque para setor de almoxarifado, liberando o mecânico para outras tarefas enquanto aguarda a compra e entrega da peça.

- Almoxarifado solicita um reestoque da peça em falta ao invés de comprar somente a quantidade necessária, diminuindo a necessidade de diversos contatos com os fornecedores.

- O administrativo transfere a peça comprada para o almoxarifado antes do recebimento do mecânico, facilitando assim o controle de estoque.

Nossa proposta visa diminuir atrasos, remover inconsistências, e otimizar tarefas. Possibilitando assim um maior controle dos processos do negócio.

## Modelagem dos processos

[PROCESSO 1 - Nome do processo](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Nome do processo](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")

## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de reclamações | Avaliar quantitativamente as reclamações | Percentual de reclamações em relação ao total de atendimentos | Tabela Reclamações | número total de reclamações / número total de atendimentos |
| Taxa de requisições atendidas | Melhorar a prestação de serviços medindo a porcentagem de requisições atendidas| Mede a % de requisições atendidas na semana | Tabela Solicitações | (número de requisições atendidas / número total de requisições) * 100 |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues | Mede % de material entregue dentro do mês | Tabela Pedidos | (número de pedidos entregues / número total de pedidos) * 100 |


Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
