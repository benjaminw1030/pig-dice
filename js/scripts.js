// Business Logic

function Player(name, currentScore, totalScore) {
  this.name = name;
  this.currentScore = currentScore;
  this.totalScore = totalScore;
}

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

Player.prototype.endTurn = function () {
  this.totalScore += this.currentScore;
  this.currentScore = 0;
}

Player.prototype.roll = function () {
  const roll = rollDice();
  if (roll === 1) {
    this.currentScore = 0;
    this.endTurn();
  } else {
    this.currentScore += roll;
  }
  return roll;
}

Player.prototype.winCheck = function () {
  if (this.totalScore >= 100) {
    return true
  }
  return false
}

// UI Logic

let player1 = new Player("", 0, 0);
let player2 = new Player("", 0, 0);
let currentPlayer = 1

function rollOne() {
  let hideButton = "#player-" + currentPlayer + "-roll"
  $(hideButton).hide();
}

function playerOneEnd() {
  $("#player-1-roll").show();
  $("#player-1-play").hide();
  $("#p2-dice-1").show();
  if (player1.winCheck() === true) {
    $("#win-display").fadeIn();
    $("#winner").text(player1.name);
  } else {
    $("#player-2-play").fadeIn();
  }
  currentPlayer = 2;
}

function playerTwoEnd() {
  $("#player-2-roll").show();
  $("#player-2-play").hide();
  $("#p1-dice-1").show();
  if (player2.winCheck() === true) {
    $("#win-display").fadeIn();
    $("#winner").text(player2.name);
  } else {
    $("#player-1-play").fadeIn();
  }
  currentPlayer = 1;
}

function attachButtonRollListeners() {

  $("button#player-1-roll").on("click", function () {
    let roll = player1.roll();
    let diceId = "#p1-dice-" + roll;
    $("#player-1-current").text(player1.currentScore);
    if (roll === 1) {
      rollOne();
    }
    $(".dice-img").hide();
    $(diceId).fadeIn();
  });

  $("button#player-2-roll").on("click", function () {
    let roll = player2.roll();
    let diceId = "#p2-dice-" + roll;
    $("#player-2-current").text(player2.currentScore);
    if (roll === 1) {
      rollOne();
    }
    $(".dice-img").hide();
    $(diceId).fadeIn();
  });

  $("button#player-1-hold").on("click", function () {
    player1.endTurn();
    $("#player-1-current").text(player1.currentScore);
    $("#player-1-total").text(player1.totalScore);
    playerOneEnd();
  });

  $("button#player-2-hold").on("click", function () {
    player2.endTurn();
    $("#player-2-current").text(player2.currentScore);
    $("#player-2-total").text(player2.totalScore);
    playerTwoEnd();
  });

  $("button#play-again").on("click", function () {
    location.reload();
  });
}

$(document).ready(function () {
  attachButtonRollListeners();
  $("form#name-entry").submit(function (event) {
    event.preventDefault();
    const p1 = $("input#player-1").val();
    const p2 = $("input#player-2").val();
    player1.name = p1;
    player2.name = p2;
    $("#player-1-name").text(p1);
    $("#player-2-name").text(p2);
    $("form#name-entry").hide();
    $("#player-1-play").fadeIn();
  });
});