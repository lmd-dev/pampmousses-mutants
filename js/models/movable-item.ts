class MovableItem extends GraphicalItem
{
    /**
     * Speed of the item (in pixels per second)
     */
    private _speed: number;
    public get speed(): number { return this._speed; };
    public set speed(value: number) { this._speed = value; };

    /**
     * Direction of the item (in radians)
     */
    private _direction: number;
    public get direction(): number { return this._direction; };
    public set direction(value: number) { this._direction = value; this.rotation = value; };

    /**
     * Timestamp of the last moving
     */
    private _lastMovingTimestamp: number;

    /**
     * Constructor
     * @param x X Default X coordinate
     * @param y Y Default Y coordinate
     * @param rotation Default rotation
     * @param size Default size
     * @param speed Default speed
     * @param direction Default direction
     */
    constructor(x: number = 0, y: number = 0, rotation: number = 0, size: number = 50, speed: number = 0, direction: number = 0)
    {
        super(x, y, rotation, size);

        this._speed = speed;
        this._direction = direction;
        this._lastMovingTimestamp = null;
    }

    /**
     * Moves the item in its direction and for its speed 
     */
    move()
    {
        let timestamp = new Date().getTime();

        if (this._lastMovingTimestamp !== null)
        {
            this.coordinates.move(this.direction, this.speed * ((timestamp - this._lastMovingTimestamp) / 1000.0));
        }

        this._lastMovingTimestamp = timestamp;
        
    }

    /**
     * Rotate the item to point it to the given coordinates
     * @param coordinates Coordinates to point to
     */
    pointTo(coordinates: Coordinates)
    {
        let angle = this.coordinates.getAngle(coordinates);
        this.direction = angle;
        this.rotation = angle;
    }

    /**
     * Indicates if the item is out of the given map
     * @param map Map to test
     * @return Returns true if the item is out of the map, else returns false
     */
    isOutOfMap(map: Map): boolean
    {
        let xMin = this.coordinates.x - this.size / 2 + map.width / 2;
        let xMax = this.coordinates.x + this.size / 2 + map.width / 2;

        let yMin = this.coordinates.y - this.size / 2 + map.height / 2;
        let yMax = this.coordinates.y + this.size / 2 + map.height / 2;

        if (xMin < 0 || yMin < 0 || xMax > map.width || yMax > map.height)
        {
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
    }

    /**
     * Indicates if the item touch the given other one
     * @param item Item to test collision with
     * @return Returns true if the two items touch them, else returns false
     */
    isTouching(item: GraphicalItem): boolean
    {
        return (this.coordinates.x - this.size / 2 < item.coordinates.x + item.size / 2 &&
            this.coordinates.x + this.size / 2 > item.coordinates.x - item.size / 2 &&
            this.coordinates.y - this.size / 2 < item.coordinates.y + item.size / 2 &&
            this.coordinates.y + this.size / 2 > item.coordinates.y - item.size / 2);
    }
}