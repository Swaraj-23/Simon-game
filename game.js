var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var start = false;

var level = 0;


$(document).keydown(function(){
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.ceil(Math.random()*3);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function checkAnswer(currentLevel){
    // console.log(userClickedPattern);
    // console.log(gamePattern);
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        // console.log("success");
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }
    else{
        // console.log("failure");
        $("body").addClass("game-over");
        playSound("wrong");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}

function startOver()
{
    level = 0;
    gamePattern = [];
    start = false;
}


function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    } , 100);
}

