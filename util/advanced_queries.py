import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(host='34.69.102.226',
                                        database='triviattack',
                                        user='root',
                                        password='X_hhZ2;u7J@;GFKv')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)


    cursor.execute(
    # Advanced Query 1 (Gets the team(s) the user is on and the other members of that team)
    # """
    # explain analyze
    # select distinct u.Username, t.teamName 
    # from teamMembership m natural join user u natural join team t 
    # where m.teamID in (select teamID from teamMembership m1 where m1.userID = 0006) 
    # group by t.teamName, u.Username 
    # order by t.teamName asc
    # """
    # Advanced Query 2 (Gets the average percent correct per members of a team)
    # """
    # explain analyze
    # select mem.userID, p.percentCorrect, mem.teamID
    # from teamMembership as mem natural join (select userID, 100*round(avg(isCorrect),2) as percentCorrect from response group by userId) as p
    # where mem.userID = p.userID and mem.teamID = 691
    # order by percentCorrect desc
    # """
    # Advanced Query 3 (Gets the average percent correct per member of a category)
    # """
    # explain analyze
    # select p.percentCorrect, p.category
    # from (select userID, 100*round(avg(isCorrect),2) as percentCorrect, category from response natural join question group by userId, category) as p
    # where userID = 1829
    # group by p.category
    # """
    """
    DROP PROCEDURE IF EXISTS get_scores;

    CREATE PROCEDURE get_scores(IN input_userID int)
    BEGIN
    DECLARE varUserID INT;
    DECLARE perCorrect FLOAT;
    DECLARE category VARCHAR(30);
    DECLARE max_user_avg INT;
    DECLARE max_user_cat VARCHAR(30);
    DECLARE exit_loop BOOLEAN DEFAULT FALSE;
    DECLARE members CURSOR FOR (SELECT DISTINCT u.userID FROM teamMembership m NATURAL JOIN user u NATURAL JOIN team t WHERE m.teamID IN (SELECT teamID FROM teamMembership m1 WHERE m1.userID = input_userID));
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
    DROP TABLE IF EXISTS FinalTable;
    CREATE TABLE FinalTable(
                        userID int Primary Key,
                        category varchar(30),
                        avg_score double
                        );

    (SELECT MAX(ran.percentCorrect), ran.category
    INTO max_user_avg, max_user_cat
    FROM (SELECT p.percentCorrect, p.category
            FROM
                (SELECT userID, 100*round(avg(isCorrect),2) AS percentCorrect, category
                FROM response NATURAL JOIN question
                GROUP BY userId, category) AS p
        WHERE userID = input_userID
        GROUP BY p.percentCorrect, p.category) AS ran
    GROUP BY ran.category);
        

    OPEN members;
    cloop: LOOP
        FETCH members INTO varUserID;
        IF(exit_loop) THEN
            LEAVE cloop;
        END IF;

        (SELECT MAX(ran.percentCorrect), ran.category
        INTO perCorrect, category
        FROM (SELECT p.percentCorrect, p.category
                FROM
                    (SELECT userID, 100*round(avg(isCorrect),2) AS percentCorrect, category
                    FROM response NATURAL JOIN question
                    GROUP BY userId, category) AS p
            WHERE userID = varUserID
            GROUP BY p.percentCorrect, p.category) AS ran
        GROUP BY ran.category);
        

        IF (category = max_user_cat AND perCorrect > max_user_avg) THEN
            INSERT INTO FinalTable VALUES (varUserID, category, perCorrect);
        END IF;

    END LOOP cloop;
    CLOSE members;
    SELECT * FROM FinalTable;
    END;
    """
    )
    # record = cursor.fetchall()
    # for r in record:
    #     print(r)

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        connection.commit()
        cursor.close()
        connection.close()
        print("MySQL connection is closed")