// Business Logic

function Player(name, currentScore, totalScore) {
  this.name = name;
  this.currentScore = currentScore;
  this.totalScore = totalScore;
}

function rollDice() {
  return Math.ceil(Math.random()*6);
}

Player.prototype.endTurn = function() {
  this.totalScore += this.currentScore;
  this.currentScore = 0;
}

Player.prototype.roll = function() {
  const roll = rollDice();
  console.log(roll);
  if (roll === 1) {
    this.currentScore = 0;
    this.endTurn();
  } else {
    this.currentScore += roll;
  }
}

Player.prototype.winCheck = function() {
  if (player.totalScore >= 100) {
    return true
  }
  return false
}

// UI Logic

function attachButtonRollListeners () {

  $("button#player-1-roll").on("click", function() {
    player1.roll();
    $("#player-1-current").text(player1.currentScore);
  });
  
  $("button#player-2-roll").on("click", function() {
    player2.roll();
    $("#player-2-current").text(player2.currentScore);
  });

  $("button#player-1-hold").on("click", function() {
    player1.endTurn();
    $("#player-1-current").text(player1.currentScore);
    $("#player-1-total").text(player1.totalScore);
    $("#player-1-play").fadeOut();
    if (player1.winCheck() === true) {
      $("#win-display").fadeIn();
      $("#winner").text(player1.name);
    } else {
      $("#player-2-play").fadeIn();
    }
  });

  $("button#player-2-hold").on("click", function() {
    player1.endTurn();
    $("#player-2-current").text(player2.currentScore);
    $("#player-2-total").text(player2.totalScore);
    $("#player-2-play").fadeOut();
    if (player2.winCheck() === true) {
      $("#win-display").fadeIn();
      $("#winner").text(player2.name);
    } else {
      $("#player-2-play").fadeIn();
    }
  });

  $("button#play-again").on("click", function() {
     location.reload();
  });
}

$(document).ready(function () {
  attachButtonRollListeners();
  $("form#name-entry").submit(function (event) {
    event.preventDefault();
    const p1 = $("input#player-1").val();
    const p2 = $("input#player-2").val();
    $("input#player-1").val("");
    $("input#player-2").val("");
    let player1 = new Player(p1, 0, 0);
    let player2 = new Player(p2, 0, 0);
    $("form#name-entry").fadeOut();
    $("#player-1-play").fadeIn();
  });
});