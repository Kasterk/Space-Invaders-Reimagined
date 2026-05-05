import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const levelElement = document.getElementById('level');

canvas.width = 750;
canvas.height = 650;

const background = new Image();
background.src = "Images/Background.jpg";

const playerBulletController = new BulletController(canvas, 8, "red", true); // pass canvas, amount of bullets, color and whether to play sound
const enemyBulletController = new BulletController(canvas, 4, "white", false); // pass canvas, amount of bullets, color and whether to play sound
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController, () => score += 10); // Fix 1: pass canvas and enemy bullet controller
const player = new Player(canvas, 3, playerBulletController); // pass canvas, velocity and player bullet controller

let isGameOver = false;
let didWin = false;
let lives = 3;
let score = 0;
let isPaused = true;

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    updateHUD();
    
    if (isPaused) {
        return;
    }
    
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver || isPaused) {
        let text = isGameOver ? (didWin ? "You Win!" : "Game Over!") : "PAUSED";
        let textOffset = didWin ? 3.05 : 3; 

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function updateHUD() {
    scoreElement.innerText = `Score: ${score}`;
    livesElement.innerText = `Lives: ${lives}`;
    levelElement.innerText = `Level: ${enemyController.level}`;
}

pauseButton.addEventListener('click', () => {
    if (isGameOver) return;
    
    isPaused = !isPaused;
    pauseButton.innerText = isPaused ? "Resume" : "Pause";
});

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player)) {
        lives--;
        if (lives <= 0) {
            isGameOver = true;
        }
    }

    if (enemyController.collideWith(player)) {
        lives--;
        if (lives <= 0) {
            isGameOver = true;
        }
    }

    if (enemyController.enemyRows.length == 0) {
        score += 20;
        enemyController.nextLevel();
        player.reduceShootCooldown(0.5);
    }
}

setInterval(game, 1000 / 60);