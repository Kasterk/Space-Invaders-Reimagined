export default class Shield {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = 3;
    }

    draw(ctx) {
        if (this.hp <= 0) return;
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    getColor() {
        if (this.hp === 3) return '#5fc15f';
        if (this.hp === 2) return '#d9c84b';
        if (this.hp === 1) return '#dd6f3f';
        return 'transparent';
    }

    collideWith(sprite) {
        if (this.hp <= 0) return false;
        return (
            sprite.x < this.x + this.width &&
            sprite.x + sprite.width > this.x &&
            sprite.y < this.y + this.height &&
            sprite.y + sprite.height > this.y
        );
    }

    hit() {
        if (this.hp > 0) {
            this.hp -= 1;
        }
    }

    isDestroyed() {
        return this.hp <= 0;
    }
}
