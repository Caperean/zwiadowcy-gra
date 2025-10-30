import { LevelLoader } from "./LevelLoader.js";
import { Input } from "../engine/Input.js"; 
import { Player } from "../objects/player.js";
import { Arrow } from "../objects/arrow.js";
import { PoisonedArrow } from "../objects/PoisonedArrow.js";
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
        this.gameEnded = false; // Nowa flaga
        this.loadLevel(this.currentLevelIndex);
        
        this.lastTime = 0; 
    }

    loadLevel(levelIndex) {
        if (levelIndex >= allLevels.length) {
            this.gameEnded = true;
            this.showEndingScreen();
            return;
        }

        const levelName = allLevels[levelIndex].name;
        const levelData = LevelLoader.load(levelName, this);
        this.gameObjects = levelData.gameObjects;
        this.backgroundColor = levelData.backgroundColor;
        this.arrows = [];
        
        this.player = this.gameObjects.find(obj => obj instanceof Player);
    }
    
    showEndingScreen() {
        // Czyszczenie canvas
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Rysowanie napisu
        this.ctx.fillStyle = "#FFD700";
        this.ctx.font = "bold 40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GRATULACJE!", this.canvas.width / 2, 100);
        this.ctx.fillText("GRA UKOŃCZONA!", this.canvas.width / 2, 150);
        
        // Ładowanie i rysowanie gifa
        const endingGif = new Image();
        endingGif.src = "assets/sprites/ending.gif";
        endingGif.onload = () => {
            // Centrowanie gifa
            const gifX = (this.canvas.width - endingGif.width) / 2;
            const gifY = 200;
            this.ctx.drawImage(endingGif, gifX, gifY);
        };
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime) {
        // Jeśli gra się skończyła, nie aktualizuj gry
        if (this.gameEnded) return;

        this.gameObjects.forEach(obj => obj.update(deltaTime, this.gameObjects));
        this.gameObjects = this.gameObjects.filter(obj => !obj.toRemove);
        this.arrows.forEach(arrow => arrow.update(deltaTime));
        
        const exitGate = this.gameObjects.find(obj => obj instanceof ExitGate);
        if (exitGate && this.player && this.player.checkCollision(exitGate)) {
            this.currentLevelIndex++;
            this.loadLevel(this.currentLevelIndex);
            return;
        }

        this.gameObjects = this.gameObjects.filter(obj => !obj.toRemove);
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
        // Jeśli gra się skończyła, nie rysuj normalnej gry
        if (this.gameEnded) return;

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.gameObjects.forEach(obj => obj.draw(this.ctx));
        this.arrows.forEach(arrow => arrow.draw(this.ctx));
    }
}