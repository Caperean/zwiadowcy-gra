import { GameObject } from "./object.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";

export class Apple extends GameObject {
    /**
     * @param {number} x - Pozycja X jabłka.
     * @param {number} y - Pozycja Y jabłka.
     * @param {object} game - Obiekt gry, potrzebny do interakcji z graczem.
     */
    constructor(x, y, game) {
        super(x, y, TILE_WIDTH, TILE_HEIGHT);
        this.game = game;
        this.toRemove = false;
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/apple.png";
    }

    /**
     * Aktualizuje stan jabłka w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
    update(deltaTime) {
        // Sprawdzanie kolizji z graczem
        if (this.checkCollision(this.game.player)) {
            // Użyj nowej metody heal() z klasy Player
            this.game.player.heal(); 
            this.toRemove = true; // Zaznacz jabłko do usunięcia
            console.log("Gracz zebrał jabłko i odzyskał 1 HP!");
        }
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
     * Rysuje jabłko na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            // Tymczasowy prostokąt, jeśli sprite się nie załadował
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}