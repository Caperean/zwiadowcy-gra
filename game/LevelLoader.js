import { Player } from "../objects/player.js";
import { Tile } from "../objects/tile.js";
import { Fire } from "../objects/fire.js";
import { Wolf } from "../objects/wolf.js";
import { BackgroundObject } from "../objects/BackgroundObject.js";
import { ExitGate } from "../objects/ExitGate.js";
import { level1 } from "../levels/level1.js";
import { Potion } from "../objects/Potion.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";
import { Apple } from "../objects/apple.js";
const levels = {
    "level1.js": level1
};

export class LevelLoader {
    /**
     * Loads a level from its name.
     * @param {string} levelName - The name of the level file.
     * @param {object} game - The game object, passed to the player.
     * @returns {{gameObjects: Array<object>, backgroundColor: string}} An object containing the loaded game objects and the background color.
     */
    static load(levelName, game) {
        const levelData = levels[levelName];
        if (!levelData) {
            console.error(`Level '${levelName}' not found.`);
            return { gameObjects: [], backgroundColor: "#000000" }; // Return a default color
        }

        const gameObjects = [];
        let player = null;

        // 1. Loading the tilemap 
        levelData.map.forEach((row, rowIndex) => {                         // bloki terenu
            for (let i = 0; i < row.length; i++) {
                const char = row[i];
                const tileX = i * TILE_WIDTH;
                const tileY = rowIndex * TILE_HEIGHT;

                if (char === "#") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "terrainblock"));
                } else if (char === "G") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "grass"));
                } else if (char === "R") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "rock"));
                } else if (char === "N") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "snow"));
                } else if (char === "I") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "ice"));
                } else if (char === "L") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "lava"));
                } else if (char === "W") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "water"));
                } else if (char === "S") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "spikes"));
                } else if (char === "M") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "magma"));
                }
            }
        });

        // 2. Loading background objects (bushes, trees)
        levelData.objects.forEach(objData => {                                                                //obiekty tła
            if (objData.type === "bush") {
                const bush = new BackgroundObject(objData.x, objData.y, objData.width, objData.height, "bush");
                gameObjects.push(bush);
            } else if (objData.type === "tree") {
                const tree = new BackgroundObject(objData.x, objData.y, objData.width, objData.height, "tree");
                gameObjects.push(tree);
            }
              else if (objData.type === "snowytree") {
                const snowytree = new BackgroundObject(objData.x, objData.y, objData.width, objData.height, "snowytree");
                gameObjects.push(snowytree);
            }
            else if (objData.type === "volcano") {
                const volcano = new BackgroundObject(objData.x, objData.y, objData.width, objData.height, "volcano");
                gameObjects.push(volcano);
            }
            else if (objData.type === "hill") {
                const hill = new BackgroundObject(objData.x, objData.y, objData.width, objData.height, "hill");
                gameObjects.push(hill);
            }
            
             
    });

        // 3. Loading the exit                                      // wyjście z serwera
        levelData.objects.forEach(objData => {
            if (objData.type === "exitGate") {
                const exitGate = new ExitGate(objData.x, objData.y, objData.width, objData.height);
                gameObjects.push(exitGate);
            }
        });

        // 4. Loading interactive objects, including the player and wolf
        levelData.objects.forEach(objData => {                              // obiekty interaktywne nie ruszać na razie
            if (objData.type === "player") {
                player = new Player(objData.x, objData.y, game);
                gameObjects.push(player);
            } else if (objData.type === "wolf" && player) {
                 const wolf = new Wolf(objData.x, objData.y, player, game);
                 gameObjects.push(wolf);
            } else if (objData.type === "fire") {
                const fire = new Fire(objData.x, objData.y);
                gameObjects.push(fire);
            }  else if (objData.type === "apple") { // <--- Dodaj tę logikę
                const apple = new Apple(objData.x, objData.y, game);
                gameObjects.push(apple);
              } else if (objData.type === "greenpot") { 
                const greenPot = new Potion(objData.x, objData.y, "green");
                gameObjects.push(greenPot);
            } else if (objData.type === "bluepot") { 
                const bluePot = new Potion(objData.x, objData.y, "blue");
                gameObjects.push(bluePot);
            }    
            }
        });

        return { gameObjects, backgroundColor: levelData.backgroundColor };
    }
}
