//Js file for the member search tab on the trainer page
//Searches for member's based on parameters given
async function searchName(){
    try{
        const searchTerm = document.getElementById("searchBar").value;
        if(searchTerm === ''){
            alert('Please provide a search term first...');
            return false;
        }else{
            const response = await fetch('/searchTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm })
            });
            const data= await response.json();
    
            if(data.success){
                let searchArray = data.searchResult;
    
                updateTable(searchArray);
                document.getElementById('searchNumber').innerHTML = `Member Profiles found: ${searchArray.length} hits`;
            }
          return data.success;     
        }
    } catch(err){
        console.error('Error searching for members: ', err);
        alert('An error occured while searching. Please try again later...');
        return false;
    }
}

//Builds table for the search result if any results are found
function updateTable(searchArray){
    document.getElementById("search-table").style.display = "table";
    let array = searchArray;            
    let table = document.getElementById('searchTable');
    table.innerHTML = '';
        
    array.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = ` <td><button class="scheduleBtn" name="profileview" onclick="view_profile(${member.id}, event)">View</button></td>
                          <td>${member.id}</td>
                          <td>${member.full_name}</td>
                          <td>${member.email}</td>
                          <td>${member.join_date.substring(0,10)}</td>
                          <td>${member.membership_type}</td>`;
        table.appendChild(row);
    });    
    return;
}

//Views profile when button is clicked
async function view_profile(buttonValue, event){
    try{
        event.preventDefault();
        const userID = buttonValue;

        const response = await fetch('/profileinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
        });
        const data= await response.json();

        if(data.success){
            createProfile(data.responseData.general, data.responseData.health);
        }
    } catch(err){
        console.error('Error viewing profile: ', err);
        alert('An error occured while trying to view profile. Please try again later...');
    }
}

//Creates the profile for viewing purposes
function createProfile(general, health){
    const profileContainer = document.getElementById('profilePopup');
    profileContainer.innerHTML = '';                                 //Resets profileContainer in case other data was previously filled in it

    profileContainer.innerHTML += `
    <button type='button' onclick='closeProfile()'><span class="material-icons-outlined">cancel</span>Close</button>
    <h2 class="profile__title">Profile Overview</h2>`;

    //For General section
    profileContainer.innerHTML += `<ul class="profile__section">
    <li class="section__title"><h3>GENERAL</h3></li>
    <li class="section__text">USERNAME: ${general.username}</li>
    <li class="section__text">FULL NAME: ${general.full_name}</li>
    <li class="section__text">EMAIL: ${general.email}</li>
    <li class="section__text">PHONE #: ${general.phone}</li>
    <li class="section__text">DATE JOINED: ${general.joinDate.substring(0,10)}</li>
    <li class="section__text">BIO: ${general.bio}</li>
    <li class="section__text">MEMBERSHIP: ${general.membership_type}</li>
    </ul>`;

    if(health.hasData){
        //For Health Stats section
        const feet = Math.floor(health.height_in/12);
        const inch = health.height_in%12;
        let BMI;
        if(health.height_in > 0 && health.current_weight > 0){
            const calculation = (health.current_weight/(health.height_in**2)) * 703;
            BMI = calculation.toFixed(2);
        } else{
            BMI = 0.0;
        }

        const level = health.activityLvl;
        let activity;
        if(level == 1){
            activity = "Not very Active (Little or no exercise)";
        } else if(level == 2){
            activity = "Lightly Active (Exercise 1-3 times/week)"
        } else if(level == 3){
            activity = "Moderate (Exercise 4-5 times/week)"
        } else if(level == 4){
            activity = "Active (Daily exercise or intense exercise 3-4 times/week)"
        } else if(level == 5){
            activity = "Very Active (Intense exercise 6-7 times/week)"
        } else if(level == 6){
            activity = "Extremely Active (Very intense exercise daily, or physical job)"
        } else{
            activity = "Not Selected"
        }
        profileContainer.innerHTML += `<ul class="profile__section">
        <li class="section__title"><h3>HEALTH STATS</h3></li>
        <li class="section__text">AGE: ${health.age}</li>
        <li class="section__text">GENDER: ${health.gender}</li>
        <li class="section__text">WEIGHT: ${health.current_weight} lbs</li>
        <li class="section__text">HEIGHT: ${feet} ft ${inch} in</li>
        <li class="section__text">BMI: ${BMI}</li>
        <li class="section__text">ACTIVITY LEVEL: ${activity}</li>
        </ul>`;

        //For Fitness Goals section
        let fitGoal;
        if(health.fitnessGoal == 1){
            fitGoal = 'I want to gain weight';
        } else if(health.fitnessGoal == 2){
            fitGoal = 'I want to lose weight';
        } else if(health.fitnessGoal == 3){
            fitGoal = 'I want to maintain weight';
        }else{
            fitGoal = 'Not Selected';
        }
        const weekGoal = health.weeklyGoal + " days per week";

        profileContainer.innerHTML += `<ul class="profile__section">
        <li class="section__title"><h3>FITNESS GOALS</h3></li>
        <li class="section__text">FITNESS GOAL: ${fitGoal}</li>
        <li class="section__text">WEIGHT GOAL: ${health.goal_weight} lbs</li>
        <li class="section__text">WEEKLY GOAL: ${weekGoal}</li>
        <li class="section__text">OPTIONAL GOALS: ${health.opgoals}</li>
        </ul>`;
    } else{
        profileContainer.innerHTML += `<ul class="profile__section">
        <li class="section__title"><h4>'Health Stats' and 'Fitness Goals' sections have not been updated yet...</h4></li>
        `;
    }
    profileContainer.classList.remove('hidden');
    
    const searchContainer = document.querySelector('.search__main');
    searchContainer.classList.add('blurred');  
}

//Closes the view of the profile when the button is pressed
function closeProfile(){
    const profileContainer = document.getElementById('profilePopup');
    profileContainer.innerHTML = '';
    profileContainer.classList.add('hidden');

    const searchContainer = document.querySelector('.search__main');
    searchContainer.classList.remove('blurred');
}

document.addEventListener("DOMContentLoaded", () =>{
    const searchInput = document.getElementById("searchBar");

    searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter'){
            e.preventDefault();
            searchName();
        }
    });
});