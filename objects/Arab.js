import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { EnemyArrow } from "./EnemyArrow.js";
import { GRAVITY, TILE_WIDTH, TILE_HEIGHT, ARAB_SPEED, ARAB_DETECTION_RANGE } from "../engine/Constants.js";

export class Arab extends GameObject {
    constructor(x, y, game) {
        super(x, y, TILE_WIDTH, TILE_HEIGHT * 2);
        this.game = game;
        this.hp = 1;
        this.speed = ARAB_SPEED;
        this.state = "walk";
        this.onGround = false;
        this.facingDirection = "right";
        this.aimTimer = 0;
        this.reloadTimer = 0;
        this.walkAnimationFrame = 0;
        this.lastWalkFrameChange = 0;

        this.sprites = {
            walk1: new Image(),
            walk2: new Image(),
            aim: new Image()
        };
        this.sprites.walk1.src = "assets/sprites/arab1.png";
        this.sprites.walk2.src = "assets/sprites/arab2.png";
        this.sprites.aim.src = "assets/sprites/arab3.png";
    }

    update(deltaTime) {
        const player = this.game.player;
        if (!player) return;

        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        // Zawsze sprawdzaj, czy arab widzi gracza
        const playerInSight = distanceToPlayer < ARAB_DETECTION_RANGE;
        
        // Grawitacja
        if (!this.onGround) {
            this.y += GRAVITY;
        }

        // Logika stanu
        if (this.state === "walk") {
            this.x += this.speed * (this.facingDirection === "right" ? 1 : -1);
            if (playerInSight) {
                this.state = "aim";
                this.aimTimer = 500; // Czas do strzału
            }
        } else if (this.state === "aim") {
            this.aimTimer -= deltaTime;
            if (this.aimTimer <= 0) {
                this.shootArrow();
                this.state = "reload";
                this.reloadTimer = 2000; // Czas przeładowania
            }
        } else if (this.state === "reload") {
            this.reloadTimer -= deltaTime;
            if (this.reloadTimer <= 0) {
                if (playerInSight) {
                    this.state = "aim";
                    this.aimTimer = 500;
                } else {
                    this.state = "walk";
                }
            }
        }

        // Kolizje z kafelkami
        this.onGround = false;
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile) {
                if (this.checkCollision(obj)) {
                    // Kolizja z dołu
                    if (this.y < obj.y + obj.height && this.y + this.height > obj.y) {
                        if (this.x + this.width > obj.x && this.x < obj.x + obj.width) {
                            if (this.y + this.height > obj.y && this.y + this.height < obj.y + obj.height + 5) {
                                this.y = obj.y - this.height;
                                this.onGround = true;
                            }
                        }
                    }
                    // Kolizja boczna
                    if (this.state === "walk" && this.checkCollision(obj)) {
                        if (this.facingDirection === "right" && this.x + this.width > obj.x) {
                            this.facingDirection = "left";
                        } else if (this.facingDirection === "left" && this.x < obj.x + obj.width) {
                            this.facingDirection = "right";
                        }
                    }
                }
            }
        });
    }

    shootArrow() {
        const arrowX = this.x + (this.facingDirection === "right" ? this.width : 0);
        const arrowY = this.y + this.height / 2;
        const arrow = new EnemyArrow(arrowX, arrowY, this.facingDirection, this.game);
        this.game.gameObjects.push(arrow);
    }
    
    checkCollision(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    draw(ctx) {
        let currentSprite;
        if (this.state === "aim" || this.state === "reload") {
            currentSprite = this.sprites.aim;
        } else {
            const now = Date.now();
            if (now - this.lastWalkFrameChange > 200) { // Animacja chodzenia
                this.walkAnimationFrame = (this.walkAnimationFrame === 0) ? 1 : 0;
                this.lastWalkFrameChange = now;
            }
            currentSprite = (this.walkAnimationFrame === 0) ? this.sprites.walk1 : this.sprites.walk2;
        }

        if (currentSprite.complete) {
            ctx.save();
            if (this.facingDirection === "left") {
                ctx.translate(this.x + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(currentSprite, 0, 0, this.width, this.height);
            } else {
                ctx.drawImage(currentSprite, this.x, this.y, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = "brown";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
