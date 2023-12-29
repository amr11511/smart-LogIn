/*******************************SWITCH BETTWEEN PAGES****************/
var signUp = document.querySelector('#signUp')
var signin = document.querySelector('#signin')
var logOut = document.querySelector("#logOut")
signUp.addEventListener('click', sigup)
signin.addEventListener('click', sigin)
logOut.addEventListener('click' , function(){
    document.querySelector("#nav").style.display = "none"
    document.querySelector("#displayMovies").style.display = "none"
    sigin()
})
function sigup(){
    document.querySelector("#logIn").style.display = "none"
    document.querySelector("#register").style.display = "block"
}
function sigin(){
    document.querySelector("#logIn").style.display = "block"
    document.querySelector("#register").style.display = "none"
}

/**************REJESTER***************/
var userName = document.querySelector("#userNameInput")
var userEmail = document.querySelector("#userEmail")
var userPass = document.querySelector("#userPass")
var btnSubmit = document.querySelector("#butUp")
var exsist = document.querySelector("#exist")
var emailInput = document.querySelector("#emailUser")
var passInput = document.querySelector("#passUser")
var loginBtn = document.querySelector("#butlOG")
var myUsers = [];
if (localStorage.getItem('users') == null) {
    myUsers = []
} else {
    myUsers = JSON.parse(localStorage.getItem('users'))
}
function isExist(){
    var flag = false
    for(var i = 0 ; i<myUsers.length;i++){ 
        if(myUsers[i].email.toLowerCase() == userEmail.value.toLowerCase() ){
            flag = true
            break;   
        }
    }
    return flag
}

btnSubmit.addEventListener("click", function(){ 
        if(userName.value == "" || userEmail.value == "" || userPass.value == ""){
            exsist.style.color = "red"
            exsist.innerHTML = "All inputs is required"
        }
        else if(validateEmail()==true && validateName()==true && isExist()== false){
            var userObject = {
                name: userName.value,
                email: userEmail.value,
                password: userPass.value
            }
            myUsers.push(userObject)
            localStorage.setItem("users" , JSON.stringify(myUsers))
            clear()
            exsist.style.color = "green"
            exsist.innerHTML = "Success"          
            
        }else if(isExist() == true){  
            exsist.style.color = "red"
            exsist.innerHTML = "email already exists"  
        }
        else{
            exsist.style.color = "red"
            exsist.innerHTML = "User name or Email NOT allowed"
        }      
})

function clear(){
    userName.value="";
    userEmail.value="";
    userPass.value="";
}
function validateEmail(){
    var emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegx.test(userEmail.value)
}
function validateName(){
    var nameRegx = /^[a-zA-Z0-9]{3,}$/
    return nameRegx.test(userName.value)
}
/******************LOGIN*************************/
var userindex;
function checkIsExsitLogin(){
    var flag = false

    for(var i = 0 ; i<myUsers.length;i++){ 
        if(emailInput.value.toLowerCase() == myUsers[i].email.toLowerCase() && passInput.value == myUsers[i].password){
            flag = true
            userindex = i
            break;   
        }
    }
    return flag
}

loginBtn.addEventListener('click', function () {
    if(checkIsExsitLogin() == true){
        document.querySelector("#logIn").style.display = "none"
        document.querySelector("#register").style.display = "none"
        document.querySelector("#nav").style.display = "block"
        document.querySelector("#displayMovies").style.display = "block"
        document.querySelector("#userWelcomeName").innerHTML = myUsers[userindex].name.toUpperCase()
    }else{
        document.querySelector("#wrongPass").style.color = "red"
        document.querySelector("#wrongPass").innerHTML = "Email or Password is wrong"
    }
})
/***************API*****************/
const data = null;
var myMovies = [];
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', 'https://moviesverse1.p.rapidapi.com/movies/year/2023/1');
xhr.setRequestHeader('X-RapidAPI-Key', '6038cb242fmshd79b87bf2ce17a2p1825e3jsn8fd53cef3399');
xhr.setRequestHeader('X-RapidAPI-Host', 'moviesverse1.p.rapidapi.com');

xhr.send(data);
xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
        myMovies = JSON.parse(xhr.response).movies
        displaymovies()
	}
});
function displaymovies(){
    var movies = ``
    for(var i = 0; i<myMovies.length;i++){
        movies +=`<div class="col-md-2 g-2">
        <div class="item">
        <img src="${myMovies[i].img}" alt="" class="w-100"> 
        <p class = "p-2 text-white">${myMovies[i].text}</p>
        <a class ="text-decoration-none pb-0" href="${myMovies[i].link}" target="_blank">see more</a>
        </div>
    </div>
    }`
    document.getElementById("mov").innerHTML= movies
}}
