var selectionContainer = document.getElementById("selection-container");
var gameContainer = document.getElementById("game-container");

var selectionTabs = document.getElementsByClassName("game-selection-tab");
var timersContainer = document.getElementById("timers-container");

var whitesTimeDisplayer = document.getElementById("whites-displayer");
var blacksTimeDisplayer = document.getElementById("blacks-displayer");

var pressSpaceInfo = document.getElementById("press-space-info");

var whiteRook = document.getElementById("white-rook");
var blackRook = document.getElementById("black-rook");

var timeToPlay = 0;
var hoursToPlay = 0;
var minutesToPlay = 0;
var timeAdded = 0;


for (var i = 0; i < selectionTabs.length; i++) {
  var tab = selectionTabs[i];

  tab.onclick = function() {

    var headerContent = this.getElementsByTagName("h2");
    var timeToPlayText = headerContent[0].textContent;

    if (timeToPlayText.charAt(1) == 'm') {
      minutesToPlay = timeToPlayText.charAt(0);
    } else {
      minutesToPlay = timeToPlayText.substring(0, 2);
    }

    if (timeToPlayText.charAt(timeToPlayText.length - 3) != ' ') {
      timeAdded = timeToPlayText.substring(timeToPlayText.length - 3,
        timeToPlayText.length - 1);
    } else {
      timeAdded = timeToPlayText.charAt(timeToPlayText.length - 2);
    }

    timeToPlay = (60 * 1000 * minutesToPlay);

    setUpGame(timeToPlay,timeAdded*1000);
  }
}

function changeSides() {
  var timersContainerNodes = timersContainer.getElementsByClassName("timer-wrapper");
  timersContainer.insertBefore(timersContainerNodes[1], timersContainerNodes[0]);

  var firstChildNodes = timersContainerNodes[0].getElementsByTagName("div");
  var secondChildNodes = timersContainerNodes[1].getElementsByTagName("div");

  timersContainerNodes[0].insertBefore(firstChildNodes[1], firstChildNodes[0]);
  timersContainerNodes[1].insertBefore(secondChildNodes[1], secondChildNodes[0]);
}

function setUpGame(normalTime, timeAdded){

  var whiteRookInterval;
  var blackRookInterval;

  selectionContainer.style.display = "none";
  gameContainer.style.display = "block";

  var isPaused = false;
  var turn = 1;
  var move = 1;

  whitesTimer = new PlayerTimer(whitesTimeDisplayer, timeToPlay, timeAdded);
  blacksTimer = new PlayerTimer(blacksTimeDisplayer, timeToPlay, timeAdded);

  whitesTimer.initializeTime();
  blacksTimer.initializeTime();

  setRookAnimation();

  document.body.onkeyup = function(e) {
    if(e.keyCode == 32){
      if(!isPaused){
        changeTurn();
      } else{
        if(move > 1){
          if(turn == 1){
            whitesTimer.start();
          } else {
            blacksTimer.start();
          }
        }

        isPaused = false;
        pressSpaceInfo.textContent = "Press space to change queue";
      }
    }
  }

  function changeTurn() {
    if (move > 1) {
      if (turn == 1) {
        whitesTimer.stop();
        whitesTimer.add();
        blacksTimer.start();
        turn = 2;
      } else {
        blacksTimer.stop();
        blacksTimer.add();
        whitesTimer.start();
        turn = 1
        move++;
      }
    } else {
      if(turn == 1){
        turn = 2;
      } else{
        whitesTimer.start();
        turn = 1;
        move++;
      }
    }

    setRookAnimation();
  }

  function setRookAnimation(){
    if(turn == 1){
      clearInterval(blackRookInterval);
      blackRook.style.color = "black";
      whiteRookInterval = setInterval(function () {
        whiteRook.style.color = (whiteRook.style.color=="white") ? "#ffcf40":"white";
      }, 800);
    } else {
      clearInterval(whiteRookInterval);
      whiteRook.style.color = "white";
      blackRookInterval = setInterval(function () {
        blackRook.style.color = (blackRook.style.color=="black") ? "#ffcf40":"black";
      }, 1000);
    }
  }

  document.getElementById("pause-button").onclick = function() {
    whitesTimer.stop();
    blacksTimer.stop();
    isPaused = true;
    pressSpaceInfo.textContent = "game paused, press space to resume";
  }

  document.getElementById("back-button").onclick = function() {
    window.location.reload();
  }

  document.getElementById("restart-button").onclick = function() {
    whitesTimer.stop();
    blacksTimer.stop();
    clearInterval(blackRookInterval);
    clearInterval(whiteRookInterval);
    blacksTimeDisplayer.style.color = "#000";
    whitesTimeDisplayer.style.color = "#fff";
    setUpGame(normalTime, timeAdded);
  }


}
