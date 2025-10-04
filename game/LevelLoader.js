import { Player } from "../objects/player.js";
import { Tile } from "../objects/tile.js";
import { Fire } from "../objects/fire.js";
import { Wolf } from "../objects/wolf.js";
import { BackgroundObject } from "../objects/BackgroundObject.js";
import { ExitGate } from "../objects/ExitGate.js";
import { Potion } from "../objects/Potion.js";
import { TILE_WIDTH, TILE_HEIGHT } from "../engine/Constants.js";
import { Apple } from "../objects/apple.js";
import { allLevels } from "../levels/levels.js"; // Zmiana tutaj!
import { Mage } from "../objects/Mage.js";
import { Bat } from "../objects/Bat.js"; // <--- Nowy import
import { Arab } from "../objects/Arab.js"; // Nowy import
import { Clown } from "../objects/Clown.js";
import { Mask } from "../objects/Mask.js";

export class LevelLoader {
    /**
     * Loads a level from its name.
     * @param {string} levelName - The name of the level file.
     * @param {object} game - The game object, passed to the player.
     * @returns {{gameObjects: Array<object>, backgroundColor: string}} An object containing the loaded game objects and the background color.
     */
    static load(levelName, game) {
        const levelData = allLevels.find(level => level.name === levelName); // Zmiana tutaj!
        if (!levelData) {
            console.error(`Level '${levelName}' not found.`);
            return { gameObjects: [], backgroundColor: "#000000" }; // Return a default color
        }

        const gameObjects = [];
        let player = null;

        // 1. Loading the tilemap 
        levelData.data.map.forEach((row, rowIndex) => {                         // bloki terenu
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
                 else if (char === "P") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "sand"));
                } else if (char === "A") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "marble"));
                }else if (char === "C") {
                    gameObjects.push(new Tile(tileX, tileY, TILE_WIDTH, TILE_HEIGHT, "bricks"));
                }
            }
        });

        // 2. Loading background objects (bushes, trees)
        levelData.data.objects.forEach(objData => {                                                                //obiekty tła
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
             else if (objData.type === "cactus") {
                const cactus = new BackgroundObject(objData.x, objData.y, objData.width, objData.height, "cactus");
                gameObjects.push(cactus);
            }
             
    });

        // 3. Loading the exit                                      // wyjście z serwera
        levelData.data.objects.forEach(objData => {
            if (objData.type === "exitGate") {
                const exitGate = new ExitGate(objData.x, objData.y, objData.width, objData.height);
                gameObjects.push(exitGate);
            }
        });

        // 4. Loading interactive objects, including the player and wolf
        levelData.data.objects.forEach(objData => {                              // obiekty interaktywne nie ruszać na razie
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
             else if (objData.type === "mage") {
                const mage = new Mage(objData.x, objData.y, game);
                gameObjects.push(mage);
            } else if (objData.type === "bat") { // <--- Dodaj logikę dla nietoperza
                const bat = new Bat(objData.x, objData.y, game);
                gameObjects.push(bat);
            } else if (objData.type === "arab") { // <--- Dodaj tę logikę
                const arab = new Arab(objData.x, objData.y, game);
                gameObjects.push(arab);
            } else if (objData.type === \"clown\") 
               const clown = new Clown(objData.x, objData.y, game);
               gameObjects.push(clown);
        
}
            
        });

        return { gameObjects, backgroundColor: levelData.data.backgroundColor };
    }
}
