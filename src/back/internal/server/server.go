package server

import (
	"net/http"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/handlers"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/usecases"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/impl/repositories"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
	ginlogrus "github.com/toorop/gin-logrus"
)

type app struct {
	s *http.Server
	q *store.Queries
	//handlers
	helloHandler *handlers.HelloHandler
}

func NewApp(httpServer *http.Server, queries *store.Queries) *app {

	//setup repositories
	logRepository := repositories.NewMysqlLogRepository(queries)

	//seutp usecases
	helloUsecase := &usecases.HttpHelloUsecase{
		LogRepository: logRepository,
	}

	return &app{
		s:            httpServer,
		helloHandler: handlers.NewHelloHandler(helloUsecase),
		q:            queries,
	}
}

func (a *app) Run(port string) error {

	router := gin.New()

	router.Use(
		ginlogrus.Logger(logrus.StandardLogger()),
		gin.Recovery(),
		gin.Logger(),
	)

	//setuphandlers
	router.GET("/hello", a.helloHandler.Get)

	a.s.Addr = ":" + port
	a.s.Handler = router

	if err := a.s.ListenAndServe(); err != nil {
		logrus.Printf("%s", err.Error())
		return err
	}
	return nil
}
