# Space Invaders PLG Y3 Documentation

## Overview

This project is a browser-based recreation of Space Invaders built with HTML, CSS, and JavaScript ES modules. It includes a HUD, level progression, enemy formations, player and enemy bullets, shields, and game restart logic.

## Documents

- `README.md` — project summary, run instructions, and docs index.
- `Documentation.md` — current overview and guide to the documentation set.
- `GameArchitecture.md` — architecture and main gameplay flow.
- `EnemyPatterns.md` — enemy formation logic and pattern generation.
- `ShieldSystem.md` — shield behavior, collision rules, and damage states.
- `ControlsAndUI.md` — UI layout, HUD design, and control details.
- `Sources.md` — source references used for the project and additional resources.

## Quick start

1. Open `index.html` in a modern browser that supports ES modules.
2. Or run a local server from the project folder:

```bash
python3 -m http.server 8000
```

3. Open `http://localhost:8000/index.html`.

## Project Purpose

The goal is to practice interactive game design and modern web development patterns while keeping the game visually balanced and easy to extend.

## Notes

- The player uses a button-based pause/restart flow.
- Lives are shown as hearts.
- Shields appear while playing and hide during pause.
- Enemy bullet speed and player bullet cooldown are capped at level 5.
