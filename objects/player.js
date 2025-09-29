import { GameObject } from "./object.js";
import { GRAVITY, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, JUMP_STRENGTH, PLAYER_ANIMATION_SPEED, MAX_POWER_CHARGE, ARROW_SPEED, ARROW_VERTICAL_STRENGTH } from "../engine/Constants.js";
import { Arrow } from "./arrow.js"; 
import { PoisonedArrow } from "./PoisonedArrow.js";
import { Tile } from "./tile.js";
import { ExitGate } from "./ExitGate.js";
import { Potion } from "./Potion.js";
import { Fire } from "./fire.js";

export class Player extends GameObject {
    /**
     * @param {number} x - Początkowa pozycja X gracza.
     * @param {number} y - Początkowa pozycja Y gracza.
     * @param {object} game - Obiekt gry, potrzebny do interakcji.
     */
    constructor(x, y, game) {
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.game = game;
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;

        this.maxHP = 3;
        this.currentHP = 3;

        this.hearts = [];
        for (let i = 0; i < this.maxHP; i++) {
            const heartImage = new Image();
            heartImage.src = "assets/sprites/heart.png";
            this.hearts.push(heartImage);
        }

        // Zmienne dla animacji
        this.idleSprite = new Image();
        this.idleSprite.src = "assets/sprites/player_sprites/idle.png";
        this.jumpSprite = new Image();
        this.jumpSprite.src = "assets/sprites/player_sprites/jump.png";
        this.walkSprites = [new Image(), new Image(), new Image()];
        this.walkSprites[0].src = "assets/sprites/player_sprites/walk1.png";
        this.walkSprites[1].src = "assets/sprites/player_sprites/walk2.png";
        this.walkSprites[2].src = "assets/sprites/player_sprites/walk3.png";
        this.snipingSprite = new Image();
        this.snipingSprite.src = "assets/sprites/player_sprites/sniping.png";
        
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.state = "idle";
        this.facingDirection = "right";

        this.canShoot = true;
        this.shootingCooldown = 500;
        this.lastShotTime = 0;
        
        // Zmienne do obsługi ładowania strzały
        this.isCharging = false;
        this.chargeStartTime = 0;
        this.power = 0;
    }

    takeDamage(amount) {
        if (this.currentHP > 0) {
            this.currentHP -= amount;
        }
    }
    
    heal() {
        if (this.currentHP < this.maxHP) {
            this.currentHP += 1;
        }
    }

