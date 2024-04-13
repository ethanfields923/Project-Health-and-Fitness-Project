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

//Shows the password on either the login page or register page
function showLoginPasscode(){
    let pass = document.getElementById("signinPasscode");
    if(pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    } 
}

function showRegisterPasscode(){
    let newpass = document.getElementById("signupPasscode");
    let confirmpass = document.getElementById("comPasscode");
    if(newpass.type === "password") {
        newpass.type = "text";
        confirmpass.type = "text";
    } else {
        newpass.type = "password";
        confirmpass.type = "password";
    } 
}

//Checks if an option was selected or not, and sets the user type var so that the program knows which database to check
function check_type(){
    const options = document.getElementsByName('user_type');
    let isChecked = false;

    for(let i = 0; i < options.length; i++){
        if(options[i].checked){
            isChecked = true;
            break;
        }
    }
    if(isChecked){
        const user_type = document.querySelector('input[name="user_type"]:checked').value;
        user = user_type;
    }
    return isChecked;
    
}

//Checks the database to see if the user already in the system or if they provided the correct information
async function login_authenicate(){
    const username = document.getElementById("signinUsername").value;
    const password = document.getElementById("signinPasscode").value;
    
    try {    
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, username, password})
        });
        const data = await response.json();
            if(data.success){
                if(user === 'members'){
                    sessionStorage.setItem('ID', data.id);
                    window.location.href = "/homemember";
                }else if(user === 'trainers'){
                    sessionStorage.setItem('ID', data.id);
                    window.location.href = "/hometrainer";
                }else if(user === 'admin'){
                    //The admin ID is not important for the admin operations, hence it can be ignored and can go straight to the admin home page
                    window.location.href = "/homeadmin";
                }else{
                    alert('Something went wrong with the login...');
                }
            }
            return data.success;
    }
    catch (err){
        console.error('Error during login process: ', err);
        alert('An error occured during the login process. Please try again later...')
        return false;
    }
}

//Registers the new member into the database as long as they have a Unique username and unique email (this function is only used for creating new 
//members; can not create new trainers or admin staff since they will be provided in the dml file)
async function register_new_user(){
        const username = document.getElementById("signupUsername").value;
        const fullName = document.getElementById("signupfullName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPasscode").value;
        const compassword = document.getElementById("comPasscode").value;
        const joinDate = new Date().toISOString().split('T')[0];
        
        if(username.length >= 5){
           if(password === compassword){
            try {    
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, fullName, email, password, joinDate })
                });
                const data = await response.json();
                alert(data.message);
                return data.success;
            }
            catch (err){
                console.error('Error registering new member: ', err);
                alert('An error occured during the register process. Please try again later...')
                return false;
            }
           }else{
            document.getElementById('isMatchError').innerHTML = 'Passwords do not match';
           }
        }else{
            alert('Username is too short. Make sure the username is at least 10 characters in length and is unique...');
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
    });

    userTypeForm.addEventListener("submit", e=>{
        e.preventDefault(); 

        if(check_type() === false){
            setFormMessage(userTypeForm, "error", "Select one of the options");
        }else{
            //Since we don't want the user to create a new trainer or admin staff member, we will hide the register new user link depending on the user type
            let x = document.getElementById("linkcreateNewAccount");
            if(user === "members"){
                 x.style.display = "block";
             }else{
                x.style.display = "none";
            } 

            //Hides the usertype form and shows the login form
            loginForm.classList.remove("form--hidden");
            userTypeForm.classList.add("form--hidden");

            //In case the invalid message is shown already in login form
            setFormMessage(loginForm, "error", "");
        }
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();     
        login_authenicate()
        .then(result => {
            if(!result){
                setFormMessage(loginForm, 'error', 'Invalid Username and/or Password. Please try again');
            } else{
                setFormMessage(loginForm, 'success', '');
            }
        })
        .catch(err => {
                console.error("Error during login process: ", err);
        });
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        document.getElementById('isMatchError').innerHTML = "";
        register_new_user()
        .then(result => {
            if(result){
                loginForm.classList.remove('form--hidden');
                createAccountForm.classList.add('form--hidden');
            }
        })
        .catch(err => {
            console.error("Error during register process: ", err);
        });
    });

   document.querySelectorAll(".form__input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 5){
                setInputError(inputElement, "Username must be at least 5 characters in length");
            }
        });

        inputElement.addEventListener("input", e =>{
            clearInputError(inputElement);
        });
    });   

    document.addEventListener('keyup', handleKeyUp);
});
