package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

const (
	host         = "34.69.102.226"
	databaseName = "triviattack"
	user         = "root"
	password     = "X_hhZ2;u7J@;GFKv"
)

var mutex = &sync.Mutex{}

type SQLResponse struct {
	Msg []map[string]interface{} `json:"Msg"`
}

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "API for triviattack database")
}

func main() {

	router := mux.NewRouter().StrictSlash(true)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// called by web app client
	router.HandleFunc("/", homeLink)
	router.HandleFunc("/select20Users", select20Users).Methods("GET")

	// CORS Preflight Handler
	router.Methods("OPTIONS").HandlerFunc(corsHandler)

	log.Fatal(http.ListenAndServe(":"+port, router))
}
