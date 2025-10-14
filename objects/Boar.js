// objects/Boar.js

import { GameObject } from "./object.js";
import { GRAVITY, TILE_WIDTH, TILE_HEIGHT, BOAR_WIDTH, BOAR_HEIGHT, BOAR_SPEED, BOAR_CHASE_DISTANCE, BOAR_ATTACK_DISTANCE, BOAR_RETREAT_DISTANCE, BOAR_ANIMATION_SPEED, BOAR_DAMAGE } from "../engine/Constants.js";
import { Tile } from "./tile.js";
import { Player } from "./player.js";

export class Boar extends GameObject {
    /**
     * @param {number} x - Pozycja X dzika.
     * @param {number} y - Pozycja Y dzika.
     * @param {object} game - Obiekt gry.
     */
    constructor(x, y, game) {
        super(x, y, BOAR_WIDTH, BOAR_HEIGHT);
        this.hp = 2; // Dzik ma 2 HP
        this.toRemove = false;
        this.initialX = x; // Zapisz pozycję początkową do resetu/patrolu
        this.initialY = y;
        this.game = game;
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
        this.state = "patrol"; // idle, patrol, chase, attack
        this.animationTimer = 0;
        this.animationFrame = 0;
        this.animationSpeed = BOAR_ANIMATION_SPEED;
        this.facingDirection = "right";
        this.attackDamage = BOAR_DAMAGE; // Obrażenia zadawane graczowi
        
       
        // ------------------------------------
   // --- LOGIKA ZATRUCIA (z object.js) ---
        this.isPoisoned = false;
        this.poisonDamagePerTick = 0;
        this.poisonEndTime = 0;
        this.lastPoisonTick = 0;
        this.poisonTickInterval = 500;
        // --
        // Ładowanie sprite'ów
        this.boarSprites = [];
        // Załaduj 4 sprite'y dzika z podfolderu 'boar_sprites'
        for (let i = 1; i <= 4; i++) {
            this.boarSprites[i - 1] = new Image();
            this.boarSprites[i - 1].src = `assets/sprites/boar_sprites/boar${i}.png`;
        }
    }
    
    // Metoda resetPosition jest przydatna przy ponownym ładowaniu poziomu
    resetPosition() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.dx = 0;
        this.dy = 0;
        this.hp = 2; // Reset HP
        this.toRemove = false;
        this.state = "patrol";
        this.onGround = false;
        this.isPoisoned = false; // Reset zatrucia
    }
    
    update(deltaTime, gameObjects) {
        // !!! OBSŁUGA ZATRUCIA (zaimportowana z object.js)
        this.updatePoison(deltaTime);
        
        if (this.hp <= 0) {
            this.toRemove = true;
            return;
        }

        const player = this.game.player;
        if (!player) return;

        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        // Zmiana stanu
        if (distanceToPlayer < BOAR_ATTACK_DISTANCE && this.onGround) {
            this.state = "attack";
        } else if (distanceToPlayer < BOAR_CHASE_DISTANCE) {
            this.state = "chase";
        } else {
            this.state = "patrol";
        }
        
        // Logika ruchu
        switch (this.state) {
            case "chase":
                this.dx = (player.x < this.x ? -BOAR_SPEED : BOAR_SPEED);
                this.facingDirection = (this.dx < 0 ? "left" : "right");
                break;
            case "attack":
                // Zadaj obrażenia przy kolizji z graczem (obsługiwane w kolizjach)
                this.dx = 0; // Zatrzymaj ruch podczas ataku
                break;
            case "patrol":
                // Prosty ruch patrolujący - np. w miejscu, jeśli nie ma logiki krawędzi
                this.dx = 0; 
                break;
        }

        // 1. Zastosowanie ruchu i grawitacji
        this.dy += GRAVITY;
        this.x += this.dx;
        this.y += this.dy;
        this.onGround = false;

        // 2. Kolizja z graczem (atak)
        if (this.checkCollision(player)) {
            player.takeDamage(this.attackDamage); // Dzik zadaje 3 obrażenia
            // Odskok (opcjonalnie)
            this.x -= this.dx * 10;
        }

        // 3. Kolizja z kafelkami (podłoże)
        const oldY = this.y - this.dy; // Wymagane do poprawnej kolizji
        gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                if (this.dy > 0 && oldY + this.height <= obj.y) { // Kolizja z góry
                    this.y = obj.y - this.height;
                    this.dy = 0;
                    this.onGround = true;
                }
            }
        });
        
        // 4. Logika animacji (4 klatki)
        if (this.dx !== 0 || this.state === "attack") {
            this.animationTimer += deltaTime;
            if (this.animationTimer >= this.animationSpeed) {
                // Użyj modulo z 4, ponieważ mamy 4 klatki animacji
                this.animationFrame = (this.animationFrame + 1) % 4; 
                this.animationTimer = 0;
            }
        } else {
            this.animationFrame = 0;
            this.animationTimer = 0;
        }
    }

    draw(ctx) {
        const spriteToDraw = this.boarSprites[this.animationFrame];
        
        // Opcjonalnie: Rysowanie na czerwono, jeśli zatruty
        if (this.isPoisoned) {
             ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
             ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        if (spriteToDraw && spriteToDraw.complete) {
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
            ctx.fillStyle = "darkred";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
