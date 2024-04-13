//Js file for the profile page on the members side

//Initializes profile page with existing values from the database
async function profile_init(){
    const userID = sessionStorage.getItem('ID');
    
    try{
        const response = await fetch('/profileinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
        });
        const data= await response.json();
        if(data.success){
           //For General Section 
           document.getElementById('usernameDisplay').innerHTML = data.responseData.general.username;
           document.getElementById('joindateDisplay').innerHTML = data.responseData.general.joinDate.substring(0,10);
           document.getElementById('generalUsername').value = data.responseData.general.username;
           document.getElementById('generalName').value = data.responseData.general.full_name;
           document.getElementById('generalMembership').value = data.responseData.general.membership_type;
           document.getElementById('bioArea').value = data.responseData.general.bio;
           document.getElementById('generalEmail').value = data.responseData.general.email;
           document.getElementById('generalPhonenumber').value = data.responseData.general.phone;

           //If the member has data in the healthmetrics table
           if(data.responseData.health.hasData){
                //For Health Stats Section
                document.getElementById('healthAge').value = data.responseData.health.age;
                if(data.responseData.health.gender == "Male"){
                    document.getElementById("healthMale").checked = true;
                }else if(data.responseData.health.gender == "Female"){
                    document.getElementById("healthFemale").checked = true;
                }else if(data.responseData.health.gender == "Prefer not to say"){
                    document.getElementById("healthGendernot").checked = true;
                }
    
                document.getElementById('healthWeight').value = data.responseData.health.current_weight;
                
                const feet = Math.floor(data.responseData.health.height_in/12);
                const inch = data.responseData.health.height_in%12;
                document.getElementById('healthHeight_ft').value = feet;
                document.getElementById('healthHeight_in').value = inch;
                
                const BMI = calculateBMI(data.responseData.health.height_in, data.responseData.health.current_weight);
                document.getElementById('healthBMI').value = BMI;
    
                document.getElementById("healthLvl").value = data.responseData.health.activityLvl;
    
                //For Fitness Goals Section
                document.getElementById("goalOverall").value = data.responseData.health.fitnessGoal;
                document.getElementById("goalWeight").value = data.responseData.health.goal_weight;
                document.getElementById("goalWeekly").value = data.responseData.health.weeklyGoal;
                document.getElementById("goalOptional").value = data.responseData.health.opgoals;
           }
           
           if(data.responseData.payment.hasData){
                //For Payment Info Section
                document.getElementById("paymentCardNumber").value = data.responseData.payment.cardNumber;
                document.getElementById("paymentCardName").value = data.responseData.payment.cardName;
                document.getElementById("paymentCardMonth").value = data.responseData.payment.expmonth;
                document.getElementById("paymentCardYear").value = data.responseData.payment.expyear;
                document.getElementById("paymentCVV").value = data.responseData.payment.cvv;
                document.getElementById("paymentAddress").value = data.responseData.payment.address;
                document.getElementById("paymentPostCode").value = data.responseData.payment.postalcode;
           }
           
        }
        return data.success;
    }
    catch(err){
        console.error('Error initializing profile page: ', err);
        alert('An error occured during the initialization of the profile page. Please try again later...');
        return false;
    }
}

//Allows member to manage their profile by updating personal info, fitness goals, or health metrics
async function profile_save(){
    if(confirm("Are you sure you wish to save changes?") == true){
        try{
            const userID = sessionStorage.getItem('ID');

            //For General Section 
            const username = document.getElementById('generalUsername').value;
            const fullName = document.getElementById('generalName').value;
            const generalBio = document.getElementById('bioArea').value;
            const email = document.getElementById('generalEmail').value;
            const phone = document.getElementById('generalPhonenumber').value;

            const generalArray = [username, fullName, generalBio, email, phone];

            //For Health Stats Section
            const age = document.getElementById('healthAge').value;
            let gender;
            if(document.getElementById("healthMale").checked){
                gender = "Male";
            }else if(document.getElementById("healthFemale").checked){
                gender = "Female";
            }else if(document.getElementById("healthGendernot").checked){
                gender = "Prefer not to say";
            }else{
                gender = "Not selected";
            }

            const currentWeight = document.getElementById('healthWeight').value;
            
            const feet = document.getElementById('healthHeight_ft').value;
            const inch = document.getElementById('healthHeight_in').value;
            let totalHeight;
            if(feet > 0 || inch > 0){
                totalHeight = +(feet*12) + +inch;
            }else{
                totalHeight = 0;
            }
            
            const activity = document.getElementById("healthLvl").value;

            //For Fitness Goals Section
            const fitnessGoal = document.getElementById("goalOverall").value;
            const weightGoal = document.getElementById("goalWeight").value;
            const weeklyGoal = document.getElementById("goalWeekly").value;
            const opGoal = document.getElementById("goalOptional").value;

            const healthArray = [age, gender, currentWeight, totalHeight, activity, fitnessGoal, weightGoal, weeklyGoal, opGoal];

            //For Payment Info Section
            const cardNumber = document.getElementById("paymentCardNumber").value;
            const cardName = document.getElementById("paymentCardName").value;
            const cardMonth = document.getElementById("paymentCardMonth").value;
            const cardYear = document.getElementById("paymentCardYear").value;
            const cardCVV = document.getElementById("paymentCVV").value;
            const cardAddress = document.getElementById("paymentAddress").value;
            const cardPostCode = document.getElementById("paymentPostCode").value;

            const paymentArray = [cardNumber, cardName, cardMonth, cardYear, cardCVV, cardAddress, cardPostCode];

            const response = await fetch('/saveprofile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID, generalArray, healthArray, paymentArray })
            })
            .catch(err => {
                console.error('Network error: ', err);
                throw new Error('Network error');
            })
            const data= await response.json();
            console.log('Completed request');     
            alert(data.message);
            if(data.success){
                profile_init();
            }
        }catch (err){
            console.error("Error during profile update process: ", err);
            alert("Something went wrong during the profile update process...");
        }
    }
}

function profile_cancel(){
    if(confirm('Are you sure you wish to cancel your changes?') == true){
        profile_init();
    }
}

//Is used for calculating BMI using weight in lbs and height in inches
function calculateBMI(height, weight) {

    if(height > 0 && weight > 0){
        const BMI = (weight/(height**2)) * 703;
        result = BMI.toFixed(2);
    } else{
        result = 0.0;
    }

    return result;
}

document.addEventListener("DOMContentLoaded", () =>{
    profile_init();

    document.getElementById('profile_save_button').addEventListener('click', profile_save);
    document.getElementById('profile_cancel_button').addEventListener('click', profile_cancel);
});
