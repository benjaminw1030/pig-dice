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

Player.prototype.rollAgain = function() {
  const roll = rollDice();
  console.log(roll);
  if (roll === 1) {
    this.currentScore = 0;
    this.endTurn;
  } else {
    this.currentScore += roll;
  }
}

// UI Logic

let player1 = new Player("", 0, 0);
let player2 = new Player("", 0, 0);