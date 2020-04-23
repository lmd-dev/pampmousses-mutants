/**
 * Enumerates status of the game
 */
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["waitingGame"] = 0] = "waitingGame";
    GameStatus[GameStatus["inProgress"] = 1] = "inProgress";
    GameStatus[GameStatus["won"] = 2] = "won";
    GameStatus[GameStatus["lost"] = 3] = "lost";
})(GameStatus || (GameStatus = {}));
//# sourceMappingURL=game-status.js.map