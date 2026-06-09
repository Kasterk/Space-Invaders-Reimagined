# Shield System

## Purpose

Shields protect the player from enemy bullets and add an extra layer of gameplay strategy.

## Implementation

The shields are represented by the `Shield` class in `Shield.js`.

### Shield properties

Each shield contains:

- `x`, `y` — screen position
- `width`, `height` — size
- `hp` — hit points remaining

### Hit states

- `hp = 3`: fully healthy
- `hp = 2`: damaged once
- `hp = 1`: damaged twice
- `hp = 0`: destroyed

### Color changes

The shield changes color depending on its remaining HP:

- `3` => `#5fc15f`
- `2` => `#d9c84b`
- `1` => `#dd6f3f`

### Collision

- The shield responds to `collideWith(sprite)`.
- Only enemy bullets can damage shields.
- Player bullets do not damage shields in the current logic.

### Damage handling

When an enemy bullet hits a shield:

1. `shield.hit()` decrements HP.
2. The bullet is removed via `BulletController.collideWith()`.
3. If HP reaches zero, the shield is no longer drawn.

### Visibility

Shields are only drawn while the game is playing. When the game is paused, the shields are hidden.

### Reset behavior

When the game restarts, all shields are recreated via `createShields()`.

## Shield layout

- The game spawns 4 shields.
- Shields are positioned symmetrically in front of the player.
- They are thinner and spaced widely for clearer gameplay.

## Source file

- `Shield.js`
- `main.js` for shield drawing, collision handling, and reset logic
