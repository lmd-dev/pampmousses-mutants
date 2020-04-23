var GraphicalItem = /** @class */ (function () {
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordiante
     * @param rotation Default item orientation (in radians)
     * @param size Default size used for collisions
     */
    function GraphicalItem(x, y, rotation, size) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        if (size === void 0) { size = 50; }
        this._coordinates = new Coordinates(x, y);
        this._rotation = rotation;
        this._size = size;
        this._textures = new Array();
        this._activeTexture = 0;
    }
    Object.defineProperty(GraphicalItem.prototype, "coordinates", {
        get: function () { return this._coordinates; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(GraphicalItem.prototype, "rotation", {
        get: function () { return this._rotation; },
        set: function (value) { this._rotation = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GraphicalItem.prototype, "size", {
        get: function () { return this._size; },
        set: function (value) { this._size = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GraphicalItem.prototype, "textures", {
        get: function () { return this._textures; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(GraphicalItem.prototype, "activeTexture", {
        get: function () { return this._activeTexture; },
        set: function (value) {
            if (value > this._textures.length)
                this._activeTexture = 0;
            else
                this._activeTexture = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    /**
     * Adds a texture to the item
     * @param textureName Texture name to add
     */
    GraphicalItem.prototype.addTexture = function (textureName) {
        this._textures.push(TexturesLoader.getHandle().get(textureName));
    };
    /**
     * Returns the active texture of the item
     * @return The current active texture of the item
     */
    GraphicalItem.prototype.getActiveTexture = function () {
        return this._textures[this._activeTexture];
    };
    return GraphicalItem;
}());
//# sourceMappingURL=graphical-item.js.map