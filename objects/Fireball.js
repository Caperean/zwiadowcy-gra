import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { Player } from "./player.js";

export class Fireball extends GameObject {
    constructor(x, y, dx, dy, game) {
        super(x, y, 32, 32); // Szerokość i wysokość Fireballa
        this.dx = dx;
        this.dy = dy;
        this.game = game;
        this.toRemove = false;
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/fireball.png";
    }

    update(deltaTime) {
        this.x += this.dx;

        // Kolizja z kafelkami
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                this.toRemove = true;
            }
        });

        // Kolizja z graczem
        if (this.checkCollision(this.game.player)) {
            this.game.player.takeDamage(1); // Zadaj 1 punkt obrażeń
            this.toRemove = true;
        }
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = "orange";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
