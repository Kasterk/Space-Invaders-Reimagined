import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 600;

const background = new Image();
background.src = "Images/Background.jpg";

const playerBulletController = new BulletController(canvas, 10, "red", true); // pass canvas, amount of bullets, color and whether to play sound
const enemyController = new EnemyController(canvas); // Fix 1: pass canvas
const player = new Player(canvas, 3, playerBulletController); // pass canvas, velocity and player bullet controller

function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
}

setInterval(game, 1000 / 60);