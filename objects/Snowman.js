// objects/Snowman.js
import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { Snowball } from "./Snowball.js"; // Lekki pocisk
import { Snowbullet } from "./Snowbullet.js"; // Ciężki pocisk
import { GRAVITY, SNOWMAN_WIDTH, SNOWMAN_HEIGHT, SNOWMAN_HP, SNOWMAN_DETECTION_RANGE, SNOWBALL_COOLDOWN, SNOWBULLET_COOLDOWN } from "../engine/Constants.js";

export class Snowman extends GameObject {
    constructor(x, y, game) {
        super(x, y, SNOWMAN_WIDTH, SNOWMAN_HEIGHT);
        this.game = game;
        this.initialX = x;
        this.initialY = y;
        this.hp = SNOWMAN_HP;
        this.dx = 0; // Bałwan się nie porusza
        this.dy = 0;
        this.onGround = false;
        this.toRemove = false;
        
        this.lastSnowballTime = 0;
        this.lastSnowbulletTime = 0;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/snowman.png";
    }

    resetPosition() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.hp = SNOWMAN_HP;
        this.dx = 0;
        this.dy = 0;
        this.toRemove = false;
    }
    
    update(deltaTime) {
        if (this.hp <= 0) {
            this.toRemove = true;
            return;
        }
        
        // 1. Grawitacja
        this.dy += GRAVITY;
        this.y += this.dy;

        // 2. Kolizja z kafelkami
        const oldY = this.y - this.dy;
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile || (obj.isTile && obj.isTile === true)) {
                if (this.checkCollision(obj, { x: this.x, y: oldY, width: this.width, height: this.height })) {
                    // Kolizja z góry
                    if (this.dy > 0 && this.y + this.height > obj.y) { 
                        this.y = obj.y - this.height;
                        this.dy = 0;
                        this.onGround = true;
                    } 
                    // Kolizja z dołu
                    else if (this.dy < 0 && this.y < obj.y + obj.height) { 
                        this.y = obj.y + obj.height;
                        this.dy = 0;
                    }
                }
            }
        });

        // 3. Wykrywanie gracza i Atak
        const player = this.game.player;
        if (!player) return;

        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        if (distanceToPlayer < SNOWMAN_DETECTION_RANGE) {
            const now = Date.now();
            
            // Atak Snowball: co 0.25 s
            if (now - this.lastSnowballTime > SNOWBALL_COOLDOWN) {
                this.shootSnowball(player);
                this.lastSnowballTime = now;
            }

            // Atak Snowbullet: co 5 s
            if (now - this.lastSnowbulletTime > SNOWBULLET_COOLDOWN) {
                this.shootSnowbullet(player);
                this.lastSnowbulletTime = now;
            }
        }
    }

    // Metoda strzelania Śnieżką
    shootSnowball(player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const snowball = new Snowball(this.x + this.width / 2, this.y + this.height / 2, dx, dy, this.game);
        this.game.gameObjects.push(snowball);
    }
    
    // Metoda strzelania Lodowym Pociskiem
    shootSnowbullet(player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const snowbullet = new Snowbullet(this.x + this.width / 2, this.y + this.height / 2, dx, dy, this.game);
        this.game.gameObjects.push(snowbullet);
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}
