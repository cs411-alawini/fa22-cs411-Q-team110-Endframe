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
//TESTS: DONE
func createResponse(w http.ResponseWriter, r *http.Request) {

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
	questionID := r.URL.Query().Get("questionID")
	quizID := r.URL.Query().Get("quizID")
	userID := r.URL.Query().Get("userID")
	userResponse := r.URL.Query().Get("userResponse")

	newResponseID := idGenerator.Intn(MAX_ID_INT)

	answerQuery := fmt.Sprintf("SELECT answer FROM question where questionID = %s", questionID)

	rows, err := db.Query(answerQuery)
	if err != nil {
		log.Println(err)
		errResp := make(map[string]interface{})
		errResp["Msg"] = "error"
		errResp["Body"] = err
		u, err := json.Marshal(errResp)
		if err != nil {
			panic(err)
		}
		w.Write(u)
		mutex.Unlock()
		return

	}
	defer rows.Close()

	// (7)
	var (
		actualAnswer sql.NullString
	)
	var answers []string

	for rows.Next() {
		err := rows.Scan(&actualAnswer)
		if err != nil {
			log.Fatal(err)
		}
		answers = append(answers, actualAnswer.String)
	}

	entry := make(map[string]interface{})
	if len(answers) == 0 {
		answers = append(answers, "None")
	}

	dist := computeLevenshteinPercentage(answers[0], userResponse)
	errRate := computeLevenshteinValue(answers[0], userResponse)
	var isCorrect bool
	if dist > 90 || errRate < 2 {
		isCorrect = true
	} else {
		isCorrect = false
	}

	createQuizQuery := fmt.Sprintf("INSERT INTO response (responseID, isCorrect, quizID, questionID, userID) VALUES(%d,%t,%s,%s,%s)",
		newResponseID, isCorrect, quizID, questionID, userID)
	rows, err = db.Query(createQuizQuery)
	if err != nil {
		log.Println(err)
		errResp := make(map[string]interface{})
		errResp["Msg"] = "error"
		errResp["Body"] = err
		u, err := json.Marshal(errResp)
		if err != nil {
			panic(err)
		}
		w.Write(u)
		mutex.Unlock()
		return

	}

	// (8)

	// (9)

	// (10)
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	// (11)

	entry["actualAnswer"] = answers[0]
	entry["userAnswer"] = userResponse
	entry["isCorrect"] = isCorrect
	var objs []map[string]interface{}
	httpResponse := SQLResponse{objs}
	httpResponse.Msg = append(httpResponse.Msg, entry)
	u, err := json.Marshal(httpResponse)
	if err != nil {
		panic(err)
	}

	// (12)
	w.Write(u)
	mutex.Unlock()

	// (13)

}
