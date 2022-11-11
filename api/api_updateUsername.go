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
//TESTS: DONE, use userID=2, newUsername = whatever
func updateUsername(w http.ResponseWriter, r *http.Request) {

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
	username := r.URL.Query().Get("newUsername")
	userID := r.URL.Query().Get("userID")

	query := fmt.Sprintf("SELECT Username FROM user WHERE userID = %s", userID)
	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var (
		oldUsername sql.NullString
	)
	// (9)
	for rows.Next() {
		err := rows.Scan(&oldUsername)
		if err != nil {
			log.Fatal(err)
		}
	}
	// (6)

	updateUserQuery := fmt.Sprintf("UPDATE user SET Username = '%s' WHERE userID = %s", username, userID)
	rows, err = db.Query(updateUserQuery)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// (8)
	var users []map[string]interface{}
	userResponse := SQLResponse{users}
	entry := make(map[string]interface{})
	entry["newUsername"] = string(username)
	entry["oldUsername"] = string(oldUsername.String)
	userResponse.Msg = append(userResponse.Msg, entry)

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