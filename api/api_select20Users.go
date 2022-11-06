package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func select20Users(w http.ResponseWriter, r *http.Request) {

	mutex.Lock()
	enableCors(&w)
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", user, password, host, databaseName)
	db, err := sql.Open("mysql", dsn)

	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec(fmt.Sprintf("USE %s", databaseName))
	if err != nil {
		log.Fatal(err)
	}

	/*
		userID INT NOT NULL,
		password VARCHAR(30) NOT NULL,
		Username VARCHAR(30) NOT NULL,
		profilePicURL VARCHAR(2083),
		PRIMARY KEY(userID)
	*/
	rows, err := db.Query("SELECT * FROM user LIMIT 20")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var (
		userID        sql.NullInt16
		password      sql.NullString
		username      sql.NullString
		profilePicURL sql.NullString
	)

	var users []map[string]interface{}
	userResponse := SQLResponse{users}

	for rows.Next() {
		err := rows.Scan(&userID, &password, &username, &profilePicURL)
		if err != nil {
			log.Fatal(err)
		}
		entry := make(map[string]interface{})
		entry["userID"] = int(userID.Int16)
		entry["password"] = string(password.String)
		entry["Username"] = string(username.String)
		if profilePicURL.Valid {
			entry["profilePicURL"] = string(profilePicURL.String)
		}
		userResponse.Msg = append(userResponse.Msg, entry)
		// log.Printf("user id %v: password: %v username: %v\n", userID, password, username)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	u, err := json.Marshal(userResponse)
	if err != nil {
		panic(err)
	}
	w.Write(u)

	mutex.Unlock()
}
