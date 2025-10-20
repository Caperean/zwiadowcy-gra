// objects/IceBlock.js
import { GameObject } from "./object.js";
import { TILE_WIDTH, ICEBLOCK_SIZE_MULTIPLIER, ICEBLOCK_DURATION } from "../engine/Constants.js";

export class IceBlock extends GameObject {
    constructor(x, y, game) {
        // Obliczamy nowy rozmiar: 3x TILE_WIDTH
        const size = TILE_WIDTH * ICEBLOCK_SIZE_MULTIPLIER;
        super(x, y, size, size);
        this.game = game;
        this.toRemove = false;
        this.creationTime = Date.now();
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/iceblock.png";
        
        // Ważne: działa jak Tile dla kolizji
        this.isTile = true;
    }

    update(deltaTime) {
        // Po upływie 5 sekund lód znika
        if (Date.now() - this.creationTime > ICEBLOCK_DURATION) {
            this.toRemove = true;
        }
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
        // Opcjonalnie: wizualna informacja o czasie
        const timeLeft = Math.max(0, (ICEBLOCK_DURATION - (Date.now() - this.creationTime)) / 1000);
        ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
        ctx.fillRect(this.x, this.y, this.width * (timeLeft / (ICEBLOCK_DURATION / 1000)), 5);
    }
}
