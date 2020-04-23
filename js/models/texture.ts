/**
 * Represents a texture of the game
 */
class Texture
{
    /**
     * Name of the texture
     */
    private _name: string;
    public get name(): string { return this._name; };
    public set name(value: string) { this._name = value; };

    /**
     * Base64 Data of the texture
     */
    private _data: HTMLImageElement;
    public get data(): HTMLImageElement { return this._data; };
    public set data(value: HTMLImageElement) { this._data = value; };

    /**
     * Constructor
     * @param name Name of the picture
     */
    constructor(name: string = "")
    {
        this._name = name;
        this._data = null;
    }

    /**
     * Loads texture data from file
     * @param fileName URL of file to load
     * @return Promise which is resolved when file is loaded
     */
    loadFromFile(fileURL: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this._data = new Image();

            this._data.onload = () =>
            {
                resolve();
            }

            this._data.onerror = () =>
            {
                reject();
            }

            this._data.src = fileURL;
        });
    }
}