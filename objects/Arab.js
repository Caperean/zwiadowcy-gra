import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { EnemyArrow } from "./EnemyArrow.js";
import { GRAVITY, ARAB_SPEED, ARAB_DETECTION_RANGE, ARAB_WIDTH, ARAB_HEIGHT, ARAB_FOV_ANGLE } from "../engine/Constants.js";

export class Arab extends GameObject {
    constructor(x, y, game) {
        super(x, y, ARAB_WIDTH, ARAB_HEIGHT);
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
        const angleToPlayer = Math.atan2(player.y - this.y, player.x - this.x);
        const playerIsRight = player.x > this.x;

        let playerInFOV = false;
        if (playerIsRight && Math.abs(angleToPlayer) < ARAB_FOV_ANGLE / 2) {
            playerInFOV = true;
        } else if (!playerIsRight && Math.abs(Math.PI - Math.abs(angleToPlayer)) < ARAB_FOV_ANGLE / 2) {
            playerInFOV = true;
        }

        const playerInSight = distanceToPlayer < ARAB_DETECTION_RANGE && playerInFOV;

        // Grawitacja
        if (!this.onGround) {
            this.y += GRAVITY;
        }

        // Logika stanu
        if (this.state === "walk") {
            const nextX = this.x + this.speed * (this.facingDirection === "right" ? 1 : -1);
            
            let obstacleAhead = false;
            let groundAhead = false;

            // Sprawdź, czy przed arabem jest przeszkoda lub krawędź
            this.game.gameObjects.forEach(obj => {
                if (obj instanceof Tile) {
                    // Sprawdzenie kolizji z boku
                    const futureRect = { x: nextX, y: this.y, width: this.width, height: this.height };
                    if (this.checkCollision(obj, futureRect)) {
                        obstacleAhead = true;
                    }
                    
                    // Sprawdzenie, czy jest podłoże przed Arabem
                    const groundCheckRect = { x: nextX, y: this.y + this.height + 1, width: this.width, height: 1 };
                    if (this.checkCollision(obj, groundCheckRect)) {
                        groundAhead = true;
                    }
                }
            });

            // Zmień kierunek, jeśli jest przeszkoda LUB nie ma podłoża
            if (obstacleAhead || !groundAhead) {
                this.facingDirection = this.facingDirection === "right" ? "left" : "right";
            } else {
                // Kontynuuj ruch, jeśli jest bezpiecznie
                this.x = nextX;
            }

            if (playerInSight) {
                this.state = "aim";
                this.aimTimer = 500;
            }
        } else if (this.state === "aim") {
            this.aimTimer -= deltaTime;
            if (this.aimTimer <= 0) {
                this.shootArrow();
                this.state = "reload";
                this.reloadTimer = 2000;
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

        // Kolizje z dołem do sprawdzania, czy jest na ziemi
        this.onGround = false;
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                if (this.y + this.height > obj.y && this.y + this.height < obj.y + GRAVITY + 5) {
                    this.y = obj.y - this.height;
                    this.onGround = true;
                }
            }
        });
    }

    shootArrow() {
        const arrowX = this.x + this.width / 2;
        const arrowY = this.y + this.height / 2;
        const dx = this.game.player.x - this.x;
        const dy = this.game.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const normalizedDx = (dx / distance);
        const normalizedDy = (dy / distance);
        const arrow = new EnemyArrow(arrowX, arrowY, normalizedDx, normalizedDy, this.game);
        this.game.gameObjects.push(arrow);
    }
    
    checkCollision(other, rect = this) {
        return rect.x < other.x + other.width &&
               rect.x + rect.width > other.x &&
               rect.y < other.y + other.height &&
               rect.y + rect.height > other.y;
    }

    draw(ctx) {
        let currentSprite;
        if (this.state === "aim" || this.state === "reload") {
            currentSprite = this.sprites.aim;
        } else {
            const now = Date.now();
            if (now - this.lastWalkFrameChange > 200) {
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
