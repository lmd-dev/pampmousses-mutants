/**
 * Represents the map of the game
 */
class Map
{
    /**
     * Width of the map
     */
    private _width: number;
    public get width(): number { return this._width; };
    public set width(value: number) { this._width = value; };

    /**
     * Height of the map
     */
    private _height: number;
    public get height(): number { return this._height; };
    public set height(value: number) { this._height = value; };

    /**
     * Constructor
     */
    constructor()
    {
        this._width = 500;
        this._height = 500;
    }
}