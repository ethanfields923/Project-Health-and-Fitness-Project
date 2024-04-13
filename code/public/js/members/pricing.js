//Js file for pricing page on the members' side
//Initializes pricing page
async function pricing_init(){
    const userID = sessionStorage.getItem('ID');

    try {    
        const response = await fetch('/getmembership', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
        });
        const data = await response.json();
        document.getElementById('currentMembership').innerHTML = data.type;    
        return data.success;
    }
    catch (err){
        console.error('Error during pricing initialization process: ', err);
        alert('An error occured during the pricing initialization process. Please try again later...')
    }
}

//Handles payment for membership plan  
async function member_payment(type, payment){
    const userID = sessionStorage.getItem('ID');

    try {    
        const response = await fetch('/addpayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID, type, payment })
        });
        const data = await response.json();
        if(!data.success){
            alert(data.message);
        }

        pricing_init();
        return data.success;
    }
    catch (err){
        console.error('Error during membership payment process: ', err);
        alert('An error occured during the payment process. Please try again later...')
    }
}

//Confirms payment plan 
function confirm_paymentPlan(paymentPlan){
   const amount = paymentPlanAmount(paymentPlan);
   const currentPlan = document.getElementById('currentMembership').innerHTML;

   if(paymentPlan === currentPlan){
        alert("You have already bought this plan...");
   }else{
        if(currentPlan === 'Pending payment...'){
            alert('The last plan you purchased is still pending. Please wait...');
        } else{
            if(confirm("Confirm payment for " + paymentPlan + " membership at $ " + amount) == true){
                member_payment(paymentPlan, amount)
                .then(result => {
                    if(result){
                        alert("Payment successful! An offical welcome from the HAFC team!");
                    }
                });       
            }
        }  
   }
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

document.addEventListener("DOMContentLoaded", () =>{
    pricing_init();

    const membershipButtons = document.getElementsByName('membership');

    membershipButtons.forEach(button => {
        button.addEventListener('click', ()=> {
            confirm_paymentPlan(button.value);
        });
    });
});
