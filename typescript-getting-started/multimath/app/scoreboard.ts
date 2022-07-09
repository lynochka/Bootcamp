import * as _ from "lodash";
import { Result } from "./result";

export class Scoreboard {
  private results: Result[] = [];

  constructor(private playerName: string) {
    this.playerName = playerName ? playerName : "Player";
  }

  addResult(newResult: Result): void {
    this.results.push(newResult);
    let allCapsName: string = _.upperCase(this.playerName);
    console.log(`${allCapsName}: ${newResult.score}`);
  }

  updateScoreboard(): void {
    let output: string = "<h2>Scoreboard</h2>";

    for (let index = 0; index < this.results.length; index++) {
      const result: Result = this.results[index];
      output += "<h4>";
      output +=
        this.playerName +
        ": " +
        result.score +
        "/" +
        result.problemCount +
        " for factor " +
        result.factor;
      output += "</h4>";
    }
    const scoresElement: HTMLElement = document.getElementById("scores")!;
    scoresElement.innerHTML = output;
  }
}
