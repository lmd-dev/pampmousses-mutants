/**
 * Represents an ammo the player can collects on the map
 */
class Ammo extends GraphicalItem
{
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     */
    constructor(x: number, y: number)
    {
        super(x, y, Math.random() * Math.PI * 2, 50);

        this.addTexture('juice-extractor');
    }
}