# ANPR Gate Project with server
An ANPR system for automatically 
opening gates at a rental unit site. Has the ability to add and 
remove companies as well as log all entries
>[!NOTE]
> Some files may be missing from this repository as this is an old project 
> coded on multiple devices without the use of any version control system as 
> this was before I began using GitHub

## Requirements
- Raspberry Pi (preferibly with cooling system to prevent overheating)
- Raspberry Pi Camera 

## Running Project
1. Running the automatic number plate recognition
- enter the below command into the directory where file is present
```
>> ./raspberryOR.py
```
2. Running the server
- ensure apache2 is installed on the pi
- run the following to start up the server 
```
>> apache2 start
```
- run the following to stop the server
```
>> apache2 stop
```
