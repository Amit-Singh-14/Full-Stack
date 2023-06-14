var randvar1 = Math.floor(Math.random() * 6) + 1;
var randvar2 = Math.floor(Math.random() * 6) + 1;
document.querySelector(".img1").setAttribute("src","images/dice"+randvar1+".png") 
document.querySelector(".img2").setAttribute("src","images/dice"+randvar2+".png") 

var winner =document.querySelector(".container h1")

if(randvar1 > randvar2){
    winner.innerHTML = "<img src = 'images/win.png' style = 'width: 20%'> player 1 wins"

}else if(randvar1 < randvar2){
    winner.innerHTML = " player 2 wins <img src = 'images/win.png' style = 'width: 20%'>"
}else{
    winner.textContent = "Draw"
}