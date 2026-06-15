import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Shield from "./Shield.js";

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const levelElement = document.getElementById('level');
const highscoreElement = document.getElementById('highscore');
const pauseButton = document.getElementById('pauseButton');

canvas.width = 750;
canvas.height = 650;

const background = new Image();
background.src = "Images/Background.jpg";

const playerBulletController = new BulletController(canvas, 999, "red", true, 4, 0.9); // player uses cooldown-based shooting (start 0.3s)
const enemyBulletController = new BulletController(canvas, 4, "white", false, 3); // enemy bullets unchanged
let enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController, () => score += 10); // allow reassign on restart
const player = new Player(canvas, 3, playerBulletController); // pass canvas, velocity and player bullet controller
let shields = createShields();

let isGameOver = false;
let didWin = false;
let lives = 3;
let score = 0;
let isPaused = true;
let sessionHighScore = 0;

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    updateHUD();
    
    if (isPaused) {
        return;
    }
    
    drawShields();
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
    livesElement.innerText = '♥'.repeat(Math.max(0, lives));
    levelElement.innerText = `Level: ${enemyController.level}`;

    // update session high score
    if (score > sessionHighScore) sessionHighScore = score;
    if (highscoreElement) highscoreElement.innerText = `High Score: ${sessionHighScore}`;

    // adjust player bullet speed and cooldown per level (capped at level 5)
    const effectiveLevel = Math.min(enemyController.level, 5);

    // make player's bullets a little faster each level
    // base speed 4, increase by 0.5 per effective level
    if (playerBulletController) {
        playerBulletController.defaultBulletVelocity = 4 + (effectiveLevel * 0.5);

        // compute linear cooldown from 0.3s at level1 down to 0.1s at level5
        const start = 0.5;
        const end = 0.2;
        const cooldownSeconds = Math.max(end, start - (effectiveLevel - 1) * ((start - end) / 4));
        playerBulletController.cooldownFrames = Math.max(1, Math.round(cooldownSeconds * 60));
    }
}

pauseButton.addEventListener('click', () => {
    if (isGameOver) {
        resetGame();
        return;
    }

    isPaused = !isPaused;
    pauseButton.innerText = isPaused ? "Resume" : "Pause";
});

function resetGame() {
    // reset basic game state
    isGameOver = false;
    didWin = false;
    lives = 3;
    score = 0;
    isPaused = false;

    // reset bullets
    playerBulletController.bullets = [];
    playerBulletController.timeTillNextBulletAllowed = 0;
    enemyBulletController.bullets = [];
    enemyBulletController.timeTillNextBulletAllowed = 0;

    // recreate enemy controller to reset enemies and timers
    enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController, () => score += 10);

    // reset player position
    if (player && typeof player.reset === 'function') player.reset();

    // reset shields
    resetShields();

    // update button text to reflect playing state
    pauseButton.innerText = "Pause";
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    let shieldHit = false;
    for (const shield of shields) {
        if (shield.hp > 0 && enemyBulletController.collideWith(shield)) {
            shield.hit();
            shieldHit = true;
            break;
        }
    }

    if (!shieldHit && enemyBulletController.collideWith(player)) {
        lives--;
        if (lives <= 0 && enemyController.level > 5) {
            isGameOver = true;
            didWin = true;
        } else if (lives <= 0) {
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
    }

    if (isGameOver) {
        pauseButton.innerText = "Restart";
    }
}

function drawShields() {
    shields.forEach(shield => shield.draw(ctx));
}

function createShields() {
    const shieldCount = 4;
    const shieldWidth = 80;
    const shieldHeight = 28;
    const gap = 85;
    const totalWidth = shieldCount * shieldWidth + (shieldCount - 1) * gap;
    const startX = (canvas.width - totalWidth) / 2;
    const y = canvas.height - 150;
    const newShields = [];
    for (let i = 0; i < shieldCount; i++) {
        newShields.push(new Shield(startX + i * (shieldWidth + gap), y, shieldWidth, shieldHeight));
    }
    return newShields;
}

function resetShields() {
    shields = createShields();
}

setInterval(game, 1000 / 60);