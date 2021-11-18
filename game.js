const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let btnClicked = 0;
let activeBtn = false;

// Initialize

// -------------function-------------
const playSound = function (name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = function (currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 200);
};

const startOver = function () {
  console.log("USER PATTERN: " + [userClickedPattern]);
  console.log(`Wrong on level: ${level}`);
  playSound("wrong");
  $(".btn").click(function () {
    $(this).prop("disabled", true);
  });
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  //reset array for userClickedPattern
  level = 0;
  active = true;
  activeBtn = !activeBtn;
  gamePattern = [];
  userClickedPattern = [];
};

const nextSequence = function () {
  const randomNumber = Math.trunc(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];

  // Add to Array
  gamePattern.push(randomChosenColor);
  // Flash Animation
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  // Make Sound
  playSound(randomChosenColor);
  // Update the level
  level++;
  btnClicked = 0;
  $("h1").text("Level " + level);

  console.log("Game Pattern: " + gamePattern);
};

const checkAnswer = function (currentLevel) {
  for (let i = 0; i <= currentLevel; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      console.log("correct: " + i);
      if (currentLevel === i) {
        setTimeout(function () {
          nextSequence();
        }, 500);
        console.log("USER PATTERN: " + [userClickedPattern]);
      }
    } else {
      startOver();
      return false;
    }
  }
  userClickedPattern = [];
};
const handler = function () {
  if (activeBtn) {
    // Storying the ID to a variable
    let userChosenColor = this.id;
    // Adding to the Array
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    //   play sound when clicked
    playSound(userChosenColor);
    // Add effect when clicked
    animatePress(userChosenColor);

    // Check every click
    if (gamePattern[btnClicked] !== userClickedPattern[btnClicked]) {
      startOver();
    } else {
      // Increment btn clicked
      btnClicked++;
      // Check answer after click
      if (btnClicked === level) {
        console.log("Level: " + level);
        checkAnswer(level);
      }
    }
  }
};

// Button Click Event
$(".btn").click(handler);

let active = true;
// Key Pressed Event
$(document).keypress(function (e) {
  btnClicked = 0;

  if (active) {
    let key = e.which;
    if (key === 97 || key === 32) {
      nextSequence();
      e.preventDefault();
    }
    active = !active;
    activeBtn = true;
    $("h1").text("Level " + level);
    // increment the level by 1
  }
});
