import Player from './../src/player.js';

describe  ("Player", () => {
  test ("should create a player with a name current score and total score",() => {
    const player = new Player ("Cam", 11, 23);
      expect(player.name).toEqual("Cam");
      expect(player.currentScore).toEqual(11);
      expect(player.totalScore).toEqual(23);
  });
});