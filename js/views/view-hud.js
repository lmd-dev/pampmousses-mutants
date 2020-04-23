/**
 * View responsible for the HUD
 */
var ViewHUD = /** @class */ (function () {
    /**
     * Constructor
     * @param controllerGame Controller responsible for the game
     */
    function ViewHUD(controllerGame) {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);
    }
    /**
     * Notification function of the view
     */
    ViewHUD.prototype.notify = function () {
        this.display();
    };
    /**
     * Displays HUD information (health, ammo, level of the game)
     */
    ViewHUD.prototype.display = function () {
        var game = this._controllerGame.game;
        if (game.status == GameStatus.inProgress) {
            $('#level').html(game.level.toString());
            $('#health').html(game.player.health.toString());
            $('#ammo').html(game.player.ammo.toString());
        }
    };
    return ViewHUD;
}());
//# sourceMappingURL=view-hud.js.map