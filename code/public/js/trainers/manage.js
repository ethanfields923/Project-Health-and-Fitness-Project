//Js file for trainer schedule schedule management on trainer page

//Initializes schedule management page when loaded
async function manage_init(){
    try{
        const userID = sessionStorage.getItem('ID');

        const response = await fetch('/manageinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
        });
        const data= await response.json();

        if(data.success){
            let personalArray = data.sessionResult;
            updateTable(personalArray);

            let availableArray = data.trainerAvailability;
            updateDays(availableArray);
        }else{
            alert(data.message);
        }
    } catch(err){
        console.error('Error initializing schedule management page: ', err);
        alert('An error occured while initializing schedule management page. Please try again later...');
    }
}

//Updates personal sessions table with appropriate information
function updateTable(personalArray){
    if(personalArray.length === 0){
        document.getElementById("schedule-table").style.display = "none";
        document.getElementById('noSessionMsg').style.display = "block";
    } else{
        document.getElementById("schedule-table").style.display = "table";
        let array = personalArray;            
        let table = document.getElementById('scheduleTable');
        table.innerHTML = '';

        array.forEach(session => {
            const row = document.createElement('tr');
            row.innerHTML = `<td><button type="submit" class="scheduleBtn cancelBtn" name="cancelsession" onclick="cancel_session(${session.id}, event)">Cancel</td>
                             <td>${session.memberName}</td>  
                             <td>${session.roomNumber}</td>
                             <td>${session.day}</td>
                             <td>${session.timeStart}</td>
                             <td>${session.duration}</td>
                             <td>${session.purpose}</td>`;
            table.appendChild(row);
        });    
        return;
    }
}

//Sets the availabilities for each day accordingly
function updateDays(availArray){
    if(availArray.length > 0){
        const array = availArray;

        array.forEach(day => {
            const name = day.day_of_week 
            const dayNumber = getDayNumber(name);

            const startTimeInputId = "timeStart" + dayNumber;
            const endTimeInputId = "timeEnd" + dayNumber;

            document.getElementById(startTimeInputId).value = day.start_time;
            document.getElementById(endTimeInputId).value = day.end_time;
        });
    }
    return;
}

//Helper function for returning day index
function getDayNumber(dayName){
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(dayName) + 1;
}

//Allows trainer to cancel personal training session
async function cancel_session(value, event){
    try{
        //event.preventDefault();
        const userID = sessionStorage.getItem('ID');
        const sessionID = value;

        const response = await fetch('/cancelsession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID, sessionID })
        });
        const data= await response.json();

        if(data.success){
            manage_init();
        }else{
            alert(data.message);
        }
    } catch (err){
        console.error('Error cancelling session: ', err);
        alert('An error occured while trying to cancel session. Please try again later...');
    }
}

//Updates the trainer's availability according to the input values given for the specific day
async function update_availability(value){
    try{
        const userID = sessionStorage.getItem('ID');
        const day = value;
        const dayNumber = getDayNumber(day);
        const timeStartInput = 'timeStart' + dayNumber;
        const timeEndInput = 'timeEnd' + dayNumber;
        const timeStart = document.getElementById(timeStartInput).value;
        const timeEnd = document.getElementById(timeEndInput).value;

        if(timeStart > timeEnd){
            alert('ERROR: Invalid input detected. Recheck your input for correctness...');
            return;
        }
        console.log('Hello');
        const response = await fetch('/updateavailability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID, day, timeStart, timeEnd })
        });
        const data= await response.json();
        
        if(data.success){
            manage_init();
        }
        alert(data.message);
    } catch(err){
        console.error('Error updating availabilities: ', err);
        alert('An error occured while updating availabilities. Please try again later...');
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    manage_init();

    const updateButtons = document.getElementsByName('updateDay');

    updateButtons.forEach(button =>{
        button.addEventListener('click', (e) => {
            e.preventDefault();
            update_availability(button.value);
        })
    })
});