/**
 * View responsible for the introduction screen
 */
class ViewIntro implements Observer
{
    /**
     * Constroller responsible for the game
     */
    private _controllerGame;

    /**
     * Constructor
     * @param controllerGame Controller Responsible for the game
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
        if (this._controllerGame.game.status == GameStatus.waitingGame)
            this.display();
        else
            this.hide();
    }

    /**
     * Initializes main events of the view
     */
    initializeEvents()
    {
        $('#btn-play').on('click', () => { this._controllerGame.nextLevel(); });
    }

    /**
     * Displays the introduction screen
     */
    display()
    {
        $('#intro').removeClass('hidden');
    }

    /**
     * Hides the introduction screen
     */
    hide()
    {
        $('#intro').addClass('hidden');
    }
}