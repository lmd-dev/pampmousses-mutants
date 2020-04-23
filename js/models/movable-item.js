var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MovableItem = /** @class */ (function (_super) {
    __extends(MovableItem, _super);
    /**
     * Constructor
     * @param x X Default X coordinate
     * @param y Y Default Y coordinate
     * @param rotation Default rotation
     * @param size Default size
     * @param speed Default speed
     * @param direction Default direction
     */
    function MovableItem(x, y, rotation, size, speed, direction) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        if (size === void 0) { size = 50; }
        if (speed === void 0) { speed = 0; }
        if (direction === void 0) { direction = 0; }
        var _this = _super.call(this, x, y, rotation, size) || this;
        _this._speed = speed;
        _this._direction = direction;
        _this._lastMovingTimestamp = null;
        return _this;
    }
    Object.defineProperty(MovableItem.prototype, "speed", {
        get: function () { return this._speed; },
        set: function (value) { this._speed = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(MovableItem.prototype, "direction", {
        get: function () { return this._direction; },
        set: function (value) { this._direction = value; this.rotation = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    /**
     * Moves the item in its direction and for its speed
     */
    MovableItem.prototype.move = function () {
        var timestamp = new Date().getTime();
        if (this._lastMovingTimestamp !== null) {
            this.coordinates.move(this.direction, this.speed * ((timestamp - this._lastMovingTimestamp) / 1000.0));
        }
        this._lastMovingTimestamp = timestamp;
    };
    /**
     * Rotate the item to point it to the given coordinates
     * @param coordinates Coordinates to point to
     */
    MovableItem.prototype.pointTo = function (coordinates) {
        var angle = this.coordinates.getAngle(coordinates);
        this.direction = angle;
        this.rotation = angle;
    };
    /**
     * Indicates if the item is out of the given map
     * @param map Map to test
     * @return Returns true if the item is out of the map, else returns false
     */
    MovableItem.prototype.isOutOfMap = function (map) {
        var xMin = this.coordinates.x - this.size / 2 + map.width / 2;
        var xMax = this.coordinates.x + this.size / 2 + map.width / 2;
        var yMin = this.coordinates.y - this.size / 2 + map.height / 2;
        var yMax = this.coordinates.y + this.size / 2 + map.height / 2;
        if (xMin < 0 || yMin < 0 || xMax > map.width || yMax > map.height) {
            //Places the item inside the map
            if (xMin < 0)
                this.coordinates.x = this.size / 2 - map.width / 2;
            if (xMax > map.width)
                this.coordinates.x = map.width - this.size / 2 - map.width / 2;
            if (yMin < 0)
                this.coordinates.y = this.size / 2 - map.height / 2;
            if (yMax > map.height)
                this.coordinates.y = map.height - this.size / 2 - map.height / 2;
            return true;
        }
        return false;
    };
    /**
     * Indicates if the item touch the given other one
     * @param item Item to test collision with
     * @return Returns true if the two items touch them, else returns false
     */
    MovableItem.prototype.isTouching = function (item) {
        return (this.coordinates.x - this.size / 2 < item.coordinates.x + item.size / 2 &&
            this.coordinates.x + this.size / 2 > item.coordinates.x - item.size / 2 &&
            this.coordinates.y - this.size / 2 < item.coordinates.y + item.size / 2 &&
            this.coordinates.y + this.size / 2 > item.coordinates.y - item.size / 2);
    };
    return MovableItem;
}(GraphicalItem));
//# sourceMappingURL=movable-item.js.map