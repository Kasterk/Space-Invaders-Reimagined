# Game Architecture

## Overview

The project is built with simple ES modules and canvas rendering. The main game loop in `main.js` coordinates updates, drawing, HUD state, and input handling.

## Main Components

- `index.html`
  - Loads the game canvas and HUD.
  - Imports the `main.js` module.

- `styles.css`
  - Styles the HUD, canvas, and responsive layout.
  - Keeps the game board centered while placing status text to the left.

- `main.js`
  - Initializes canvas, game objects, and HUD elements.
  - Implements the game loop with `setInterval(game, 1000 / 60)`.
  - Handles pause/restart logic and game-over state.
  - Updates the HUD with score, hearts, level, and high score.
  - Controls shield display and reset.

## Game Loop

The `game()` function runs every frame and performs these steps:

1. `checkGameOver()`
2. Draw background image
3. `displayGameOver()` if paused or game over
4. `updateHUD()` with score, hearts, and level
5. Early return when paused
6. `drawShields()`
7. Draw enemies, player, player bullets, and enemy bullets

## Game State

Key game state variables in `main.js`:

- `isGameOver`
- `didWin`
- `lives`
- `score`
- `isPaused`
- `sessionHighScore`

## Restart and Pause

The pause button toggles between playing and paused, and becomes `Restart` when the game ends.

`resetGame()` resets:

- game state variables
- bullets in flight
- enemy controller
- player position
- shield state

## Bullet Systems

- `BulletController.js`
  - Manages bullets for player and enemies.
  - Supports a cooldown-driven player shooting system.
  - Removes bullets that move off-screen.
  - Handles collisions with sprites.

- `Bullet.js`
  - Defines bullet shape, movement, and collision.

## Player

- `Player.js`
  - Tracks left/right movement and shooting input.
  - Uses arrow keys for control.
  - Fires bullets through the player bullet controller.
  - Ensures the player stays within canvas bounds.

## Enemies

- `EnemyController.js`
  - Generates enemy patterns and positions.
  - Moves enemies left-right and down.
  - Chooses enemies to fire bullets.
  - Handles enemy collision with player bullets.
  - Progresses levels and caps difficulty gains at level 5.

## Shields

- `Shield.js`
  - Represents shield blocks that can each take 3 hits.
  - Changes color as it takes damage.
  - Only enemy bullets damage shields.

## Assets

- `Images/` contains game visuals.
- `Sounds/` contains audio effects.
