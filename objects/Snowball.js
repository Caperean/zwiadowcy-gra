// objects/Snowball.js
import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { SNOWBALL_SIZE, SNOWBALL_SPEED } from "../engine/Constants.js";

export class Snowball extends GameObject {
    constructor(x, y, dx, dy, game) {
        super(x, y, SNOWBALL_SIZE, SNOWBALL_SIZE);
        this.game = game;
        this.toRemove = false;
        
        // Normalizacja i ustawienie prędkości
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.dx = (dx / distance) * SNOWBALL_SPEED;
        this.dy = (dy / distance) * SNOWBALL_SPEED;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/snowball.png";
    }

    update(deltaTime) {
        this.x += this.dx;
        this.y += this.dy;

        // Kolizja z graczem
        if (this.checkCollision(this.game.player)) {
            // Odrzut gracza
            const knockback = 5; 
            const angle = Math.atan2(this.dy, this.dx);
            this.game.player.dx += Math.cos(angle) * knockback;
            this.game.player.dy += Math.sin(angle) * knockback;
            
            // Śnieżka znika po uderzeniu
            this.toRemove = true;
            return;
        }

        // Kolizja z kafelkami (znika po uderzeniu w teren)
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                this.toRemove = true;
            }
        });
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}
