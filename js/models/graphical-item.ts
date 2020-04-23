class GraphicalItem
{
    /**
     * Coordinates of the item
     */
    private _coordinates: Coordinates;
    public get coordinates(): Coordinates { return this._coordinates; };

    /**
     * Rotation of the item (in radians)
     */
    private _rotation: number;
    public get rotation(): number { return this._rotation; };
    public set rotation(value: number) { this._rotation = value; };

    /**
     * Size of the item (in pixels)
     */
    private _size: number;
    public get size(): number { return this._size; };
    public set size(value: number) { this._size = value; };

    /**
     * Textures of the item
     */
    private _textures: Array<Texture>;
    public get textures(): Array<Texture> { return this._textures; };

    /**
     * Index of the active texture
     */
    private _activeTexture: number;
    public get activeTexture(): number { return this._activeTexture; };
    public set activeTexture(value: number)
    {
        if (value > this._textures.length)
            this._activeTexture = 0;
        else
            this._activeTexture = value;
    };

    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordiante
     * @param rotation Default item orientation (in radians)
     * @param size Default size used for collisions
     */
    constructor(x: number = 0, y: number = 0, rotation: number = 0, size: number = 50)
    {
        this._coordinates = new Coordinates(x, y);
        this._rotation = rotation;
        this._size = size;

        this._textures = new Array<Texture>();
        this._activeTexture = 0;
    }

    /**
     * Adds a texture to the item
     * @param textureName Texture name to add
     */
    addTexture(textureName: string)
    {
        this._textures.push(TexturesLoader.getHandle().get(textureName));
    }

    /**
     * Returns the active texture of the item
     * @return The current active texture of the item
     */
    getActiveTexture(): Texture
    {
        return this._textures[this._activeTexture];
    }
}