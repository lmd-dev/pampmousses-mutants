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
 * Represents the player
 */
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     * @param rotation Default rotation
     * @param direction Default direction
     */
    function Human(x, y, direction) {
        var _this = _super.call(this, x, y, direction, 30, 200, direction) || this;
        _this.addTexture('human-1');
        _this.addTexture('human-2');
        _this._invincible = false;
        return _this;
    }
    Object.defineProperty(Human.prototype, "health", {
        get: function () { return this._health; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Human.prototype, "score", {
        get: function () { return this._score; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Human.prototype, "ammo", {
        get: function () { return this._ammo; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Human.prototype, "invincible", {
        get: function () { return this._invincible; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * resets default health of the player
     */
    Human.prototype.resetHealth = function () {
        this._health = 5;
    };
    /**
     * Resets default ammo of the player
     */
    Human.prototype.resetAmmo = function () {
        this._ammo = 3;
    };
    /**
     * Stops moving the player
     */
    Human.prototype.stop = function () {
        this.speed = 0;
    };
    /**
     * Makes the player moving
     */
    Human.prototype.run = function () {
        this.speed = 200;
    };
    /**
     * Remove one ammo from the player
     */
    Human.prototype.fireBullet = function () {
        --this._ammo;
    };
    /**
     * Hurts the player if he is not invincible
     */
    Human.prototype.hurt = function () {
        if (this._invincible == false) {
            --this._health;
            if (this._health !== 0)
                this.enableInvincibility();
        }
    };
    /**
     * Makes the player invincible for 3 seconds
     */
    Human.prototype.enableInvincibility = function () {
        var _this = this;
        this._invincible = true;
        clearTimeout(this._timerInvincibility);
        this.animateInvincibility();
        this._timerInvincibility = setTimeout(function () {
            _this._invincible = false;
            clearTimeout(_this._timerInvincibilityAnimation);
        }, 3000);
    };
    /**
     * Animate the invincibility of the player by switching active textures
     */
    Human.prototype.animateInvincibility = function () {
        var _this = this;
        this.activeTexture = this.activeTexture == 0 ? 1 : 0;
        this._timerInvincibilityAnimation = setTimeout(function () {
            _this.animateInvincibility();
        }, 100);
    };
    /**
     * Gives 5 ammos to the player
     */
    Human.prototype.getAmmo = function () {
        this._ammo += 5;
    };
    return Human;
}(MovableItem));
//# sourceMappingURL=human.js.map