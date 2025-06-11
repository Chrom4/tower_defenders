import { Game } from "./classes/Game.js";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const spawnEnemyButton = document.getElementById("spawn-enemy");

spawnEnemyButton.onclick = () => { game.spawnEnemy() }

const game = new Game(context);


game.startGame();

game.spawnEnemy();
