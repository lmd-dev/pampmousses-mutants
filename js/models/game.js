/**
 * Represents the core of game
 */
var Game = /** @class */ (function () {
    /**
     * Constructor
     */
    function Game() {
        this._map = new Map();
        this._level = 0;
        this._player = null;
        this._readyToRun = false;
        this._status = GameStatus.waitingGame;
    }
    Object.defineProperty(Game.prototype, "map", {
        get: function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Game.prototype, "items", {
        get: function () { return this._items; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Game.prototype, "player", {
        get: function () { return this._player; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Game.prototype, "level", {
        get: function () { return this._level; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Game.prototype, "readyToRun", {
        get: function () { return this._readyToRun; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Game.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Preloads all textures of the game
     * @return Returns a Promise resolved when all textures are loaded
     */
    Game.prototype.initializeTextures = function () {
        var _this = this;
        this._readyToRun = false;
        var texturesLoader = TexturesLoader.getHandle();
        var promises = new Array();
        promises.push(texturesLoader.load('human-1', 'img/textures/human/normal.png'));
        promises.push(texturesLoader.load('human-2', 'img/textures/human/unstoppable.png'));
        promises.push(texturesLoader.load('pampmousse-1', 'img/textures/pampmousse/pampmousse-1.png'));
        promises.push(texturesLoader.load('pampmousse-2', 'img/textures/pampmousse/pampmousse-2.png'));
        promises.push(texturesLoader.load('pampmousse-3', 'img/textures/pampmousse/pampmousse-3.png'));
        promises.push(texturesLoader.load('pampmousse-4', 'img/textures/pampmousse/pampmousse-4.png'));
        promises.push(texturesLoader.load('juice-extractor', 'img/textures/juice-extractor/juice-extractor.png'));
        return new Promise(function (resolve, reject) {
            Promise.all(promises).then(function () {
                _this._readyToRun = true;
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * Creates a new game starting level 1
     */
    Game.prototype.newGame = function () {
        this._level = 0;
        this._player = new Human(0, 0, 0);
        this._status = GameStatus.waitingGame;
    };
    /**
     * Start a new level
     */
    Game.prototype.nextLevel = function () {
        this._level++;
        this._status = GameStatus.inProgress;
        this.initializeLevel();
    };
    /**
     * sets the level to play
     */
    Game.prototype.initializeLevel = function () {
        this._status = GameStatus.inProgress;
        this._items = new Array();
        //Create monsters
        for (var iMonster = 0; iMonster < this._level * 2; ++iMonster) {
            var x = Math.random() * this.map.width - this.map.width / 2;
            var y = Math.random() * this.map.height - this.map.height / 2;
            var direction = Math.random() * Math.PI * 2;
            this._items.push(new Pampmousse(x, y, direction));
        }
        this._items.push(this._player);
        //Initialize player data
        this.player.coordinates.x = 0;
        this.player.coordinates.y = 0;
        this.player.resetHealth();
        this.player.resetAmmo();
    };
    /**
     * Update positions of all moving items
     * @return Returns a boolean indicating majors events occured during the update (ex: and of the game).
     */
    Game.prototype.updateMoving = function () {
        var eventsRaised = false;
        for (var iItem = 0; iItem < this._items.length; ++iItem) {
            var item = this._items[iItem];
            if (item instanceof MovableItem) {
                item.move();
                //Collisions with the side of the scene
                if (item.isOutOfMap(this.map)) {
                    if (item instanceof Pampmousse) {
                        item.direction += Math.PI / 2;
                    }
                    else if (item instanceof Human) {
                        item.stop();
                    }
                    else if (item instanceof Bullet) {
                        this._items.splice(iItem, 1);
                        --iItem;
                    }
                }
                else {
                    //Collisions between items
                    if (item instanceof Human || item instanceof Bullet) {
                        for (var iItem2 = 0; iItem2 < this._items.length; ++iItem2) {
                            var item2 = this._items[iItem2];
                            if (item.isTouching(item2)) {
                                if (item2 instanceof Pampmousse) {
                                    if (item instanceof Human) {
                                        item.hurt();
                                        eventsRaised = true;
                                    }
                                    else if (item instanceof Bullet) {
                                        //Remove the Pampmousse
                                        this._items.splice(iItem2, 1);
                                        if (iItem2 < iItem)
                                            --iItem;
                                        --iItem2;
                                        //Remove the bullet
                                        this._items.splice(iItem, 1);
                                        --iItem;
                                    }
                                }
                                else if (item2 instanceof Ammo && item instanceof Human) {
                                    item.getAmmo();
                                    eventsRaised = true;
                                    //remove ammo
                                    this._items.splice(iItem2, 1);
                                    if (iItem2 < iItem)
                                        --iItem;
                                    --iItem2;
                                }
                            }
                        }
                    }
                }
            }
        }
        ;
        if (this.player.health <= 0) {
            this._status = GameStatus.lost;
            eventsRaised = true;
        }
        else if (this.getNumberOfPampmousses() == 0) {
            this._status = GameStatus.won;
            eventsRaised = true;
        }
        return eventsRaised;
    };
    /**
     * Multiplies all Pampmousses on the map (1 => 3)
     */
    Game.prototype.multiplyPampmousses = function () {
        var _this = this;
        this._items.forEach(function (item) {
            if (item instanceof Pampmousse) {
                _this._items.push(new Pampmousse(item.coordinates.x, item.coordinates.y, item.direction + Math.PI * 2 / 3));
                _this._items.push(new Pampmousse(item.coordinates.x, item.coordinates.y, item.direction - Math.PI * 2 / 3));
            }
        });
    };
    /**
     * Places an ammo item randomly on the map
     */
    Game.prototype.sendAmmo = function () {
        this._items.push(new Ammo(Math.floor(Math.random() * this.map.width - this.map.width / 2), Math.floor(Math.random() * this.map.height - this.map.height / 2)));
    };
    /**
     * Fires a juice-extractor if player has enougth ammo
     */
    Game.prototype.fireBullet = function () {
        if (this._player.ammo > 0) {
            this.player.fireBullet();
            this._items.push(new Bullet(this._player.coordinates.x, this._player.coordinates.y, this._player.direction));
        }
    };
    /**
     * Returns the number of keeping Pampmousses
     * @return The number of Pampmousses currently on the map
     */
    Game.prototype.getNumberOfPampmousses = function () {
        var pampmousses = 0;
        this._items.forEach(function (item) {
            if (item instanceof Pampmousse)
                ++pampmousses;
        });
        return pampmousses;
    };
    return Game;
}());
//# sourceMappingURL=game.js.map