import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { GRAVITY, CLOWN_WIDTH, CLOWN_HEIGHT, CLOWN_DETECTION_RANGE, CLOWN_ATTACK_COOLDOWN, MASK_SPEED } from "../engine/Constants.js";
import { Mask } from "./Mask.js";
import { Player } from "./player.js";

export class Clown extends GameObject {
    constructor(x, y, game) {
        super(x, y, CLOWN_WIDTH, CLOWN_HEIGHT);
        this.game = game;
        this.hp = 2; // Klaun ma 2 HP
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
        this.toRemove = false;
        this.lastAttackTime = 0;
        
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/clown.png";
    }

    update(deltaTime) {
        if (this.hp <= 0) {
            this.toRemove = true;
            return;
        }
        
        // Zastosowanie grawitacji
        this.dy += GRAVITY;
        this.y += this.dy;

        // Sprawdzanie kolizji z kafelkami (tak jak w innych mobach)
        const oldY = this.y - this.dy;
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj, {x: this.x, y: oldY, width: this.width, height: this.height})) {
                if (this.dy > 0) { // Kolizja z góry
                    this.y = obj.y - this.height;
                    this.dy = 0;
                    this.onGround = true;
                } else if (this.dy < 0) { // Kolizja z dołu
                    this.y = obj.y + obj.height;
                    this.dy = 0;
                }
            }
        });
        
        const player = this.game.player;
        if (!player) return;

        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));
        
        // Klaun atakuje tylko, jeśli gracz jest w zasięgu i minął czas przeładowania
        if (distanceToPlayer < CLOWN_DETECTION_RANGE && Date.now() - this.lastAttackTime > CLOWN_ATTACK_COOLDOWN) {
            this.attack();
            this.lastAttackTime = Date.now();
        }
    }

    attack() {
        const player = this.game.player;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalizacja wektora kierunku i ustawienie prędkości
        const maskDx = (dx / distance) * MASK_SPEED;
        const maskDy = (dy / distance) * MASK_SPEED;

        const mask = new Mask(this.x, this.y, maskDx, maskDy, this.game);
        this.game.gameObjects.push(mask);
    }
    
    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}
