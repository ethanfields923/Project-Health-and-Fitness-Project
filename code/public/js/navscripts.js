//Scripts.js file which is used for common functionality across all pages (for members, trainers, and admin)
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

/*Functions for redirecting pages*/
//For member pages
function redirectHome() {window.location.href = "/homemember"; }
function redirectSchedule() {window.location.href = "/schedulemember";}
function redirectDashboard() {window.location.href = "/dashmember";}
function redirectProfile() {window.location.href = "/profilemember";}
function redirectPricing() {window.location.href = "/pricingmember";}

//For trainer pages
function redirectTrainerHome(){window.location.href = "/hometrainer";}
function redirectSecheduleManage(){window.location.href = "/scheduletrainer";}
function redirectSearch(){window.location.href = "/searchtrainer";}

//For admin pages
function redirectAdminHome(){window.location.href = "/homeadmin";}
function redirectBooking(){window.location.href = "/bookingadmin";}
function redirectMaintenance(){window.location.href = "/maintainadmin";}
function redirectUpdate(){window.location.href = "/updateadmin";}
function redirectBilling(){window.location.href = "/billingadmin";}

//For if user wishes to log out
function logOut(){
    if(confirm("Are you sure you want to log out?") == true){
        window.location.href = "/logpage";
    }
}
/*End of redirect functions*/