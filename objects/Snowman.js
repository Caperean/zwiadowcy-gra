// objects/Snowman.js
import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { Snowball } from "./Snowball.js"; 
import { Snowbullet } from "./Snowbullet.js"; 
import { Player } from "./player.js"; 
import { GRAVITY, SNOWMAN_WIDTH, SNOWMAN_HEIGHT, SNOWMAN_HP, SNOWMAN_DETECTION_RANGE, SNOWBALL_COOLDOWN, SNOWBULLET_COOLDOWN } from "../engine/Constants.js";

export class Snowman extends GameObject {
    constructor(x, y, game) {
        super(x, y, SNOWMAN_WIDTH, SNOWMAN_HEIGHT);
        this.game = game;
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

    // Metoda do resetowania HP i statusu (przydatna w Game.resetLevelObjects)
    resetPosition() {
        this.hp = SNOWMAN_HP;
        this.toRemove = false;
    }
    
    update(deltaTime) {
        if (this.hp <= 0) {
            this.toRemove = true;
            return;
        }
        
        // 1. Zastosowanie grawitacji (Logika Clown.js)
        this.dy += GRAVITY;
        this.y += this.dy;

        // 2. Sprawdzanie kolizji z kafelkami (Logika Clown.js + obsługa IceBlock)
        const oldY = this.y - this.dy;
        this.game.gameObjects.forEach(obj => {
            // Sprawdza Tile lub obiekty działające jak Tile (np. IceBlock, dzięki this.isTile)
            if ((obj instanceof Tile || (obj.isTile && obj.isTile === true)) && this.checkCollision(obj, {x: this.x, y: oldY, width: this.width, height: this.height})) {
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

        // 3. Wykrywanie gracza i Atak
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

    // Strzelanie Śnieżką (lekki pocisk)
    shootSnowball(player) {
        // Obliczenie wektora z centrum Bałwana do centrum Gracza
        const dx = (player.x + player.width / 2) - (this.x + this.width / 2);
        const dy = (player.y + player.height / 2) - (this.y + this.height / 2);
        const snowball = new Snowball(this.x + this.width / 2, this.y + this.height / 2, dx, dy, this.game);
        this.game.gameObjects.push(snowball);
    }
    
    // Strzelanie Lodowym Pociskiem (ciężki pocisk)
    shootSnowbullet(player) {
        // Obliczenie wektora z centrum Bałwana do centrum Gracza
        const dx = (player.x + player.width / 2) - (this.x + this.width / 2);
        const dy = (player.y + player.height / 2) - (this.y + this.height / 2);
        const snowbullet = new Snowbullet(this.x + this.width / 2, this.y + this.height / 2, dx, dy, this.game);
        this.game.gameObjects.push(snowbullet);
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}
