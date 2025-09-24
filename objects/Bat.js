import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { TILE_WIDTH, TILE_HEIGHT, BAT_WIDTH, BAT_HEIGHT } from "../engine/Constants.js"; // Import nowych stałych

export class Bat extends GameObject {
    constructor(x, y, game) {
        super(x, y, BAT_WIDTH, BAT_HEIGHT); // Użyj nowych stałych
        this.game = game;
        this.initialX = x;
        this.initialY = y;
        this.state = "patrol"; // patrol, attack, escape
        this.hp = 1;
        this.speed = 1.5;
        this.detectionRange = 250;
        this.attackRange = 50;
        this.escapeDistance = 150;
        this.patrolRadius = 50;
        this.angle = 0;
        this.flightAngle = 0;
        this.dx = 0;
        this.dy = 0;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/bat.png";
    }

    update(deltaTime) {
        const player = this.game.player;
        if (!player) return;

        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        // Zapisz pozycję na początku aktualizacji, na wypadek cofnięcia ruchu
        const oldX = this.x;
        const oldY = this.y;

        // --- Logika stanu i ruchu ---
        if (this.state === "patrol") {
            this.angle += 0.02;
            const targetX = this.initialX + this.patrolRadius * Math.cos(this.angle);
            const targetY = this.initialY + this.patrolRadius * Math.sin(this.angle);
            this.dx = (targetX - this.x) * 0.05;
            this.dy = (targetY - this.y) * 0.05;
            
            if (distanceToPlayer < this.detectionRange) {
                this.state = "attack";
            }
        } else if (this.state === "attack") {
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            this.dx = (dx / distance) * this.speed;
            this.dy = (dy / distance) * this.speed;

            if (this.checkCollision(this.game.player)) {
                this.game.player.takeDamage(1);
                this.state = "escape";
            }
        } else if (this.state === "escape") {
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            this.dx = (dx / distance) * this.speed * 2;
            this.dy = (dy / distance) * this.speed * 2;
            
            if (distanceToPlayer > this.detectionRange) {
                this.state = "patrol";
            }
        }
        
        this.flightAngle = Math.atan2(this.dy, this.dx) + Math.PI / 2;

        // --- Logika kolizji z kafelkami ---
        
        // Zaktualizuj pozycję tymczasowo, aby sprawdzić kolizje
        this.x += this.dx;
        this.y += this.dy;

        // Sprawdź kolizje z kafelkami
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile) {
                if (this.checkCollision(obj)) {
                    // Jeśli wystąpiła kolizja, cofnij ruch w odpowiedniej osi
                    if (this.x + this.width > obj.x && oldX + this.width <= obj.x) { // Kolizja z lewej
                        this.x = obj.x - this.width;
                    } else if (this.x < obj.x + obj.width && oldX >= obj.x + obj.width) { // Kolizja z prawej
                        this.x = obj.x + obj.width;
                    }
                    if (this.y + this.height > obj.y && oldY + this.height <= obj.y) { // Kolizja z góry
                        this.y = obj.y - this.height;
                    } else if (this.y < obj.y + obj.height && oldY >= obj.y + obj.height) { // Kolizja z dołu
                        this.y = obj.y + obj.height;
                    }
                }
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
