import { GameObject } from "./object.js";

export class ExitGate extends GameObject {
    /**
     * @param {number} x - Pozycja X bramy.
     * @param {number} y - Pozycja Y bramy.
     * @param {number} width - Szerokość bramy.
     * @param {number} height - Wysokość bramy.
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/woodhouse.png";
    }

    /**
     * Metoda update jest pusta, ponieważ brama nie ma własnej logiki ruchu.
     */
    update(deltaTime) {
        // Obiekt jest statyczny, więc nie potrzebuje logiki aktualizacji.
    }

    /**
     * Rysuje bramę na canvasie.
     * @param {CanvasRenderingContext2D} ctx - Kontekst rysowania 2D.
     */
    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = "brown"; // Tymczasowy prostokąt, jeśli sprite się nie załadował
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}