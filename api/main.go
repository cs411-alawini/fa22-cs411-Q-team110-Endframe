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
	router.HandleFunc("/getUser", getUser).Methods("GET")
	router.HandleFunc("/getQuiz", getQuiz).Methods("GET")
	router.HandleFunc("/getStats", getStats).Methods("GET")
	router.HandleFunc("/createQuiz", createQuiz).Methods("POST")
	router.HandleFunc("/submitAnswer", createResponse).Methods("POST")
	router.HandleFunc("/updateUsername", updateUsername).Methods("PUT")
	router.HandleFunc("/getQuestionText", getQuestionText).Methods("GET")
	router.HandleFunc("/getTeamMembers", getTeamMembers).Methods("GET")
	router.HandleFunc("/getTeamStats", getTeamStats).Methods("GET")
	router.HandleFunc("/deleteUserFromTeam", deleteUserFromTeam).Methods("DELETE")

	// CORS Preflight Handler
	router.Methods("OPTIONS").HandlerFunc(corsHandler)

	log.Println("Listening on port: " + port)

	log.Fatal(http.ListenAndServe(":"+port, router))
}
