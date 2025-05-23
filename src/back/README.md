Abaixo está a documentação simplificada para executar seu projeto, incluindo o banco de dados e as migrações, usando Docker Compose.

---

## Como Rodar o Projeto com Docker Compose e Migrações EF Core

Este guia mostra como configurar e executar seu projeto .NET, MySQL e migrações do EF Core usando Docker Compose.

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados.

### 1. Estrutura de Arquivos

Seus arquivos devem estar organizados da seguinte forma:

```
seu-projeto/
├── .env
├── docker-compose.yml
├── Dockerfile          # Para o serviço 'app'
├── Dockerfile.migrations # Para o serviço 'migrations'
├── src/
│   └── back/           # Seu projeto .NET (onde está o back.csproj)
│       └── back.csproj
│       └── ... (demais arquivos do projeto)
└── .db/                # Diretório para persistir os dados do MySQL
    └── service-core-db/
```

### 2. Configurações Necessárias

#### a. Arquivo `.env`

Crie um arquivo `.env` na raiz do seu projeto (no mesmo nível do `docker-compose.yml`) com as credenciais do seu banco de dados:

```ini
DATABASE_PASSWORD=123456789
DATABASE_NAME=routix
DATABASE_USER=routix
# Use 'db' para o host do banco de dados quando dentro do Docker Compose
DATABASE_HOST=db
DATABASE_PORT=3306
```

#### b. Dockerfile do Serviço `app` (`Dockerfile`)

Este `Dockerfile` é para a sua aplicação principal. Ele foca apenas em construir e rodar o app.

```dockerfile
# Estágio de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY back.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Estágio final (runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "back.dll"]
```

#### c. Dockerfile do Serviço `migrations` (`Dockerfile.migrations`)

Este `Dockerfile` é dedicado à execução das migrações do EF Core. Ele inclui as ferramentas necessárias.

```dockerfile
# Usa a imagem do SDK para ter as ferramentas de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS migrator

WORKDIR /app

# Copia o arquivo de projeto e restaura as dependências
COPY back.csproj .
RUN dotnet restore

# Instala a ferramenta global dotnet-ef
RUN dotnet tool install --global dotnet-ef --version 8.0.*

# Adiciona o diretório de ferramentas ao PATH
ENV PATH="${PATH}:/root/.dotnet/tools"

# Copia o restante do código fonte
COPY . .

# Comando para rodar as migrações
ENTRYPOINT ["dotnet", "ef", "database", "update", "--project", "back.csproj"]
```

#### d. `docker-compose.yml`

Este arquivo orquestra seus serviços (banco de dados, migrações, aplicação e PhpMyAdmin).

```yaml
services:
  db:
    image: mysql:latest
    container_name: db
    ports:
      - ${DATABASE_PORT:-3306}:3306
    volumes:
      - ./.db/service-core-db:/var/lib/mysql
    networks:
      - service-core-backend
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "${MYSQL_USER}", "-p${MYSQL_PASSWORD}"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      MYSQL_ROOT_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_DATABASE: ${DATABASE_NAME}
      MYSQL_USER: ${DATABASE_USER}
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}

  migrations:
    build:
      context: . # Onde buscar os arquivos (assumindo a raiz do projeto)
      dockerfile: Dockerfile.migrations
    container_name: migrations
    depends_on:
      db:
        condition: service_healthy # Garante que o DB esteja pronto
    environment:
      - DATABASE_HOST=db # O nome do serviço do banco de dados no Docker
      - DATABASE_PORT=${DATABASE_PORT}
      - DATABASE_NAME=${DATABASE_NAME}
      - DATABASE_USER=${DATABASE_USER}
      - DATABASE_PASSWORD=${DATABASE_PASSWORD}
    networks:
      - service-core-backend

  app:
    build: . # Usará o Dockerfile padrão
    container_name: app
    ports:
      - "3000:3000"
    depends_on:
      migrations:
        condition: service_completed_successfully # Garante que as migrações rodaram
    environment:
      - DATABASE_HOST=db # O nome do serviço do banco de dados no Docker
      - DATABASE_PORT=${DATABASE_PORT}
      - DATABASE_NAME=${DATABASE_NAME}
      - DATABASE_USER=${DATABASE_USER}
      - DATABASE_PASSWORD=${DATABASE_PASSWORD}
    networks:
      - service-core-backend

  mysqladmin:
    image: phpmyadmin/phpmyadmin:latest
    restart: unless-stopped
    container_name: mysqladmin
    depends_on:
      db:
        condition: service_healthy
    ports:
      - 8081:80
    networks:
      - service-core-backend
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      PMA_USER: ${DATABASE_USER}
      PMA_PASSWORD: ${DATABASE_PASSWORD}

networks:
  service-core-backend:
    driver: "bridge"

volumes:
  mysql_data:
    driver: local
```

### 3. Executando o Projeto

Abra o terminal na **raiz do seu projeto** (onde estão `docker-compose.yml`, `Dockerfile`, `.env` etc.) e execute o seguinte comando:

```bash
docker compose up --build
```

Este comando fará o seguinte:

1.  **Construirá** as imagens dos seus serviços (`app` e `migrations`).
2.  **Iniciará** o serviço `db` (seu MySQL).
3.  **Aguardará** até que o `db` esteja saudável.
4.  **Iniciará** o serviço `migrations`, que executará `dotnet ef database update` para aplicar suas migrações.
5.  **Aguardará** que o serviço `migrations` termine com sucesso.
6.  **Iniciará** o serviço `app` (sua aplicação .NET).
7.  **Iniciará** o `mysqladmin` (PhpMyAdmin) após o `db` estar saudável.

Se você precisar apenas rodar o banco de dados e as migrações (sem iniciar a aplicação principal), você pode usar:

```bash
docker compose up db migrations
```

---

Dessa forma, todo o ciclo de vida do seu ambiente de desenvolvimento será gerenciado pelo Docker Compose, garantindo que suas migrações sejam aplicadas antes que a aplicação tente se conectar ao banco de dados.