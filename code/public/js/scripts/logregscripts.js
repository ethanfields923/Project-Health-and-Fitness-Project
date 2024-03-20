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

//Checks the database to see if the user already in the system or if they provided the correct information
function login_authenicate(){
    //If username and password is valid, then use 'window.location.assign("home.html");' and state "Login Successfully"
    var username = document.getElementById("signinUsername").value;
    var password = document.getElementById("signinPasscode").value;

    if(username == "admin" && password == "123"){
        window.location.assign("home.html");
        //I will expand this function to where there will be different web pages for members, trainers, and admin staff
    }
    else{
        return;
    }
    /*if(profile_login(username, password)){
       window.location.assign("home.html");
       alert("Login Successful...");
    }else{
        return;
    }*/
}

//Registers the user into the database as long as they have a Unique username and unique email
function register_new_user(){
    var username = document.getElementById("signupUsername").value;
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPasscode").value;
    var compassword = document.getElementById("comPasscode").value;


    if(profile_register(username, email, password, compassword)){
        alert("Register successful...");
        //Go back to login form to get the user to sign in

    }else{
        return; 
    }
}

document.addEventListener("DOMContentLoaded", () =>{
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

    document.getElementById('login_button').addEventListener('click', login_authenicate);
    document.getElementById('register_button').addEventListener('click', register_new_user);
    document.addEventListener('keyup', handleKeyUp);
});
