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
        this.initialX = x; // Zapisz pozycję początkową
        this.initialY = y;
        this.game = game;
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
        this.state = "idle"; // Zmieniono na 'idle' (jak Wilk)
        this.animationTimer = 0;
        this.animationFrame = 0;
        this.animationSpeed = BOAR_ANIMATION_SPEED;
        this.facingDirection = "right";

        // Ustawienia 'patrol' (teraz używane w 'idle' jako logika poruszania)
        this.patrolDirection = 1; // 1 dla prawo, -1 dla lewo (jak Wilk)

        // Usunięto: this.patrolRange, this.patrolStartTime, this.patrolEndTime
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
        this.chargeDuration = 300; // Czas trwania szarży
        this.damage = BOAR_DAMAGE;
        
        // NOWE: Dziś używane dla logiki 'retreat'
        this.retreatStartPosition = null; 
    }
    
    // NOWA METODA (JAK W WOLF.JS): Sprawdza, czy w najbliższym sąsiedztwie dzika znajduje się przeszkoda, jak np. kafelek.
    checkObstacle() {
        const nextX = this.x + this.dx;
        // Sprawdza tylko kolizję na wysokości dzika, by zobaczyć, czy może iść dalej
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


    update(deltaTime) {
        if (this.hp <= 0) {
            this.toRemove = true;
            return;
        }

        // 1. ZASTOSOWANIE GRAWITACJI
        this.dy += GRAVITY;
        this.onGround = false;
        
        // 2. LOGIKA RUCHU I STANU
        this.updateState(); // Cała logika stanu jest przeniesiona do updateState, jak w Wilk.js

        // 3. AKTUALIZACJA POZYCJI (Wstępna)
        const oldX = this.x;
        const oldY = this.y;
        
        // Zastosowanie ruchu po logice state (nowość, by checkObstacle w state działało poprawnie)
        this.x += this.dx;
        this.y += this.dy;

        // 4. KOLIZJE Z KAFELKAMI TERENU (ZACHOWANO LOGIKĘ DZIKA, JEST BARDZIEJ ROZBUDOWANA)
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
                
                // Kolizja pozioma (odwrócenie kierunku - jak w Wolf.js, ale w logice kolizji)
                if (this.x < oldX) { // Kolizja z lewej strony kafelka
                    this.x = obj.x + obj.width;
                    this.dx = 0; 
                    // this.facingDirection = "right"; // Usunięto, bo kolizja z kafelkiem powinna być neutralna dla facingDirection, chyba że jest to ściana
                } else if (this.x > oldX) { // Kolizja z prawej strony kafelka
                    this.x = obj.x - this.width;
                    this.dx = 0; 
                    // this.facingDirection = "left"; // Usunięto
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
    }
    
    // Metoda odpowiedzialna za logikę stanu dzika (patrol/pościg/atak/wycofanie)
    updateState() {
        const player = this.game.player;
        // W przeciwieństwie do Wolf.js (który używa Math.abs dla x), użyjemy pełnej odległości, ale też zrobimy kontrolę na Y
        const distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));
        const distanceXToPlayer = Math.abs(player.x - this.x);
        
        // Usunięto: Logika sprawdzania niebezpiecznych kafelków z Wolf.js (ponieważ ma bardziej skomplikowaną obsługę kolizji)

        switch (this.state) {
            case "idle":
                // Logika 'idle' wilka = patrolowanie z odbijaniem od przeszkód
                this.dx = this.speed * this.patrolDirection;
                this.facingDirection = this.patrolDirection === 1 ? "right" : "left";

                if (this.checkObstacle()) {
                    this.patrolDirection *= -1;
                }
                
                // Przejście do stanu pościgu (z kontrolą Y, jak w pierwotnym Boar.js)
                if (distanceToPlayer < BOAR_CHASE_DISTANCE && Math.abs(this.y - player.y) < TILE_HEIGHT * 2) {
                    this.state = "chase";
                }
                break;
                
            case "chase":
                // Biegnij w kierunku gracza
                this.facingDirection = (player.x > this.x) ? "right" : "left";
                this.dx = this.facingDirection === "right" ? this.speed : -this.speed;

                if (distanceToPlayer < BOAR_ATTACK_DISTANCE) {
                     // Sprawdzenie cooldownu przed atakiem (jak w pierwotnym Boar.js)
                    if (Date.now() - this.lastAttackTime > this.attackCooldown) {
                        this.state = "attack";
                        this.chargeTimer = this.chargeDuration;
                        // Szarża w kierunku gracza (jak w pierwotnym Boar.js)
                        this.dx = this.facingDirection === "right" ? this.chargeSpeed : -this.chargeSpeed;
                        this.lastAttackTime = Date.now();
                    }
                } else if (distanceToPlayer > BOAR_CHASE_DISTANCE + 50) { // +50 by dodać margines
                    this.state = "idle";
                }
                break;
                
            case "attack":
                // Użycie licznika szarży (jak w pierwotnym Boar.js)
                this.chargeTimer -= this.game.deltaTime;
                
                // Kolizja z graczem podczas szarży zadaje obrażenia
                if (this.checkCollision(player)) {
                    player.takeDamage(this.damage);
                    // Zmiana na 'retreat' po udanym uderzeniu (jak w Wolf.js)
                    this.state = "retreat";
                    this.retreatStartPosition = { x: this.x, y: this.y };
                    this.dx = (player.x > this.x) ? -this.speed : this.speed; // Wycofanie
                    // Zakończ szarżę od razu po trafieniu
                    this.chargeTimer = 0; 
                }
                
                if (this.chargeTimer <= 0) {
                    // Jeśli szarża się skończyła, ale nie trafiła gracza
                    this.state = "chase";
                    this.dx = 0; // Zatrzymaj szarżę po czasie
                }
                break;
                
            case "retreat":
                // NOWY STAN (JAK W WOLF.JS): Logika wycofywania się
                if (this.retreatStartPosition) {
                    const distanceRetreated = Math.abs(this.x - this.retreatStartPosition.x);
                    if (distanceRetreated > BOAR_RETREAT_DISTANCE) {
                        this.state = "idle";
                        this.dx = 0;
                        this.retreatStartPosition = null;
                    } else {
                        // Kontynuuj ruch wycofania
                        this.facingDirection = (this.dx > 0) ? "right" : "left";
                    }
                } else {
                    // Jeśli jakimś cudem nie ma pozycji startowej, przejdź do 'idle'
                     this.state = "idle";
                }
                break;
        }
    }

    draw(ctx) {
        const spriteToDraw = this.boarSprites[this.animationFrame];
        
        if (spriteToDraw && spriteToDraw.complete) {
            ctx.save();
            if (this.facingDirection === "left") {
                ctx.translate(this.x + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(spriteToDraw, 0, 0, this.width, this.height);
            } else {
                ctx.translate(this.x, this.y);
                ctx.drawImage(spriteToDraw, 0, 0, this.width, this.height);
                // USUNIĘTO: ctx.fillStyle = "purple"; ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = "brown"; // Tymczasowy prostokąt, jeśli sprite się nie załadował
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
