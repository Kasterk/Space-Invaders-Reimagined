import EnemyController from "./EnemyController.js";

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 700;

const background = new Image();
background.src = "Images/Background.jpg";

const enemyController = new EnemyController();

function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyController.draw(ctx);
}

setInterval(game, 1000 / 60);