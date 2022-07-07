var Player = (function () {
    function Player() {
    }
    Player.prototype.formatName = function () {
        return this.name.toUpperCase();
    };
    return Player;
}());
function startGame() {
    var playerName = getInputValue("playerName");
    logPlayer(playerName);
    postScore(60, playerName);
    postScore(-4);
}
function logPlayer(name) {
    if (name === void 0) { name = "MultiMath Player"; }
    console.log("New game starting for player: ".concat(name));
}
function getInputValue(elementID) {
    var inputElement = (document.getElementById(elementID));
    if (inputElement.value === "") {
        return undefined;
    }
    else {
        return inputElement.value;
    }
}
function postScore(score, playerName) {
    if (playerName === void 0) { playerName = "MultiMath Player"; }
    var logger;
    if (score < 0) {
        logger = logError;
    }
    else {
        logger = logMessage;
    }
    var scoreElement = document.getElementById("postedScores");
    scoreElement.innerText = "".concat(score, " - ").concat(playerName);
    logger("Score: ".concat(score));
}
document.getElementById("startGame").addEventListener("click", startGame);
var logMessage = function (message) { return console.log(message); };
function logError(err) {
    console.error(err);
}
var firstPlayer = new Player();
firstPlayer.name = "Lanier";
console.log(firstPlayer.formatName());
//# sourceMappingURL=app.js.map