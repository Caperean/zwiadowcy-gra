import { GameObject } from "./object.js";

/**
 * Klasa dla statycznych obiektów tła, takich jak krzewy czy drzewa.
 * Dziedziczy po GameObject, ale nie ma żadnej logiki aktualizacji,
 * ponieważ obiekty te są czysto dekoracyjne.
 */
export class BackgroundObject extends GameObject {
    /**
     * @param {number} x - Pozycja X obiektu.
     * @param {number} y - Pozycja Y obiektu.
     * @param {number} width - Szerokość obiektu.
     * @param {number} height - Wysokość obiektu.
     * @param {string} spriteName - Nazwa pliku sprite'a (np. "bush", "tree").
     */
    constructor(x, y, width, height, spriteName) {
        super(x, y, width, height);
        this.sprite = new Image();
        this.sprite.src = `assets/sprites/${spriteName}.png`;
    }

    /**
     * Obiekty tła nie mają logiki aktualizacji.
     */
    update(deltaTime) {
        // Pusta metoda, ponieważ obiekt jest statyczny.
    }

    /**
     * Rysuje obiekt na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}