/**
 * Constroller responsible for the game
 */
class ControllerGame extends Subject
{
    /**
     * Game model
     */
    private _game: Game;
    public get game(): Game { return this._game; };

    /**
     * Timer used for move items
     */
    private _timerMoving: number;

    /**
     * Timer used to multiply Pampmousses
     */
    private _timerMultiplication: number;

    /**
     * Timer used to send ammo on the map
     */
    private _timerAmmo: number;

    /**
     * Constructor
     */
    constructor()
    {
        super();

        this._game = new Game();

        this._timerMoving = null;
        this._timerMultiplication = null;
        this._timerAmmo = null;

        this.startNewGame();
    }

    /**
     * Resize the map of the game
     * @param width New width
     * @param height New height
     */
    resizeMap(width: number, height: number)
    {
        this._game.map.width = width;
        this._game.map.height = height;
    }

    /**
     * Starts a new game
     */
    startNewGame()
    {
        if (this.game.readyToRun === false)
        {
            this.game.initializeTextures().then(() => { this.startNewGame(); });
        }
        else
        {
            this._game.newGame();
            this.notify();
        }
    }

    /**
     * Start the next level of the game
     */
    nextLevel()
    {
        this._game.nextLevel();
        this.startLevel();
        this.notify();
    }

    /**
     * Start timers of the level
     */
    startLevel()
    {
        this.updateMoving();
        this.multiplyPampmousses();
        this.sendAmmo();
    }

    /**
     * Stops timers of the level
     */
    stopLevel()
    {
        clearTimeout(this._timerMoving);
        clearTimeout(this._timerMultiplication);
        clearTimeout(this._timerAmmo);
    }

    /**
     * Enable timer to move items
     */
    updateMoving()
    {
        if (this._game.updateMoving())
        {
            if (this.game.status !== GameStatus.inProgress)
                this.stopLevel();

            this.notify();
        }

        this._timerMoving = setTimeout(() =>
        {
            this.updateMoving();
        }, 20);
    }

    /**
     * Enable timer to multiply pampmousses
     */
    multiplyPampmousses()
    {
        this._timerMultiplication = setTimeout(() =>
        {
            this._game.multiplyPampmousses();
            this.multiplyPampmousses();
        }, 10000);
    }

    /**
     * Enable timer to send ammo on the map
     */
    sendAmmo()
    {
        this._timerAmmo = setTimeout(() =>
        {
            this._game.sendAmmo();
            this.sendAmmo();
        }, Math.random() * 5000 + 2000);
    }

    /**
     * Change player direction to point to the the given coordinates
     * @param coordinates
     */
    pointPlayerTo(coordinates: Coordinates)
    {
        this._game.player.pointTo(coordinates);
        this._game.player.run();
    }

    /**
     * Make player fire a juice extractor
     */
    fireBullet()
    {
        this._game.fireBullet();
        this.notify();
    }
}