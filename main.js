import { Game } from "./game/Game.js";

const canvas = document.getElementById("gameCanvas");
const game = new Game(canvas);

let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(gameLoop);
}

gameLoop(0);
