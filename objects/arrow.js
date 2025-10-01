import { GameObject } from "./object.js";
import { ARROW_WIDTH, ARROW_HEIGHT } from "../engine/Constants.js";
import { Tile } from "./tile.js";
import { Fire } from "./fire.js";
import { Wolf } from "./wolf.js"; // ZMIANA: Dodano importy przeciwników
import { Mage } from "./Mage.js";
import { Bat } from "./Bat.js";
import { Arab } from "./Arab.js";

export class Arrow extends GameObject {
    constructor(x, y, dx, dy, game) {
        super(x, y, ARROW_WIDTH, ARROW_HEIGHT);
        this.dx = dx;
        this.dy = dy;
        this.game = game;
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/arrow.png"; 
        this.burningSprite = new Image();
        this.burningSprite.src = "assets/sprites/burningArrow.png";
        this.isFired = true;
        this.toRemove = false; 
        this.isBurning = false; 
    }
    
    update(deltaTime) {
        // Sprawdzenie, czy strzała wyleciała poza ekran
        if (this.x < 0 || this.x > this.game.canvas.width || this.y < 0 || this.y > this.game.canvas.height) {
            this.toRemove = true;
        }

        // Sprawdzanie kolizji z kafelkami i ogniem
        this.game.gameObjects.forEach(obj => {
            if (obj instanceof Tile && this.checkCollision(obj)) {
                this.isFired = false;
                this.toRemove = true;
            } else if (obj instanceof Fire && this.checkCollision(obj)) {
                this.isBurning = true;
            }
        });

        // ZMIANA: Sprawdzanie kolizji z przeciwnikami
        this.game.gameObjects.forEach(obj => {
            if (this.checkCollision(obj)) {
                if (obj instanceof Wolf || obj instanceof Mage || obj instanceof Bat || obj instanceof Arab) {
                    obj.takeDamage(1); // Zadaj 1 punkt obrażeń
                    this.toRemove = true; // Strzała znika po trafieniu
                }
            }
        });

        this.x += this.dx;
        this.y += this.dy;
    }

    draw(ctx) {
        const spriteToDraw = this.isBurning ? this.burningSprite : this.sprite;

        if (spriteToDraw.complete) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            if (this.dx < 0) {
                ctx.scale(-1, 1);
            }
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(spriteToDraw, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            ctx.fillStyle = this.isBurning ? "orange" : "white";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
