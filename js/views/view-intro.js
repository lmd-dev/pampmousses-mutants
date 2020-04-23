/**
 * View responsible for the introduction screen
 */
var ViewIntro = /** @class */ (function () {
    /**
     * Constructor
     * @param controllerGame Controller Responsible for the game
     */
    function ViewIntro(controllerGame) {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);
        this.initializeEvents();
    }
    /**
     * Notification function of the view
     */
    ViewIntro.prototype.notify = function () {
        if (this._controllerGame.game.status == GameStatus.waitingGame)
            this.display();
        else
            this.hide();
    };
    /**
     * Initializes main events of the view
     */
    ViewIntro.prototype.initializeEvents = function () {
        var _this = this;
        $('#btn-play').on('click', function () { _this._controllerGame.nextLevel(); });
    };
    /**
     * Displays the introduction screen
     */
    ViewIntro.prototype.display = function () {
        $('#intro').removeClass('hidden');
    };
    /**
     * Hides the introduction screen
     */
    ViewIntro.prototype.hide = function () {
        $('#intro').addClass('hidden');
    };
    return ViewIntro;
}());
//# sourceMappingURL=view-intro.js.map