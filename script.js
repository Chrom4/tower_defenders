import { Game } from "./classes/Game.js";
import * as toolBarHandler from "./handlers/toolbarHandler.js";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const game = new Game(context);

toolBarHandler.startToolbar(game);

game.startGame();
