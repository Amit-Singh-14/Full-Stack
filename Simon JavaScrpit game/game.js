/*----------------------------- all variables ----------------------------- */
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var rem = 0;

/*----------------------------- starting game -----------------------------*/
$(document).keypress(() => {
  if (!start) {
    $("h1").text("Level " + level);
    nextSequence();
    start = true;
  }
});

/*----------------------------- generate the next pattern  -----------------------------*/
function nextSequence(count) {
  level++;

  $("#level-title").text("Level " + level);

  var rand = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[rand];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  rem = gamePatternlength();
  playsound(randomChosenColour);
}

/*----------------------------- gamepattern length -----------------------------*/
function gamePatternlength() {
  return gamePattern.length;
}

/*----------------------------- sound playing  -----------------------------*/
function playsound(sund) {
  var audio = new Audio("sounds/" + sund + ".mp3");
  audio.play();
}

/*----------------------------- button click checking -----------------------------*/
$(".btn").click((e) => {
  if (start == true) {
    var itemclicked = e.target.id;

    userClickedPattern.push(itemclicked);
    console.log(userClickedPattern);
    console.log(gamePattern);
    playsound(itemclicked);

    $("#" + itemclicked)
      .fadeOut(100)
      .fadeIn(100);

    rem--;
    if (rem == 0) {
      if (checkAnswer()) {
        userClickedPattern = [];
        setTimeout(nextSequence, 500);
      }
    }
  }
});

/*----------------------------- cheking the cliked answers -----------------------------*/ 
function checkAnswer() {
  //   console.log(userClickedPattern);
  //   console.log(gamePattern);
  if (JSON.stringify(userClickedPattern) !== JSON.stringify(gamePattern)) {
    reset();
    return false;
  }
  return true;
}

/*----------------------------- reset after wrong answer -----------------------------*/
function reset() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  start = false;
  rem = 0;
  $("h1").text("Worng");
  playsound("wrong");
  setTimeout(() => $("h1").text("Press A Key to Start"), 1000);
}
