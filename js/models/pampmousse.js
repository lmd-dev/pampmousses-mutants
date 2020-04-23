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
 * Represents a Pampmousse Monster
 */
var Pampmousse = /** @class */ (function (_super) {
    __extends(Pampmousse, _super);
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     * @param direction Default direction
     */
    function Pampmousse(x, y, direction) {
        var _this = _super.call(this, x, y, direction, 89, 100, direction) || this;
        _this.addTexture('pampmousse-1');
        _this.addTexture('pampmousse-2');
        _this.addTexture('pampmousse-3');
        _this.addTexture('pampmousse-4');
        _this.animateEye();
        return _this;
    }
    /**
     * Animates the eye of the pampmousse randomly
     */
    Pampmousse.prototype.animateEye = function () {
        var _this = this;
        this.activeTexture = Math.floor(Math.random() * this.textures.length);
        setTimeout(function () {
            _this.animateEye();
        }, Math.random() * 300 + 300);
    };
    return Pampmousse;
}(MovableItem));
//# sourceMappingURL=pampmousse.js.map