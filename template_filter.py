import sql
import datetime
import time
import math

#date format YYYY-MM-DD HH:MM:SS

def calDate(date: str):
    nowTime = datetime.datetime.now()
    s1 = date.split(" ")
    s2 = [s1[0].split("-"),s1[1].split(":")]
    temp = 0
    s = [0]*6

    for i in range(0,2):
        for j in range(0,3):
            s[temp] = int(s2[i][j])
            temp += 1

    datetimeDate = datetime.datetime(s[0],s[1],s[2],s[3],s[4],s[5])

    nowTimeSeconds = time.mktime(nowTime.timetuple())
    datetimeDateSeconds = time.mktime(datetimeDate.timetuple())

    if ((nowTimeSeconds-datetimeDateSeconds)/60/60/24>=1):
        if ((nowTimeSeconds-datetimeDateSeconds)/60/60/24>=2):
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60/24)} days ago"
        else: 
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60/24)} day ago"
    elif ((nowTimeSeconds-datetimeDateSeconds)/60/60>=1):
        if ((nowTimeSeconds-datetimeDateSeconds)/60/60>=2):
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60)} hours ago"
        else: 
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60)} hour ago"
    elif ((nowTimeSeconds-datetimeDateSeconds)/60>=1):
        if ((nowTimeSeconds-datetimeDateSeconds)/60>=2):
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60)} mins ago"
        else: 
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60)} min ago"
    else: 
        return "Less than a min ago"