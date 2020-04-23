/**
 * Represents a 2D coordinates
 */
class Coordinates
{
    /**
     * X coordinate
     */
    private _x: number;
    public get x(): number { return this._x; };
    public set x(value: number) { this._x = value; };

    /**
     * Y coordinate
     */
    private _y: number;
    public get y(): number { return this._y; };
    public set y(value: number) { this._y = value; };

    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     */
    constructor(x: number = 0, y: number = 0)
    {
        this._x = x;
        this._y = y;
    }

    /**
     * Moves the coordinate for given distance to given direction
     * @param direction Direction to move
     * @param distance Distance to move
     */
    move(direction: number, distance: number)
    {
        let newCoordinates = new Coordinates(this.x, this.y);
        newCoordinates.x += distance;
        newCoordinates.rotate(this, direction);

        this.x = newCoordinates.x;
        this.y = newCoordinates.y;
    }

    /**
     * Rotates the coordinates arround given center
     * @param center Coordinates of the center of the rotation
     * @param angle Angle of the rotation (in radians)
     */
    rotate(center: Coordinates, angle: number)
    {
        this.x -= center.x;
        this.y -= center.y;

        let xTemp = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        let yTemp = this.x * Math.sin(angle) + this.y * Math.cos(angle);

        this.x = xTemp + center.x;
        this.y = yTemp + center.y;
    }

    /**
     * Returns the angle between two points
     * @param coordinates
     */
    getAngle(coordinates: Coordinates)
    {
        let angle = 0;
        let radius = Math.sqrt(Math.pow(this.x - coordinates.x, 2) + Math.pow(this.y - coordinates.y, 2));
        angle = (Math.asin(Math.abs(coordinates.y - this.y) / radius));
        if (coordinates.x < this.x)
            angle = Math.PI - angle;

        if (coordinates.y < this.y)
            angle = (2 * Math.PI) - angle;

        return angle;
    }
}