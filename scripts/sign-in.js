
document.getElementById("signin-btn").addEventListener("click", function(){
    //get user name
    const textInput = document.getElementById("input-text");
    const userName = textInput.value;
    //get password
    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    //match password and username
    if(userName == "admin" && password == "admin123"){
        //alert("login success");
        window.location.assign("./main-project.html");

    }else{
        //alert("login failled");
        return;
    }
})