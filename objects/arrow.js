import { GameObject } from "./object.js";
import { ARROW_WIDTH, ARROW_HEIGHT } from "../engine/Constants.js";
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
     * @param {number} dx - Prędkość w poziomie.
     * @param {number} dy - Prędkość w pionie.
     * @param {object} game - Obiekt gry, potrzebny do kolizji z kafelkami.
     */
    constructor(x, y, dx, dy, game) {
        super(x, y, ARROW_WIDTH, ARROW_HEIGHT);
        this.dx = dx;
        this.dy = dy;
        this.game = game;
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/arrow.png"; 
        this.burningSprite = new Image();
        this.burningSprite.src = "assets/sprites/burningArrow.png";
        this.isFired = true;
        this.toRemove = false; // Flaga do usunięcia strzały
        this.isBurning = false; // Nowa flaga dla płonącej strzały
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
     * Aktualizuje stan strzały w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
 update(deltaTime) {
        if (!this.isFired) return;

        // Sprawdzanie kolizji z kafelkami i ogniem
        this.game.gameObjects.forEach(obj => {
            if (this.checkCollision(obj)) {
                if (obj instanceof Tile) {
                    this.isFired = false;
                    this.toRemove = true; // Strzała znika po kolizji
                } else if (obj instanceof Fire) {
                    this.isBurning = true;
                }
            }
        });

        // Nowa logika sprawdzania kolizji z przeciwnikami
        this.game.gameObjects.forEach(obj => {
            if (this.checkCollision(obj)) {
                if (obj instanceof Wolf || obj instanceof Mage || obj instanceof Bat || obj instanceof Arab || obj instanceof Clown || obj instanceof Mask) {
                    obj.takeDamage(1); // Zadaj 1 punkt obrażeń
                    this.toRemove = true; // Strzała znika po trafieniu
                }
            }
        });

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
