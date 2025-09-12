import { GameObject } from "./object.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";

export class Potion extends GameObject {
    /**
     * @param {number} x - Pozycja X eliksiru.
     * @param {number} y - Pozycja Y eliksiru.
     * @param {string} type - Rodzaj eliksiru ("green" lub "blue").
     */
    constructor(x, y, type) {
        super(x, y, TILE_WIDTH, TILE_HEIGHT);
        this.type = type;
        this.toRemove = false;
        this.sprite = new Image();
        this.sprite.src = `assets/sprites/${this.type}pot.png`;
    }

    /**
     * Eliksiry są statyczne, więc nie potrzebują logiki aktualizacji.
     */
    update(deltaTime) {
        // Pusta metoda
    }

    /**
     * Rysuje eliksir na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.type === "green" ? "green" : "blue";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}