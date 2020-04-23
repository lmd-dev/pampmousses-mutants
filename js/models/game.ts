/**
 * Represents the core of game
 */
class Game
{
    /**
     * Map of the game
     */
    private _map: Map;
    public get map(): Map { return this._map; };

    /**
     * Graphical items on the map
     */
    private _items: Array<GraphicalItem>;
    public get items(): Array<GraphicalItem> { return this._items; };

    /**
     * Player reference
     */
    private _player: Human;
    public get player(): Human { return this._player; };

    /**
     * Level of the game
     */
    private _level: number;
    public get level(): number { return this._level; };

    /**
     * Indicates if the game is ready to be run
     */
    private _readyToRun: boolean;
    public get readyToRun(): boolean { return this._readyToRun; };

    /**
     * Status of the game
     */
    private _status: GameStatus;
    public get status(): GameStatus { return this._status; };

    /**
     * Constructor
     */
    constructor()
    {
        this._map = new Map();
        this._level = 0;
        this._player = null;
        this._readyToRun = false;
        this._status = GameStatus.waitingGame;
    }

    /**
     * Preloads all textures of the game
     * @return Returns a Promise resolved when all textures are loaded
     */
    initializeTextures(): Promise<any>
    {
        this._readyToRun = false;

        let texturesLoader = TexturesLoader.getHandle();

        let promises = new Array<Promise<any>>();
        promises.push(texturesLoader.load('human-1', 'img/textures/human/normal.png'));
        promises.push(texturesLoader.load('human-2', 'img/textures/human/unstoppable.png'));
        promises.push(texturesLoader.load('pampmousse-1', 'img/textures/pampmousse/pampmousse-1.png'));
        promises.push(texturesLoader.load('pampmousse-2', 'img/textures/pampmousse/pampmousse-2.png'));
        promises.push(texturesLoader.load('pampmousse-3', 'img/textures/pampmousse/pampmousse-3.png'));
        promises.push(texturesLoader.load('pampmousse-4', 'img/textures/pampmousse/pampmousse-4.png'));
        promises.push(texturesLoader.load('juice-extractor', 'img/textures/juice-extractor/juice-extractor.png'));

        return new Promise((resolve, reject) =>
        {
            Promise.all(promises).then(() =>
            {
                this._readyToRun = true;
                resolve();
            }).catch((error) =>
            {
                reject(error);
            });
        });
    }

    /**
     * Creates a new game starting level 1
     */
    newGame()
    {
        this._level = 0;
        this._player = new Human(0, 0, 0);
        this._status = GameStatus.waitingGame;
    }

    /**
     * Start a new level
     */
    nextLevel()
    {
        this._level++;
        this._status = GameStatus.inProgress;
        this.initializeLevel();
    }

    /**
     * sets the level to play
     */
    initializeLevel()
    {
        this._status = GameStatus.inProgress;
        this._items = new Array<GraphicalItem>();

        //Create monsters
        for (let iMonster = 0; iMonster < this._level * 2; ++iMonster)
        {
            let x = Math.random() * this.map.width - this.map.width / 2;
            let y = Math.random() * this.map.height - this.map.height / 2;
            let direction = Math.random() * Math.PI * 2;

            this._items.push(new Pampmousse(x, y, direction));
        }

        this._items.push(this._player);

        //Initialize player data
        this.player.coordinates.x = 0;
        this.player.coordinates.y = 0;
        this.player.resetHealth();
        this.player.resetAmmo();
    }

    /**
     * Update positions of all moving items
     * @return Returns a boolean indicating majors events occured during the update (ex: and of the game).
     */
    updateMoving(): boolean
    {
        let eventsRaised = false;

        for (let iItem = 0; iItem < this._items.length; ++iItem)
        {
            let item = this._items[iItem];

            if (item instanceof MovableItem)
            {
                item.move();

                //Collisions with the side of the scene
                if (item.isOutOfMap(this.map))
                {
                    if (item instanceof Pampmousse)
                    {
                        item.direction += Math.PI / 2;
                    }
                    else if (item instanceof Human)
                    {
                        item.stop();
                    }
                    else if (item instanceof Bullet)
                    {
                        this._items.splice(iItem, 1);
                        --iItem;
                    }
                }
                else
                {
                    //Collisions between items
                    if (item instanceof Human || item instanceof Bullet)
                    {
                        for (let iItem2 = 0; iItem2 < this._items.length; ++iItem2)
                        {
                            let item2 = this._items[iItem2];

                            if (item.isTouching(item2))
                            {
                                if (item2 instanceof Pampmousse)
                                {
                                    if (item instanceof Human)
                                    {
                                        item.hurt();
                                        eventsRaised = true;
                                    }
                                    else if (item instanceof Bullet)
                                    {
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
                                else if (item2 instanceof Ammo && item instanceof Human)
                                {
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
        };

        if (this.player.health <= 0)
        {
            this._status = GameStatus.lost;
            eventsRaised = true;
        }
        else if (this.getNumberOfPampmousses() == 0)
        {
            this._status = GameStatus.won;
            eventsRaised = true;
        }

        return eventsRaised;
    }

    /**
     * Multiplies all Pampmousses on the map (1 => 3)
     */
    multiplyPampmousses()
    {
        this._items.forEach((item: GraphicalItem) =>
        {
            if (item instanceof Pampmousse)
            {
                this._items.push(new Pampmousse(item.coordinates.x, item.coordinates.y, item.direction + Math.PI * 2 / 3));
                this._items.push(new Pampmousse(item.coordinates.x, item.coordinates.y, item.direction - Math.PI * 2 / 3));
            }
        });
    }

    /**
     * Places an ammo item randomly on the map
     */
    sendAmmo()
    {
        this._items.push(new Ammo(
            Math.floor(Math.random() * this.map.width - this.map.width / 2),
            Math.floor(Math.random() * this.map.height - this.map.height / 2)
        ));
    }

    /**
     * Fires a juice-extractor if player has enougth ammo
     */
    fireBullet()
    {
        if (this._player.ammo > 0)
        {
            this.player.fireBullet();
            this._items.push(new Bullet(this._player.coordinates.x, this._player.coordinates.y, this._player.direction));
        }
    }

    /**
     * Returns the number of keeping Pampmousses
     * @return The number of Pampmousses currently on the map
     */
    getNumberOfPampmousses(): number
    {
        let pampmousses = 0;

        this._items.forEach((item: GraphicalItem) =>
        {
            if (item instanceof Pampmousse)
                ++pampmousses;
        });

        return pampmousses;
    }
}