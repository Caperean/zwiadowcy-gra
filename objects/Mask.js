import { GameObject } from "./object.js";
import { Tile } from "./tile.js";
import { MASK_WIDTH, MASK_HEIGHT, MASK_SPEED } from "../engine/Constants.js";
import { Player } from "./player.js";

export class Mask extends GameObject {
    constructor(x, y, dx, dy, game) {
        super(x, y, MASK_WIDTH, MASK_HEIGHT);
        this.dx = dx;
        this.dy = dy;
        this.game = game;
        this.toRemove = false;
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/mask.png";
    }

    update(deltaTime) {
        this.x += this.dx;
        this.y += this.dy;

        // Sprawdzenie kolizji z graczem
        if (this.checkCollision(this.game.player)) {
            this.game.player.takeDamage(1); // Zadaj 1 punkt obrażeń
            this.toRemove = true; // Maska znika po trafieniu
        }

        // Maski przelatują przez teren, więc nie sprawdzamy kolizji z kafelkami.
        // Jeśli maska wyleci poza ekran, zostanie usunięta przez logikę w Game.js.
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}
