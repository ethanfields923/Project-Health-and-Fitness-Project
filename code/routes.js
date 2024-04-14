const express = require ('express');
const router = express.Router();

/*Routes used for redirecting pages*/

//Sends user to login page
router.get('/logpage', (request, response) => {
    response.sendFile(__dirname + '/views/logreg.html')
});
router.get('/logreg.html', (request, response) => {
    response.sendFile(__dirname + '/views/logreg.html')
});

//Routes to member pages
router.get('/homemember', (request, response) =>{
    response.sendFile(__dirname + '/views/members/home.html')
});
router.get('/schedulemember', (request, response) =>{
    response.sendFile(__dirname + '/views/members/schedule.html')
});
router.get('/dashmember', (request, response) =>{
    response.sendFile(__dirname + '/views/members/dashboard.html')
});
router.get('/profilemember', (request, response) =>{
    response.sendFile(__dirname + '/views/members/profile.html')
});
router.get('/pricingmember', (request, response) =>{
    response.sendFile(__dirname + '/views/members/pricing.html')
});

//Routes to trainer pages
router.get('/hometrainer', (request, response) =>{
    response.sendFile(__dirname + '/views/trainers/home.html')
});
router.get('/scheduletrainer', (request, response) =>{
    response.sendFile(__dirname + '/views/trainers/scheduleManage.html')
});
router.get('/searchtrainer', (request, response) =>{
    response.sendFile(__dirname + '/views/trainers/memberSearch.html')
});

//Routes to admin pages
router.get('/homeadmin', (request, response) =>{
    response.sendFile(__dirname + '/views/admin/home.html')
});
router.get('/bookingadmin', (request, response) =>{
    response.sendFile(__dirname + '/views/admin/roomBook.html')
});
router.get('/maintainadmin', (request, response) =>{
    response.sendFile(__dirname + '/views/admin/equipMain.html')
});
router.get('/updateadmin', (request, response) =>{
    response.sendFile(__dirname + '/views/admin/classUpdate.html')
});
router.get('/billingadmin', (request, response) =>{
    response.sendFile(__dirname + '/views/admin/billing.html')
});
/*End of redirect routes*/

/*Handles requests for login and register page*/

//Checks over login request
router.post('/login', async (request, response) => {
    const { user, username, password } = request.body;
    try{
        const result = await request.app.locals.client.query(`SELECT * FROM ${user} WHERE username = '${username}' AND passcode = '${password}';`); 
        if(result.rows.length === 1){
            response.status(200).json({ 
                success: true, 
                message: 'Login Successful', 
                id: result.rows[0].id
            });
        } else{
            response.status(401).json({ success: false, message: 'Invalid username or password'});
        }
    }catch(err) {
        console.error('Error during login:', err);
        response.status(500).json({ success: false, message: 'Internal Server Error'});
    }
});

//Checks over register request
router.post('/register', async (request, response) => {
    const { username, fullName, email, password, joinDate } = request.body;
    try{
        //Check if the username and emails are unique and do not exist already
        const isUniqueusername = await request.app.locals.client.query(`SELECT * FROM members WHERE username = '${username}';`);
        const isUniqueemail = await request.app.locals.client.query(`SELECT * FROM members WHERE email = '${email}';`);

        if(isUniqueusername.rows.length > 0){
            return response.status(400).json({success: false, message: 'Username is not unique. Please provide a more unique username...'});
        }

        if(isUniqueemail.rows.length > 0){
            return response.status(400).json({success: false, message: 'Email is not unique. Please provide a more unique email...'});
        }

        //If username and email is unique, the values provided are inserted into the database table
        const result = await request.app.locals.client.query(`INSERT INTO members (username, passcode, full_name, email, join_date) VALUES ('${username}', '${password}', '${fullName}','${email}', '${joinDate}') RETURNING *;`); 
        response.status(200).json({success: true, message: 'Registration Successful...'});
    }catch(err) {
        console.error('Error during register:', err);
        response.status(500).json({ success: false, message: 'Internal Server Error...'});
    }
});
/*End of requests handles for login and register page*/

