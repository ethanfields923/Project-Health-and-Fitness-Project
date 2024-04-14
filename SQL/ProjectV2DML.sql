--DML File
--Inserting sample members
INSERT INTO members(username, passcode, full_name, email, phone_number, join_date, bio, membership_type)
VALUES ('JohnDoey', 'johnny123', 'John Doe', 'john@example.com', '+1 (613) 555-4589', '2002-03-01','I am here to get swoll!', 'Basic');

INSERT INTO members(username, passcode, full_name, email, bio, membership_type)
VALUES ('JaneyBae', 'jane243', 'Jane Hubert', 'jane@example.com', 'Looking to get fit!', 'Deluxe');

--Inserting health metrics
INSERT INTO healthMetrics (member_id, member_currweight, member_goalweight, member_height_inches, member_age, member_gender, fitness_goal, weekly_goal, optional_goals, activity_level)
VALUES (1, 170.5, 165.0, 70, 30, 'Male', 1, 5, 'Build muscle', 3);

--Inserting exercises
INSERT INTO exercises (exercise_name, exercise_description)         --1
VALUES ('Barbell Squat', 'Legs');

INSERT INTO exercises (exercise_name, exercise_description)         --2
VALUES ('Barbell Bench Press', 'Chest');

INSERT INTO exercises (exercise_name, exercise_description)         --3
VALUES ('Bent-Over Barbell Row', 'Back');

INSERT INTO exercises (exercise_name, exercise_description)         --4
VALUES ('Standing Barbell Military Press', 'Shoulders');

INSERT INTO exercises (exercise_name, exercise_description)         --5
VALUES ('Barbell Deadlifts', 'Legs');

INSERT INTO exercises (exercise_name, exercise_description)         --6
VALUES ('Running', 'Cardio');

INSERT INTO exercises (exercise_name, exercise_description)         --7
VALUES ('Rowing', 'Cardio');

INSERT INTO exercises (exercise_name, exercise_description)         --8
VALUES ('Push-up', 'Chest');

INSERT INTO exercises (exercise_name, exercise_description)         --9
VALUES ('Pull-up', 'Back');

INSERT INTO exercises (exercise_name, exercise_description)         --10
VALUES ('Plank', 'Abs');

INSERT INTO exercises (exercise_name, exercise_description)         --11
VALUES ('Dumbbell Bicep Curl', 'Biceps');

INSERT INTO exercises (exercise_name, exercise_description)         --12
VALUES ('Cable Bicep Curl', 'Biceps');

INSERT INTO exercises (exercise_name, exercise_description)         --13
VALUES ('Tricep Cable Pushdown', 'Triceps');

INSERT INTO exercises (exercise_name, exercise_description)         --14
VALUES ('Skullcrushers', 'Triceps');

INSERT INTO exercises (exercise_name, exercise_description)         --15
VALUES ('Dumbbell Lateral Raises', 'Shoulders');

INSERT INTO exercises (exercise_name, exercise_description)         --16
VALUES ('Cycling', 'Cardio');

INSERT INTO exercises (exercise_name, exercise_description)         --17
VALUES ('Crunches', 'Abs');

--Inserting routines
INSERT INTO routines (routine_name, workout_amount)
VALUES ('BIG LIFTS', 2);

INSERT INTO routines (routine_name, workout_amount)
VALUES ('FAT LOSS', 3);

INSERT INTO routines (routine_name, workout_amount)
VALUES ('MUSCLE BUILDER', 5);

INSERT INTO routines (routine_name, workout_amount)
VALUES ('CARDIO BUNNY', 2);

--Inserting exercises into the routines (many-to-many relationship)
--For the BIG LIFTS routine
--Day 1
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (1, 1, 1, 5, 5);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (1, 2, 1, 5, 5);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (1, 3, 1, 5, 5);

--Day 2
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (1, 1, 2, 5, 5);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (1, 4, 2, 5, 5);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (1, 5, 2, 1, 5);

--For the FAT LOSS routine
--Day 1
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 6, 1, 1, 5);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 2, 1, 3, 10);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 8, 1, 3, 20);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 13, 1, 3, 12);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 10, 1, 3, 60);

--Day 2
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 7, 2, 1, 5);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 3, 2, 3, 10);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 9, 2, 3, 20);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 11, 2, 3, 12);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 10, 2, 3, 60);

--Day 3
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 16, 3, 1, 5);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 1, 3, 3, 10);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 5, 3, 3, 20);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 15, 3, 3, 12);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (2, 10, 3, 3, 60);

--For the MUSCLE BUILDER routine
--Day 1
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 2, 1, 3, 8);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 4, 1, 3, 10);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 14, 1, 3, 8);

--Day 2
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 3, 2, 3, 8);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 11, 2, 3, 10);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 10, 2, 3, 60);

--Day 3
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 1, 3, 3, 8);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 5, 3, 3, 8);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 6, 3, 1, 5);

--Day 4
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 8, 4, 3, 20);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 13, 4, 3, 12);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 15, 4, 3, 15);

--Day 5
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 8, 5, 3, 20);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 12, 5, 3, 12);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (3, 17, 5, 3, 20);

--For the CARDIO BUNNY routine
--Day 1
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (4, 6, 1, 1, 15);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (4, 7, 1, 1, 15);

--Day 2
INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (4, 16, 2, 1, 15);

