# Especificação do projeto

As personas representam perfis fictícios baseados em usuários reais que podem interagir com a aplicação. Elas são elaboradas para entender melhor as necessidades, desafios e objetivos do público-alvo, auxiliando no desenvolvimento de soluções mais eficazes e alinhadas com a realidade dos usuários.

## Personas

#1: Giovanna tem 19 anos , trabalha como técnica de farmácia e cursa fisioterapia. Portadora de diabetes tipo 1 (insulinódependant) desde 8 anos de idade. Busca melhorar seus hábitos de vida, aprendendo melhor quanto de insulina reguladora aplicar antes de comer. E precisa de uma plataforma para isto.

#2: Augusto, 23 anos, estudante de engenharia e irmão do Lucas, uma criança de 12 anos que sofre com sobrepeso e diabetes tipo 2. Augusto é o responsável pelo irmão em grande parte do tempo e está sempre em busca de auxiliar a mãe no máximo possível cuidando do pequeno. Se preocupa em levar o irmão ao médico uma vez por mês, preparar suas refeições e monitorar as atividades físicas do irmão, Augusto está sempre atrás de dicas e artigos para executar corretamente o controle glicemico e hormonal do irmão, além de zelar pela nutrição e perda de peso, já que se tratado corretamente, o caso de Lucas pode regredir bastante.

#3: Rafael, 25 anos, estudante de medicina da USP, buscava um tema relevante para seu trabalho final da faculdade. Tendo sempre muito interesse na área de endocrinologia e suas complexidades, deu ênfase ao estudo da diabetes.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO |PRECISO |PARA |
|--------------------|-------------------------------------|----------------------------------------|
|Giovanna|Aprender quanto de insulina reguladora aplicar antes de comer|Melhorar seus hábitos de vida e manter um melhor controle glicêmico|
|Augusto|Encontrar dicas e artigos para controle glicêmico e hormonal do meu irmão|Auxiliar nos cuidados com ele, garantindo nutrição e controle do peso para reverter a condição|
|Rafael|Pesquisar sobre diabetes para meu trabalho final de faculdade|Aprofundar meus conhecimentos na área de endocrinologia e suas complexidades|

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID      | Descrição do Requisito | Prioridade |
|---------|------------------------|------------|
| RF-001  | Permitir que o usuário se cadastre no site | ALTA |
| RF-002  | Permitir que o usuário faça login na plataforma | ALTA |
| RF-003  | Os usuários podem registrar suas refeições, incluindo alimentos consumidos, quantidade e horário | ALTA |
| RF-004  | Alterar, Adicionar e Remover alimentos de sua refeição | ALTA |
| RF-005  | Cálculo de bolus alimentar e bolus de correção e sua somatória | ALTA |
| RF-006  | A aplicação fornece dicas personalizadas com base nas informações do usuário | MÉDIA |
| RF-007  | Pesquisar alimentos do site/app | ALTA |
| RF-008  | Interação entre os usuários do site | BAIXA |
| RF-009  | Avaliação entre os usuários do site | BAIXA |
| RF-010  | Opiniões entre os usuários do site | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A Aplicação vai rodar o tempo todo | ALTA |
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA |
|RNF-003| Vai armazenar os dados do usuário | ALTA |
|RNF-004| Exibir os conteúdos a partir dos dados do usuário | ALTA |
|RNF-005| Carregar tela de aplicação no menor tempo possível | ALTA |

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido       |

## Diagrama de casos de uso

![image](https://github.com/user-attachments/assets/46026b82-b7f7-4a6c-8955-5ef64fcd9a96)