    update(deltaTime) {
        // Sprawdzanie śmierci gracza
        if (this.currentHP <= 0) {
            console.log("Gracz zginął! Resetowanie gracza i mobów...");
            this.game.resetLevelObjects();
            return;
        }

        const input = this.game.input;

        // Logika ruchu poziomego
        this.dx = 0;
        if (input.keys["ArrowLeft"] || input.keys["KeyA"]) {
            this.dx = -PLAYER_SPEED;
            this.facingDirection = "left";
        } else if (input.keys["ArrowRight"] || input.keys["KeyD"]) {
            this.dx = PLAYER_SPEED;
            this.facingDirection = "right";
        }

        // Logika skoku
        if ((input.keys["ArrowUp"] || input.keys["KeyW"]) && this.onGround) {
            this.dy = JUMP_STRENGTH;
            this.onGround = false;
        }

        // Logika ładowania strzały
        if (input.keys["Space"] && this.canShoot) {
            this.isCharging = true;
            this.state = "sniping";
            this.power = Math.min(this.power + deltaTime, MAX_POWER_CHARGE);
        } else if (this.isCharging) {
            // Strzał, gdy klawisz spacji został puszczony
            this.shootArrow();
            this.isCharging = false;
            this.power = 0;
        }
        
        // Zmiana stanu animacji
        if (this.isCharging) {
            this.state = "sniping";
        } else if (this.dx !== 0) {
            this.state = "walk";
        } else if (!this.onGround) {
            this.state = "jump";
        } else {
            this.state = "idle";
        }
        
        if (this.state === "walk") {
            this.animationTimer += deltaTime;
            if (this.animationTimer >= PLAYER_ANIMATION_SPEED) {
                this.animationFrame = (this.animationFrame + 1) % this.walkSprites.length;
                this.animationTimer = 0;
            }
        }
        
        // Zastosowanie grawitacji
        this.dy += GRAVITY;

        // Zapisz stare pozycje do wykrywania kolizji
        const oldX = this.x;
        const oldY = this.y;

        // Aktualizacja pozycji
        this.x += this.dx;
        this.y += this.dy;

        // Sprawdzanie kolizji z kafelkami i resetowanie pozycji
        this.onGround = false;
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile || obj instanceof ExitGate) {
                if (this.checkCollision(obj, { x: this.x, y: this.y, width: this.width, height: this.height })) {
                    // Kolizja w poziomie
                    if (this.x + this.width > obj.x && oldX + this.width <= obj.x) { // Z lewej
                        this.x = obj.x - this.width;
                    } else if (this.x < obj.x + obj.width && oldX >= obj.x + obj.width) { // Z prawej
                        this.x = obj.x + obj.width;
                    }

                    // Kolizja w pionie
                    if (this.y + this.height > obj.y && oldY + this.height <= obj.y) { // Z góry
                        this.y = obj.y - this.height;
                        this.dy = 0;
                        this.onGround = true;
                    } else if (this.y < obj.y + obj.height && oldY >= obj.y + obj.height) { // Z dołu
                        this.y = obj.y + obj.height;
                        this.dy = 0;
                    }
                }
            } else if (obj instanceof Potion) {
                if (this.checkCollision(obj) && obj.type === "green") {
                    this.heal();
                    obj.toRemove = true;
                }
            } else if (obj instanceof Fire) {
                 if (this.checkCollision(obj)) {
                    this.takeDamage(1);
                 }
            }
        });
    }

    shootArrow() {
        if (Date.now() - this.lastShotTime < this.shootingCooldown) {
            return;
        }
        
        const dx = this.facingDirection === "right" ? ARROW_SPEED : -ARROW_SPEED;
        const dy = ARROW_VERTICAL_STRENGTH;
        const arrowX = this.x + (this.facingDirection === "right" ? this.width : 0);
        const arrowY = this.y + this.height / 2;
        const arrow = new PoisonedArrow(arrowX, arrowY, dx, dy, this.game);
        this.game.arrows.push(arrow);
        this.canShoot = false;
        this.lastShotTime = Date.now();
        setTimeout(() => this.canShoot = true, this.shootingCooldown);
    }
    
    checkCollision(other, rect = this) {
        return rect.x < other.x + other.width &&
               rect.x + rect.width > other.x &&
               rect.y < other.y + other.height &&
               rect.y + rect.height > other.y;
    }

    draw(ctx) {
        // Rysowanie paska siły
        if (this.isCharging) {
            const powerBarWidth = (this.power / MAX_POWER_CHARGE) * this.width;
            ctx.fillStyle = "lime";
            ctx.fillRect(this.x, this.y - 10, powerBarWidth, 5);
        }

        let spriteToDraw;
        switch (this.state) {
            case "walk":
                spriteToDraw = this.walkSprites[this.animationFrame];
                break;
            case "jump":
                spriteToDraw = this.jumpSprite;
                break;
            case "sniping":
                spriteToDraw = this.snipingSprite;
                break;
            default: // "idle"
                spriteToDraw = this.idleSprite;
                break;
        }
        
        if (spriteToDraw.complete) {
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
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // Rysowanie pasków zdrowia
        for (let i = 0; i < this.currentHP; i++) {
            if (this.hearts[i].complete) {
                ctx.drawImage(this.hearts[i], 10 + i * 35, 10, 32, 32);
            }
        }
    }
}
