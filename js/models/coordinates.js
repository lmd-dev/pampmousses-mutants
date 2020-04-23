/**
 * Represents a 2D coordinates
 */
var Coordinates = /** @class */ (function () {
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     */
    function Coordinates(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Coordinates.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Coordinates.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    /**
     * Moves the coordinate for given distance to given direction
     * @param direction Direction to move
     * @param distance Distance to move
     */
    Coordinates.prototype.move = function (direction, distance) {
        var newCoordinates = new Coordinates(this.x, this.y);
        newCoordinates.x += distance;
        newCoordinates.rotate(this, direction);
        this.x = newCoordinates.x;
        this.y = newCoordinates.y;
    };
    /**
     * Rotates the coordinates arround given center
     * @param center Coordinates of the center of the rotation
     * @param angle Angle of the rotation (in radians)
     */
    Coordinates.prototype.rotate = function (center, angle) {
        this.x -= center.x;
        this.y -= center.y;
        var xTemp = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        var yTemp = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.x = xTemp + center.x;
        this.y = yTemp + center.y;
    };
    /**
     * Returns the angle between two points
     * @param coordinates
     */
    Coordinates.prototype.getAngle = function (coordinates) {
        var angle = 0;
        var radius = Math.sqrt(Math.pow(this.x - coordinates.x, 2) + Math.pow(this.y - coordinates.y, 2));
        angle = (Math.asin(Math.abs(coordinates.y - this.y) / radius));
        if (coordinates.x < this.x)
            angle = Math.PI - angle;
        if (coordinates.y < this.y)
            angle = (2 * Math.PI) - angle;
        return angle;
    };
    return Coordinates;
}());
//# sourceMappingURL=coordinates.js.map