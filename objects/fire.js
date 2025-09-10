import { GameObject } from "./object.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";

export class Fire extends GameObject {
    constructor(x, y) {
        // Używamy szerokości i wysokości kafelka dla ognia, dla spójności
        super(x, y, TILE_WIDTH, TILE_HEIGHT);

        // Ładowanie sprite'ów dla animacji ognia
        this.fireSprites = [];
        this.fireSprites[0] = new Image();
        this.fireSprites[0].src = "assets/sprites/fire1.png";
        this.fireSprites[1] = new Image();
        this.fireSprites[1].src = "assets/sprites/fire2.png";

        // Zmienne do zarządzania animacją
        this.animationTimer = 0;
        this.animationFrame = 0;
        this.animationSpeed = 100; // Szybkość animacji w milisekundach
    }

    /**
     * Aktualizuje stan animacji ognia w każdej klatce gry.
     * @param {number} deltaTime - Czas od ostatniej klatki w milisekundach.
     */
    update(deltaTime) {
        // Aktualizacja timera i zmiana klatki animacji
        this.animationTimer += deltaTime;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationFrame = (this.animationFrame + 1) % this.fireSprites.length;
            this.animationTimer = 0;
        }
    }

    /**
     * Rysuje ogień na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        const spriteToDraw = this.fireSprites[this.animationFrame];

        // Rysowanie tylko, jeśli obraz jest załadowany
        if (spriteToDraw.complete) {
            ctx.drawImage(spriteToDraw, this.x, this.y, this.width, this.height);
        }
    }
}
