# Controls and UI

## Controls

- `ArrowLeft` — move player left
- `ArrowRight` — move player right
- `ArrowUp` — shoot
- `Start/Pause/Resume/Restart` button — toggle game state or restart after game over

## HUD

The HUD is split into two areas:

- `#topHud` shows the current score, high score, and action button.
- `#sideStats` shows lives and level to the left of the game board.

### Score and High Score

- `#score` is the current score.
- `#highscore` shows the session high score.
- Both are updated every frame in `main.js`.

### Lives as hearts

- Lives display uses `♥` symbols.
- The value is updated in `updateHUD()` using JavaScript string repetition.
- The hearts are larger via `#lives` styling in `styles.css`.

### Level display

- `#level` displays the current enemy level.
- It updates automatically based on `enemyController.level`.

## Button behavior

- During a running game, the button toggles pause/resume.
- When the game ends, the button becomes `Restart`.
- Restart resets the game state without reloading the page.

## Layout

The HTML and CSS ensure:

- the game board stays centered
- the status text does not shift the board position
- shields are hidden while paused

### Important selectors

- `#gameRow` centers the play area.
- `#boardWrapper` keeps the canvas centered and contains the shield area.
- `#sideStats` is absolutely positioned to the left of the canvas.
- `#board` is sized at `750px` by `650px` and given a shadow for depth.

## Responsive behavior

For screens narrower than 900px:

- `#boardWrapper` becomes `90vw`
- the canvas scales to full width
- `#sideStats` moves above the board
- stats text becomes smaller to fit better
