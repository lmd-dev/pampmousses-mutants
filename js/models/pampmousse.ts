/**
 * Represents a Pampmousse Monster
 */
class Pampmousse extends MovableItem
{
    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     * @param direction Default direction
     */
    constructor(x: number, y: number, direction: number)
    {
        super(x, y, direction, 89, 100, direction);
       
        this.addTexture('pampmousse-1');
        this.addTexture('pampmousse-2');
        this.addTexture('pampmousse-3');
        this.addTexture('pampmousse-4');

        this.animateEye();
    }

    /**
     * Animates the eye of the pampmousse randomly
     */
    animateEye()
    {
        this.activeTexture = Math.floor(Math.random() * this.textures.length);

        setTimeout(() =>
        {
            this.animateEye();
        }, Math.random() * 300 + 300);
    }
}