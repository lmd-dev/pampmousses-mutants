/**
 * Responsible for the loading of textures
 */
class TexturesLoader
{
    /**
     * Handle of the singleton
     */
    private static _handle: TexturesLoader = null;

    /**
     * Textures collection of the loader
     */
    private _textures: Array<Texture>;
    public get textures(): Array<Texture> { return this._textures; };

    /**
     * Constructor
     */
    private constructor()
    {
        this._textures = new Array<Texture>();
    }

    /**
     * Returns the handle of the singleton
     * @return The unique instance of the TextureLoader
     */
    public static getHandle(): TexturesLoader
    {
        if (TexturesLoader._handle === null)
            TexturesLoader._handle = new TexturesLoader();

        return TexturesLoader._handle;
    }

    /**
     * Returns the texture matching to the given name
     * @param textureName Name of the texture to find
     * @return The found texture
     * @exception Throw an exception if no texture has been found
     */
    public get(textureName: string): Texture
    {
        for (let iTexture = 0; iTexture < this._textures.length; ++iTexture)
        {
            if (this._textures[iTexture].name == textureName)
            {
                return this._textures[iTexture];
            }
        }

        throw "TexturesLoader::get Error : Texture '" + textureName + "' unknown";
    }

    /**
     * Loads a new texture
     * @param textureName Name of the texture
     * @param textureURL URL of the texture
     */
    public load(textureName: string, textureURL: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            for (let iTexture = 0; iTexture < this._textures.length; ++iTexture)
            {
                if (this._textures[iTexture].name == textureName)
                {
                    this._textures.splice(iTexture, 1);
                    break;
                }
            }

            let texture = new Texture(textureName);
            texture.loadFromFile(textureURL).then(() =>
            {
                this._textures.push(texture);
                resolve();
            }).catch((error) =>
            {
                reject(error);
            });
        });
    }
}