# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="02-Especificacao.md">Especificação do projeto</a>.

---

| **Caso de teste**  | **CT-001 – Cadastrar usuário na plataforma**  |
|:---: |:---: |
| Requisito associado | RF-001 - Permitir que o usuário se cadastre na plataforma. |
| Objetivo do teste | Verificar se o usuário consegue realizar seu cadastro na plataforma. |
| Passos | - Acessar o sistema pela URL definida <br> - Clicar em “Cadastrar” ou “Criar Conta” <br> - Preencher os campos obrigatórios (nome, CPF, RG, data de nascimento, e-mail, senha etc.) <br> - Confirmar o cadastro |
| Critério de êxito | - O cadastro é finalizado com sucesso e o sistema redireciona o usuário para a tela de login ou dashboard. |
| Responsável pela elaboração do caso de teste | Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-002 – Realizar login na plataforma**  |
|:---: |:---: |
| Requisito associado | RF-002 - Permitir que o usuário faça login na plataforma. |
| Objetivo do teste | Verificar se o usuário consegue efetuar login após se cadastrar. |
| Passos | - Acessar a tela de login <br> - Preencher os campos de CPF ou e-mail e senha <br> - Clicar em “Entrar” |
| Critério de êxito | - O sistema autentica o usuário e redireciona para o painel da plataforma. |
| Responsável pela elaboração do caso de teste |  Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-003 – Cadastrar rotina ou processo**  |
|:---: |:---: |
| Requisito associado | RF-003 - Os usuários podem cadastrar uma rotina ou processo. |
| Objetivo do teste | Verificar se é possível criar uma nova rotina ou processo no sistema. |
| Passos | - Acessar a dashboard <br> - Selecionar a opção “Nova rotina” ou “Novo processo” <br> - Preencher os campos obrigatórios (nome, descrição etc.) <br> - Confirmar o cadastro |
| Critério de êxito | - A rotina ou processo é exibido na lista de rotinas/processos do usuário. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-004 – Gerenciar tarefas de uma rotina**  |
|:---: |:---: |
| Requisito associado | RF-004 - Alterar, Adicionar e Remover tarefas de sua rotina ou processo. |
| Objetivo do teste | Verificar se o usuário consegue gerenciar tarefas em sua rotina. |
| Passos | - Acessar rotina <br> - Adicionar, editar ou remover tarefa <br> - Salvar |
| Critério de êxito | - Tarefa adicionada, editada ou removida corretamente. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-005 – Adicionar sub-rotinas a uma rotina**  |
|:---: |:---: |
| Requisito associado | RF-005 - Alterar, Adicionar e Remover sub-rotinas/sub-processos a sua rotina ou processo. |
| Objetivo do teste | Verificar se sub-rotinas podem ser gerenciadas dentro de uma rotina. |
| Passos | - Acessar rotina <br> - Clicar em “Adicionar sub-rotina” <br> - Preencher dados e salvar |
| Critério de êxito | - Sub-rotina visível e associada corretamente à rotina principal. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-006 – Iniciar rotina cadastrada**  |
|:---: |:---: |
| Requisito associado | RF-006 - Iniciar uma rotina ou processo cadastrado. |
| Objetivo do teste | Validar se o usuário consegue iniciar uma rotina existente. |
| Passos | - Acessar lista de rotinas <br> - Clicar em “Iniciar” na rotina desejada |
| Critério de êxito | - Status da rotina altera para “Em andamento”. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-007 – Editar rotina em andamento**  |
|:---: |:---: |
| Requisito associado | RF-007 - Alterar uma rotina ou processo em andamento. |
| Objetivo do teste | Verificar se é possível editar dados de uma rotina em execução. |
| Passos | - Acessar rotina em andamento <br> - Clicar em “Editar” <br> - Alterar campos <br> - Salvar alterações |
| Critério de êxito | - Alterações são refletidas corretamente. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-008 – Comentar tarefas e sub-rotinas**  |
|:---: |:---: |
| Requisito associado | RF-008 - Adicionar comentários às tarefas e sub-rotinas/sub-processos. |
| Objetivo do teste | Verificar se é possível comentar em tarefas ou sub-processos. |
| Passos | - Acessar tarefa ou sub-rotina <br> - Digitar comentário <br> - Enviar |
| Critério de êxito | - Comentário salvo e exibido corretamente. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-009 – Visualizar histórico de rotina em andamento**  |
|:---: |:---: |
| Requisito associado | RF-009 - Visualizar o histórico de uma rotina ou processo em andamento. |
| Objetivo do teste | Confirmar se o sistema exibe corretamente as alterações realizadas em rotinas ativas. |
| Passos | - Acessar rotina ativa <br> - Abrir aba ou botão de histórico |
| Critério de êxito | - Histórico mostra modificações com data, hora e responsável. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-010 – Visualizar histórico de rotinas finalizadas**  |
|:---: |:---: |
| Requisito associado | RF-010 - Visualizar o histórico de rotinas e processos finalizados. |
| Objetivo do teste | Verificar se o histórico permanece disponível após a finalização. |
| Passos | - Acessar rotina finalizada <br> - Clicar em “Histórico” |
| Critério de êxito | - Histórico exibido de forma íntegra. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|


<br>

