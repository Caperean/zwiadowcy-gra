import { GameObject } from "./object.js";
import { 
    ARROW_WIDTH, 
    ARROW_HEIGHT, 
    ARROW_SPEED,         // <--- DODAJ TO
    MAX_POWER_CHARGE,    // <--- DODAJ TO
    GRAVITY              // <--- DODAJ TO (potrzebne do update, ale lepiej mieć w jednym miejscu)
}
import { Tile } from "./tile.js";
import { Fire } from "./fire.js";
import { Wolf } from "./wolf.js";
import { Mage } from "./Mage.js";
import { Bat } from "./Bat.js";
import { Arab } from "./Arab.js";
import { Clown } from "./Clown.js";
import { Mask } from "./Mask.js";

export class Arrow extends GameObject {
    /**
     * @param {number} x - Pozycja X startowa strzały.
     * @param {number} y - Pozycja Y startowa strzały.
     * @param {number} powerCharge - Naładowana siła strzału (od 0 do MAX_POWER_CHARGE).
     * @param {object} game - Obiekt gry, potrzebny do kolizji z kafelkami.
     */
    constructor(x, y, powerCharge, game) { // Zmienione parametry!
        super(x, y, ARROW_WIDTH, ARROW_HEIGHT);
        this.game = game;
        
        // Obliczenie wektora prędkości przy stałym kącie 40 stopni (w radianach)
        const angle = 40 * (Math.PI / 180); // Kąt 40 stopni
        
        // Używamy siły strzału do skalowania prędkości
        const speedMultiplier = powerCharge / this.game.player.MAX_POWER_CHARGE;
        const initialSpeed = ARROW_SPEED * 2 * speedMultiplier; // Podwajamy bazową prędkość, by siła miała sens
        
        // Zależnie od kierunku gracza, zmieniamy kierunek strzału (dx)
        if (this.game.player.facingDirection === "right") {
            this.dx = initialSpeed * Math.cos(angle);
        } else {
            this.dx = -initialSpeed * Math.cos(angle);
        }
        
        // Prędkość w pionie jest zawsze do góry (ujemna)
        this.dy = -initialSpeed * Math.sin(angle); 
        
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/arrow.png"; 
        this.burningSprite = new Image();
        this.burningSprite.src = "assets/sprites/burningArrow.png";
        this.isFired = true;
        this.toRemove = false; 
        this.isBurning = false; 
    }
// ...
    
    
    /**
     * Sprawdza kolizję z innym obiektem.
     * @param {GameObject} other - Inny obiekt do sprawdzenia kolizji.
     * @returns {boolean} - True, jeśli jest kolizja, w przeciwnym razie false.
     */
    checkCollision(other) {  //56
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    /**
     * Aktualizuje stan strzały w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
 /**
     * Aktualizuje stan strzały w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
    update(deltaTime) {
        // 1. ZASTOSOWANIE GRAWITACJI i RUCH
        // Pamiętaj, żeby zaimportować GRAVITY z Constants.js
        this.dy += GRAVITY; 

        // 2. SPRAWDZANIE KOLIZJI Z WROGAMI I MASKAMI <--- TEN BLOK ZACZYNA SIĘ OD LINIJCE 108
        this.game.gameObjects.forEach(obj => { // Linia 108
            if (this.checkCollision(obj)) {
                // Sprawdzenie kolizji z wrogami
                if (obj instanceof Wolf || obj instanceof Mage || obj instanceof Bat || obj instanceof Arab || obj instanceof Clown) {
                    obj.takeDamage(1); 
                    this.toRemove = true; 
                } else if (obj instanceof Mask) { // Maski
                    obj.toRemove = true; 
                    this.toRemove = true; 
                }
            }
        });

        // 3. KOLIZJA Z KAELKAMI I OGNIEM
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                this.isFired = false;
                this.toRemove = true; // Strzała znika po kolizji
            } else if (obj instanceof Fire && this.checkCollision(obj)) {
                this.isBurning = true;
            }
        });

        // 4. AKTUALIZACJA POZYCJI
        this.x += this.dx;
        this.y += this.dy;
    }
    /**
     * Rysuje strzałę na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        const spriteToDraw = this.isBurning ? this.burningSprite : this.sprite;

        if (spriteToDraw.complete) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

            // Odwróć strzałę, jeśli leci w lewo
            if (this.dx < 0) {
                ctx.scale(-1, 1);
            }
            
            // Ponieważ sprite jest domyślnie pionowy, obracamy go o 90 stopni
            ctx.rotate(Math.PI / 2);
            
            // Rysujemy strzałę z przesunięciem, aby obrót był wokół jej środka
            ctx.drawImage(spriteToDraw, -this.width / 2, -this.height / 2, this.width, this.height);
            
            ctx.restore();
        } else {
            ctx.fillStyle = this.isBurning ? "orange" : "brown";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
