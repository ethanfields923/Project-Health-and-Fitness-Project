//const membersArray;   These arrays should be in the members.js file which will be connected to the server.js file which is connected to the postgresql database,
//const personalClassArray;         so rearrange these functions once finished with the front-end implementation
//const mineClassArray;
const groupClassArray = [
        {'name':'Michael', 'age':'30', 'birthdate':'11/10/1989'},
	    {'name':'Mila', 'age':'32', 'birthdate':'10/1/1989'},
	    {'name':'Paul', 'age':'29', 'birthdate':'10/14/1990'},
	    {'name':'Dennis', 'age':'25', 'birthdate':'11/29/1993'},
	    {'name':'Tim', 'age':'27', 'birthdate':'3/12/1991'},
	    {'name':'Erik', 'age':'24', 'birthdate':'10/31/1995'},
];
let groupTablemade = false;
let personalTablemade = false;
let mineTablemade = false;

/*These functions are utilised for the side navigation menu*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "rgb(255,255,255)";
}
/*End of sideNav functions*/


/*Functions for home.html in /views/members*/
function redirectPricing(){location.href = "/code/views/members/pricing.html";}

function redirectProfile(){ location.href = "/code/views/members/profile.html"; }

//May or may not skip this implementation
function slideShowImages(){

}
/*End of home.html functions*/

/*Functions for schedule.html in /views/members*/
function openTab(tabName, evt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("schedule__tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("schedule__tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tabName).style.display = "block";
    evt.style.backgroundColor = color;
    buildTable(tabName);
}

//Build the table based on the tabName and if the table is already made or not
function buildTable(tabName){

    switch(tabName){
        case 'group':
            if(groupTablemade){
                return;
            }else{
                document.getElementById("group-table").style.display = "table";
                let array = groupClassArray;            //groupClassArray is used as a placeholder atm, but it will be filled with data from the database eventually
                let table = document.getElementById('groupTable');
        
                for(let i=0; i< array.length; i++){
                    let row = `<tr>
                                    <td><button class="scheduleBtn">Register</button><br>30 spots left</br></td>
                                    <td>${array[i].name}</td>
                                    <td>${array[i].age}</td>
                                    <td>${array[i].birthdate}</td>     
                               </tr>`
                               //In the register button, include the group class id in the database as the id for the button;e.g., id="group1"
                               //Also if the class has no more spots, disable the register button
                table.innerHTML += row;
                }
                groupTablemade = true;
            }
            break;

        case 'personal':
            if(personalTablemade){
                return;
            }else{
                document.getElementById("personal-table").style.display = "table";
                let array = groupClassArray;            //personalClassArray;
                let table = document.getElementById('personalTable');
        
                for(let i=0; i< array.length; i++){
                    let row = `<tr>
                                    <td><button class="scheduleBtn">Book</button></td>
                                    <td>${array[i].name}</td>
                                    <td>${array[i].age}</td>
                                    <td>${array[i].birthdate}</td>
                               </tr>`
                               //In the book button, include the trainer id in the database as the id for the button;e.g., id="personal1"
                               //Additionally, disable the book button for trainers who are not available
                table.innerHTML += row;
                }
                personalTablemade = true;
            }
            break;

        case 'mine':
            if(mineTablemade){
                return;
            }else{
                document.getElementById("mine1-table").style.display = "table";
                document.getElementById("mine2-table").style.display = "table";
                let array = groupClassArray;             //mineClassArray;
                let table1 = document.getElementById(tabName + '1Table');
                let table2 = document.getElementById(tabName + '2Table');
        
                for(let i=0; i< array.length; i++){
                    if(array[i].name === "Mila"){   //Obviously change this if statement to suit the schedule type
                        let row = `<tr>
                                    <td><button class="scheduleBtn">Reschedule</button></td>
                                    <td><button class="scheduleBtn btn--cancel">Cancel</button></td>
                                    <td>${array[i].name}</td>
                                    <td>${array[i].age}</td>
                                    <td>${array[i].birthdate}</td>
                               </tr>`
                    table1.innerHTML += row;
                    }else{
                        let row = `<tr>
                                    <td><button class="scheduleBtn">Deregister</button></td>
                                    <td>${array[i].name}</td>
                                    <td>${array[i].age}</td>
                                    <td>${array[i].birthdate}</td>
                        </tr>`
                        table2.innerHTML += row;
                    }
                    //Make ids for these buttons of course to handle events
                    //Update the tables if any changes are made 
                }

                //Check if there are rows in the tables or not; else, display a message stating so
                if(table1.rows.length < 1){
                    document.getElementById('noSessionMsg').style.display = "block";
                    document.getElementById("mine1-table").style.display = "none";
                }else{
                    document.getElementById('noSessionMsg').style.display = "none";
                }

                if(table2.rows.length < 1){
                  document.getElementById('noClassMsg').style.display = "block";
                  document.getElementById("mine2-table").style.display = "none";
                }else{
                    document.getElementById('noClassMsg').style.display = "none";  
                }
                mineTablemade = true;
            }
            break;

        default: 
            return;
    };
}

//Update specific table whether it is to disable a button, remove an entry, or reschedule a session
function updateTable(){

}

//Checks if the member has the proper membership to register for group fitness classes, and show prompts for when they register or for when they do not register
function registerGroupClass(){
    //make the specific register button clicked unclickable to show that the member has registered
}

//Sends a prompt which asks the user what kind of session they wish for (Consulation, Personal Training Session, Nutritional Counselling)
//Then it ask the user to confirm the payment for the session (no refunds on cancellation ofc)
//Then disable the specific book button  and make the trainer unavailable for other members
function bookWithTrainer(){

}
/*End of schedule.html functions*/

/*Functions for dashboard.html in /views/members*/
/*End of dashboard.html functions*/

/*Functions for profile.html in /views/members*/
//Is used for calculating BMI using weight in lbs and height in inches
function calculateBMI() {
    //const BMI = (weight(lb)/height(in)^2) * 703;

    //Update BMI after getting the values
}

//Checks if the new weight entered is the goal weight or not
function checkWeight(){

}

//Saves the data entered into the profile menu to the database
function saveProfileChanges(){

}

//Cancels profile changes and resets the input boxes back to their original values or placeholders
function cancelProfileChanges(){

}
/*End of profile.html functions*/

/*Functions for pricing.html in /views/members*/
function confirm_paymentPlan(element){
    const paymentPlan = element.id;
    const amount = paymentPlanAmount(paymentPlan);

    if(amount > 0){
        if(confirm("Confirm payment for " + paymentPlan + " membership at $ " + amount) == true){
            member_payment(paymentPlan);       //Add the value of the amount paid in the argument
            alert("Payment successful! An offical welcome from the HAFC team!");
        }else{
            return;
        }
    }
    return;
}

function paymentPlanAmount(paymentPlan){
    if(paymentPlan === "Basic"){
        return 100;
    }else if(paymentPlan === "Deluxe"){
        return 200;
    }else if(paymentPlan === "Gym Rat"){
        return 300;
    }else{
        return 0;
    }
}
/*End of pricing.html functions*/

//For if user wishes to log out
function logOut(){
    if(confirm("Are you sure you want to log out?") == true){
        window.location.assign("/code/views/logreg.html");
    }else{
        return;
    }
}

document.addEventListener("DOMContentLoaded", () =>{ 


    //Schedule Section
   document.querySelectorAll(".schedule__group_table-sortable th").forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    
            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });
    
    document.getElementById("schedule_defaultOpen").click();
    //document.getElementById('log_out_button').addEventListener('click', logOut);
});