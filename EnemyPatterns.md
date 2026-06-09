# Enemy Patterns

## Base Pattern

The initial enemy wave is defined in `EnemyController.js` by `enemyMap`:

```js
enemyMap = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 3, 3, 3, 3, 2, 2],
  [2, 2, 3, 3, 3, 3, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
```

- `1`, `2`, and `3` represent different enemy types.
- Rows contain eight enemies each.
- The pattern is symmetric across the center.

## Dynamic Level Patterns

For later levels, the game generates new symmetric patterns using `getEnemyPattern(level)`:

- Only levels after 1 use generated patterns.
- The pattern remains symmetric by mirroring columns left-to-right.
- A `holeChance` increases the number of removed enemies as the level increases.
- The code ensures each line contains at least one enemy.

## Enemy Type Selection

Enemy type selection is weighted by row:

- Top rows favor stronger enemies.
- Middle rows favor medium enemies.
- Bottom row favors lighter enemies.

The helper function `chooseEnemyType(rowIndex)` returns enemy types with a simple weighted random distribution.

## Enemy Movement and Shooting

- Enemies move horizontally and switch direction when reaching the screen edge.
- When they reach one edge, they move down and continue in the opposite direction.
- Enemy shooting chooses a random current enemy and fires toward the player.

## Difficulty Caps

The enemy system caps difficulty growth at level 5:

- `defaultXVelocity` stops increasing after level 5.
- `fireBulletTimerDefault` stops decreasing after level 5.
- Enemy bullet speed is capped using `Math.min(this.level, 5)`.

## Notes

This approach keeps later levels visually interesting while avoiding excessively fast enemy waves. The symmetry rule helps maintain patterns that look good and balanced.
