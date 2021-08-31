import Player from './../src/player.js';

describe ("Player", () => {
  let player;
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
  test("Should produce a diceroll", () => {
    expect(player.roll()).toBeGreaterThanOrEqual(1);
    expect(player.roll()).toBeLessThanOrEqual(6);
  });
});