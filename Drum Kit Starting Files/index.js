/* 
hadleclick() direct call ho jayega enenvt hone ka wait nhi krta
isliye we use hadnleClick



document.querySelector("button").addEventListener("click", handleClick);
function handleClick() {
  alert("i got clicked");
}

/ anoanmus function calling
method 2

document.querySelector("button").addEventListener("click", function () {
  alert("i got clicked");
});

method 3

document
  .querySelector("button")
  .addEventListener("click", () => alert("i got clicked"));

*/

var l = document.querySelectorAll(".drum").length
for(var i = 0; i < l; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
       var word =  this.innerHTML
       addanimation(word)
       makesound(word)
    });
    
}

document.addEventListener("keypress",function(e){
    var word = e.key
    addanimation(word)
    makesound(word)
})

function addanimation(key){
    var word = document.querySelector("."+key);
    word.classList.add("pressed")

    setTimeout(function(){
        word.classList.remove("pressed")
    },100)
}


function makesound(word){
    if(word === "w"){
        var audio = new Audio("sounds/tom-1.mp3")
       }
       else if(word === "a"){
        var audio = new Audio("sounds/tom-2.mp3")
       }
       else if(word === "s"){
        var audio = new Audio("sounds/tom-3.mp3")
       }
       else if(word === "d"){
        var audio = new Audio("sounds/tom-4.mp3")
       }
       else if(word === "j"){
        var audio = new Audio("sounds/crash.mp3")
       }
       else if(word === "k"){
        var audio = new Audio("sounds/kick-bass.mp3")
       }
       else if(word === "l"){
        var audio = new Audio("sounds/snare.mp3")
       }
       audio.play()
}