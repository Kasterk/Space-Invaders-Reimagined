# Space Invaders PLG Y3

A browser-based Space Invaders clone built with ES modules, canvas rendering, and custom gameplay mechanics.

## Run the project

From the project folder:
Install the live server extension in your VSCode, then press Go Live at the bottom right.

From the GitHub:
Go to the pages and open the link.

## Documentation

This repository includes the following documentation files:

- `Documentation.md` — overview and docs index
- `GameArchitecture.md` — game structure, modules, and flow
- `EnemyPatterns.md` — enemy formation and pattern generation
- `ShieldSystem.md` — shield mechanics and collision handling
- `ControlsAndUI.md` — HUD, controls, and layout
- `Sources.md` — reference sources used while building the game

## Project files

- `index.html` — page markup and UI shell
- `styles.css` — layout and visual styling
- `main.js` — game loop, HUD, state management, shields, and restart/pause logic
- `Player.js` — player movement, input, and shooting
- `BulletController.js` — bullet logic and cooldown management
- `Bullet.js` — bullet rendering and collision
- `EnemyController.js` — enemy spawns, movement, shooting, and level progression
- `Enemy.js` — enemy sprite and collision
- `Shield.js` — shield representation and hit tracking
- `MovingDirection.js` — direction constants
- `Images/` — visual assets
- `Sounds/` — audio assets
