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
func createQuiz(w http.ResponseWriter, r *http.Request) {

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
	category := r.URL.Query().Get("category")
	difficulty := r.URL.Query().Get("difficulty")

	newQuizID := idGenerator.Intn(MAX_ID_INT)
	log.Printf("New Quiz ID: %d", newQuizID/16)

	createQuizQuery := fmt.Sprintf("INSERT INTO quiz (quizID) VALUES(%d)", newQuizID)
	rows, err := db.Query(createQuizQuery)

	tenQuestionsQuery := fmt.Sprintf("SELECT questionID FROM question ORDER BY RAND() LIMIT 10")

	if category != "" && difficulty != "" {
		tenQuestionsQuery = fmt.Sprintf("SELECT questionID FROM question WHERE category = %s AND difficulty = %s ORDER BY RAND() LIMIT 10", category, difficulty)
	}

	rows, err = db.Query(tenQuestionsQuery)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// (7)
	var (
		questionID sql.NullInt16
	)
	var users []map[string]interface{}
	userResponse := SQLResponse{users}

	for rows.Next() {
		err := rows.Scan(&questionID)
		if err != nil {
			log.Fatal(err)
		}
		entry := make(map[string]interface{})
		entry["question"] = int(questionID.Int16)
		userResponse.Msg = append(userResponse.Msg, entry)

		correlateQuizQuestionQuery := fmt.Sprintf("INSERT INTO quizQuestions(quizID, questionID) VALUES(%d, %d)", newQuizID, questionID.Int16)
		_, err = db.Query(correlateQuizQuestionQuery)
		if err != nil {
			log.Fatal(err)
		}
	}

	// (8)

	entry := make(map[string]interface{})
	entry["quizID"] = int(newQuizID)
	userResponse.Msg = append(userResponse.Msg, entry)

	// (9)

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
