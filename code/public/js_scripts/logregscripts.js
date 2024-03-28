let user;       //Is used to specify the user who is trying to login so that the correct database is selected when checking

//These functions are used for error handling on the login and register form pages
function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message){
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement){
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

//Allows user to use the ENTER key to submit a button
const ENTER = 13
function handleKeyUp(event) {
    event.preventDefault()
     if (event.keyCode === ENTER) {
        document.getElementById("submit_button").click()
    }
}

//Checks if an option was selected or not, and sets the user type var so that the program knows which database to check
function check_type(){
    const user_type = document.querySelector('input[name="user_type"]:checked').value;
    if(user_type === "member"){
        user = "member";
    }else if(user_type === "trainer"){
        user = "trainer";
    }else if(user_type === "admin"){
        user = "admin";
    }else{
        return;
    }
   
   //Since we don't want the user to create a new trainer or admin staff member, we will hide the register new user link depending on the user type
   let x = document.getElementById("linkcreateNewAccount");
   if(user_type === "member"){
    x.style.display = "block";
   }else{
    x.style.display = "none";
   } 

   //Hides the usertype form and shows the login form
   document.getElementById("login").classList.remove("form--hidden");
   document.getElementById("userType").classList.add("form--hidden");
}

//Checks the database to see if the user already in the system or if they provided the correct information
function login_authenicate(){
    //If username and password is valid, then use 'window.location.assign("home.html");' and state "Login Successfully"
    const username = document.getElementById("signinUsername").value;
    const password = document.getElementById("signinPasscode").value;

    if(username == "admin" && password == "123"){
        window.location.assign("/code/views/members/home.html");
        //I will expand this function to where there will be different web pages for members, trainers, and admin staff
    }
    else{
        return;
    }
    /*if(profile_login(username, password)){
       window.location.assign("home.html");
    }else{
        return;
    }*/
}

//Registers the new member into the database as long as they have a Unique username and unique email (this function is only used for creating new 
//members; can not create new trainers or admin staff since they will be provided in the dml file)
function register_new_user(){
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPasscode").value;
        const compassword = document.getElementById("comPasscode").value;


        if(profile_register(username, email, password, compassword)){
            alert("Register successful...");
            //Go back to login form to get the user to sign in
        }else{
            return; 
        }
}

document.addEventListener("DOMContentLoaded", () =>{
    const userTypeForm = document.querySelector("#userType");
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateNewAccount").addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

   document.querySelector("#linkUserType").addEventListener("click", e=>{
        e.preventDefault();
        userTypeForm.classList.remove("form--hidden");
        loginForm.classList.add("form--hidden");
        //clearInputError(userTypeForm);
    });

    userTypeForm.addEventListener("submit", e=>{
        e.preventDefault(); 
        setFormMessage(userTypeForm, "error", "Select one of the options");
    });

    loginForm.addEventListener("submit", e=>{
        e.preventDefault();
        setFormMessage(loginForm, "error", "Invalid username/Password Provided");
    });

    document.getElementById("createAccount").addEventListener("submit", e => {
        e.preventDefault();
    });

   document.querySelectorAll(".form__input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10){
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e =>{
            clearInputError(inputElement);
        });
    });   

    document.getElementById('type_button').addEventListener('click', check_type);
    document.getElementById('login_button').addEventListener('click', login_authenicate);
    document.getElementById('register_button').addEventListener('click', register_new_user);
    document.addEventListener('keyup', handleKeyUp);
});
