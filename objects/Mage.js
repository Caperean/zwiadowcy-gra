import { GameObject } from "./object.js";
import { Fireball } from "./Fireball.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";

export class Mage extends GameObject {
    constructor(x, y, game) {
        super(x, y, TILE_WIDTH, TILE_HEIGHT * 2); // Mag jest wyższy niż kafelek
        this.game = game;
        this.state = "idle";
        this.facingDirection = "left"; // Domyślna orientacja
        this.attackCooldown = 2000; // 2 sekundy cooldownu
        this.lastAttackTime = 0;
        this.detectionRange = 200; // Zasięg wykrywania gracza

        this.idleSprite = new Image();
        this.idleSprite.src = "assets/sprites/mag1.png";
        this.attackSprite = new Image();
        this.attackSprite.src = "assets/sprites/mag2.png";
        this.currentSprite = this.idleSprite;
    }

    update(deltaTime) {
        const player = this.game.player;
        if (!player) return;

        // Wykrywanie gracza
        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        if (distanceToPlayer < this.detectionRange) {
            // Zmiana kierunku
            this.facingDirection = player.x > this.x ? "right" : "left";

            // Przejście w stan ataku i strzelanie
            if (Date.now() - this.lastAttackTime > this.attackCooldown) {
                this.state = "attack";
                this.attack();
                this.lastAttackTime = Date.now();
                
                // Ustaw czas, po którym wróci do stanu bezczynności
                setTimeout(() => {
                    this.state = "idle";
                }, 500); // Czas trwania animacji ataku
            }
        }
        
        // Aktualizacja sprite'a na podstawie stanu
        this.currentSprite = (this.state === "attack") ? this.attackSprite : this.idleSprite;
    }

    attack() {
        const player = this.game.player;
        const fireballDx = this.facingDirection === "right" ? 5 : -5;
        const fireballDy = 0; // Pocisk leci poziomo
        const fireballX = this.x + (this.facingDirection === "right" ? this.width : 0);
        const fireballY = this.y + this.height / 2;

        const fireball = new Fireball(fireballX, fireballY, fireballDx, fireballDy, this.game);
        this.game.gameObjects.push(fireball);
    }

    draw(ctx) {
        const spriteToDraw = this.currentSprite;
        if (spriteToDraw.complete) {
            ctx.save();
            if (this.facingDirection === "left") {
                ctx.translate(this.x + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(spriteToDraw, 0, 0, this.width, this.height);
            } else {
                ctx.drawImage(spriteToDraw, this.x, this.y, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = "purple";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
