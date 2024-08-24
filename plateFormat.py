import RPi.GPIO as GPIO
import time
from datetime import datetime
from datetime import timedelta
import mysql.connector

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)


#numberPlate = "I3 SKCI"
#numberPlate = "WRIB LZO"


#opens mySQL database
mydb = mysql.connector.connect(host="localhost", user="db_user", password="gateOpenPass1", database="gateProject")
mycursor = mydb.cursor()

def cleanUp():
    #deletes all entries more than a week old week been changed to month
    y = 0
    lastWeek = (datetime.today()) - timedelta(days=30)
    mycursor.execute("SELECT entryDate FROM dailyEntries")
    myresult = mycursor.fetchall()
    for x in myresult:
        y += 1
        modRow = str(x)[2:]
        modRow = modRow[:-3]
        modRow = datetime.strptime(modRow, '%d/%m/%y')
        if lastWeek > modRow:
            mycursor.execute("DELETE FROM dailyEntries WHERE entryID = "+str(y))
            mydb.commit()

    #reorganises the entryID so it goes 1, 2, 3, etc
    mycursor.execute("select count(*) from dailyEntries")
    numOfRows = mycursor.fetchone()[0]
    
    mycursor.execute("SELECT entryID FROM dailyEntries")
    numID = list(mycursor)
    for i in range(numOfRows):
        nextNum = numID[i]
        nextNum = nextNum[0]
        if nextNum != i+1:
            mycursor.execute("update dailyEntries set entryID = "+str(i+1)+" where entryID = "+str(nextNum))
            mydb.commit()       
        
    mydb.close()

def timeLog(line):
    info = []
    
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    date = datetime.today().strftime("%d/%m/%y")
    
    print(current_time)
    print(date)
    
    mycursor.execute("select count(*) from dailyEntries")
    numberOfItems = list(mycursor)[0]
    numberOfItems = int(numberOfItems[0])+1
    
    info.append(numberOfItems)
    info.append(line)
    info.append(current_time)
    info.append(date)
    sql = "INSERT INTO dailyEntries(entryID, numberID, entryTime, entryDate) VALUES (%s, %s, %s, %s)"
    mycursor.execute(sql, info)
    mydb.commit()
    
    cleanUp()
    
def findAlternatives(numberPlate):
    
    #problem letters I, B, Z, O --test D and S and C
    #at this point only non personalised number plates will work - makes assumption that there is nothing in the middle that is not a number
    possibilities = []
    
    #simple changes and additions
    numberPlate = numberPlate.replace(" ", "")
    
    if "I" in numberPlate:
        pos = [i for i, letter in enumerate(numberPlate) if letter == "I"]
        numberPlate = list(numberPlate)
        for i in range(len(pos)):
            x = pos[i]
            numberPlate[x] = "1"
        numberPlate = "".join(numberPlate)
    
    #n**2 -1
    
    ## formatting for non personlised number plates
    if len(numberPlate) == 7 or len(numberPlate) == 8:
        numberPlate = list(numberPlate)
        try:
            int(numberPlate[2])
        except:
            if numberPlate[2] == "B":
                numberPlate[2] = "8"
            elif numberPlate[2] == "Z":
                numberPlate[2] = "2"
            elif numberPlate[2] == "O":
                numberPlate[2] = "0"
        
        try:
            int(numberPlate[3])
        except:  
            if numberPlate[3] == "B":
                numberPlate[3] = "8"
            elif numberPlate[3] == "Z":
                numberPlate[3] = "2"
            elif numberPlate[3] == "O":
                numberPlate[3] = "0"
        
        numberPlate = "".join(numberPlate)
        if len(numberPlate) == 8:
            numberPlate = numberPlate[1:]
        
    possibilities.append(numberPlate)
    
    if len(numberPlate) < 7:
        number1 = numberPlate[1:]
        possibilities.append(number1)
        
    possibilities.append("eggs")
    checkPlates(possibilities)

def checkPlates(numberPlate):
    data = []
    #creates a list of all the valid number plates
    mycursor.execute ("SELECT numberPlate FROM validNumberPlates where valid = 1")
    myresult = mycursor.fetchall()
    for x in myresult:
        modRow = str(x)[2:]
        modRow = modRow[:-3]
        data.append(modRow)
    
    #checks the plate against the valid plates
    for i in range(len(numberPlate)):
        y = len(data)
        x = 0
        q = 0
        while x == 0:
            if numberPlate[i] == data[q]:
                print("plate found")
                x = 2
                print("open gate")
                GPIO.output(18,GPIO.HIGH)
                time.sleep(5)
                GPIO.output(18,GPIO.LOW)
                timeLog(q+1)
                
            else:
                if q+1 < y:
                    q+=1
                else:
                    x = 1
        if x == 2:
            break
        
    if x == 1:
        print("could not find")

#findAlternatives(numberPlate)
            
#heres the plan, create list of possible plates with mistakes added in then cross reference

