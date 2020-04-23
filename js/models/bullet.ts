/**
 * Represents a bullet fired by the player
 * @author Les Moulins Du Dev
 * @version 1
 */
class Bullet extends MovableItem
{
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     * @param direction Default direction
     */
    constructor(x, y, direction)
    {
        super(x, y, 0, 50, 500, direction);

        this.addTexture('juice-extractor');
    }
}