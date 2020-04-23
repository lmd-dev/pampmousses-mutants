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
 * Represents an ammo the player can collects on the map
 */
var Ammo = /** @class */ (function (_super) {
    __extends(Ammo, _super);
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     */
    function Ammo(x, y) {
        var _this = _super.call(this, x, y, Math.random() * Math.PI * 2, 50) || this;
        _this.addTexture('juice-extractor');
        return _this;
    }
    return Ammo;
}(GraphicalItem));
//# sourceMappingURL=ammo.js.map