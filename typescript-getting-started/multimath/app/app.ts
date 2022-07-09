import { Game } from "./game";
import { Player } from "./player";
import * as Utility from "./utility";

let newGame: Game;

document.getElementById("startGame")!.addEventListener("click", () => {
  const player: Player = new Player();
  player.name = Utility.getValue("playerName");

  const problemCount: number = Number(Utility.getValue("problemCount"));
  const factor: number = Number(Utility.getValue("factor"));

  newGame = new Game(player, problemCount, factor);
  newGame.displayGame();
});

// add click handler to the calculate score button
document.getElementById("calculate")!.addEventListener("click", () => {
  newGame.calculateScore();
});
