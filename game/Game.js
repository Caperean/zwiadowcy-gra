import { LevelLoader } from "./LevelLoader.js";
import { Input } from "../engine/Input.js"; 
import { Player } from "../objects/player.js";
import { Apple } from "../objects/apple.js";
import { ExitGate } from "../objects/ExitGate.js";
import { allLevels } from "../levels/levels.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.input = new Input();
        this.groundY = 500;
        
        this.currentLevelIndex = 0;
        this.loadLevel(this.currentLevelIndex);
        
        this.lastTime = 0; 
    }

    loadLevel(levelIndex) {
        if (levelIndex >= allLevels.length) {
            console.log("Koniec gry! Ukończyłeś wszystkie poziomy.");
            return;
        }

        const levelName = allLevels[levelIndex].name;
        const levelData = LevelLoader.load(levelName, this);
        this.gameObjects = levelData.gameObjects;
        this.backgroundColor = levelData.backgroundColor;
        this.arrows = [];
    }

    update(deltaTime) {
        this.gameObjects.forEach(obj => obj.update(deltaTime));

        // ZMIANA: Usuwanie obiektów, które mają toRemove ustawione na true
        this.gameObjects = this.gameObjects.filter(obj => !obj.toRemove);
        
        this.arrows.forEach(arrow => arrow.update(deltaTime));

        // Filtrowanie strzał, które wyleciały poza ekran
        this.arrows = this.arrows.filter(arrow => arrow.x < this.canvas.width && arrow.x > 0 && arrow.y < this.canvas.height && !arrow.toRemove);
    }

    resetLevelObjects() {
        this.player.currentHP = this.player.maxHP;
        const playerStart = this.levelLoader.getPlayerStartPosition();
        this.player.x = playerStart.x;
        this.player.y = playerStart.y;
        this.player.dx = 0;
        this.player.dy = 0;
        this.player.state = "idle";
        this.player.onGround = false;
        this.player.isCharging = false;
        
        this.arrows = [];
        this.gameObjects.forEach(obj => {
            if (typeof obj.resetPosition === 'function') {
                obj.resetPosition();
            }
        });
    }

    draw() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rysowanie wszystkich obiektów
        this.gameObjects.forEach(obj => obj.draw(this.ctx));
        this.arrows.forEach(arrow => arrow.draw(this.ctx));

        // Rysowanie HP gracza
        this.drawHearts();
    }
    
    drawHearts() {
        for (let i = 0; i < this.player.maxHP; i++) {
            const heartImage = i < this.player.currentHP ? this.player.heartFull : this.player.heartEmpty;
            this.ctx.drawImage(heartImage, 10 + i * 40, 10, 32, 32);
        }
    }
}
