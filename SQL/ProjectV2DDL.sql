--DDL SQL File
CREATE DATABASE ProjectV2

CREATE TABLE members(
Member_ID SERIAL PRIMARY KEY,
Username TEXT NOT NULL UNIQUE,
passcode TEXT NOT NULL, 
First_Name TEXT NOT NULL, 
Last_Name TEXT  NOT NULL, 
Email TEXT NOT NULL UNIQUE,
Join_date DATE,
Member_weight NUMERIC NOT NULL,
Member_height NUMERIC NOT NULL
);

CREATE TABLE trainers(
Trainer_ID SERIAL PRIMARY KEY,
Username TEXT NOT NULL UNIQUE,
passcode TEXT NOT NULL,
First_Name TEXT NOT NULL, 
Last_Name TEXT  NOT NULL, 
Email TEXT NOT NULL UNIQUE, 
Schedule_available TIMESTAMP
);

CREATE TABLE groupClasses(
Class_ID SERIAL PRIMARY KEY,    
Room_ID INT FOREIGN KEY,
Classname TEXT NOT NULL, 
ClassTime_start TIMESTAMP,
ClassTime_end TIMESTAMP
);

CREATE TABLE clubEquipment(
Equipment_ID SERIAL PRIMARY KEY,    
EquipmentName TEXT NOT NULL,
Maintenance_needed BOOLEAN
);

CREATE TABLE clubRooms(
Room_ID SERIAL PRIMARY KEY,
is_booked BOOLEAN,
);

CREATE TABLE clubPayments(
Payment_ID SERIAL PRIMARY KEY, 
Total_amount NUMERIC NOT NULL, 
Payment_by INT NOT NULL FOREIGN KEY, 
Payment_for TEXT NOT NULL
);