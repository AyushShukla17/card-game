let globalTimer;
let HighScore = 0;
let score = 0;
let timer = 0;
let gameLevel = 1;

const easy = `<ul id="card-container-ul">
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>`;

const medium = `<ul id="card-container-ul">
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>`;

const hard = `<ul id="card-container-ul">
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>`;

function difficultyChanged() {
 gameLevel = $("#gamelevel option:selected").val();
  appendCard();
}

function appendCard(){
    if(gameLevel == 1){
        $('#gameBoard').html(easy);
        $('#card-container-ul').css('max-width','33%');
    } else if (gameLevel ==2){
        $('#gameBoard').html(medium);
        $('#card-container-ul').css('max-width','40%');
    }
    else {
        $('#gameBoard').html(hard);
        $('#card-container-ul').css('max-width','65%');
    }
}

function setRandomClass() {
  var ul = $("ul");
  var items = ul.find("li");
  var number = items.length;
  var random = Math.floor(Math.random() * number);
  items.removeClass("special");
  items.eq(random).addClass("special");
}

function StopTimerFunction() {
  score = 0;
  timer = 0;
  clearInterval(globalTimer);
}

function reset() {
  StopTimerFunction();
  startGame();
  $("#highscore").text(getHighScore());
  $("#score").text(0);
  $("#countDownTimer").text(120);
}

function getHighScore() {
  return localStorage.getItem("HighScore", HighScore);
}

function setHighScore() {
  localStorage.setItem("HighScore", HighScore);
}

function startGame() {
  score = 0;
  timer = 120;
  setRandomClass();
  globalTimer = setInterval(function() {
    if (timer > 0) {
      timer -= 1;
      $("#countDownTimer").text(timer);
      setRandomClass();
    } else {
      let result = window.confirm("Game Over!!");
      if (result) {
        setHighScore();
        reset();
      } else {
        setHighScore();
        StopTimerFunction();
      }
    }
  }, 1000);
}

$(function() {
  if (getHighScore()) {
    HighScore = Number(getHighScore());
    $("#highscore").text(HighScore);
  } else {
    setHighScore();
  }
  difficultyChanged();
  startGame();
  $("body").on("click", "li.special", function() {
    if (timer > 0) {
      score += 1;
      console.log("The score is:", score);
      if (score > HighScore) {
        HighScore = score;
        $("#highscore").text(HighScore);
      }
      $("#score").text(score);
    }
  });

  $("body").on("click", "li:not(.special)", function() {
    if (timer > 0) {
      score -= 1;
      $("#score").text(score);
    }
  });
});
