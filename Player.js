export default class Player {

    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;

        this.image = new Image();
        this.image.src = './Images/Player.png';

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx) {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width / 2, this.y);
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls() {
        //left wall
        if (this.x < 0) {
            this.x = 0;
        }

        //right wall
        if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width; //always drawing the player from top left corner, so we need to take the width into account for the right wall
        }
    }

    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x -= this.velocity;
        }
    }

    keydown = event =>{
        if (event.code == "ArrowRight" || event.code == "KeyD") {
            this.rightPressed = true;
        }
        if (event.code == "ArrowLeft" || event.code == "KeyA") {
            this.leftPressed = true;
        }
        if (event.code == "ArrowUp" || event.code == "KeyW") {
            this.shootPressed = true;
        }
    }

    keyup = event =>{
        if (event.code == "ArrowRight" || event.code == "KeyD") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft" || event.code == "KeyA") {
            this.leftPressed = false;
        }
        if (event.code == "ArrowUp" || event.code == "KeyW") {
            this.shootPressed = false;
        }
    }

    reset() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
    }
}