/*Handles requests from members side*/
//Request handles for schedule page
//Gets the information needed for the schedule page
router.post('/scheduleinfo', async(request, response) => {
    const { userID } = request.body;
    try{
        //Get personal training sessions the member is signed into
        const getMyPersonalSessionsQuery = await request.app.locals.client.query(`SELECT * FROM personal_training_sessions WHERE member_id=${userID};`);
        const personalSessions = getMyPersonalSessionsQuery.rows;

        let personalResult = [];
        for(let i=0; i < personalSessions.length; i++){
            const rowResult = {};
            rowResult.id = personalSessions[i].session_id;
            
           //Get trainer name according to their ID
            const trainerNameQuery = await request.app.locals.client.query(`SELECT full_name FROM trainers WHERE id=${personalSessions[i].trainer_id}`);
           if(trainerNameQuery.rows.length > 0){
            rowResult.trainerName = trainerNameQuery.rows[0].full_name;
           }
           
           //Get room number, day, time start, and duration based on the room id
           const roomInfoQuery = await request.app.locals.client.query(`SELECT room_number, day_of_week, time_start, duration_minutes FROM room_bookings WHERE room_id=${personalSessions[i].room_id}`);
            if(roomInfoQuery.rows.length > 0){
                rowResult.roomNumber = roomInfoQuery.rows[0].room_number;
                rowResult.day = roomInfoQuery.rows[0].day_of_week;
                rowResult.timeStart = roomInfoQuery.rows[0].time_start;
                rowResult.duration = roomInfoQuery.rows[0].duration_minutes;
            }

           //Append the session purpose to the end
           rowResult.purpose = personalSessions[i].session_purpose;

           personalResult.push(rowResult);
        }

        //Get the Group Class Sessions the member is signed into
        const getMyGroupSessionsQuery = await request.app.locals.client.query(`SELECT * FROM member_group_schedules WHERE member_id=${userID};`);
        const groupSessions = getMyGroupSessionsQuery.rows;
        let myGroupResult = [];
        for(let i=0; i < groupSessions.length; i++){
            const rowResult = {};
            rowResult.id = i+1;
            
           //Get room number, day, time start, and duration based on the room id
           const classInfoQuery = await request.app.locals.client.query(`SELECT * FROM groupClasses WHERE class_id=${groupSessions[i].session_id}`);
            if(classInfoQuery.rows.length > 0){
                let roomId = classInfoQuery.rows[0].room_id;
                rowResult.className = classInfoQuery.rows[0].classname;
                rowResult.instructor = classInfoQuery.rows[0].instructor;
                
                const roomInfoQuery = await request.app.locals.client.query(`SELECT * FROM room_bookings WHERE room_id=${roomId}`);
                if(roomInfoQuery.rows.length > 0){
                    rowResult.roomNumber = roomInfoQuery.rows[0].room_number;
                    rowResult.day = roomInfoQuery.rows[0].day_of_week;
                    rowResult.timeStart = roomInfoQuery.rows[0].time_start;
                    rowResult.duration = roomInfoQuery.rows[0].duration_minutes;
                }
            }

           myGroupResult.push(rowResult);
        }

        //Gets the group classes available
        const getGroupClassesQuery = await request.app.locals.client.query(`SELECT * FROM groupClasses;`);
        const groupClass = getGroupClassesQuery.rows;

        let groupResult = [];
        for(let i=0; i < groupClass.length; i++){
            const rowResult = {};
            rowResult.id = groupClass[i].class_id;
            let roomId = groupClass[i].room_id;
            rowResult.className = groupClass[i].classname;
            rowResult.max = groupClass[i].max_capacity;
            rowResult.current = groupClass[i].current_capacity;
            rowResult.instructor = groupClass[i].instructor;
               
            const roomInfoQuery = await request.app.locals.client.query(`SELECT * FROM room_bookings WHERE room_id=${roomId}`);
            if(roomInfoQuery.rows.length > 0){
                rowResult.roomNumber = roomInfoQuery.rows[0].room_number;
                rowResult.day = roomInfoQuery.rows[0].day_of_week;
                rowResult.timeStart = roomInfoQuery.rows[0].time_start;
                rowResult.duration = roomInfoQuery.rows[0].duration_minutes;
            }

           groupResult.push(rowResult);
        }

        const getTrainersQuery = await request.app.locals.client.query(`SELECT * FROM trainers;`);
        const trainersResult = getTrainersQuery.rows;

        response.status(200).json({success: true, personalResult, myGroupResult, groupResult, trainersResult});
    } catch(err){
        console.error('Error fetching schedule information: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Registers member to group class 
router.post('/registerclass', async(request, response) => {
    const { userID, value } = request.body;

    try{        
        const checkClassQuery =  await request.app.locals.client.query(`SELECT * FROM member_group_schedules WHERE member_id=${userID} AND session_id=${value}`);

        if(checkClassQuery.rows.length > 0){
            return response.status(401).json({success: false, message: "You have already registered for this class. Please try again at another time..."});
        }
        const getBillingIdQuery = await request.app.locals.client.query(`SELECT billing_id FROM billingInfo WHERE member_id=${userID};`);
        if(getBillingIdQuery.rows.length > 0){
            const billingId = getBillingIdQuery.rows[0].billing_id;
            
            const addPaymentQuery = await request.app.locals.client.query(`INSERT INTO clubPayments (billing_id, amount, payment_type) VALUES (${billingId}, 50, 'Group Class')`);
            const registerClassQuery = await request.app.locals.client.query(`INSERT INTO member_group_schedules(member_id, session_id) VALUES (${userID}, ${value});`);
            const updateCapacityQuery = await request.app.locals.client.query(`
            UPDATE groupClasses
            SET current_capacity = current_capacity + 1
            WHERE class_id=${value};`);
            response.status(200).json({success: false, message: 'Registration Successful...'});
        }else{
            return response.status(401).json({success: false, message: "You are missing billing information. Please update your payment information in the profile page..."});
        }
    } catch(err){
        console.error('Error registering to class: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});
//End of schedule page requests

//Request handles for dashboard page
//Gets the information needed for the dashboard page
router.post('/dashinfo', async(request, response) => {
    const { userID } = request.body;
    try{
        //Check if they have a entry in the dashboard table already
        const dashCheck = await request.app.locals.client.query (`SELECT EXISTS (SELECT 1 FROM dashboard WHERE member_id=${userID}) AS id_exists;`);
        
        //If the entry does not exist, insert the id into the table
        if(!dashCheck.rows[0].id_exists){
            const dashInsert = await request.app.locals.client.query(`INSERT INTO dashboard(member_id, currentroutine_id) VALUES (${userID}, 1);`);
        }

        //Check if they have a entry in the healthMetrics table already
        const healthCheck = await request.app.locals.client.query (`SELECT EXISTS (SELECT 1 FROM healthmetrics WHERE member_id=${userID}) AS id_exists;`);
        
        //If the entry does not exist, insert the id into the table
        if(!healthCheck.rows[0].id_exists){
            const healthInsert = await request.app.locals.client.query(`INSERT INTO healthmetrics(member_id) VALUES (${userID});`);
        }

        const healthStatQuery = await request.app.locals.client.query(`SELECT weekly_goal, member_goalweight, member_currweight FROM healthmetrics WHERE member_id=${userID};`);
        const healthStat = healthStatQuery.rows[0];
        
        const dashResultQuery = await request.app.locals.client.query(`SELECT * FROM dashboard WHERE member_id=${userID};`);
        const dashResult = dashResultQuery.rows[0];

        const responseData = {
            health: {
                weeklyGoal: healthStat.weekly_goal,
                goalWeight: healthStat.member_goalweight,
                currentWeight: healthStat.member_currweight
            },
            dashboard: {
                routine_id: dashResult.currentroutine_id,
                weekStreak: dashResult.member_currentweek,
                trophyNum: dashResult.num_trophies,
                hotStreak: dashResult.hot_streak
            }
        };

        response.status(200).json({ success: true, responseData});
    } catch(err){
        console.error('Error fetching dashboard information: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Updates current routine 
router.post('/updateCurrentRoutine', async(request, response) => {
    const { userID, newRoutine } = request.body;

    try{
        const updateRoutineQuery = await request.app.locals.client.query(`
        UPDATE dashboard
        SET currentroutine_id = ${newRoutine}
        WHERE member_id=${userID} RETURNING currentroutine_id;`);

        const updateRoutine = updateRoutineQuery.rows[0];
        response.status(200).json({success: true, new: updateRoutine.currentroutine_id});
    } catch(err){
        console.error('Error fetching member current routine on dashboard: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Shows the exercises for the routine
router.post('/showExercises', async(request, response) => {
    const { routine} = request.body;

    try{
        const exercisesQuery = await request.app.locals.client.query(`
        SELECT e.*, er.routine_day, er.exercise_sets, er.exercise_reps
        FROM exercises e
        JOIN exercise_routines er ON e.exercise_id = er.exercise_id
        WHERE er.routine_id = ${routine};`);

        const routinesQuery = await request.app.locals.client.query(`SELECT workout_amount FROM routines WHERE routine_id=${routine}`);
        routineAmount = routinesQuery.rows[0].workout_amount;

        const exercises = exercisesQuery.rows;

        response.status(200).json({success: true, exercises, routineAmount});
    } catch(err){
        console.error('Error fetching exercises for dashboard routine: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Log exercise and update tables accordingly
router.post('/logExercises', async(request, response) => {
    const { userID } = request.body
    
    try{
        const dashboardQuery = await request.app.locals.client.query(`SELECT * FROM dashboard WHERE member_id=${userID}`);
        const dashboardResult = dashboardQuery.rows[0];

        const weeklyGoalQuery = await request.app.locals.client.query(`SELECT weekly_goal FROM healthmetrics WHERE member_id=${userID}`);
        const weeklyGoalResult = weeklyGoalQuery.rows[0].weekly_goal;

        let weekCount;
        let trophyCount;
        let streakCount;
        if(dashboardResult.member_currentweek == weeklyGoalResult){
            weekCount = 1;
        } else{
            weekCount = +dashboardResult.member_currentweek + 1;
        }

        if(dashboardResult.member_currentweek == weeklyGoalResult){
            trophyCount = +dashboardResult.num_trophies + 1;
        } else{
            trophyCount = +dashboardResult.num_trophies;
        }

        streakCount = +dashboardResult.hot_streak + 1;

        const updateDashboardQuery = await request.app.locals.client.query(`
        UPDATE dashboard
        SET member_currentweek = ${weekCount},
            num_trophies = ${trophyCount},
            hot_streak = ${streakCount}       
        WHERE member_id=${userID} RETURNING *`);
        response.status(200).json({success: true, message: "Complete"});
    } catch(err){
        console.error('Error logging exercises and updating dashboard table: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});
//End of dashboard page requests

//Request handles for profile page
//Gets the information needed for the profile page
router.post('/profileinfo', async(request, response) => {
    const { userID } = request.body;
    try{
        //Fetching general information from members table
        const generalDataQuery = await request.app.locals.client.query(`SELECT * FROM members WHERE id=${userID};`);
        const generalResult = generalDataQuery.rows[0];

        //Fetching health stats and fitness goals information from the healthMetrics table
        const healthDataQuery = await request.app.locals.client.query(`SELECT * FROM healthMetrics WHERE member_id=${userID};`);
        const healthResult = healthDataQuery.rows[0];

        //Fetching payment info from the billingInfo table 
        const paymentDataQuery = await request.app.locals.client.query(`SELECT * FROM billingInfo WHERE member_id=${userID};`);
        const paymentResult = paymentDataQuery.rows[0];
        
        const responseData = {
            success: true,
            general: {
                username: generalResult.username,
                full_name: generalResult.full_name,
                email: generalResult.email,
                phone: generalResult.phone_number,
                joinDate: generalResult.join_date,
                bio: generalResult.bio,
                membership_type: generalResult.membership_type
            }
        };

        if(healthResult) {
            responseData.health = {
                hasData: true,
                current_weight: healthResult.member_currweight,
                goal_weight: healthResult.member_goalweight,
                height_in: healthResult.member_height_inches,
                age: healthResult.member_age,
                gender: healthResult.member_gender,
                fitnessGoal: healthResult.fitness_goal,
                weeklyGoal: healthResult.weekly_goal,
                opgoals: healthResult.optional_goals,
                activityLvl: healthResult.activity_level
            };
        } else{
            responseData.health = { hasData: false };
        }

        if(paymentResult){
            responseData.payment = {
                hasData: true,
                cardNumber: paymentResult.card_number,
                cardName: paymentResult.card_name,
                expmonth: paymentResult.card_expmonth,
                expyear: paymentResult.card_expyear,
                cvv: paymentResult.card_cvv,
                address: paymentResult.billing_address,
                postalcode: paymentResult.postal_code
            };
        } else{
            responseData.payment = { hasData: false };
        }

        response.status(200).json({success: true, responseData});
    } catch(err){
        console.error('Error fetching member profile: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Saves the new information into the database
router.post('/saveprofile', async(request, response) => {
    const { userID, generalArray, healthArray, paymentArray} = request.body;
    try{
        //Check if the username and emails are unique and do not exist already
        const isUniqueusername = await request.app.locals.client.query(`SELECT * FROM members WHERE username = '${generalArray[0]}';`);
        const isUniqueemail = await request.app.locals.client.query(`SELECT * FROM members WHERE email = '${generalArray[3]}';`);

        if(isUniqueusername.rows[0].id != userID){
            if(isUniqueusername.rows.length > 0){
                return response.status(400).json({success: false, message: 'Username is not unique. Please provide a more unique username...'});
            }    
        }
        
        if(isUniqueemail.rows[0].id != userID){
            if(isUniqueemail.rows.length > 0){
                return response.status(400).json({success: false, message: 'Email is not unique. Please provide a more unique email...'});
            }
        }

        const generalResult = await request.app.locals.client.query(`
        UPDATE members 
        SET username='${generalArray[0]}', 
        full_name='${generalArray[1]}', 
        bio='${generalArray[2]}',
        email='${generalArray[3]}', 
        phone_number = '${generalArray[4]}' 
        WHERE id=${userID} RETURNING *;`);

        //Check if they have a entry in the healthMetrics table already
        const healthCheck = await request.app.locals.client.query (`SELECT EXISTS (SELECT 1 FROM healthmetrics WHERE member_id=${userID}) AS id_exists;`);
        
        //If the entry does not exist, insert the id into the table
        if(!healthCheck.rows[0].id_exists){
            const healthInsert = await request.app.locals.client.query(`INSERT INTO healthmetrics(member_id) VALUES (${userID});`);
        }

        const healthResult = await request.app.locals.client.query(`
        UPDATE healthmetrics 
        SET member_age = ${healthArray[0]},
        member_gender='${healthArray[1]}',
        member_currweight=${healthArray[2]},
        member_height_inches=${healthArray[3]},
        activity_level = ${healthArray[4]},
        fitness_goal=${healthArray[5]},
        member_goalweight=${healthArray[6]}, 
        weekly_goal=${healthArray[7]}, 
        optional_goals = '${healthArray[8]}' 
        WHERE member_id=${userID} RETURNING *;`);

        //Check if they have a entry in the payment table already
        const paymentCheck = await request.app.locals.client.query (`SELECT EXISTS (SELECT 1 FROM billinginfo WHERE member_id=${userID}) AS id_exists;`);
        
        //If the entry does not exist, insert the id into the table
        if(!paymentCheck.rows[0].id_exists){
            const paymentInsert = await request.app.locals.client.query(`INSERT INTO billinginfo(member_id) VALUES (${userID}) RETURNING *;`);
        }

        const paymentResult = await request.app.locals.client.query(`
        UPDATE billinginfo
        SET card_number = '${paymentArray[0]}',
        card_name = '${paymentArray[1]}',
        card_expmonth = ${paymentArray[2]},
        card_expyear = ${paymentArray[3]},
        card_cvv = '${paymentArray[4]}',
        billing_address = '${paymentArray[5]}',
        postal_code = '${paymentArray[6]}'
        WHERE member_id=${userID} RETURNING *;`);

        response.status(200).json({success: true, message: 'Changes saved...'});
    }catch(err){
        console.error('Error saving new profile: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});
//End of profile page requests

//Request handles for pricing page
//Get current membership type
router.post('/getmembership', async (request, response) =>{
    const { userID } = request.body;
    try{
        const currentTypeQuery = await request.app.locals.client.query(`SELECT membership_type FROM members WHERE id=${userID};`);
        const currentType = currentTypeQuery.rows[0];

        response.status(200).json({success: true, message: '', type: currentType.membership_type});
    } catch(err){
        console.error('Error getting membership type: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Adds payment to clubsPayment once the user confirms his purchase
router.post('/addpayment', async (request, response) =>{
    const { userID, type, payment } = request.body;
    try{
        //Check if the username and emails are unique and do not exist already
        const getBillingId = await request.app.locals.client.query(`SELECT billing_id FROM billinginfo WHERE member_id = '${userID}';`);
        const billingID = getBillingId.rows[0];

        if(billingID.length > 0){
            return response.status(400).json({success: false, message: 'Billing Information is missing. Please update in profile page...'});
        }

        const addPaymentQuery = await request.app.locals.client.query(`INSERT INTO clubpayments(billing_id, amount, payment_type) VALUES (${billingID.billing_id}, ${payment}, '${type}')`);
        
        const membership = "Pending payment...";
        const changeMembershipQuery = await request.app.locals.client.query(`UPDATE members
        SET membership_type = '${membership}'
        WHERE id=${userID} RETURNING *;`);
        response.status(200).json({success: true});
    } catch(err){
        console.error('Error adding payment to table: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});
//End of pricing page requests
/*End of request handles for members side*/


/*Handles requests from trainers side*/
//Request handles for schedule management
//Gets information for management page
router.post('/manageinfo', async(request, response) => {
    const { userID } = request.body;

    try{
        const personalSessionsQuery = await request.app.locals.client.query(`SELECT * FROM personal_training_sessions WHERE trainer_id=${userID}`);
        const personalSessions = personalSessionsQuery.rows;

        let sessionResult = [];
        for(let i=0; i < personalSessions.length; i++){
            const rowResult = {};
            rowResult.id = personalSessions[i].session_id;
            
           //Get member name according to their ID
            const memberNameQuery = await request.app.locals.client.query(`SELECT full_name FROM members WHERE id=${personalSessions[i].member_id}`);
           if(memberNameQuery.rows.length > 0){
            rowResult.memberName = memberNameQuery.rows[0].full_name;
           }
           
           //Get room number, day, time start, and duration based on the room id
           const roomInfoQuery = await request.app.locals.client.query(`SELECT room_number, day_of_week, time_start, duration_minutes FROM room_bookings WHERE room_id=${personalSessions[i].room_id}`);
            if(roomInfoQuery.rows.length > 0){
                rowResult.roomNumber = roomInfoQuery.rows[0].room_number;
                rowResult.day = roomInfoQuery.rows[0].day_of_week;
                rowResult.timeStart = roomInfoQuery.rows[0].time_start;
                rowResult.duration = roomInfoQuery.rows[0].duration_minutes;
            }

           //Append the session purpose to the end
           rowResult.purpose = personalSessions[i].session_purpose;

           sessionResult.push(rowResult);
        }

        const trainerAvailabilityQuery = await request.app.locals.client.query(`SELECT * FROM trainers_availability WHERE trainer_id=${userID}`);
        const trainerAvailability = trainerAvailabilityQuery.rows;

        response.status(200).json({success: true, sessionResult, trainerAvailability});
    } catch(err){
        console.error('Error fetching trainer schedule info: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Cancels the appropriate personal training session with a member
router.post('/cancelsession', async(request, response) => {
    const { userID, sessionID } = request.body; 

    try{
        const getSessionQuery = await request.app.locals.client.query(`SELECT room_id FROM personal_training_sessions WHERE session_id=${sessionID};`);
        const sessionRoomID = getSessionQuery.rows[0].room_id;

        const emptyRoomBookingQuery = await request.app.locals.client.query(`
        UPDATE room_bookings
        SET day_of_week = '',
        time_start = '00:00:00',
        duration_minutes = 0,
        is_booked = FALSE,
        room_use_type = 'Not Booked'
        WHERE room_id=${sessionRoomID};`);

        const deleteSessionQuery = await request.app.locals.client.query(`DELETE FROM personal_training_sessions WHERE session_id=${sessionID};`);

        response.status(200).json({success: true});
    } catch(err){
        console.error('Error deleting personal training session: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});

//Update trainer's availability based on the day updated
router.post('/updateavailability', async(request, response) => {
    const { userID, day, timeStart, timeEnd } = request.body;

    try{
        //Check if the day being updated is already in the table
        const dayCheck = await request.app.locals.client.query (`SELECT EXISTS (SELECT 1 FROM trainers_availability WHERE trainer_id=${userID} AND day_of_week='${day}') AS id_exists;`);
        
        //If the entry does not exist, insert the id into the table
        if(!dayCheck.rows[0].id_exists){
            const dayInsert = await request.app.locals.client.query(`INSERT INTO trainers_availability(trainer_id, day_of_week) VALUES (${userID}, '${day}') RETURNING *;`);
        }

        const updateAvailabilityQuery = await request.app.locals.client.query(`
        UPDATE trainers_availability
        SET start_time = '${timeStart}',
        end_time = '${timeEnd}'
        WHERE trainer_id=${userID} AND day_of_week='${day}';`);

        response.status(200).json({success: true, message: 'Update Successful'});
    } catch(err){
        console.error('Error deleting personal training session: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});
//End of schedule management requests

//Request handles for member search
//Searches for members using the search terms provided
router.post('/searchTable', async(request, response) => {
    const { searchTerm } = request.body;

    try{
        const searchQuery = await request.app.locals.client.query(`SELECT id, full_name, email, join_date, membership_type FROM members WHERE full_name ILIKE '%' || '${searchTerm}' || '%';`);
        const searchResult = searchQuery.rows;

        response.status(200).json({success: true, searchResult});
    } catch(err){
        console.error('Error searching for members in table: ', err);
        response.status(500).json({success: false, message: 'Internal Server Error...'});
    }
});
//End of member search requests
/*End of requests from trainers side*/


/*Handles requests from admin side*/
/*End of requests handles from admin side*/
module.exports = router;