import Player from './../src/player.js';

describe ("Player", () => {
  let player;
  const endTurn = jest.fn(() => true);
  beforeEach(() => {
    player = new Player ("Cam", 11, 23);
  });
  test("should create a player with a name current score and total score",() => {
      expect(player.name).toEqual("Cam");
      expect(player.currentScore).toEqual(11);
      expect(player.totalScore).toEqual(23);
  });
  test("Should add current score to total score and then set current score to 0", () => {
    player.endTurn();
    expect(player.totalScore).toEqual(34);
    expect(player.currentScore).toEqual(0);
  });
  test("Should produce a diceroll from 1 to 6", () => {
    expect(player.roll()).toBeGreaterThanOrEqual(1);
    expect(player.roll()).toBeLessThanOrEqual(6);
  });
  test("Should set current score to 0 and end turn when roll equals 1", () => {
    let roll = player.roll();
    if (roll === 1) {
    expect(player.currentScore).toEqual(0);
    expect(endTurn).toHaveBeenCalled();
    }
  });
  test("Should increase current score by the roll when roll is not equal to 1", () => {
    let roll = player.roll();
    if (roll === 5) {
    expect(player.currentScore).toEqual(16);
    }
  });
  test("Should produce two dicerolls each from 1 to 6", () => {
    const doubleRoll = player.roll2();
    expect(doubleRoll[0]).toBeGreaterThanOrEqual(1);
    expect(doubleRoll[1]).toBeGreaterThanOrEqual(1);
    expect(doubleRoll[0]).toBeLessThanOrEqual(6);
    expect(doubleRoll[1]).toBeLessThanOrEqual(6);
  });
  test("should add both dice roll results to total score upon completing turn if neither dice are ones", () => {
    const doubleRoll = player.roll2();
    if (doubleRoll[0] === 3 && doubleRoll[1] === 4) {
      expect(player.currentScore).toEqual(18);
    }
  });
  test("should set total score and current score to 0 and end turn if both dice are ones", () => {
    const doubleRoll = player.roll2();
    if (doubleRoll[0] === 1 && doubleRoll[1] === 1) {
      expect(player.currentScore).toEqual(0);
      expect(player.totalScore).toEqual(0);
      expect(endTurn).toHaveBeenCalled();
    }
  });
  test("should end turn upon single roll of one", () => {
    const doubleRoll = player.roll2();
    if (doubleRoll[0] === 1 && doubleRoll[1] === 5) {
      expect(player.currentScore).toEqual(0);
      expect(endTurn).toHaveBeenCalled();
    }
  });
  test("should declare a winner when total score reaches 100 or more", () => {
    player.totalScore = 100;
    expect(player.winCheck()).toEqual(true);
  });
  test("should not declare a winner when total score is below 100", () => {
    player.totalScore = 99;
    expect(player.winCheck()).toEqual(false);
  });
});