// objects/Snowbullet.js
import { GameObject } from "./object.js";
// ... istniejące importy ...

export class Snowbullet extends GameObject {
    // ... istniejący konstruktor i update ...

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.save();
            
            // Odbicie w poziomie, jeśli pocisk leci w lewo (dx < 0)
            if (this.dx < 0) {
                // Przesuń punkt odniesienia do prawej krawędzi pocisku
                ctx.translate(this.x + this.width, this.y);
                // Odbij w poziomie
                ctx.scale(-1, 1);
                // Rysuj obrazek
                ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
            } else {
                // Rysuj normalnie, jeśli pocisk leci w prawo (dx >= 0)
                ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            }
            
            ctx.restore();
        }
    }
}
