import Bullet from "./Bullet.js";

export default class BulletController {

    bullets = [];
    timeTillNextBulletAllowed = 0; // Important to be 0, as soon as we hit space we want our first bullet to be fired, if we set this to 10 for example, we would have to wait 10 frames before our first bullet is fired

    // defaultBulletVelocity: used when shoot() is called without explicit velocity
    // cooldownSeconds: optional; if provided, shooting is governed by a cooldown instead of max bullets
    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled, defaultBulletVelocity = 3, cooldownSeconds = null) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("Sounds/shoot.wav");
        this.shootSound.volume = 0.04;

        this.defaultBulletVelocity = defaultBulletVelocity;
        this.cooldownFrames = cooldownSeconds != null ? Math.round(cooldownSeconds * 60) : null;
    }

    draw(ctx) {
        this.bullets = this.bullets.filter(bullet => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height); // filter out bullets that are off the screen

        this.bullets.forEach(bullet => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) => 
            bullet.collideWith(sprite)
        );
        
        if (bulletThatHitSpriteIndex >= 0) {
            this.bullets.splice(bulletThatHitSpriteIndex, 1);
            return true;
        }
        return false;
    }

    shoot (x, y, velocity) {
        const vel = (typeof velocity === 'number') ? velocity : this.defaultBulletVelocity;

        // If a cooldown is configured, use it instead of max-bullets cap
        if (this.cooldownFrames != null) {
            if (this.timeTillNextBulletAllowed <= 0) {
                const bullet = new Bullet(this.canvas, x, y, vel, this.bulletColor);
                this.bullets.push(bullet);
                if (this.soundEnabled) {
                    this.shootSound.currentTime = 0;
                    this.shootSound.play();
                }
                this.timeTillNextBulletAllowed = this.cooldownFrames;
            }
            return;
        }

        // Fallback behaviour: limit by max bullets in flight
        if (this.timeTillNextBulletAllowed <= 0 && this.bullets.length < this.maxBulletsAtATime) {
            const bullet = new Bullet(this.canvas, x, y, vel, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            // keep timeTillNextBulletAllowed as 0 for controllers that don't use it
            this.timeTillNextBulletAllowed = 0;
        }
    }
}