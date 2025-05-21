# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](images/arquitetura.png)

## Diagrama de classes

![Diagrama de Classes](images/routixClasse.png "Diagrama de Classes")

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

##  Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam realizar o cadastro de dados e os controles associados aos processos identificados, assim como suas recuperações.

Utilizando a notação do DER (Diagrama Entidade-Relacionamento), elabore um modelo, usando alguma ferramenta, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar também o controle de acesso dos usuários (partes interessadas nos processos) de acordo com os papéis definidos nos modelos do processo de negócio.

Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos.

### Modelo ER

O Modelo ER representa, por meio de um diagrama, como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

![Modelo Relacional Peter Chen](images/DB_PeterChenPNG.png "ER Peter Chen")

### Esquema relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 

![Modelo Relacional Pé de Galinha](images/DB_PeDeGalinhaPNG.png "ER Pé de Galinha")
---

### Modelo físico

Insira aqui o script de criação das tabelas do banco de dados.

Veja um exemplo:

```sql
CREATE TABLE EMPRESA(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	CNPJ VARCHAR(20),
	Ativo BOOLEAN DEFAULT TRUE,
	INDEX idx_empresa_nome (Nome),
	INDEX idx_empresa_cpnj (CNPJ)
);

CREATE TABLE TEMPLATE_ROTINA(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	Empresa INT NOT NULL,
	Prioridade INT,
	Descricao VARCHAR(255),
	Ativo BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (Empresa) REFERENCES EMPRESA(ID),
	INDEX idx_template_rotina_nome (Nome)
);

CREATE TABLE TEMPLATE_TAREFA(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	Rotina INT NOT NULL,
	Pai INT,
	Prioridade INT,
	Ativo BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (Rotina) REFERENCES TEMPLATE_ROTINA(ID) ON DELETE CASCADE,
	FOREIGN KEY (Pai) REFERENCES TEMPLATE_TAREFA(ID) ON DELETE CASCADE,
	INDEX idx_template_tarefa_nome (Nome)
);

CREATE TABLE INSUMO(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	Descricao INT NOT NULL,
	Tarefa INT NOT NULL,
	FOREIGN KEY (Tarefa) REFERENCES TEMPLATE_TAREFA(ID) ON DELETE CASCADE,
	INDEX idx_insumo_nome (Nome)
);

CREATE TABLE TAREFA(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Tarefa INT NOT NULL,
	Nome VARCHAR(255) NOT NULL,
	Foi_Executada TINYINT(1),
	DataInicio DATE,
	DataFim Date,
	FOREIGN KEY (Tarefa) REFERENCES TEMPLATE_TAREFA(ID)
	INDEX idx_tarefa_data_inicio (DataInicio),
	INDEX idx_tarefa_data_fim (DataFim)
);

CREATE TABLE ROTINA(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Rotina INT NOT NULL,
	Nome VARCHAR(255) NOT NULL,
	Descricao VARCHAR(255),
	DataInicio DATE,
	DataFim DATE,
	FOREIGN KEY (Rotina) REFERENCES TEMPLATE_ROTINA(ID),
	INDEX idx_rotina_nome (Nome),
	INDEX idx_rotina_data_inicio (DataInicio),
	INDEX idx_rotina_data_fim (DataFim)
);

CREATE TABLE USUARIO(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	Email VARCHAR(255),
	CPF VARCHAR(20),
	Celular VARCHAR (20),
	Nivel_Acesso INT,
	Ativo BOOLEAN DEFAULT TRUE,
	INDEX idx_usuarui_nome (Nome),
	INDEX idx_usuario_email (Email),
	INDEX idx_usuario_cpf (CPF)
);

CREATE TABLE LOGIN(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Login VARCHAR(255) NOT NULL,
	Senha VARCHAR(255) NOT NULL,
	Usuario INT NOT NULL,
	FOREIGN KEY (Usuario) REFERENCES USUARIO(ID) ON DELETE CASCADE,
	INDEX idx_login_login (Login)
);

CREATE TABLE COMENTARIO(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Rotina INT NOT NULL,
	Usuario INT NOT NULL,
	Texto VARCHAR(255) NOT NULL,
	Pai INT,
	DataComentario DATE,
	FOREIGN KEY (Rotina) REFERENCES ROTINA(ID) ON DELETE CASCADE,
	FOREIGN KEY (Usuario) REFERENCES USUARIO(ID) ON DELETE SET NULL,
	FOREIGN KEY (Pai) REFERENCES COMENTARIO(ID),
	INDEX idx_comentario_data (DataComentario)
);

CREATE TABLE ACAO(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Descricao VARCHAR(255) NOT NULL
);

CREATE TABLE LOGS(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Tabela VARCHAR(255) NOT NULL,
	IdItem INT NOT NULL,
	DataLog DATE NOT NULL,
	Acao INT NOT NULL,
	ValorAnterior JSON,
	ValorPosterior JSON,
	Usuario INT NOT NULL,
	FOREIGN KEY (Acao) REFERENCES ACAO(ID),
	FOREIGN KEY (Usuario) REFERENCES USUARIO(ID),
	INDEX idx_logs_tabela (Tabela)
);

CREATE TABLE FUNCIONARIO(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	Usuario INT NOT NULL,
	Empresa INT NOT NULL,
	FOREIGN KEY (Usuario) REFERENCES USUARIO(ID),
	FOREIGN KEY (Empresa) REFERENCES EMPRESA(ID)
);
```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias

Descreva qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | HTML + CSS + JS + React |
| Back-end       | Node.js         |
| SGBD           | MySQL           |
| Deploy         | Vercel          |


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software

Conceituar qualidade é uma tarefa complexa, mas ela pode ser vista como um método gerencial que, por meio de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto do desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem atendidas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, esse nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software. Com base nessas características e nas respectivas subcaracterísticas, identifique as subcaracterísticas que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software, considerando alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão à equipe avaliar os objetos de interesse.

> **Links úteis**:
> - [ISO/IEC 25010:2011 - Systems and Software Engineering — Systems and Software Quality Requirements and Evaluation (SQuaRE) — System and Software Quality Models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de software - Engenharia de Software](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209)
