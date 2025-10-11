import { GameObject } from "./object.js";
import { GRAVITY, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, JUMP_STRENGTH, PLAYER_ANIMATION_SPEED, MAX_POWER_CHARGE, ARROW_SPEED, ARROW_VERTICAL_STRENGTH } from "../engine/Constants.js";
import { Arrow } from "./arrow.js"; 
import { PoisonedArrow } from "./PoisonedArrow.js"; // <--- Import nowej strzały
import { Tile } from "./tile.js";
import { ExitGate } from "./ExitGate.js";
import { Potion } from "./Potion.js"; // <--- Import eliksirów

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

        this.startX = x;
        this.startY = y;

        this.idleSprite = new Image();
        this.idleSprite.src = "assets/sprites/player_sprites/standingsprite.png";
        this.walkSprites = [];
        this.walkSprites[0] = new Image();
        this.walkSprites[0].src = "assets/sprites/player_sprites/walkingsprite1.png";
        this.walkSprites[1] = new Image();
        this.walkSprites[1].src = "assets/sprites/player_sprites/walkingsprite2.png";
        this.jumpSprite = new Image();
        this.jumpSprite.src = "assets/sprites/player_sprites/jump.png";
        this.snipingSprite = new Image();
        this.snipingSprite.src = "assets/sprites/player_sprites/snipingsprite.png";

        this.facingDirection = "right";
        this.state = "idle";
        this.animationTimer = 0;
        this.animationFrame = 0;
        this.animationSpeed = PLAYER_ANIMATION_SPEED;
        this.powerCharge = 0;
        
        this.poisonedArrows = 0; // <--- Nowa zmienna do przechowywania liczby zatrutych strzał
        this.poisonedArrowSprite = new Image();
        this.poisonedArrowSprite.src = "assets/sprites/poisonedarrow.png";
    }

    /**
     * Sprawdza kolizję z innym obiektem.
     * @param {GameObject} other - Inny obiekt do sprawdzenia kolizji.
     * @returns {boolean} - True, jeśli jest kolizja, w przeciwnym razie false.
     */
    checkCollision(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
    
    /**
     * Zwiększa punkty życia gracza o 1, ale nie więcej niż maksymalna wartość.
     */
    heal() {
        if (this.currentHP < this.maxHP) {
            this.currentHP++;
            console.log(`Gracz odzyskał HP. Pozostało HP: ${this.currentHP}`);
        }
    }

    /**
     * Dodaje zatrute strzały do ekwipunku gracza.
     * @param {number} amount - Liczba zatrutych strzał do dodania.
     */
    addPoisonedArrows(amount) {
        this.poisonedArrows += amount;
        console.log(`Gracz znalazł zatruty eliksir! Ma teraz ${this.poisonedArrows} zatrutych strzał.`);
    }

    /**
     * Zmniejsza punkty życia gracza o 1 i sprawdza, czy powinien zostać zrespawnowany.
     */
    takeDamage() {
        this.currentHP--;
        console.log(`Gracz otrzymał obrażenia. Pozostało HP: ${this.currentHP}`);
        if (this.currentHP <= 0) {
            this.currentHP = this.maxHP;
            this.respawn();
        }
    }

    /**
     * Aktualizuje stan gracza w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
    update(deltaTime) {
        const keys = this.game.input.keys;

        if (keys["Space"]) {
            this.state = "sniping";
            this.powerCharge = Math.min(this.powerCharge + deltaTime, MAX_POWER_CHARGE);
            this.dx = 0;
        } else if (this.state === "sniping" && !keys["Space"]) {
            this.state = "idle";
            const power = this.powerCharge / MAX_POWER_CHARGE;
            const arrowDx = this.facingDirection === "right" ? ARROW_SPEED * power : -ARROW_SPEED * power;
            const arrowDy = 300; // Strzały mają lecieć prosto

            if (this.poisonedArrows > 0) {
                // Jeśli gracz ma zatrute strzały, strzela nimi
                this.game.arrows.push(new PoisonedArrow(this.x, this.y + this.height / 2, arrowDx, arrowDy, this.game));
                this.poisonedArrows--;
            } else {
                // W przeciwnym razie strzela zwykłymi strzałami
                this.game.arrows.push(new Arrow(this.x, this.y + this.height / 2, arrowDx, arrowDy, this.game));
            }
            this.powerCharge = 0;
            // Sprawdzanie śmierci gracza
        if (this.currentHP <= 0) {
            console.log("Gracz zginął! Resetowanie gracza i mobów...");
            this.game.resetLevelObjects();
            return;
        }
        } else {
            this.dx = 0;
            if (keys["ArrowLeft"] || keys["KeyA"]) {
                this.dx = -PLAYER_SPEED;
                this.facingDirection = "left";
            } else if (keys["ArrowRight"] || keys["KeyD"]) {
                this.dx = PLAYER_SPEED;
                this.facingDirection = "right";
            }

            if ((keys["ArrowUp"] || keys["KeyW"]) && this.onGround) {
                this.dy = JUMP_STRENGTH;
                this.onGround = false;
            }

            if (!this.onGround) {
                this.state = "jump";
            } else if (this.dx !== 0) {
                this.state = "walk";
                this.animationTimer += deltaTime;
                if (this.animationTimer >= this.animationSpeed) {
                    this.animationFrame = (this.animationFrame + 1) % this.walkSprites.length;
                    this.animationTimer = 0;
                }
            } else {
                this.state = "idle";
                this.animationFrame = 0;
                this.animationTimer = 0;
            }
        }
        
        this.dy += GRAVITY;
        
        const prevX = this.x;
        const prevY = this.y;

        this.x += this.dx;
        this.y += this.dy;

        this.onGround = false;

        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile) {
                if (this.checkCollision(obj)) {
                    if (this.dy > 0 && prevY + this.height <= obj.y) {
                        this.y = obj.y - this.height;
                        this.dy = 0;
                        this.onGround = true;
                    }
                    else if (this.dy < 0 && prevY >= obj.y + obj.height) {
                        this.y = obj.y + obj.height;
                        this.dy = 0;
                    }
                    else if (this.dx > 0 && prevX + this.width <= obj.x) {
                        this.x = obj.x - this.width;
                    }
                    else if (this.dx < 0 && prevX >= obj.x + obj.width) {
                        this.x = obj.x + obj.width;
                    }
                    
                    const lethalTiles = ["lava", "water", "spikes"];
                    if (lethalTiles.includes(obj.spriteName)) {
                        console.log("Gracz dotknął niebezpiecznego kafelka!");
                        this.takeDamage();
                    }
                }
            }
            else if (obj instanceof ExitGate && this.checkCollision(obj)) {
                console.log("Poziom ukończony!");
            }
        });
        
        if (this.y + this.height >= this.game.groundY) {
            this.y = this.game.groundY - this.height;
            this.dy = 0;
            this.onGround = true;
        }
    }

    /**
     * Teleportuje gracza do jego początkowej pozycji.
     */
    respawn() {
        this.x = this.startX;
        this.y = this.startY;
        this.dx = 0;
        this.dy = 0;
        this.state = "idle";
        this.onGround = false;
        console.log("Gracz został zrespawnowany.");
    }

    /**
     * Rysuje gracza, pasek siły, serca i licznik zatrutych strzał na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        // Rysowanie serc w lewym górnym rogu
        for (let i = 0; i < this.currentHP; i++) {
            const heart = this.hearts[i];
            if (heart.complete) {
                ctx.drawImage(heart, 10 + i * 40, 10, 30, 30);
            }
        }

        // Rysowanie licznika zatrutych strzał w prawym górnym rogu
        if (this.poisonedArrows > 0) {
            ctx.fillStyle = "white";
            ctx.font = "bold 20px Arial";
            ctx.textAlign = "right";
            
            // Rysowanie ikonki zatrutej strzały
            if (this.poisonedArrowSprite.complete) {
                ctx.drawImage(this.poisonedArrowSprite, this.game.canvas.width - 50, 10, 40, 10);
            }

            ctx.fillText(`x ${this.poisonedArrows}`, this.game.canvas.width - 60, 30);
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

        if (this.state === "sniping") {
            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y - 10, this.width, 5);
            
            const powerWidth = (this.powerCharge / MAX_POWER_CHARGE) * this.width;
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y - 10, powerWidth, 5);
        }
    }
}
