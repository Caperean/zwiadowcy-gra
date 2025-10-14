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
         // NOWA ZMIENNA DLA PATROLOWANIA
        this.patrolDirection = "right"; // Domyślnie idzie w prawo
        this.facingDirection = "right";

        // Ustawienia patrolu
        this.patrolDirection = \"left\";
        this.patrolRange = 50; 
        this.patrolStartTime = x;
        this.patrolEndTime = x + this.patrolRange;
        this.speed = BOAR_SPEED;

        this.boarSprites = [];
        for (let i = 1; i <= 4; i++) {
            const sprite = new Image();
            sprite.src = `assets/sprites/boar_sprites/boar${i}.png`; // Załóżmy, że masz boar1.png do boar4.png
            this.boarSprites.push(sprite);
        }

        // Zmienne do ataku
        this.attackCooldown = 1500;
        this.lastAttackTime = 0;
        this.chargeSpeed = BOAR_SPEED * 3; // Szybkość szarży
        this.chargeTimer = 0;
        this.chargeDuration = 300; // Czas trwania szarży
        this.damage = BOAR_DAMAGE;
        
        // --- USUNIĘTO: Logika związana z zatruciem (isPoisoned, poisonTimer) ---
    }
    
    // --- USUNIĘTO: Metoda applyPoison() ---

    update(deltaTime) {
        if (this.hp <= 0) {
            this.toRemove = true;
            return;
        }

        // 1. ZASTOSOWANIE GRAWITACJI
        this.dy += GRAVITY;
        this.onGround = false;
        
        // 2. LOGIKA RUCHU I STANU
        this.updateState();

        // 3. AKTUALIZACJA POZYCJI (Wstępna)
        const oldX = this.x;
        const oldY = this.y;
        this.x += this.dx;
        this.y += this.dy;

        // 4. KOLIZJE Z KAFELKAMI TERENU (NAPRAWIA PRZENIKANIE)
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                // Kolizja pionowa
                if (this.y < oldY) { // Kolizja z dołu (skok pod platformę)
                    this.y = obj.y + obj.height;
                    this.dy = 0;
                } else if (this.y > oldY) { // Kolizja z góry (lądowanie)
                    this.y = obj.y - this.height;
                    this.dy = 0;
                    this.onGround = true;
                }
                
                // Kolizja pozioma (odwrócenie kierunku)
                if (this.x < oldX) { // Kolizja z lewej strony kafelka
                    this.x = obj.x + obj.width;
                    this.dx = 0; // Zatrzymaj ruch
                    this.facingDirection = "right";
                } else if (this.x > oldX) { // Kolizja z prawej strony kafelka
                    this.x = obj.x - this.width;
                    this.dx = 0; // Zatrzymaj ruch
                    this.facingDirection = "left";
                }
            }
        });
        
        // 5. LOGIKA ANIMACJI (4 klatki)
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
        
        // --- USUNIĘTO: Logika uszkodzeń i spowolnienia od zatrucia z metody update ---
    }
    
    // Metoda odpowiedzialna za logikę stanu dzika (patrol/pościg/atak)
    updateState() {
        const player = this.game.player;
        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

        if (this.state === "patrol") {
            // Logika ruchu patrolu (odbijanie się od krańców patrolRange)
            if (this.x <= this.patrolStartTime) {
                this.facingDirection = "right";
            } else if (this.x + this.width >= this.patrolEndTime) {
                this.facingDirection = "left";
            }

            this.dx = this.facingDirection === "right" ? this.speed : -this.speed;

            // Przejście do stanu pościgu
            if (distanceToPlayer < BOAR_CHASE_DISTANCE && Math.abs(this.y - player.y) < TILE_HEIGHT * 2) {
                this.state = "chase";
            }
        } else if (this.state === "chase") {
            // Logika pościgu
            if (distanceToPlayer < BOAR_ATTACK_DISTANCE && Date.now() - this.lastAttackTime > this.attackCooldown) {
                this.state = "attack";
                this.chargeTimer = this.chargeDuration;
                this.dx = this.facingDirection === "right" ? this.chargeSpeed : -this.chargeSpeed;
                this.lastAttackTime = Date.now();
            } else if (distanceToPlayer > BOAR_RETREAT_DISTANCE) {
                this.state = "patrol";
            } else {
                // Biegnij w kierunku gracza
                this.facingDirection = (player.x > this.x) ? "right" : "left";
                this.dx = this.facingDirection === "right" ? this.speed : -this.speed;
            }
        } else if (this.state === "attack") {
            // Logika ataku (szarża)
            this.chargeTimer -= this.game.deltaTime;
            if (this.chargeTimer <= 0) {
                this.state = "chase";
                this.dx = 0; // Zatrzymaj szarżę po czasie
            }
            
            // Kolizja z graczem podczas szarży zadaje obrażenia
            if (this.checkCollision(player)) {
                player.takeDamage(this.damage);
            }
        }
    }

    draw(ctx) {
        const spriteToDraw = this.boarSprites[this.animationFrame];
        
        // --- USUNIĘTO: Opcjonalne rysowanie na czerwono, jeśli zatruty ---
        /*
        if (this.isPoisoned) {
             ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
             ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        */

        if (spriteToDraw && spriteToDraw.complete) {
            ctx.save();
            if (this.facingDirection === "left") {
                ctx.translate(this.x + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(spriteToDraw, 0, 0, this.width, this.height);
            } else {
                ctx.translate(this.x, this.y);
                ctx.drawImage(spriteToDraw, 0, 0, this.width, this.height);
                 ctx.fillStyle = "purple"; // Łatwy do zauważenia kolor
            ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = "brown"; // Tymczasowy prostokąt, jeśli sprite się nie załadował
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
