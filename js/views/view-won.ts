/**
 * View responsible for displaying won message
 */
class ViewWon implements Observer
{
    /**
     * Controller respnsible for the game
     */
    private _controllerGame: ControllerGame;

    /**
     * Constructor
     * @param {any} controllerGame Controller responsible for the game
     */
    constructor(controllerGame: ControllerGame)
    {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);

        this.initializeEvents();
    }

    /**
     * Notification function of the view
     */
    notify()
    {
        if (this._controllerGame.game.status === GameStatus.won)
            this.display();
        else
            this.hide();
    }

    /**
     * Initializes main events of the view
     */
    initializeEvents()
    {
        $('#btn-next').on('click', () => { this._controllerGame.nextLevel(); });
    }

    /**
     * Displays won message
     */
    display()
    {
        $('#dlg-won').removeClass('hidden');
    }

    /**
     * Hides won message
     */
    hide()
    {
        $('#dlg-won').addClass('hidden');
    }
}