INSERT INTO exercise_routines (routine_id, exercise_id, routine_day, exercise_sets, exercise_reps)
VALUES (4, 7, 2, 1, 15);

-- Inserting dashboard
INSERT INTO dashboard (member_id, currentroutine_id, member_currentweek, num_trophies, hot_streak)
VALUES (1, 1, 2, 0, 2);

-- Inserting billing info
INSERT INTO billingInfo (member_id, card_Number, card_Name, card_ExpMonth, card_ExpYear, card_CVV, billing_address, postal_Code)
VALUES (1, '1234-5678-9012', 'John Doe', 12, 2025, '123', '123 Lansdowne Street, Ottawa, Ontario, Canada', 'K2P 9N3');

-- Inserting trainers
INSERT INTO trainers (username, passcode, full_name, email, age, gender, favourite_exercise, specializations)
VALUES ('Mikkey', 'mike345', 'Mikkel Rossland', 'trainermikkel@example.com', 45, 'Male', 'Squats', 'Bodybuilding, Cardio');

INSERT INTO trainers (username, passcode, full_name, email, age, gender, favourite_exercise, specializations)
VALUES ('BeckHAM', 'beck345', 'Becky Hubert', 'trainerbecky@example.com', 32, 'Female', 'Cycling', 'Weightlifting, Group Classes');

INSERT INTO trainers (username, passcode, full_name, email, age, gender, favourite_exercise, specializations)
VALUES ('Viking', 'vick345', 'Viktor Lance', 'trainerviktor@example.com', 61, 'Male', 'Bench Press', 'Bodybuilding, Weight Loss');

INSERT INTO trainers (username, passcode, full_name, email, age, gender, favourite_exercise, specializations)
VALUES ('AshLee', 'ash345', 'Ashley Greyham', 'trainerashley@example.com', 24, 'Prefer not to say', 'Deadlifts', 'Weightlifting, Strength Training');

-- Inserting admin
INSERT INTO admin (username, passcode)
VALUES ('DerickStaff', 'derick769');

--Inserting trainers availability for personal training sessions
INSERT INTO trainers_availability (trainer_id, day_of_week, start_time, end_time)
VALUES (1, 'Monday', '09:00:00', '15:00:00');

INSERT INTO trainers_availability (trainer_id, day_of_week, start_time, end_time)
VALUES (1, 'Tuesday', '11:00:00', '17:00:00');

INSERT INTO trainers_availability (trainer_id, day_of_week, start_time, end_time)
VALUES (1, 'Thursday', '08:00:00', '14:00:00');

-- Inserting room bookings
INSERT INTO room_bookings (room_number, day_of_week, time_start, duration_minutes, is_booked, room_use_type)
VALUES (101, 'Thursday', '10:00:00', 60, true, 'Personal Training');

INSERT INTO room_bookings (room_number,  day_of_week, time_start, duration_minutes, is_booked, room_use_type)
VALUES (102, 'Wednesday','18:00:00', 60, true, 'Group Class');

INSERT INTO room_bookings(room_number)
VALUES (103, 'Monday', '12:00:00', 30, true, 'Personal Training');

INSERT INTO room_bookings (room_number,  day_of_week, time_start, duration_minutes, is_booked, room_use_type)
VALUES (104, 'Friday','16:00:00', 60, true, 'Group Class');

INSERT INTO room_bookings (room_number,  day_of_week, time_start, duration_minutes, is_booked, room_use_type)
VALUES (105, 'Tuesday','08:00:00', 60, true, 'Group Class');

INSERT INTO room_bookings(room_number)
VALUES (106);

INSERT INTO room_bookings(room_number)
VALUES (107);

-- Inserting personal training sessions
INSERT INTO personal_training_sessions (trainer_id, member_id, room_id, session_purpose)
VALUES (1, 1, 1, 'Strength training');

INSERT INTO personal_training_sessions (trainer_id, member_id, room_id, session_purpose)
VALUES (1, 2, 3, 'Consultation');

-- Inserting group classes
INSERT INTO groupClasses (room_id, classname, max_capacity, instructor)
VALUES (2, 'Hot Yoga', 20, 'Anthony');

INSERT INTO groupClasses (room_id, classname, instructor)
VALUES (4, 'Cardio Cycles', 'Becky');

INSERT INTO groupClasses (room_id, classname, instructor)
VALUES (5, 'ZUMBA', 'Alina');

-- Inserting member group schedules
INSERT INTO member_group_schedules (member_id, session_id)
VALUES (1, 1);

-- Inserting club equipment
INSERT INTO clubEquipment (equipment_name, equipment_total, equipment_broken)
VALUES ('Treadmill', 10, 2);

INSERT INTO clubEquipment (equipment_name, equipment_total, equipment_broken)
VALUES ('Dumbbells', 30, 2);

INSERT INTO clubEquipment (equipment_name, equipment_total, equipment_broken)
VALUES ('Row Machines', 5, 1);

INSERT INTO clubEquipment (equipment_name, equipment_total, equipment_broken)
VALUES ('Barbells', 10, 5);

INSERT INTO clubEquipment (equipment_name, equipment_total, equipment_broken)
VALUES ('Cable Machines', 3, 1);

-- Inserting club payments
INSERT INTO clubPayments (billing_id, amount, payment_type)
VALUES (1, 50.00, 'Personal Training');