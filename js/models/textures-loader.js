/**
 * Responsible for the loading of textures
 */
var TexturesLoader = /** @class */ (function () {
    /**
     * Constructor
     */
    function TexturesLoader() {
        this._textures = new Array();
    }
    Object.defineProperty(TexturesLoader.prototype, "textures", {
        get: function () { return this._textures; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Returns the handle of the singleton
     * @return The unique instance of the TextureLoader
     */
    TexturesLoader.getHandle = function () {
        if (TexturesLoader._handle === null)
            TexturesLoader._handle = new TexturesLoader();
        return TexturesLoader._handle;
    };
    /**
     * Returns the texture matching to the given name
     * @param textureName Name of the texture to find
     * @return The found texture
     * @exception Throw an exception if no texture has been found
     */
    TexturesLoader.prototype.get = function (textureName) {
        for (var iTexture = 0; iTexture < this._textures.length; ++iTexture) {
            if (this._textures[iTexture].name == textureName) {
                return this._textures[iTexture];
            }
        }
        throw "TexturesLoader::get Error : Texture '" + textureName + "' unknown";
    };
    /**
     * Loads a new texture
     * @param textureName Name of the texture
     * @param textureURL URL of the texture
     */
    TexturesLoader.prototype.load = function (textureName, textureURL) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            for (var iTexture = 0; iTexture < _this._textures.length; ++iTexture) {
                if (_this._textures[iTexture].name == textureName) {
                    _this._textures.splice(iTexture, 1);
                    break;
                }
            }
            var texture = new Texture(textureName);
            texture.loadFromFile(textureURL).then(function () {
                _this._textures.push(texture);
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * Handle of the singleton
     */
    TexturesLoader._handle = null;
    return TexturesLoader;
}());
//# sourceMappingURL=textures-loader.js.map