/**
 * Represents a texture of the game
 */
var Texture = /** @class */ (function () {
    /**
     * Constructor
     * @param name Name of the picture
     */
    function Texture(name) {
        if (name === void 0) { name = ""; }
        this._name = name;
        this._data = null;
    }
    Object.defineProperty(Texture.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) { this._name = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Texture.prototype, "data", {
        get: function () { return this._data; },
        set: function (value) { this._data = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    /**
     * Loads texture data from file
     * @param fileName URL of file to load
     * @return Promise which is resolved when file is loaded
     */
    Texture.prototype.loadFromFile = function (fileURL) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._data = new Image();
            _this._data.onload = function () {
                resolve();
            };
            _this._data.onerror = function () {
                reject();
            };
            _this._data.src = fileURL;
        });
    };
    return Texture;
}());
//# sourceMappingURL=texture.js.map