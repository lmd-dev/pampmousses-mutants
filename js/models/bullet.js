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
/**
 * Represents a bullet fired by the player
 * @author Les Moulins Du Dev
 * @version 1
 */
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     * @param direction Default direction
     */
    function Bullet(x, y, direction) {
        var _this = _super.call(this, x, y, 0, 50, 500, direction) || this;
        _this.addTexture('juice-extractor');
        return _this;
    }
    return Bullet;
}(MovableItem));
//# sourceMappingURL=bullet.js.map