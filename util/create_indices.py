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
    # """
    # create index teamnameIndex
    # on team (teamName)
    # """

    """
    create index responseIndex
    on response (isCorrect);
    """
    # create index questionIndex
    # on question (category);
    # """

    # """
    # drop index questionIndex on question
    # """
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