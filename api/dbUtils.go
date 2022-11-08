package main

import (
	"database/sql"
	"fmt"
)

func connectWithConnector() (*sql.DB, error) {
	// mustGetenv := func(k string) string {
	// 	v := os.Getenv(k)
	// 	if v == "" {
	// 		log.Fatalf("Warning: %s environment variable not set.", k)
	// 	}
	// 	return v
	// }
	// Note: Saving credentials in environment variables is convenient, but not
	// secure - consider a more secure solution such as
	// Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
	// keep secrets safe.
	var (
		dbUser = "root"             // e.g. 'my-db-user'
		dbPwd  = "X_hhZ2;u7J@;GFKv" // e.g. 'my-db-password'
		dbName = "triviattack"      // e.g. 'my-database'
		// instanceConnectionName = "endframe:us-central1:endframe-data" // e.g. 'project:region:instance'
		// usePrivate             = ""
		dbHost = "34.69.102.226"
	)

	// d, err := cloudsqlconn.NewDialer(context.Background())
	// if err != nil {
	// 	return nil, fmt.Errorf("cloudsqlconn.NewDialer: %v", err)
	// }
	// mysql.RegisterDialContext("cloudsqlconn",
	// 	func(ctx context.Context, addr string) (net.Conn, error) {
	// 		if usePrivate != "" {
	// 			return d.Dial(ctx, instanceConnectionName, cloudsqlconn.WithPrivateIP())
	// 		}
	// 		return d.Dial(ctx, instanceConnectionName)
	// 	})

	dbURI := fmt.Sprintf("%s:%s@tcp(%s)/%s",
		dbUser, dbPwd, dbHost, dbName)

	dbPool, err := sql.Open("mysql", dbURI)
	if err != nil {
		return nil, fmt.Errorf("sql.Open: %v", err)
	}
	return dbPool, nil
}
