import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { ARROW_WIDTH, ARROW_HEIGHT, ARROW_SPEED } from "../engine/Constants.js";
import { Fire } from "./fire.js";

export class EnemyArrow extends GameObject {
    constructor(x, y, dx, dy, game) {
        super(x, y, ARROW_WIDTH, ARROW_HEIGHT);
        this.game = game;
        this.speed = ARROW_SPEED;
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.dx = (dx / distance) * this.speed;
        this.dy = (dy / distance) * this.speed;
        
        this.toRemove = false;
        
        // Zapisz kąt lotu dla rysowania
        this.flightAngle = Math.atan2(this.dy, this.dx);
        
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/arrow.png";
        this.burningSprite = new Image();
        this.burningSprite.src = "assets/sprites/burningArrow.png";
        this.isBurning = false;
    }

    update(deltaTime) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.checkCollision(this.game.player)) {
            this.game.player.takeDamage(1);
            this.toRemove = true;
            return;
        }

        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                this.toRemove = true;
            } else if (obj instanceof Fire && this.checkCollision(obj)) {
                this.isBurning = true;
            }
        });
    }

    checkCollision(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    draw(ctx) {
        const spriteToDraw = this.isBurning ? this.burningSprite : this.sprite;
        if (spriteToDraw.complete) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            // Ta linia poprawnie obraca pionowy sprite strzały, aby leciał prosto
            ctx.rotate(this.flightAngle + Math.PI / 2);
            ctx.drawImage(spriteToDraw, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            ctx.fillStyle = "gray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
