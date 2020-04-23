/**
 * View responsible for displaying lost message
 */
var ViewLost = /** @class */ (function () {
    /**
     * Constructor
     * @param {any} controllerGame Controller responsible for the game
     */
    function ViewLost(controllerGame) {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);
        this.initializeEvents();
    }
    /**
     * Notification function of the view
     */
    ViewLost.prototype.notify = function () {
        if (this._controllerGame.game.status === GameStatus.lost)
            this.display();
        else
            this.hide();
    };
    /**
     * Initializes main events of the view
     */
    ViewLost.prototype.initializeEvents = function () {
        var _this = this;
        $('#btn-menu').on('click', function () { _this._controllerGame.startNewGame(); });
    };
    /**
     * Displays lost message
     */
    ViewLost.prototype.display = function () {
        $('#dlg-lost').removeClass('hidden');
    };
    /**
     * Hides lost message
     */
    ViewLost.prototype.hide = function () {
        $('#dlg-lost').addClass('hidden');
    };
    return ViewLost;
}());
//# sourceMappingURL=view-lost.js.map