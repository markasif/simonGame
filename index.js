var buttonColors=["red","green","blue","yellow"]
var gamePattern=[];
var userClickPattern=[];
var started=false;
var level=0;
// detecting a key press to start a game
$(document).keypress(function () { 
    if(!started){
        $("#level-title").text("level"+level);
        NextSequence();
        started=true;
    }
});
// detecting a button click
$(".btn").click(function () { 
   var userChoosenColour= $(this).attr("id");
   userClickPattern.push(userChoosenColour);
   playSound(userChoosenColour);
   Animate(userChoosenColour);
   checkAnswer(userClickPattern.length-1);

    
});
//check answer
function checkAnswer(CurrentLevel){
if(gamePattern[CurrentLevel]==userClickPattern[CurrentLevel]){
if(userClickPattern.length==gamePattern.length){
    setTimeout(function(){
        NextSequence();},1000);
    }
}
else{
    playSound("Wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press your Dick Size");
    setTimeout(function(){
        $("body").removeClass("game-over");},200);
        startOver();
    }
}    
// generating NextSequence
function NextSequence(){
    userClickPattern=[];
    level++;
    $("#level-title").text("Level " +level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}
//animating button
function Animate(CurrentColor){
    $("#"+CurrentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+CurrentColor).removeClass("pressed");  
    },100)
}
//playsound
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3")
    audio.play();
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
