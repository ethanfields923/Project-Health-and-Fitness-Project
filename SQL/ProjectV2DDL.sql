--DDL SQL File
--CREATE DATABASE ProjectV2;

CREATE TABLE members(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    passcode VARCHAR(50) NOT NULL, 
    full_name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) DEFAULT '',
    join_date DATE DEFAULT CURRENT_DATE,
    bio TEXT DEFAULT '',
    membership_type VARCHAR(50) DEFAULT 'No Membership' NOT NULL
);

CREATE TABLE healthMetrics(
    healthmetric_id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES members(id),
    member_currweight DECIMAL(10,1) DEFAULT 0.0,
    member_goalweight DECIMAL(10,1) DEFAULT 0.0,
    member_height_inches INTEGER DEFAULT 0,
    member_age INTEGER DEFAULT 0,
    member_gender VARCHAR(20) DEFAULT '',
    fitness_goal INTEGER DEFAULT 0, --this is for whether they want to lose weight, gain weight, gain strength, or gain endurance
    weekly_goal INTEGER DEFAULT 0,  --this is for how many times they want to exercise per week
    optional_goals TEXT DEFAULT '',
    activity_level INTEGER DEFAULT 0
);

CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(100) NOT NULL,
    exercise_description TEXT
);

CREATE TABLE routines (
    routine_id SERIAL PRIMARY KEY,
    routine_name VARCHAR(100) NOT NULL,
    workout_amount INTEGER
);

CREATE TABLE exercise_routines (
    routine_id INTEGER REFERENCES routines(routine_id),
    exercise_id INTEGER REFERENCES exercises(exercise_id), 
    routine_day INTEGER,
    exercise_sets INTEGER DEFAULT 0,
    exercise_reps INTEGER DEFAULT 0,
	PRIMARY KEY(routine_id, exercise_id, routine_day)
);

CREATE TABLE dashboard(
    dashboard_id SERIAL PRIMARY KEY, 
    member_id INTEGER REFERENCES members(id),
    currentroutine_id INTEGER REFERENCES routines(Routine_id),
    member_currentweek INTEGER DEFAULT 0, --Is used for showing the number of times the user exercised this week
    num_trophies INTEGER DEFAULT 0,
    hot_streak INTEGER DEFAULT 0
);

CREATE TABLE billingInfo(
    billing_id SERIAL PRIMARY KEY, 
    member_id INTEGER REFERENCES members(id),
    card_Number VARCHAR(14) DEFAULT '',            --Since a card number would usually look like 'XXXX-XXXX-XXXX' which is 14 characters
    card_Name VARCHAR(100) DEFAULT '',	
    card_ExpMonth INTEGER DEFAULT 0,
    card_ExpYear INTEGER DEFAULT 0,
    card_CVV VARCHAR(3) DEFAULT '',	
    billing_address VARCHAR(255) DEFAULT '',
    postal_Code VARCHAR(7) DEFAULT ''
);

CREATE TABLE trainers(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passcode VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,  
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER DEFAULT 0,
    gender VARCHAR(20) DEFAULT '',
    favourite_exercise VARCHAR(255) DEFAULT 'None',
    specializations VARCHAR(255) DEFAULT ''
);

CREATE TABLE admin(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passcode VARCHAR(50) NOT NULL 
);

CREATE TABLE trainers_availability(
    availability_id SERIAL PRIMARY KEY, 
    trainer_id INTEGER REFERENCES trainers(id),
    day_of_week VARCHAR(15) UNIQUE NOT NULL, 
    start_time TIME NOT NULL DEFAULT '00:00:00', 
    end_time TIME NOT NULL DEFAULT '00:00:00'
);

CREATE TABLE room_bookings(
    room_id SERIAL PRIMARY KEY,
    room_number INTEGER NOT NULL, 
    day_of_week VARCHAR(15) DEFAULT '',
    time_start TIME DEFAULT  '00:00:00',
    duration_minutes INTEGER DEFAULT 0,
    is_booked BOOLEAN DEFAULT FALSE,
    room_use_type VARCHAR(100) NOT NULL DEFAULT 'Not Booked'
);

CREATE TABLE personal_training_sessions(
    session_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id),
    member_id INTEGER REFERENCES members(id),
    room_id INTEGER REFERENCES room_bookings(room_id),
    session_purpose VARCHAR(255)
);

CREATE TABLE groupClasses(
    class_id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES room_bookings(room_id),    
    classname VARCHAR(100) NOT NULL,
    current_capacity INTEGER DEFAULT 0,
    max_capacity INTEGER DEFAULT 30,
    instructor VARCHAR(100) DEFAULT 'N/A'       --Seperate from trainers 
);

CREATE TABLE member_group_schedules( 
    member_id INTEGER REFERENCES members(id), 
    session_id INTEGER REFERENCES groupClasses(class_id),
    PRIMARY KEY(member_id, session_id)
);

CREATE TABLE clubEquipment(
    equipment_id SERIAL PRIMARY KEY,    
    equipment_name VARCHAR(100) NOT NULL,
    equipment_total INTEGER, 
    equipment_broken INTEGER
);

CREATE TABLE clubPayments(
    payment_id SERIAL PRIMARY KEY, 
    billing_id INTEGER REFERENCES billingInfo(billing_id),
    amount DECIMAL(10,2) NOT NULL, 
    payment_type VARCHAR(50) NOT NULL,
    payment_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT FALSE
);