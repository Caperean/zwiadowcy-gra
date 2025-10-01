
export class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(deltaTime, game) {}
    draw(ctx) {}
    checkCollision(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    // ZMIANA: Dodano metodę do zadawania obrażeń
    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.toRemove = true;
        }
        console.log(`HP: ${this.hp}`);
    }
}
