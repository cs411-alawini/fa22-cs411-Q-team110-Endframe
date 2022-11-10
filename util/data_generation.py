from time import process_time_ns
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

        ## Show number of elements in each table
        # command = "show tables"
        # cursor.execute(command)
        # results = cursor.fetchall()
        # for row in results:
        #     getTopResCmd = "select count(*) from {table}".format(table=row[0])
        #     cursor.execute(getTopResCmd)
        #     topElements = cursor.fetchall()
        #     print("table {table} has {numel} elements".format(table=row[0], numel = topElements[0][0]))


        ### Create relationship tables
        # getQuestionsCmd = "select * from question"
        # cursor.execute(getQuestionsCmd)
        # questions = cursor.fetchall()

        # getQuizzesCmd = "select * from quiz"
        # cursor.execute(getQuestionsCmd)
        # quizzes = cursor.fetchall()

        getUsersCmd = "select * from user"
        cursor.execute(getUsersCmd)
        users = cursor.fetchall()

        getTeamsCmd = "select * from team"
        cursor.execute(getTeamsCmd)
        teams = cursor.fetchall()

        # getMembershipCmd = "select * from teamMembership limit 20"
        # cursor.execute(getMembershipCmd)
        # memberships = cursor.fetchall()
        # colInfo = cursor.description
        # print("colNames: " + str([col[0] for col in colInfo]))


        # for membership in memberships:
        #     print(membership)

        
        ### generate relationship tables teamMembership
        counter = 0
        for team in teams:
            print("iter " + str(counter))
            userNums = random.sample(range(0,len(users)), random.sample(range(1,11), 1)[0]) # number of users per team = between 1 and 10
            for ix in userNums:
                new_userID = users[ix][0]
                print("(userID, teamID) values ({userID},{teamID})".format(userID = new_userID, teamID = team[0]))
                populateTeamCmd = "insert into teamMembership (userID, teamID) values ({userID},{teamID})".format(userID = new_userID, teamID = team[0])
                cursor.execute(populateTeamCmd)
            counter = counter + 1
        
        # ## generate response data
        # getQuizzesCmd = "select quizID from quiz"
        # cursor.execute(getQuizzesCmd)
        # quizzes = cursor.fetchall()

        # getUsersCmd = "select userID from user"
        # cursor.execute(getUsersCmd)
        # users = cursor.fetchall()

        # # # pick 500 unique random quizzes
        # # N = 500
        # # quizNums = random.sample(range(0,len(quizzes)), N)
        # userNums = [1829,2784,3304,3900,4734,218,2402,29,2921,3572,3899,4335,939 ]
        # quizNums = range(0,len(userNums))
        # # #pick 500 unique random users
        # # userNums = random.sample(range(0,len(users)), N)
        
        # counterID = 0
        # for ix in range(0,len(userNums)): #len(userNums) should be replaced with N
        #     print(ix)
        #     userIx = userNums[ix]
        #     quizIx = quizNums[ix]
        #     # res = get the questionIDs that have that quizID (select questionID from quizQuestions where quizID = quiz.id)
        #     getQuestionsCmd = "select questionID from quizQuestions where quizID = {quizID}".format(quizID = quizzes[quizIx][0])
        #     cursor.execute(getQuestionsCmd)
        #     questIDs = cursor.fetchall()
        #     for questID in questIDs:
        #         d1 = datetime.strptime('1/1/2019 1:30 PM', '%m/%d/%Y %I:%M %p')
        #         d2 = datetime.strptime('10/18/2022 4:50 AM', '%m/%d/%Y %I:%M %p')
        #         now = random_date(d1, d2)
        #         formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
        #         # print(formatted_date)
        #         # responseCreateCommand = "insert into response (responseID, quizID, questionID, userID, isCorrect, date) values ({quizID}, {questionID}, {userID}, {correctness}, {date})".format(quizID = quizzes[quizIx][0],questionID = questID[0],userID = users[userIx][0],correctness = random.randrange(2),date = formatted_date)
        #         # cursor.execute(responseCreateCommand)

        #         cursor.execute("insert into response (responseID, quizID, questionID, userID, isCorrect, date) values (%s, %s, %s, %s, %s, %s)", (counterID, quizzes[quizIx][0],questID[0],users[userIx][0], random.randrange(2),formatted_date))
        #         counterID = counterID + 1


        ### generate quizQuestions relationship table
        # counter = 0
        # for quiz in quizzes:
        #     print(counter)
        #     qNums = random.sample(range(0,len(questions)), 10) # number of questions per quiz = 10
        #     for ix in qNums:
        #         qID = questions[ix][0]
        #         makeQuizCmd = "insert into quizQuestions (quizID, questionID) values ({quizID},{questionID})".format(quizID = quiz[0], questionID = qID)
        #         cursor.execute(makeQuizCmd)
        #     counter = counter + 1

    '''
    [('user1829', 'group691'), 
    ('user2784', 'group691'), 
    ('user3304', 'group691'), 
    ('user3900', 'group691'), 
    ('user4734', 'group691'), 
    ('user6', 'group691'), 
    ('user218', 'group94'), 
    ('user2402', 'group94'), 
    ('user29', 'group94'), 
    ('user2921', 'group94'), 
    ('user3572', 'group94'), 
    ('user3899', 'group94'), 
    ('user4335', 'group94'), 
    ('user6', 'group94'), 
    ('user939', 'group94')]


    (userID, teamID) values (1289,1)
    (userID, teamID) values (1345,1)
    (userID, teamID) values (491,1)
    (userID, teamID) values (1697,1)
    
    '''
                
            

            
            

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        connection.commit()
        cursor.close()
        connection.close()
        print("MySQL connection is closed")