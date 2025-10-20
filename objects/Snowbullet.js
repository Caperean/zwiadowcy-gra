// objects/Snowbullet.js
import { GameObject } from "./object.js";
import { Tile } from "./tile.js"; 
import { IceBlock } from "./IceBlock.js"; // Nowy import dla IceBlock
// Używamy stałych ze Snowball i Snowbullet
import { SNOWBULLET_SIZE, SNOWBULLET_SPEED } from "../engine/Constants.js"; 

// Stałe użyte do logiki kolizji (najlepiej dodać je do Constants.js)
const SNOWBALL_KNOCKBACK = 5; // Wartość knockback z Snowball.js
const SNOWBULLET_KNOCKBACK_MULTIPLIER = 3; 
const SNOWBULLET_DAMAGE = 1; 

export class Snowbullet extends GameObject {
    constructor(x, y, dx, dy, game) {
        super(x, y, SNOWBULLET_SIZE, SNOWBULLET_SIZE);
        this.game = game;
        this.toRemove = false;
        
        // Normalizacja i ustawienie prędkości
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.dx = (dx / distance) * SNOWBULLET_SPEED;
        this.dy = (dy / distance) * SNOWBULLET_SPEED;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/snowbullet.png";
    }

    update(deltaTime) {
        this.x += this.dx;
        this.y += this.dy;

        // Kolizja z graczem
        if (this.checkCollision(this.game.player)) {
            // 1. Zadanie obrażeń (przyjmujemy 1 HP)
            this.game.player.takeDamage(SNOWBULLET_DAMAGE); 
            
            // 2. Odrzut gracza (3x knockback Snowball)
            const knockback = SNOWBALL_KNOCKBACK * SNOWBULLET_KNOCKBACK_MULTIPLIER; 
            const angle = Math.atan2(this.dy, this.dx);
            this.game.player.dx += Math.cos(angle) * knockback;
            this.game.player.dy += Math.sin(angle) * knockback;
            
            // Pocisk znika po uderzeniu
            this.toRemove = true;
            return;
        }

        // Kolizja z kafelkami (tworzy IceBlock)
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                
                // 1. Tworzenie IceBlock w miejscu uderzenia
                // IceBlock sam obliczy swój rozmiar (3x TILE_WIDTH)
                const iceBlock = new IceBlock(this.x, this.y, this.game);
                this.game.gameObjects.push(iceBlock);
                
                // 2. Pocisk znika
                this.toRemove = true;
            }
        });
    }

    // Istniejąca metoda draw
    draw(ctx) {
        if (this.sprite.complete) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            if (this.dx < 0) {
                ctx.scale(-1, 1); 
            }
            ctx.drawImage(this.sprite, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
    }
}
