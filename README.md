# Project: Health and Fitness Club (HAFC) Management System
NAME: Ethan Fields
Student #: 101245491

Directions for running and testing:
1. Before Running:
   a. First make sure that node.js is installed on your PC. If not, download the current node.js version(v21.7.1) running x64 from this link, https://nodejs.org/en/download/current, for the appropriate system of course(Windows, Mac, Linux). Once the wizard opens up, just download the default version and do NOT download the additional Chocolatey software. 
   
   b. Then, download the project zip folder and extract it.
   
   c. Once that is completed, open up a terminal in the "/code" folder and run the command "npm init". You can just keep pressing enter until you get to the prompt where it asks if these parameters are acceptable and enter "Y" for yes. After this step is completed, a 'package.json' file should be added to the project folder. Additionally, the server.js can now be ran using the command 'node server.js' in the terminal.
   
   d. Use the command "npm install", "npm install express", and "npm install pg" to install the appropriate modules required for this project. This will include a 'package-lock.json file' and 'node_modules' folder/directory in your project folder/directory.
   
   e. Then, create the postgreSQL database we are going to use for the rest of this application. If using pgadmin, simply create the database inside with the name "ProjectV2" (make sure that the name is correct). If not using pgadmin, get rid of the comment at the top of the DDL file in the "/SQL" folder, ProjectV2DDL.sql, for "CREATE DATABASE ProjectV2".
   
   f. Once this is done, copy and paste the code from the DDL file to the Query tool and run the query. It should create the tables successfully. 
   
   g. Afterwards,  copy and paste the code from the DML file to the Query tool and run the query. It should insert the sample data into the tables successfully.

2. After Setting Up: 
   a. Enter "node server.js" or "npm start" to start the application in the terminal. Once ran, it should output the port the server is running and links for testing the application. Additionally, there should be a message outputting whether the connection to the postgreSQL database is successful or not. If the connection to the database is successful, proceed to next step. Else, consider deleting the old database and performing steps 1f and 1g again. 
   
   b. Click one of the links provided in the terminal using "Ctrl + C" to test the application. 
   
   c. Watch the video to see what you can test. 


Video Link: https://mediaspace.carleton.ca/media/Project+V2+Demonstration+Video/1_3xz6z4gz
