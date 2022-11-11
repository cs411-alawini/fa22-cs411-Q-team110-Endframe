# Q-team110-Endframe

Stage 1:
Project Proposal in /doc/CS411-ProjectProposal.pdf

Stage 2:
Relational Schema and ER Diagram in /doc/Stage2 - UML_ER and Relational Schema.pdf

Stage 3:
Database implementation details and indexing analysis in /doc/Stage 3 - Database Implementation and Indexing.pdf
advanced queries script in /util/advanced_queries.py
data generation for the various tables in /util/data_generation.py
index creation testing in /util/create_indices.py
testing script in /util/api_sql_calls_tester.py

Stage 4:
Prerequisites:
 1. Make sure the endframe triviattack database instance is up and running on GCP. 
 2. Make sure your computer's IP address has been allow-listed to access the mySQL instance on GCP
 3. Clone this git repo
 4. Make sure you have installed Golang 1.18 and Node.js and npm

Running the back end locally:
 1. Navigate to fa22-cs411-Q-team110-Endframe\api\ in a terminal
 2. execute: 
    >> go run main
 3. You may have to allow Golang to run the .exe it compiled

Running the front end locally:
 1. Navigate to fa22-cs411-Q-team110-Endframe\client\triviattack in a separate terminal
 2. execute:
    >>npm start
 3. Go to localhost:3000 in your favorite browser 
