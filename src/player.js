export default function Player(name, currentScore, totalScore) {
  this.name = name;
  this.currentScore = currentScore;
  this.totalScore = totalScore;
}

Player.prototype.endTurn = function () {
  this.totalScore += this.currentScore;
  this.currentScore = 0;
  return true;
};

Player.prototype.roll = function () {
  const roll = rollDice();
  if (roll === 1) {
    this.currentScore = 0;
    this.endTurn();
  } else {
    this.currentScore += roll;
  }
  return roll;
};

Player.prototype.roll2 = function () {
  const roll1 = rollDice();
  const roll2 = rollDice();
  if (roll1 === 1 && roll2 === 1) {
    this.currentScore = 0;
    this.endTurn();
    this.totalScore = 0;
  } else if (roll1 === 1 || roll2 === 1) {
    this.currentScore = 0;
    this.endTurn();
  } else {
    this.currentScore += roll1 + roll2;
  }
  return [roll1, roll2];
};

Player.prototype.winCheck = function () {
  if (this.totalScore >= 100) {
    return true;
  }
  return false;
};

function rollDice() {
  return Math.ceil(Math.random() * 6);
}