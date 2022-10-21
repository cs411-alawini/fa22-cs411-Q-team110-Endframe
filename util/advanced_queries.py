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
    """
    explain analyze
    select p.percentCorrect, p.category
    from (select userID, 100*round(avg(isCorrect),2) as percentCorrect, category from response natural join question group by userId, category) as p
    where userID = 1829
    group by p.category
    """
    )
    record = cursor.fetchall()
    for r in record:
        print(r)

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        connection.commit()
        cursor.close()
        connection.close()
        print("MySQL connection is closed")