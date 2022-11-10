package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

/*
	Every api function will have the same structure:
	1) a function header that looks like: funcName(w http.ResponseWriter, r *http.Request)
		This is implementing the http(s) interface for when we make REST calls to the backend
	2) mutex.Lock()
		Eliminates race conditions for multiple accesses to the server (basically the Locking stuff we learned in class)
	3) enableCors(&w)
		Allows this api to be accessed from a web browser by allowing any domain to request our API. Its not
		very secure, but its not like we have crazy data that needs protection
	4) Code to open the database connection with error checking
	5) Code to set the database to triviattack
	6) Execute the actual SQL query
	7) setting up the variables that we want to read from the database (if its a select statement, not for insert/update/delete)
	8) Declare (but not populate) the response structure that we will turn into json and serve with our api
	9) Iterate through the rows of the select statement and add them to the structure from (8)
	10) Error checking
	11) Marshal the structure into a json object
	12) write the json to our http response
	13) unlock the mutex so other api calls can occur

*/

//(1)
//TESTS: DONE, use qid=820
func getQuestionText(w http.ResponseWriter, r *http.Request) {

	// (2)
	mutex.Lock()

	// (3)
	enableCors(&w)

	// (4)
	// dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", user, password, host, databaseName)
	db, err := connectWithConnector()

	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	// (5)
	_, err = db.Exec(fmt.Sprintf("USE %s", databaseName))
	if err != nil {
		log.Fatal(err)
	}

	// (6)

	qid := r.URL.Query().Get("qid")
	getQuestionTextQuery := fmt.Sprintf("SELECT questionText FROM question WHERE questionID = %s", qid)
	rows, err := db.Query(getQuestionTextQuery)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// (7)
	var (
		questionText sql.NullString
	)

	// (8)
	var users []map[string]interface{}
	userResponse := SQLResponse{users}

	// (9)
	for rows.Next() {
		err := rows.Scan(&questionText)
		if err != nil {
			log.Fatal(err)
		}
		entry := make(map[string]interface{})
		entry["questionText"] = string(questionText.String)

		userResponse.Msg = append(userResponse.Msg, entry)
		// log.Printf("user id %v: password: %v username: %v\n", userID, password, username)
	}

	// (10)
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	// (11)
	u, err := json.Marshal(userResponse)
	if err != nil {
		panic(err)
	}

	// (12)
	w.Write(u)

	// (13)
	mutex.Unlock()
}
