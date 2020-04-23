/**
 * Pampmousses Mutants Application
 */
var PampmoussesMutantsApp = /** @class */ (function () {
    /**
     * Constructor
     */
    function PampmoussesMutantsApp() {
        this._controllerGame = new ControllerGame();
        this._viewGame = new ViewGame(this._controllerGame);
        this._viewHUD = new ViewHUD(this._controllerGame);
        this._viewIntro = new ViewIntro(this._controllerGame);
        this._viewWon = new ViewWon(this._controllerGame);
        this._viewLost = new ViewLost(this._controllerGame);
    }
    return PampmoussesMutantsApp;
}());
//Start the application when document is loaded
$(window).ready(function () { var app = new PampmoussesMutantsApp(); });
//# sourceMappingURL=pampmousses-mutants-app.js.map