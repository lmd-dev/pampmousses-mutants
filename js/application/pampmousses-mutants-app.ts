/**
 * Pampmousses Mutants Application
 */
class PampmoussesMutantsApp
{
    /**
     * Controller responsible for the game
     */
    private _controllerGame: ControllerGame;

    /**
     * View responsible for displaying game
     */
    private _viewGame: ViewGame;

    /**
     * View responsible for displaying HUD
     */
    private _viewHUD: ViewHUD;

    /**
     * View responsible for the introduction screen
     */
    private _viewIntro: ViewIntro;

    /**
     * View responsible for the won screen
     */
    private _viewWon: ViewWon;

    /**
     * View responsible for the lost screen
     */
    private _viewLost: ViewLost;

    /**
     * Constructor
     */
    constructor()
    {
        this._controllerGame = new ControllerGame();
        this._viewGame = new ViewGame(this._controllerGame);
        this._viewHUD = new ViewHUD(this._controllerGame);
        this._viewIntro = new ViewIntro(this._controllerGame);
        this._viewWon = new ViewWon(this._controllerGame);
        this._viewLost = new ViewLost(this._controllerGame);
    }
}

//Start the application when document is loaded
$(window).ready(() => { let app = new PampmoussesMutantsApp(); });

