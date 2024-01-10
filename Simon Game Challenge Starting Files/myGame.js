var userClickedPattern=[];

var gamePattern = [];

buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    var audi = new Audio("sounds/wrong.mp3");
    audi.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200)
    console.log("failed");
    $("#level-title").text("Game Over, Press A to Restart");
    startOver();
  }
}


$(document).keydown(function(event){
  if (event.key === "a" || event.key==="A"){
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }

});



function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  $(`#${userChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
});



function playSound(name){
  var aud = new Audio("sounds/"+`${name}`+".mp3");
  aud.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