| **Caso de teste**  | **CT-011 – Gerenciar tarefas em rotina em andamento**  |
|:---: |:---: |
| Requisito associado | RF-011 - Alterar, Adicionar e Remover uma tarefa de uma rotina ou processo em andamento. |
| Objetivo do teste | Verificar se o usuário consegue adicionar, editar ou remover uma tarefa enquanto a rotina está em execução. |
| Passos | - Acessar rotina em andamento <br> - Adicionar ou editar uma tarefa <br> - Salvar alterações |
| Critério de êxito | - A tarefa é atualizada ou inserida corretamente na interface e no banco de dados. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-012 – Adicionar sub-rotina em rotina em andamento**  |
|:---: |:---: |
| Requisito associado | RF-012 - Alterar, Adicionar e Remover uma sub-rotina/sub-processo de uma rotina ou processo em andamento. |
| Objetivo do teste | Verificar se é possível gerenciar sub-rotinas mesmo após início da rotina. |
| Passos | - Acessar rotina em andamento <br> - Clicar em “Adicionar sub-rotina” <br> - Preencher dados <br> - Salvar |
| Critério de êxito | - Sub-rotina salva corretamente e refletida na tela da rotina principal. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-013 – Gerenciar recursos de tarefas (rotina criada)**  |
|:---: |:---: |
| Requisito associado | RF-013 - Adicionar e Remover recursos a uma tarefa de uma rotina ou processo. |
| Objetivo do teste | Verificar se é possível atribuir recursos à tarefa ao criar a rotina. |
| Passos | - Criar uma nova rotina com tarefa <br> - Acessar a tarefa <br> - Clicar em “Adicionar recursos” <br> - Selecionar e salvar |
| Critério de êxito | - Recursos são corretamente atribuídos à tarefa e listados. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-014 – Gerenciar recursos de tarefa (rotina em andamento)**  |
|:---: |:---: |
| Requisito associado | RF-014 - Adicionar e Remover recursos a uma tarefa de uma rotina ou processo em andamento. |
| Objetivo do teste | Verificar se o usuário pode alterar recursos após a rotina estar em execução. |
| Passos | - Acessar rotina em andamento <br> - Acessar a tarefa desejada <br> - Adicionar/remover recurso <br> - Confirmar |
| Critério de êxito | - Alterações são refletidas e salvas corretamente. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|

<br>

| **Caso de teste**  | **CT-015 – Gerenciar lista de insumos/recurso do sistema**  |
|:---: |:---: |
| Requisito associado | RF-015 - Alterar, Adicionar e Remover recursos/insumos. |
| Objetivo do teste | Verificar se é possível administrar os recursos disponíveis no sistema. |
| Passos | - Acessar menu de recursos/insumos <br> - Clicar em “Adicionar”, “Editar” ou “Excluir” <br> - Salvar |
| Critério de êxito | - Ações refletem corretamente na lista de recursos disponíveis para tarefas. |
| Responsável pela elaboração do caso de teste | Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-016 – Verificar recursos disponíveis ao iniciar tarefa**  |
|:---: |:---: |
| Requisito associado | RF-016 - Alterar quantidade de recursos/insumos disponíveis ao iniciar uma tarefa. |
| Objetivo do teste | Verificar se ao iniciar a tarefa os insumos são atualizados. |
| Passos | - Atribuir recurso à tarefa <br> - Iniciar tarefa <br> - Verificar saldo no sistema |
| Critério de êxito | - Quantidade do recurso diminui corretamente no estoque. |
| Responsável pela elaboração do caso de teste | Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-017 – Verificar recursos liberados ao finalizar tarefa**  |
|:---: |:---: |
| Requisito associado | RF-017 - Alterar quantidade de recursos/insumos ao finalizar uma tarefa. |
| Objetivo do teste | Validar se os recursos são liberados (ou atualizados) corretamente ao final da tarefa. |
| Passos | - Finalizar tarefa <br> - Verificar atualização do recurso no estoque |
| Critério de êxito | - Quantidade do recurso alterada corretamente conforme lógica definida. |
| Responsável pela elaboração do caso de teste | Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-018 – Bloquear tarefa por falta de recursos**  |
|:---: |:---: |
| Requisito associado | RF-018 - Bloquear tarefa por falta de recursos/insumos. |
| Objetivo do teste | Garantir que o sistema impeça execução de tarefas sem insumos disponíveis. |
| Passos | - Criar tarefa com insumo indisponível <br> - Tentar iniciar execução |
| Critério de êxito | - Sistema bloqueia a tarefa e exibe mensagem de erro. |
| Responsável pela elaboração do caso de teste | Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-019 – Visualizar rotinas com filtros**  |
|:---: |:---: |
| Requisito associado | RF-019 - Visualizar rotinas em execução com filtros por responsável, status, tipo e datas. |
| Objetivo do teste | Verificar se a filtragem de rotinas funciona conforme critérios. |
| Passos | - Acessar lista de rotinas <br> - Aplicar filtros por status, responsável, tipo e datas <br> - Observar os resultados |
| Critério de êxito | - A listagem exibe apenas rotinas que atendem aos critérios de filtro. |
| Responsável pela elaboração do caso de teste | Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-020 – Gerar relatório de tempo**  |
|:---: |:---: |
| Requisito associado | RF-020 - Gerar relatório de tempo. |
| Objetivo do teste | Verificar se o relatório de tempo da rotina é gerado corretamente. |
| Passos | - Acessar rotina concluída <br> - Clicar em “Gerar Relatório de Tempo” |
| Critério de êxito | - Relatório é exibido com tempos parciais e totais corretamente. |
| Responsável pela elaboração do caso de teste | Bernardo Garcia |

<br>

| **Caso de teste**  | **CT-021 – Gerar relatório de insumos**  |
|:---: |:---: |
| Requisito associado | RF-021 - Gerar relatório de insumos. |
| Objetivo do teste | Validar se o sistema gera relatórios com consumo, saldo e movimentação de insumos. |
| Passos | - Acessar módulo de relatórios <br> - Selecionar “Relatório de Insumos” <br> - Definir período ou filtros <br> - Gerar |
| Critério de êxito | - Relatório exibido com informações corretas e exportáveis. |
| Responsável pela elaboração do caso de teste |Bernardo Garcia|
