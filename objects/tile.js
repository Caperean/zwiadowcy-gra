import { GameObject } from "./object.js";

export class Tile extends GameObject {
    /**
     * @param {number} x - Pozycja X kafelka.
     * @param {number} y - Pozycja Y kafelka.
     * @param {number} width - Szerokość kafelka.
     * @param {number} height - Wysokość kafelka.
     * @param {string} spriteName - Nazwa pliku sprite'a (np. "terrainblock", "lava").
     */
    constructor(x, y, width, height, spriteName) {
        super(x, y, width, height);
        this.spriteName = spriteName;
        this.sprite = new Image();
        this.sprite.src = `assets/tiles/${spriteName}.png`;
    }

    /**
     * Metoda update jest pusta, ponieważ kafelki są statyczne.
     */
    update(deltaTime) {
        // Pusta metoda
    }

    /**
     * Rysuje kafelek na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            // Rysuj prostokąt, jeśli sprite się nie załadował
            ctx.fillStyle = "gray"; 
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
