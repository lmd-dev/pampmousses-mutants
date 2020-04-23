/**
 * Represents the player
 */
class Human extends MovableItem
{
    /**
     * Health points of the player
     */
    private _health: number;
    public get health(): number { return this._health; };

    /**
     * Score of the human
     */ 
    private _score: number;
    public get score(): number { return this._score; };

    /**
     * Ammo
     */
    private _ammo: number;
    public get ammo(): number { return this._ammo; };

    /**
     * Is the player invinsible ?
     */
    private _invincible: boolean;
    public get invincible(): boolean { return this._invincible; };

    /**
     * Timer responcible for invincibility
     */
    private _timerInvincibility: number;

    /**
     * Timer responsible for invincibility animation
     */
    private _timerInvincibilityAnimation: number;

    /**
     * Constructor
     * @param x Default X coordinate
     * @param y Default Y coordinate
     * @param rotation Default rotation
     * @param direction Default direction
     */
    constructor(x: number, y: number, direction: number)
    {
        super(x, y, direction, 30, 200, direction);

        this.addTexture('human-1');
        this.addTexture('human-2');

        this._invincible = false;
    }

    /**
     * resets default health of the player
     */
    resetHealth()
    {
        this._health = 5;
    }

    /**
     * Resets default ammo of the player
     */
    resetAmmo()
    {
        this._ammo = 3;
    }

    /**
     * Stops moving the player
     */
    stop()
    {
        this.speed = 0;
    }

    /**
     * Makes the player moving
     */
    run()
    {
        this.speed = 200;
    }

    /**
     * Remove one ammo from the player
     */
    fireBullet()
    {
        --this._ammo;
    }

    /**
     * Hurts the player if he is not invincible
     */
    hurt()
    {
        if (this._invincible == false)
        {
            --this._health;

            if (this._health !== 0)
                this.enableInvincibility();
        }
    }

    /**
     * Makes the player invincible for 3 seconds
     */
    enableInvincibility()
    {
        this._invincible = true;

        clearTimeout(this._timerInvincibility);

        this.animateInvincibility();

        this._timerInvincibility = setTimeout(() =>
        {
            this._invincible = false;
            clearTimeout(this._timerInvincibilityAnimation);
        }, 3000);
    }

    /**
     * Animate the invincibility of the player by switching active textures
     */
    animateInvincibility()
    {
        this.activeTexture = this.activeTexture == 0 ? 1 : 0;

        this._timerInvincibilityAnimation = setTimeout(() =>
        {
            this.animateInvincibility();
        }, 100);
    }

    /**
     * Gives 5 ammos to the player
     */
    getAmmo()
    {
        this._ammo += 5;
    }
}