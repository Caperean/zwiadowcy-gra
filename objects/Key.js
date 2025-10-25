import { GameObject } from "./object.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";

export class Key extends GameObject {
    /**
     * @param {number} x - Pozycja X klucza.
     * @param {number} y - Pozycja Y klucza.
     * @param {object} game - Obiekt gry, potrzebny do interakcji z graczem.
     */
    constructor(x, y, game) {
        // Klucz o rozmiarze kafelka dla spójności
        super(x, y, TILE_WIDTH, TILE_HEIGHT); 
        this.game = game;
        this.toRemove = false;
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/key.png"; // Użycie nowej grafiki 'key'
    }

    update(deltaTime) {
        // Sprawdzanie kolizji z graczem
        if (this.checkCollision(this.game.player)) {
            // Dodanie klucza do inwentarza gracza
            this.game.player.hasKey = true; 
            this.toRemove = true; // Klucz zostaje zebrany
            console.log("Gracz zebrał klucz! Drzwi mogą zostać otwarte.");
        }
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}