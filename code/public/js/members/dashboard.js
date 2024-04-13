//Js file for the dashboard page on the members side
let currentExerciseCard = null;         //Holds the current exercise card which is showing its exercises

//Initializes the dashboard page
async function dashboard_init(){
    const userID = sessionStorage.getItem('ID');
    try{
        const response = await fetch('/dashinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
        });
        const data= await response.json();

        if(data.success){
            updateWeight(data.responseData.health.currentWeight, data.responseData.health.goalWeight);
            update_currentWeekStreak(data.responseData.dashboard.weekStreak, data.responseData.health.weeklyGoal);
            update_trophiesEarned(data.responseData.dashboard.trophyNum);
            update_hotStreak(data.responseData.dashboard.hotStreak);
            update_currentRoutine(data.responseData.dashboard.routine_id);
        }
        return data.success;
    } catch(err){
        console.error('Error initializing dashboard page: ', err);
        alert('An error occured during the initialization of the dashboard page. Please try again later...');
        return false;
    }
}

function updateWeight(current, goal){
    document.getElementById('currentWeight').innerHTML = 'Currently at ' + current + 'lbs';

    if(goal == 0){
        document.getElementById('goalDistance').innerHTML = 'Update your weight goal in your profile first';
    }else if(current > goal){
        const equation = +current - +goal;
        document.getElementById('goalDistance').innerHTML = 'You are ' + equation + ' lbs above your weight goal';
    } else if(goal > current){
        const equation = +goal - +current;
        document.getElementById('goalDistance').innerHTML = 'You are ' + equation + ' lbs below your weight goal';
    } else if(goal == current){
        document.getElementById('goalDistance').innerHTML = 'Congrats! You made it to your weight goal';
    } else{
        document.getElementById('goalDistance').innerHTML = 'Something is wrong';
    }
    return;
}

function update_currentWeekStreak(current, goal){
    document.getElementById('weekGoal').innerHTML = current + '/' + goal + ' days done. ';

    if(current == goal){
        document.getElementById('weekGoal').innerHTML += "Congrats!";
    } else if(current < goal) {
        document.getElementById('weekGoal').innerHTML += "Keep it up!";
    } else if(current == 0) {
        document.getElementById('weekGoal').innerHTML += "Let's get started!";
    } else{
        document.getElementById('weekGoal').innerHTML += "Something went wrong...";
    }
}

function update_trophiesEarned(number){

    if(number == 0){
        document.getElementById('earnTrophy').innerHTML = 'No trophies earned yet';
    } else if(number == 1){
        document.getElementById('earnTrophy').innerHTML = number + ' trophy earned';
    } else{
        document.getElementById('earnTrophy').innerHTML = number + ' trophies earned';
    }
}

function update_hotStreak(streak){
    document.getElementById('currentStreak').innerHTML = streak + ' days in a row! ';

    if(streak < 5){
        document.getElementById('currentStreak').innerHTML += 'Onto a good start!'; 
    } else{
        document.getElementById('currentStreak').innerHTML += "You're on fire!";
    }
}

function update_currentRoutine(routine){
    if(routine == 1){
        document.getElementById('currentPlan').innerHTML = 'BIG LIFTS';
        document.getElementById('currentRoutineCard1').classList.remove("hidden");
        document.getElementById('routineCard1').classList.add("hidden");
    } else if(routine == 2){
        document.getElementById('currentPlan').innerHTML = 'FAT LOSS';
        document.getElementById('currentRoutineCard2').classList.remove("hidden");
        document.getElementById('routineCard2').classList.add("hidden");
    } else if(routine == 3){
        document.getElementById('currentPlan').innerHTML = 'MUSCLE BUILDER';
        document.getElementById('currentRoutineCard3').classList.remove("hidden");
        document.getElementById('routineCard3').classList.add("hidden");
    } else if(routine == 4){
        document.getElementById('currentPlan').innerHTML = 'CARDIO BUNNY';
        document.getElementById('currentRoutineCard4').classList.remove("hidden");
        document.getElementById('routineCard4').classList.add("hidden");
    } else {
        document.getElementById('currentPlan').innerHTML = 'No routine selected';
    }
}

