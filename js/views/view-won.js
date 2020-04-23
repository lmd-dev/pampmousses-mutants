/**
 * View responsible for displaying won message
 */
var ViewWon = /** @class */ (function () {
    /**
     * Constructor
     * @param {any} controllerGame Controller responsible for the game
     */
    function ViewWon(controllerGame) {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);
        this.initializeEvents();
    }
    /**
     * Notification function of the view
     */
    ViewWon.prototype.notify = function () {
        if (this._controllerGame.game.status === GameStatus.won)
            this.display();
        else
            this.hide();
    };
    /**
     * Initializes main events of the view
     */
    ViewWon.prototype.initializeEvents = function () {
        var _this = this;
        $('#btn-next').on('click', function () { _this._controllerGame.nextLevel(); });
    };
    /**
     * Displays won message
     */
    ViewWon.prototype.display = function () {
        $('#dlg-won').removeClass('hidden');
    };
    /**
     * Hides won message
     */
    ViewWon.prototype.hide = function () {
        $('#dlg-won').addClass('hidden');
    };
    return ViewWon;
}());
//# sourceMappingURL=view-won.js.map