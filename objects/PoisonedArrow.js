import { Arrow } from "./arrow.js";

export class PoisonedArrow extends Arrow {
    /**
     * @param {number} x - Pozycja X startowa zatrutej strzały.
     * @param {number} y - Pozycja Y startowa zatrutej strzały.
     * @param {number} dx - Prędkość w poziomie.
     * @param {number} dy - Prędkość w pionie.
     * @param {object} game - Obiekt gry.
     */
    constructor(x, y, dx, dy, game) {
        super(x, y, dx, dy, game);
        this.sprite.src = "assets/sprites/poisonedarrow.png"; // Zmieniamy sprite
    }
}