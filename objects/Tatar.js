import { GameObject } from "./object.js";
import { GRAVITY, TATAR_WIDTH, TATAR_HEIGHT, TATAR_SPEED, WOLF_CHASE_DISTANCE, WOLF_ATTACK_DISTANCE, WOLF_RETREAT_DISTANCE, TATAR_ANIMATION_SPEED } from "../engine/Constants.js";
import { Tile } from "./tile.js";
import { Player } from "./player.js";

export class Tatar extends GameObject {          // heiht, widhight, speed, animation
    /**
     * @param {number} x - Pozycja X wilka.
     * @param {number} y - Pozycja Y wilka.
     * @param {object} player - Obiekt gracza do śledzenia.
     * @param {object} game - Obiekt gry, potrzebny do interakcji.
     */
    constructor(x, y, player, game) {
        super(x, y, TATAR_WIDTH, TATR_HEIGHT);
        this.hp = 4; // Wilki mają 1 HP
        this.toRemove = false;
        this.player = player;
        this.game = game;
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
        this.state = "idle";
        this.animationTimer = 0;
        this.animationFrame = 0;
        this.animationSpeed = TATAR_ANIMATION_SPEED;
        this.facingDirection = "right";
        this.wolfSprites = [];
        this.wolfSprites[0] = new Image();
        this.wolfSprites[0].src = "assets/sprites/tatar1.png";
        this.wolfSprites[1] = new Image();
        this.wolfSprites[1].src = "assets/sprites/tatar2.png";
        this.wolfSprites[2] = new Image();
        this.wolfSprites[2].src = "assets/sprites/tatar3.png";
        this.wolfSprites[3] = new Image();
        this.wolfSprites[3].src = "assets/sprites/tatar4.png";
        this.retreatStartPosition = null;
        this.patrolDirection = 1; // 1 dla prawo, -1 dla lewo
    }

    /**
     * Sprawdza kolizję z innym obiektem.
     * @param {GameObject} other - The other object to check for collision.
     * @returns {boolean} - True if there is a collision, otherwise false.
     */
    checkCollision(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
    
    /**
     * Sprawdza, czy w najbliższym sąsiedztwie wilka znajduje się przeszkoda, jak np. kafelek.
     * @returns {boolean} - True, jeśli jest przeszkoda, w przeciwnym razie false.
     */
    checkObstacle() {
        const nextX = this.x + this.dx;
        const nextRect = { x: nextX, y: this.y, width: this.width, height: this.height };

        for (const obj of this.game.gameObjects) {
            if (obj instanceof Tile) {
                if (nextRect.x < obj.x + obj.width &&
                    nextRect.x + nextRect.width > obj.x &&
                    nextRect.y < obj.y + obj.height &&
                    nextRect.y + nextRect.height > obj.y) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Aktualizuje stan wilka w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
    update(deltaTime) {
        // Grawitacja
        this.dy += GRAVITY;
        if (this.hp <= 0) {
        this.toRemove = true;
        return;}
        const distanceToPlayer = Math.abs(this.player.x - this.x);
        const prevX = this.x;
        const prevY = this.y;

        // Sprawdzamy, czy wilk zbliża się do niebezpiecznych kafelków
        const dangerousTiles = ["lava", "water", "spikes"];
        let isApproachingDanger = false;
        const nextX = this.x + this.dx;

        for (const tile of this.game.gameObjects.filter(obj => obj instanceof Tile)) {
            if (dangerousTiles.includes(tile.spriteName)) {
                if (nextX + this.width > tile.x && nextX < tile.x + tile.width &&
                    this.y + this.height > tile.y && this.y + this.height < tile.y + tile.height) {
                    isApproachingDanger = true;
                    break;
                }
            }
        }
        
        if (isApproachingDanger) {
            this.dx = -this.dx; // Zmień kierunek
            this.facingDirection = (this.facingDirection === "left") ? "right" : "left";
        } else {
            // Normalna logika zachowania wilka
            switch (this.state) {
                case "idle":
                    // Nowa logika patrolowania
                    this.dx = BOAR_SPEED * this.patrolDirection;
                    this.facingDirection = this.patrolDirection === 1 ? "right" : "left";

                    if (this.checkObstacle()) {
                        this.patrolDirection *= -1;
                    }
                    if (distanceToPlayer < WOLF_CHASE_DISTANCE) {
                        this.state = "chase";
                    }
                    break;
                case "chase":
                    if (distanceToPlayer < WOLF_ATTACK_DISTANCE) {
                        this.state = "attack";
                    } else if (distanceToPlayer > WOLF_CHASE_DISTANCE + 50) {
                        this.state = "idle";
                    } else {
                        this.dx = (this.player.x > this.x) ? TATAR_SPEED : -TATAR_SPEED;
                        this.facingDirection = (this.player.x > this.x) ? "right" : "left";
                    }
                    break;
                case "attack":
                    if (this.checkCollision(this.player)) {
                        this.player.takeDamage(); // Zadawanie obrażeń graczowi
                        this.state = "retreat";
                        this.retreatStartPosition = { x: this.x, y: this.y };
                        this.dx = (this.player.x > this.x) ? -TATR_SPEED : TATR_SPEED;
                    } else {
                        this.state = "chase";
                    }
                    break;
                case "retreat":
                    const distanceRetreated = Math.abs(this.x - this.retreatStartPosition.x);
                    if (distanceRetreated > WOLF_RETREAT_DISTANCE) {
                        this.state = "idle";
                        this.dx = 0;
                    } else {
                        this.facingDirection = (this.dx > 0) ? "right" : "left";
                    }
                    break;
            }
        }
        
        // Aktualizacja pozycji
        this.x += this.dx;
        this.y += this.dy;

        // Prosta kolizja z podłożem
        this.onGround = false;
        if (this.game.gameObjects) {
            this.game.gameObjects.forEach(obj => {
                if (obj instanceof Tile && this.checkCollision(obj)) {
                    if (this.dy > 0 && prevY + this.height <= obj.y) {
                        this.y = obj.y - this.height;
                        this.dy = 0;
                        this.onGround = true;
                    } else if (this.dy < 0 && prevY >= obj.y + obj.height) {
                        this.y = obj.y + obj.height;
                        this.dy = 0;
                    } else if (this.dx > 0 && prevX + this.width <= obj.x) {
                        this.x = obj.x - this.width;
                    } else if (this.dx < 0 && prevX >= obj.x + obj.width) {
                        this.x = obj.x + obj.width;
                    }
                }
            });
        }
        
        if (this.y + this.height >= this.game.groundY) {
            this.y = this.game.groundY - this.height;
            this.dy = 0;
            this.onGround = true;
        }

        // Logika animacji
        if (this.dx !== 0) {
            this.animationTimer += deltaTime;
            if (this.animationTimer >= this.animationSpeed) {
                this.animationFrame = (this.animationFrame + 1) % this.wolfSprites.length;
                this.animationTimer = 0;
            }
        } else {
            this.animationFrame = 0;
            this.animationTimer = 0;
        }
    }

    /**
     * Rysuje wilka na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        const spriteToDraw = this.wolfSprites[this.animationFrame];
        if (spriteToDraw && spriteToDraw.complete && spriteToDraw.naturalWidth !== 0) {
            ctx.save();
            if (this.facingDirection === "left") {
                ctx.translate(this.x + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(spriteToDraw, 0, 0, this.width, this.height);
            } else {
                ctx.translate(this.x, this.y);
                ctx.drawImage(spriteToDraw, 0, 0, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = "gray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
