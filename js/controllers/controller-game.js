var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Constroller responsible for the game
 */
var ControllerGame = /** @class */ (function (_super) {
    __extends(ControllerGame, _super);
    /**
     * Constructor
     */
    function ControllerGame() {
        var _this = _super.call(this) || this;
        _this._game = new Game();
        _this._timerMoving = null;
        _this._timerMultiplication = null;
        _this._timerAmmo = null;
        _this.startNewGame();
        return _this;
    }
    Object.defineProperty(ControllerGame.prototype, "game", {
        get: function () { return this._game; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Resize the map of the game
     * @param width New width
     * @param height New height
     */
    ControllerGame.prototype.resizeMap = function (width, height) {
        this._game.map.width = width;
        this._game.map.height = height;
    };
    /**
     * Starts a new game
     */
    ControllerGame.prototype.startNewGame = function () {
        var _this = this;
        if (this.game.readyToRun === false) {
            this.game.initializeTextures().then(function () { _this.startNewGame(); });
        }
        else {
            this._game.newGame();
            this.notify();
        }
    };
    /**
     * Start the next level of the game
     */
    ControllerGame.prototype.nextLevel = function () {
        this._game.nextLevel();
        this.startLevel();
        this.notify();
    };
    /**
     * Start timers of the level
     */
    ControllerGame.prototype.startLevel = function () {
        this.updateMoving();
        this.multiplyPampmousses();
        this.sendAmmo();
    };
    /**
     * Stops timers of the level
     */
    ControllerGame.prototype.stopLevel = function () {
        clearTimeout(this._timerMoving);
        clearTimeout(this._timerMultiplication);
        clearTimeout(this._timerAmmo);
    };
    /**
     * Enable timer to move items
     */
    ControllerGame.prototype.updateMoving = function () {
        var _this = this;
        if (this._game.updateMoving()) {
            if (this.game.status !== GameStatus.inProgress)
                this.stopLevel();
            this.notify();
        }
        this._timerMoving = setTimeout(function () {
            _this.updateMoving();
        }, 20);
    };
    /**
     * Enable timer to multiply pampmousses
     */
    ControllerGame.prototype.multiplyPampmousses = function () {
        var _this = this;
        this._timerMultiplication = setTimeout(function () {
            _this._game.multiplyPampmousses();
            _this.multiplyPampmousses();
        }, 10000);
    };
    /**
     * Enable timer to send ammo on the map
     */
    ControllerGame.prototype.sendAmmo = function () {
        var _this = this;
        this._timerAmmo = setTimeout(function () {
            _this._game.sendAmmo();
            _this.sendAmmo();
        }, Math.random() * 5000 + 2000);
    };
    /**
     * Change player direction to point to the the given coordinates
     * @param coordinates
     */
    ControllerGame.prototype.pointPlayerTo = function (coordinates) {
        this._game.player.pointTo(coordinates);
        this._game.player.run();
    };
    /**
     * Make player fire a juice extractor
     */
    ControllerGame.prototype.fireBullet = function () {
        this._game.fireBullet();
        this.notify();
    };
    return ControllerGame;
}(Subject));
//# sourceMappingURL=controller-game.js.map