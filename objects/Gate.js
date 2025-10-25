import { GameObject } from "./object.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";
import { Player } from "./player.js"; // Import potrzebny do sprawdzenia typu i inwentarza

export class Gate extends GameObject {
    /**
     * @param {number} x - Pozycja X drzwi.
     * @param {number} y - Pozycja Y drzwi.
     */
    constructor(x, y) {
        // Przyjmujemy rozmiar pasujący do standardowego kafelka, może być wyższy (np. 2 kafelki)
        super(x, y, TILE_WIDTH, TILE_HEIGHT * 2); 
        this.isLocked = true;
        this.toRemove = false; // Drzwi nie są usuwane, tylko zmieniany jest ich stan.
        
        this.spriteClosed = new Image();
        this.spriteClosed.src = "assets/sprites/closed.png"; 
        
        this.spriteOpen = new Image();
        this.spriteOpen.src = "assets/sprites/open.png"; 
    }

    /**
     * Główna logika kolizji i otwierania.
     * @param {number} deltaTime - Czas od ostatniej klatki.
     * @param {object} game - Obiekt gry.
     */
    update(deltaTime, game) {
        const player = game.player;

        // 1. Sprawdź, czy drzwi są zablokowane i czy gracz ma klucz
        if (this.isLocked) {
            if (this.checkCollision(player) && player.hasKey) {
                this.isLocked = false;
                // Opcjonalnie: zużyj klucz, jeśli jest to jednorazowe otwarcie
                // player.hasKey = false; 
                console.log("Drzwi otwarte! Klucz użyty.");
            }
        }
        
        // 2. Jeśli drzwi są zablokowane, muszą blokować ruch gracza (ta część jest kluczowa)
        if (this.isLocked) {
            // W tym miejscu powinna być logika, która zapobiega przejściu gracza, 
            // ale najlepiej, by zajmowała się tym centralna funkcja kolizji gracza w Player.js/Game.js.
            // Poniżej założenie: Drzwi działają jak kafelek dla gracza
            
            // Logika blokowania dla gracza (Horizontal, uproszczona)
            if (this.checkCollision(player)) {
                const overlapX = Math.min(player.x + player.width, this.x + this.width) - Math.max(player.x, this.x);
                const overlapY = Math.min(player.y + player.height, this.y + this.height) - Math.max(player.y, this.y);

                if (overlapX < overlapY) {
                     // Kolizja w poziomie - odepchnij gracza
                    if (player.dx > 0) player.x -= overlapX; // Gracz idzie w prawo
                    if (player.dx < 0) player.x += overlapX; // Gracz idzie w lewo
                    player.dx = 0;
                }
            }
        }
    }

    draw(ctx) {
        const spriteToDraw = this.isLocked ? this.spriteClosed : this.spriteOpen;
        if (spriteToDraw.complete) {
            ctx.drawImage(spriteToDraw, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.isLocked ? "darkred" : "green"; 
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}