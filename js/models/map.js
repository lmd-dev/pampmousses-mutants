/**
 * Represents the map of the game
 */
var Map = /** @class */ (function () {
    /**
     * Constructor
     */
    function Map() {
        this._width = 500;
        this._height = 500;
    }
    Object.defineProperty(Map.prototype, "width", {
        get: function () { return this._width; },
        set: function (value) { this._width = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Map.prototype, "height", {
        get: function () { return this._height; },
        set: function (value) { this._height = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Map;
}());
//# sourceMappingURL=map.js.map