/**
 * View responsible for displaying lost message
 */
class ViewLost implements Observer
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
        if (this._controllerGame.game.status === GameStatus.lost)
            this.display();
        else
            this.hide();
    }

    /**
     * Initializes main events of the view
     */
    initializeEvents()
    {
        $('#btn-menu').on('click', () => { this._controllerGame.startNewGame(); });
    }

    /**
     * Displays lost message
     */
    display()
    {
        $('#dlg-lost').removeClass('hidden');
    }

    /**
     * Hides lost message
     */
    hide()
    {
        $('#dlg-lost').addClass('hidden');
    }
}