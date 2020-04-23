/**
 * View responsible for the HUD
 */
class ViewHUD implements Observer
{
    /**
     * Controller responsible for the game
     */
    private _controllerGame: ControllerGame;

    /**
     * Constructor
     * @param controllerGame Controller responsible for the game
     */
    constructor(controllerGame: ControllerGame)
    {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);
    }

    /**
     * Notification function of the view
     */
    notify()
    {
        this.display();
    }

    /**
     * Displays HUD information (health, ammo, level of the game)
     */
    display()
    {
        let game = this._controllerGame.game;

        if (game.status == GameStatus.inProgress)
        {
            $('#level').html(game.level.toString());
            $('#health').html(game.player.health.toString());
            $('#ammo').html(game.player.ammo.toString());
        }
    }
}