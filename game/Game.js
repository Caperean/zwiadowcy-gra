import { LevelLoader } from "./LevelLoader.js";
import { Input } from "../engine/Input.js"; 
import { Player } from "../objects/player.js";
import { Apple } from "../objects/apple.js";
import { ExitGate } from "../objects/ExitGate.js"; // Nowy import
import { allLevels } from "../levels/levels.js"; // Nowy import

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.input = new Input();
        this.groundY = 500;
        
        this.currentLevelIndex = 0;
        this.loadLevel(this.currentLevelIndex);
        
        // Zapisanie ostatniego czasu do obliczania deltaTime
        this.lastTime = 0; 
    }

    loadLevel(levelIndex) {
        if (levelIndex >= allLevels.length) {
            console.log("Koniec gry! Ukończyłeś wszystkie poziomy.");
            // Tutaj możesz dodać ekran końcowy lub inne akcje
            return;
        }

        const levelName = allLevels[levelIndex].name;
        const levelData = LevelLoader.load(levelName, this);
        this.gameObjects = levelData.gameObjects;
        this.backgroundColor = levelData.backgroundColor;
        this.arrows = [];
        
        // Poprawne przypisanie gracza
        this.player = this.gameObjects.find(obj => obj instanceof Player);
    }
    
    /**
     * Główna pętla gry.
     * @param {number} timestamp - Aktualny czas.
     */
    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    /**
     * Aktualizuje stan wszystkich obiektów gry.
     * @param {number} deltaTime - Czas od ostatniej klatki.
     */
    update(deltaTime) {
        // Aktualizacja wszystkich obiektów gry
        this.gameObjects.forEach(obj => obj.update(deltaTime));
        this.arrows.forEach(arrow => arrow.update(deltaTime));

        // Sprawdzanie kolizji gracza z ExitGate
        const exitGate = this.gameObjects.find(obj => obj instanceof ExitGate);
        if (exitGate && this.player && this.player.checkCollision(exitGate)) {
            console.log("Poziom ukończony! Ładowanie następnego poziomu...");
            this.currentLevelIndex++;
            this.loadLevel(this.currentLevelIndex);
            return; // Ważne, aby zatrzymać aktualizację po załadowaniu nowego poziomu
        }

        // Usuwanie obiektów, które są oznaczone do usunięcia (np. jabłka, które zostały zebrane)
        this.gameObjects = this.gameObjects.filter(obj => !obj.toRemove);

        // Filtrowanie strzał, które wyleciały poza ekran
        this.arrows = this.arrows.filter(arrow => arrow.x < this.canvas.width && arrow.x > 0 && arrow.y < this.canvas.height && !arrow.toRemove);
    }

    /**
     * Czyści płótno i rysuje wszystkie obiekty gry.
     */
    draw() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rysowanie wszystkich obiektów
        this.gameObjects.forEach(obj => obj.draw(this.ctx));
        this.arrows.forEach(arrow => arrow.draw(this.ctx));
    }
}
