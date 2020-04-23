/**
 * View responsible for displaying game
 */
var ViewGame = /** @class */ (function () {
    /**
     * Constructor
     * @param controllerGame Controller responsible for the game
     */
    function ViewGame(controllerGame) {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);
        this.initializeEvents();
        this.resize();
        this.display();
    }
    /**
     * Notification function of the view
     */
    ViewGame.prototype.notify = function () {
    };
    /**
     * Initialize main events of the view
     */
    ViewGame.prototype.initializeEvents = function () {
        var _this = this;
        $(window).on('resize', function () {
            _this.resize();
        });
        $('canvas').on('mousemove', function (event) {
            var canvas = _this.getCanvas();
            var coordinates = new Coordinates(event.clientX - canvas.width() / 2, event.clientY - canvas.height() / 2);
            _this._controllerGame.pointPlayerTo(coordinates);
        });
        $('canvas').on('click', function () {
            _this._controllerGame.fireBullet();
        });
    };
    /**
     * Resizes canvas when window id resized
     */
    ViewGame.prototype.resize = function () {
        var canvas = this.getCanvas();
        canvas[0].width = canvas.width();
        canvas[0].height = canvas.height();
        this._controllerGame.resizeMap(canvas.width(), canvas.height());
    };
    /**
     * refresh the canvas of the view
     */
    ViewGame.prototype.display = function () {
        var _this = this;
        if (this._controllerGame.game.status == GameStatus.inProgress) {
            var canvas = $('canvas');
            var context = canvas[0].getContext('2d');
            context.clearRect(0, 0, canvas.width(), canvas.height());
            context.drawImage(this.getFrame(), 0, 0);
        }
        window.requestAnimationFrame(function () { _this.display(); });
    };
    /**
     * Returns the JQuery object for the canvas of the view
     */
    ViewGame.prototype.getCanvas = function () {
        return $('canvas');
    };
    /**
     * Generates and returns the current frame of the game
     * @return HTML Canvas which is the back buffer of the next frame to display
     */
    ViewGame.prototype.getFrame = function () {
        var game = this._controllerGame.game;
        var frame = document.createElement('canvas');
        frame.width = game.map.width;
        frame.height = game.map.height;
        var ctx = frame.getContext('2d');
        ctx.save();
        //Sets the 0;0 coordinate at the center of the screen
        ctx.translate(frame.width / 2, frame.height / 2);
        //Draws each items of the scene
        game.items.forEach(function (item) {
            ctx.save();
            ctx.translate(item.coordinates.x, item.coordinates.y);
            ctx.rotate(item.rotation);
            var texture = item.getActiveTexture().data;
            ctx.drawImage(texture, -texture.width / 2, -texture.height / 2);
            ctx.restore();
        });
        ctx.restore();
        return frame;
    };
    return ViewGame;
}());
//# sourceMappingURL=view-game.js.map