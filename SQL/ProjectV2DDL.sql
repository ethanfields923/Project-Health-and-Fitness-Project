--DDL SQL File
CREATE DATABASE ProjectV2

CREATE TABLE healthMetrics(
    HealthMetric_ID SERIAL PRIMARY KEY,
    Member_currWeight NUMERIC NOT NULL,
    Member_goalWeight NUMERIC NOT NULL,
    Member_height NUMERIC NOT NULL,
    Member_BMI    NUMERIC NOT NULL,
    Member_Age INT NOT NULL,
    Member_Gender TEXT NOT NULL,
    Fitness_goal TEXT NOT NULL, --this is for whether they want to lose weight, gain weight, gain strength, or gain endurance
    Weekly_goal TEXT NOT NULL,  --this is for how many times they want to exercise per week
    Favourite_Exercise TEXT DEFAULT 'none' NOT NULL,
    Activity_Level TEXT NOT NULL
)

CREATE TABLE members(
Member_ID SERIAL PRIMARY KEY,
Username TEXT NOT NULL UNIQUE,
passcode TEXT NOT NULL, 
Full_Name TEXT NOT NULL, 
Email TEXT NOT NULL UNIQUE,
Join_date DATE,
Bio TEXT,
HealthMetric_ID INTEGER REFERENCES healthMetrics(HealthMetric_ID),
Membership_type TEXT DEFAULT 'none' NOT NULL,
Amount_paid  NUMERIC DEFAULT 0.00 
);

CREATE TABLE trainers(
Trainer_ID SERIAL PRIMARY KEY,
Username TEXT NOT NULL UNIQUE,
passcode TEXT NOT NULL,
Full_Name TEXT NOT NULL,  
Age INT NOT NULL,
Gender TEXT NOT NULL,
Favourite_Exercise TEXT DEFAULT 'none' NOT NULL,
Specializations TEXT NOT NULL, 
isAvailable BOOLEAN,
Certification TEXT
);

CREATE TABLE admin(
    Admin_ID SERIAL PRIMARY KEY,
    Username TEXT NOT NULL UNIQUE,
    passcode TEXT NOT NULL, 
    Position TEXT NOT NULL
);

CREATE TABLE clubRooms(
Room_ID SERIAL PRIMARY KEY,
is_booked BOOLEAN,
);

CREATE TABLE groupClasses(
Class_ID SERIAL PRIMARY KEY,    
Capacity INT DEFAULT 0,
Max_Capacity INT NOT NULL, 
Classname TEXT NOT NULL,
Room_ID INT REFERENCES clubRooms(Room_ID),
ClassTime_date DATE,
ClassTime_start TIMESTAMP,
Duration TEXT NOT NULL,
Class_Instructor TEXT NOT NULL --Instructor is considered seperate from the trainers; the trainers will only handle personal training sessions
);

CREATE TABLE member_personal_schedule(
    schedule_ID SERIAL PRIMARY KEY,
    Member_ID  INT REFERENCES members(Member_ID),
    schedule_trainer TEXT REFERENCES trainers(Full_Name),
    schedule_date DATE,
    schedule_Time TEXT NOT NULL, 
    schedule_Duration TEXT NOT NULL,
    schedule_roomID INT REFERENCES clubRooms(Room_ID),
    schedule_Purpose TEXT NOT NULL
);

--Probably a rendudant table but keep for now til I get to working on the postgresql connection stuff
CREATE TABLE member_group_schedule{
    schedule_ID SERIAL PRIMARY KEY,
    Member_ID  INT REFERENCES members(Member_ID),
    className TEXT REFERENCES groupClasses(Classname),
    roomID INT REFERENCES groupClasses(roomID),
    classDate DATE REFERENCES groupClasses(ClassTime_date),
    classStart TIMESTAMP REFERENCES groupClasses(ClassTime_start),
    duration TEXT REFERENCES groupClasses(Duration),
    Instructor TEXT REFERENCES groupClass(Class_Instructor)
}

CREATE TABLE clubEquipment(
Equipment_ID SERIAL PRIMARY KEY,    
EquipmentName TEXT NOT NULL,
Maintenance_needed BOOLEAN
);

CREATE TABLE clubPayments(
Payment_ID SERIAL PRIMARY KEY, 
Total_amount NUMERIC NOT NULL, 
Payment_by TEXT NOT NULL REFERENCES members(Full_Name), 
Payment_for TEXT NOT NULL
);