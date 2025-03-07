
![header](https://capsule-render.vercel.app/api?type=venom&color=auto&height=400&section=header&text=Teste%20VR&fontSize=90&rotate=10)

![go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)![mysql](https://img.shields.io/badge/MySQL-316192?style=for-the-badge&logo=mysql&logoColor=white)

# Mellitus Backend

# Execução 

```shell 
make up && make logs
```

# Desenvolvimento

Aplicação backend de uma plataforma de healthcare para todas as pessoas portadoras da doença Diabetes Mellitus , tipo 1 e tipo 2. Com ferramentas para contagem de carboidratos e informações para melhoria da qualidade de vida do diabético e daqueles que buscam se prevenir e garantir a qualidade de vida..

Utiliza `sqlc` para gerar as interfaces das entidades das tabelas dos bancos de dados (não é um ORM) e as queries SQL.
Utiliza o `migrate` para criar e executar as migations.


## Go generate

Executa os comandos declarados em `gen.go`
```go
package gen 


//go:generate go run ./cmd/tools/terndotenv/main.go
//go:generate sqlc generate -f ./internal/store/mysqlstore/sqlc.yml
```
```shell
go generate ./...
```

## Migrations
Utiliazando o tern para criar migrações, mas para executar com o ambiente local do docker pelo arquivo .env
utiliza o `os\exec` do go para rodar comandos no ambiente

```shell
go run ./main.go migrate ***nome da migration***
```



## Queries

Usa `sqlc` para gerar as queries

```shell
sqlc generate -f ./internal/store/mysqlstore/sqlc.yml
```



#### Install all deps:
```shell
go mod tidy
```

**migrate**
```shell
go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```



- **sqlc**
```shell
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
```


## __Observação__
É necessário criar o arquivo .env na raiz do projeto e na pasta service core com as variáveis de ambiente necessárias
ex.:
```.env
DATABASE_PORT=3306
DATABASE_USER="mysql"
DATABASE_PASSWORD="123456789"
DATABASE_NAME="melitus"
DATABASE_HOST="service-core-db"
```

E é necessario adicionar as variaveis de ambiente pois o tern não adiciona automaticamente do arquivo .env

1. Exportar as Variáveis Manualmente no Terminal
Antes de executar o comando do Tern, você pode exportar as variáveis de ambiente manualmente no terminal. No Linux ou Mac, use o comando export:


```bash
export DATABASE_PORT=3306
export DATABASE_USER="user"
export DATABASE_PASSWORD="123456789"
export DATABASE_NAME="melitus"
export DATABASE_HOST="service-core-db"
```

no linux 

### Comandos principais
***Rodando o container***
```shell
make up
```
___(ou com logs)___
```shell
MODE=l make up
```
```shell
make up && make logs
```

***Logs***
>Com o container já de pé ele vai acoplar o terminal ao terminal de logs do docker.

```shell
make logs
```

Restart
> Reinicia o container
```shell
make restart
```

Parar
>Encerra a execução da aplicação
```shell
make down
```


## Dev dependencies

AIR (live reload do go)
```
go install github.com/air-verse/air@latest 
```
### Comandos do projeto
Compilar os arquivo do sqlc
```shell
go gen ./...
```

Criar uma nova migration

```shell
migrate create -ext sql -dir ./internal/store/store/migrations -seq *nome da migration*
```


## Testes

### Service Core
Executar testes service core
```shell
make test-service-core
```