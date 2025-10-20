// objects/Snowbullet.js
import { GameObject } from "./object.js";
// ... istniejące importy ...

export class Snowbullet extends GameObject {
    // ... istniejący konstruktor i update ...

   
    // objects/Snowbullet.js (Poprawiona metoda draw)

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.save();
            
            // Przesuń punkt odniesienia do środka pocisku, aby skalowanie działało poprawnie
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            
            // Odbicie w poziomie, jeśli pocisk leci w lewo (dx < 0)
            if (this.dx < 0) {
                // Skalowanie na -1 na osi X odwraca sprite
                ctx.scale(-1, 1); 
            }
            
            // Rysuj obrazek od środka nowego układu odniesienia
            ctx.drawImage(this.sprite, -this.width / 2, -this.height / 2, this.width, this.height);
            
            ctx.restore();
        }
    }
}
