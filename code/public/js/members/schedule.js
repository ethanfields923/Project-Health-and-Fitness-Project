//Js file for schedule page for members
//Initializes schedule page
async function schedule_init(){
    try{
        const userID = sessionStorage.getItem('ID');
        
        const response = await fetch('/scheduleinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
        });
        const data= await response.json();

        if(data.success){
            updateTable('mine1', data.personalResult);
            updateTable('mine2', data.myGroupResult);
            updateTable('group', data.groupResult);
            updateTable('personal', data.trainersResult);
        } else{
            alert(data.message);
        }
    } catch(err){
        console.error('Error initializing schedule page: ', err);
        alert('An error occured while initializing schedule page. Please try again later...');
    }
}

//Allows the member to register for the available group fitness classes
async function class_register(value, event){
    try{
        event.preventDefault();
        const userID = sessionStorage.getItem('ID');
        if(confirm("Registration is 50$. Are you sure to wish to pay?") == true){
            const response = await fetch('/registerclass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID, value })
            });
            const data= await response.json();
            
            alert(data.message);
            if(data.success){
                schedule_init();
            }
        }
    } catch(err){
        console.error('Error initializing schedule page: ', err);
        alert('An error occured while initializing schedule page. Please try again later...');
    }

}

//Allows the member to deregister from a group fitness class they signed up for
async function class_deregister(value, event){

}

//Allows the member to register for a personal training session with a certified trainer
async function training_book(value, event){

}

//Allows the members to reschedule the personal training session 
async function training_reschedule(value, event){

}

//Allows the members to cancel the personal training session
async function training_cancel(value, event){
    
}

//Opens schedule tab and makes the appropriate updates
function openScheduleTab(tabName, evt, color) {
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
}

//Build the table based on the tabName and if the table is already made or not
function updateTable(tabName, classArray){
    switch(tabName){
        case 'group':
            document.getElementById("group-table").style.display = "table";
            let array1 = classArray;       
            let table1 = document.getElementById('groupTable');
        
            for(let i=0; i< array1.length; i++){
                let spots = +array1[i].max - +array1[i].current;
                let row = `<tr>
                           <td><button class="scheduleBtn" onclick="class_register(${array1[i].id}, event)">Register</button><br>${spots} spots left</br></td>
                           <td>${array1[i].className}</td>
                           <td>${array1[i].roomNumber}</td>
                           <td>${array1[i].day}</td>
                           <td>${array1[i].timeStart}</td>
                           <td>${array1[i].duration}</td>
                           <td>${array1[i].instructor}</td>     
                           </tr>`;
                table1.innerHTML += row;
            }

            if(table1.rows.length < 1){
                document.getElementById('noClassMsg').style.display = "block";
                document.getElementById("group-table").style.display = "none";
            }else{
                document.getElementById('noClassMsg').style.display = "none";  
            }

            break;

        case 'personal':
            document.getElementById("personal-table").style.display = "table";
            let array2 = classArray;            
            let table2 = document.getElementById('personalTable');
        
            for(let i=0; i< array2.length; i++){
                let row = `<tr>
                           <td><button class="scheduleBtn" onclick="training_book(${array2[i].id}, event)">Book</button></td>
                           <td>${array2[i].full_name}</td>
                           <td>${array2[i].age}</td>
                           <td>${array2[i].email}</td>
                           <td>${array2[i].gender}</td>
                           <td>${array2[i].specializations}</td>
                           <td>${array2[i].favourite_exercise}</td>
                           </tr>`;
                table2.innerHTML += row;
            }

            if(table2.rows.length < 1){
                document.getElementById('noTrainersMsg').style.display = "block";
                document.getElementById("personal-table").style.display = "none";
            }else{
                document.getElementById('noTrainersMsg').style.display = "none";  
            }

            break;

           
        case 'mine1':
            document.getElementById("mine1-table").style.display = "table";
            let array3 = classArray;            
            let table3 = document.getElementById('mine1Table');
            
            for(let i=0; i< array3.length; i++){   
                let row = `<tr>
                           <td><button class="scheduleBtn" onclick="training_reschedule(${array3[i].id}, event)">Reschedule</button></td>
                           <td><button class="scheduleBtn btn--cancel" onclick="training_cancel(${array3[i].id}, event)">Cancel</button></td>
                           <td>${array3[i].trainerName}</td>
                           <td>${array3[i].roomNumber}</td>
                           <td>${array3[i].day}</td>
                           <td>${array3[i].timeStart}</td>
                           <td>${array3[i].duration}</td>
                           <td>${array3[i].purpose}</td>
                           </tr>`;
                    table3.innerHTML += row;
                
            }
            
            //Check if there are rows in the tables or not; else, display a message stating so
            if(table3.rows.length < 1){
                document.getElementById('noSessionMsg').style.display = "block";
                document.getElementById("mine1-table").style.display = "none";
            }else{
                document.getElementById('noSessionMsg').style.display = "none";
            }

            break;

        case 'mine2':
            document.getElementById("mine2-table").style.display = "table";
            let array4 = classArray;    
            let table4 = document.getElementById('mine2Table');
            for(let i=0; i< array4.length; i++){
                let row = `<tr>
                           <td><button class="scheduleBtn" onclick="class_deregister(${array4[i].id}, event)">Deregister</button></td>
                           <td>${array4[i].className}</td>
                           <td>${array4[i].roomNumber}</td>
                           <td>${array4[i].day}</td>
                           <td>${array4[i].timeStart}</td>
                           <td>${array4[i].duration}</td>
                           <td>${array4[i].instructor}</td>
                           </tr>`;
                table4.innerHTML += row;
            }
            
            setTimeout(function() {
                if(table4.rows.length < 1){
                    document.getElementById('noClassMsg').style.display = "block";
                    document.getElementById("mine2-table").style.display = "none";
                }else{
                    document.getElementById('noClassMsg').style.display = "none";  
                }
            }, 0);
            
            break;

        default: 
            return;
    };
}

document.addEventListener("DOMContentLoaded", () =>{
    schedule_init();

    document.getElementById("schedule_defaultOpen").click();
});