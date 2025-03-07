package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"time"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/server"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

func main() {

	rootPath, err := filepath.Abs("") // Volta dois níveis (de `cmd/main/` para raiz)
	if err != nil {
		logrus.Fatalf("Erro ao determinar o caminho raiz: %v", err)
	}

	// Carregar o arquivo .env na raiz do projeto
	envPath := filepath.Join(rootPath, ".env")
	err = godotenv.Load(envPath)
	if err != nil {
		logrus.Fatalf("Erro ao carregar o arquivo .env: %v", err)
	}

	if err := godotenv.Load("../../"); err != nil {
		logrus.Warn("Arquivo .env não encontrado, utilizando variáveis de ambiente do sistema")
	}

	appEnv := os.Getenv("APP_ENV")
	if appEnv == "dev" {
		os.Setenv("DATABASE_HOST", "localhost")
	}

	user := os.Getenv("DATABASE_USER")
	pass := os.Getenv("DATABASE_PASSWORD")
	host := os.Getenv("DATABASE_HOST")
	port := os.Getenv("DATABASE_PORT")
	name := os.Getenv("DATABASE_NAME")
	connstring := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?parseTime=true",
		user,
		pass,
		host,
		port,
		name,
	)
	db, err := sql.Open("mysql", connstring)
	if err != nil {
		logrus.Error(err)
		panic(err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		panic(err)
	}

	queries := store.New(db)

	if err := db.Ping(); err != nil {
		panic(err)
	}

	app := server.NewApp(&http.Server{
		ReadTimeout:    15 * time.Second,
		WriteTimeout:   15 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}, queries)

	if err := app.Run("3000"); err != nil {
		logrus.Fatalf("%s", err.Error())
	}

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
}
