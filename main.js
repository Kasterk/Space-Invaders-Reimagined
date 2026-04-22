import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 650;

const background = new Image();
background.src = "Images/Background.jpg";

const playerBulletController = new BulletController(canvas, 8, "red", true); // pass canvas, amount of bullets, color and whether to play sound
const enemyBulletController = new BulletController(canvas, 4, "white", false); // pass canvas, amount of bullets, color and whether to play sound
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController); // Fix 1: pass canvas and enemy bullet controller
const player = new Player(canvas, 3, playerBulletController); // pass canvas, velocity and player bullet controller

let isGameOver = false;
let didWin = false;

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Win!" : "Game Over!";
        let textOffset = didWin ? 3.05 : 3; 

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length == 0) {
        isGameOver = true;
        didWin = true;
    }
}

setInterval(game, 1000 / 60);