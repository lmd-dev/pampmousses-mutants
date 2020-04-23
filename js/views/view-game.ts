/**
 * View responsible for displaying game
 */
class ViewGame implements Observer
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

        this.initializeEvents();
        this.resize();
        this.display();
    }

    /**
     * Notification function of the view
     */
    notify()
    {

    }

    /**
     * Initialize main events of the view
     */
    initializeEvents()
    {
        $(window).on('resize', () =>
        {
            this.resize();
        });

        $('canvas').on('mousemove', (event) =>
        {
            let canvas = this.getCanvas();

            let coordinates = new Coordinates(event.clientX - canvas.width() / 2, event.clientY - canvas.height() / 2);
            this._controllerGame.pointPlayerTo(coordinates);
        });

        $('canvas').on('click', () =>
        {
            this._controllerGame.fireBullet();
        });
    }

    /**
     * Resizes canvas when window id resized
     */
    resize()
    {
        let canvas = this.getCanvas();

        (<HTMLCanvasElement>canvas[0]).width = canvas.width();
        (<HTMLCanvasElement>canvas[0]).height = canvas.height();

        this._controllerGame.resizeMap(canvas.width(), canvas.height());
    }

    /**
     * refresh the canvas of the view
     */
    display()
    {
        if (this._controllerGame.game.status == GameStatus.inProgress)
        {
            let canvas = $('canvas');
            let context = (<HTMLCanvasElement>canvas[0]).getContext('2d');
            context.clearRect(0, 0, canvas.width(), canvas.height());
            context.drawImage(this.getFrame(), 0, 0);

        }
        window.requestAnimationFrame(() => { this.display(); });
    }

    /**
     * Returns the JQuery object for the canvas of the view
     */
    getCanvas(): JQuery
    {
        return $('canvas');
    }

    /**
     * Generates and returns the current frame of the game
     * @return HTML Canvas which is the back buffer of the next frame to display
     */
    getFrame(): HTMLCanvasElement
    {
        let game = this._controllerGame.game;

        let frame = document.createElement('canvas');
        frame.width = game.map.width;
        frame.height = game.map.height;

        let ctx = frame.getContext('2d');
        ctx.save();

        //Sets the 0;0 coordinate at the center of the screen
        ctx.translate(frame.width / 2, frame.height / 2);

        //Draws each items of the scene
        game.items.forEach((item: GraphicalItem) =>
        {
            ctx.save();
            ctx.translate(item.coordinates.x, item.coordinates.y);
            ctx.rotate(item.rotation);

            let texture = item.getActiveTexture().data;
            ctx.drawImage(texture, -texture.width / 2, -texture.height / 2);

            ctx.restore();
        });

        ctx.restore();

        return frame;
    }
}