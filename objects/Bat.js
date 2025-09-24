import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";

export class Bat extends GameObject {
    constructor(x, y, game) {
        super(x, y, TILE_WIDTH * 1.5, TILE_HEIGHT); 
        this.game = game;
        this.initialX = x;
        this.initialY = y;
        this.state = "patrol";
        this.hp = 1;
        this.speed = 1.5;
        this.detectionRange = 250;
        this.attackRange = 50;
        this.escapeDistance = 150;
        this.patrolRadius = 50;
        this.angle = 0;
        this.facingDirection = "right";

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/bat.png";
    }

    update(deltaTime) {
        const player = this.game.player;
        if (!player) return;

        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        if (this.state === "patrol") {
            // Ruch po okręgu
            this.angle += 0.02;
            this.x = this.initialX + this.patrolRadius * Math.cos(this.angle);
            this.y = this.initialY + this.patrolRadius * Math.sin(this.angle);

            // Wykrywanie gracza
            if (distanceToPlayer < this.detectionRange) {
                this.state = "attack";
            }
        } else if (this.state === "attack") {
            // Lecenie w kierunku gracza
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
            
            // Zmiana kierunku
            this.facingDirection = dx > 0 ? "right" : "left";

            // Kolizja z graczem
            if (distanceToPlayer < this.attackRange) {
                this.game.player.takeDamage(1);
                this.state = "escape";
            }
        } else if (this.state === "escape") {
            // Ucieczka od gracza
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            this.x += (dx / distance) * this.speed * 2; // Szybsza ucieczka
            this.y += (dy / distance) * this.speed * 2;
            
            // Zmiana kierunku
            this.facingDirection = dx > 0 ? "right" : "left";

            // Powrót do patrolu po oddaleniu się
            if (distance > this.escapeDistance) {
                this.state = "patrol";
            }
        }
    }
    
    checkCollision(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.save();
            if (this.facingDirection === "left") {
                ctx.translate(this.x + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
            } else {
                ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = "darkgray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