async function changeCurrentRoutine(button){
    const userID = sessionStorage.getItem('ID');
    try{
        const newRoutine = button;
        const response = await fetch('/updateCurrentRoutine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID, newRoutine })
        });

        const data= await response.json();

        if(data.success){
            const current = document.getElementById('currentPlan').innerHTML;

            if(current == "BIG LIFTS"){
                document.getElementById('currentRoutineCard1').classList.add('hidden');
                document.getElementById('routineCard1').classList.remove('hidden');
            } else if(current == "FAT LOSS"){
                document.getElementById('currentRoutineCard2').classList.add('hidden');
                document.getElementById('routineCard2').classList.remove('hidden');
            } else if(current == "MUSCLE BUILDER"){
                document.getElementById('currentRoutineCard3').classList.add('hidden');
                document.getElementById('routineCard3').classList.remove('hidden');
            } else if(current == "CARDIO BUNNY"){
                document.getElementById('currentRoutineCard4').classList.add('hidden');
                document.getElementById('routineCard4').classList.remove('hidden');
            } else {
                //Do nothing
            }        
           update_currentRoutine(data.new);
        }
        return data.success;
    } catch (err){
        console.error('Error changing current routine: ', err);
        alert('An error occured while trying to change the current routine. Please try again later...');
        return false;
    }
}

async function showExercises(button){
    try{
        let routine;
        let exerciseCard;
        let isCurrent;

        //For current routines
        if(button <= 4){
            routine = button;
            exerciseCard = 'currentRoutineExercise' + button;
            isCurrent = true;
        } else{         //For the other routines to try
            const buttonNew = button - 4;                   //Since these numbers are above 4, subtract them by 4 and set to the thing
            routine = buttonNew;
            exerciseCard = 'routineExercise' + buttonNew;
            isCurrent = false;  
        }

        const response = await fetch('/showExercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ routine })
        });

        const data= await response.json();

        if(data.success){
            for(let i=0; i<data.routineAmount; i++){
                let exerciseHTML = `<div class="dash__card__exercise">`;
                exerciseHTML += `<span class="dash__exercise__text-primary font-weight-bold" style="font-size: 24px;">DAY ${i+1}</span>`;
            
                for(let j=0; j<data.exercises.length; j++){
                    if(data.exercises[j].routine_day == (i+1)){
                        exerciseHTML += `<span class="dash__exercise__text-primary">${data.exercises[j].exercise_name} - ${data.exercises[j].exercise_description}</span>
                                                                                <span class="dash__exercise__text-secondary">${data.exercises[j].exercise_sets} X ${data.exercises[j].exercise_reps}</span>`;
                    }
                }
                if(isCurrent){
                    exerciseHTML += `<button type="button" name="exerciseLog" onclick="logExercise()">Log in</button>`;
                }
                exerciseHTML += `</div>`;

                document.getElementById(exerciseCard).innerHTML += exerciseHTML;
            }
            document.getElementById(exerciseCard).classList.remove('hidden');
        }
        return data.success;
    } catch(err){
        console.error('Error showing exercises: ', err);
        alert('An error occured while trying to show exercises. Please try again later...');
        return false;
    }
}


//Toggles the visibility of the exercises depending on if the show exercises button is pressed
async function toggleExercises(button) {
    try{
        let exerciseCardId;
        if (button <= 4) {
            exerciseCardId = 'currentRoutineExercise' + button;
        } else {
            const buttonNew = button - 4;
            exerciseCardId = 'routineExercise' + buttonNew;
        }
        
        if (currentExerciseCard == exerciseCardId) {
            hideExercises(exerciseCardId);
            currentExerciseCard = null;
            return;
        }

        if (currentExerciseCard !== null) {
            hideExercises(currentExerciseCard);
        }
        
        const checkValue = document.getElementById(exerciseCardId).dataset.value;
        if(checkValue == "false"){
            await showExercises(button);
            document.getElementById(exerciseCardId).dataset.value = true;
        }else{
            document.getElementById(exerciseCardId).classList.remove('hidden');
        }
        currentExerciseCard = exerciseCardId;
    } catch(err){
        console.error('Error toggling exercises: ', err);
        alert('An error occured while trying to toggle through exercises. Please try again later...');
        return false;
    }
}

// Hide exercises
function hideExercises(exerciseCardId) {
    document.getElementById(exerciseCardId).classList.add('hidden');
}

async function logExercise(){
    try{
        const userID = sessionStorage.getItem('ID');

        const response = await fetch('/logExercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID,  })
        });

        const data= await response.json();

        if(data.success){
            dashboard_init();
        }
    } catch(err){
        console.error('Error logging exercises: ', err);
        alert('An error occured while logging the exercise. Please try again later...');
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    dashboard_init();

    const changeButtons = document.getElementsByName('routineChange');
    changeButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            changeCurrentRoutine(button.value);
        });
    });

    const exerciseButtons = document.getElementsByName("exerciseDisplay");
    exerciseButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            toggleExercises(button.value);
        });
    });
});   