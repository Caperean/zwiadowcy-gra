import { GameObject } from "./object.js";
import { ARROW_WIDTH, ARROW_HEIGHT } from "../engine/Constants.js";
import { Tile } from "./tile.js";
import { Fire } from "./fire.js";

export class EnemyArrow extends GameObject {
    /**
     * @param {number} x - Pozycja X startowa strzały.
     * @param {number} y - Pozycja Y startowa strzały.
     * @param {number} dx - Prędkość w poziomie.
     * @param {number} dy - Prędkość w pionie.
     * @param {object} game - Obiekt gry, potrzebny do kolizji z kafelkami.
     */
    constructor(x, y, dx, dy, game) {
        super(x, y, ARROW_WIDTH, ARROW_HEIGHT);
        this.dx = dx * 10; // Przyspieszenie strzały
        this.dy = dy * 10; // Przyspieszenie strzały
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
     * Aktualizuje pozycję i stan strzały w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
    update(deltaTime) {
        // Kolizja z kafelkami i ogniem
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                this.isFired = false;
                this.toRemove = true; // Strzała znika po kolizji
            } else if (obj instanceof Fire && this.checkCollision(obj)) {
                this.isBurning = true;
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

            // Oblicza kąt obrotu strzały na podstawie jej wektora ruchu (dx, dy)
            const angle = Math.atan2(this.dy, this.dx);
            ctx.rotate(angle);

            // Rysuje strzałę
            ctx.drawImage(spriteToDraw, -this.width / 2, -this.height / 2, this.width, this.height);
            
            ctx.restore();
        }
    }
}
