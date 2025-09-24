import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";

export class Bat extends GameObject {
    constructor(x, y, game) {
        super(x, y, TILE_WIDTH * 1.5, TILE_HEIGHT); 
        this.game = game;
        this.initialX = x; // Początkowy punkt patrolowania
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
        this.flightAngle = 0;
        this.dy = 0;
        this.dx = 0;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/bat.png";
    }

    update(deltaTime) {
        const player = this.game.player;
        if (!player) return;

        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        // Pusty obiekt dla logiki kolizji
        let proposedX = this.x + this.dx;
        let proposedY = this.y + this.dy;

        if (this.state === "patrol") {
            // Ruch po okręgu
            this.angle += 0.02;
            this.dx = this.initialX + this.patrolRadius * Math.cos(this.angle) - this.x;
            this.dy = this.initialY + this.patrolRadius * Math.sin(this.angle) - this.y;
            this.flightAngle = Math.atan2(this.dy, this.dx) + Math.PI / 2;
            
            // Wykrywanie gracza
            if (distanceToPlayer < this.detectionRange) {
                this.state = "attack";
            }
        } else if (this.state === "attack") {
            // Lecenie w kierunku gracza
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            this.dx = (dx / distance) * this.speed;
            this.dy = (dy / distance) * this.speed;

            // Obliczanie kąta lotu
            this.flightAngle = Math.atan2(this.dy, this.dx) + Math.PI / 2;

            // Kolizja z graczem
            if (this.checkCollision(this.game.player)) {
                this.game.player.takeDamage(1);
                this.state = "escape";
            }
        } else if (this.state === "escape") {
            // Ucieczka od gracza
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            this.dx = (dx / distance) * this.speed * 2;
            this.dy = (dy / distance) * this.speed * 2;
            
            // Obliczanie kąta ucieczki
            this.flightAngle = Math.atan2(this.dy, this.dx) + Math.PI / 2;

            // Powrót do patrolu po oddaleniu się
            if (distance > this.escapeDistance && distanceToPlayer > this.detectionRange) {
                this.state = "patrol";
            }
        }
        
        // Sprawdzanie kolizji z kafelkami
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile) {
                if (this.checkCollision(obj)) {
                    // Odwracamy kierunek lotu
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    this.state = "patrol"; // Wraca do patrolowania
                }
            }
        });

        // Aktualizacja pozycji po kolizjach
        this.x += this.dx;
        this.y += this.dy;
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
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(this.flightAngle);
            
            ctx.drawImage(this.sprite, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            ctx.fillStyle = "darkgray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
