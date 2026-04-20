import Bullet from "./Bullet.js";

export default class BulletController {

    bullets = [];
    timeTillNextBulletAllowed = 0; // Important to be 0, as soon as we hit space we want our first bullet to be fired, if we set this to 10 for example, we would have to wait 10 frames before our first bullet is fired

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("Sounds/shoot.wav");
        this.shootSound.volume = 0.1;
    }

    draw(ctx) {
        this.bullets.forEach(bullet => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    shoot (x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (
            this.timeTillNextBulletAllowed <= 0 && 
            this.bullets.length < this.maxBulletsAtATime
        ) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0; // allows the sound to be player multiple times in a row without having to wait for the sound to finish
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}