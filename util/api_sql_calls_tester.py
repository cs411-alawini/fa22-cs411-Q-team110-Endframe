import mysql.connector
import random
from datetime import datetime
from datetime import timedelta
from mysql.connector import Error


def random_date(start, end):
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start + timedelta(seconds=random_second)

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
        print("You're connected to database: ", record[0])


    ### is response table formatted correctly and print table headers
    query = """
    CALL get_scores(1055);
    """

    # query = """
    
    
    # """
    cursor.execute(query)
    colInfo = cursor.description
    print("colNames: " + str([col[0] for col in colInfo]))
    results = cursor.fetchall()
    for result in results:
        print(result)

    ### get users that belong to multiple groups
    # usersInMultipleGroupsCmd = "select distinct mem.userID from teamMembership mem where (select count(mem1.teamID) from teamMembership mem1 where mem.userID = mem1.userID) > 2"
    # cursor.execute(usersInMultipleGroupsCmd)
    # users = cursor.fetchall()
    # for user in users:
    #     print(user[0])


    '''
    for a given username, get the members' names of all the teams to which they belong and the names of the teams. group the members by group.

    select distinct u.Username, t.teamName
    from teamMembership m natural join user u natural join team t
    where teamID in (select teamID from teamMembership m1 where m1.userID = 0001)
    group by m.teamName
    order by t.teamName asc

    for a given team, get all the members of that team (usernames) ordered by the member's percent correct rate

    select mem.Username, percentCorrect
    from teamMembership mem natural join (select userID, 100*round(avg(resp.isCorrect),2) as percentCorrect from response resp)
    where mem.teamID = 0002
    order by percentCorrect desc

    for a given user, calculate the percent correct by category 

    select percentCorrect, q.category
    from (select questionID, userID, 100*round(avg(resp.isCorrect),2) as percentCorrect from response resp) natural join question q
    where userID = 0001
    group by q.category
    '''

   
            
            

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        connection.commit()
        cursor.close()
        connection.close()
        print("MySQL connection is closed")