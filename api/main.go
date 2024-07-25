package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/cors"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	DB = getDB()
	router := http.NewServeMux()
	router.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})
	router.HandleFunc("GET /days/{id}", GetDayById)
	router.HandleFunc("POST /days/{topic}", PostDay)

	handler := ChainMiddleware(router,
		Logger(), // recoverer already included from RequestLogger by default
		cors.AllowAll().Handler,
		// middleware.Auth, // TODO: need auth server. --> go-chi/oauth can make server
	)
	port := "0.0.0.0:8080"
	s := http.Server{Addr: port, Handler: handler}

	fmt.Printf("Server running on port %s\n", port)
	s.ListenAndServe()

}
