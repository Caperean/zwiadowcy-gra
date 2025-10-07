// objects/PoisonedArrow.js

import { Arrow } from "./arrow.js";

export class PoisonedArrow extends Arrow {
    /**
     * @param {number} x - Pozycja X startowa zatrutej strzały.
     * @param {number} y - Pozycja Y startowa zatrutej strzały.
     * @param {number} powerCharge - Naładowana siła strzału.
     * @param {object} game - Obiekt gry.
     */
    constructor(x, y, powerCharge, game) { // Zmienione parametry!
        super(x, y, powerCharge, game); // Przekazanie powerCharge do bazowego konstruktora
        this.sprite.src = "assets/sprites/poisonedarrow.png"; // Zmieniamy sprite
    }
}
