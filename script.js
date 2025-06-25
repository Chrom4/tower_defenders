import { Game } from "./classes/Game.js";
import * as toolBarHandler from "./handlers/toolbarHandler.js";
import * as mapSelectorHandler from "./handlers/mapSelectorHandler.js";


export const renderGameOverScreen = (game) => {
  const gameContent = document.getElementById("game");
  const toolbar = document.getElementById("toolbar");

  toolbar.innerHTML = "";

  const gameOverModal = document.createElement("div");
  const resetGameButton = document.createElement("button");
  resetGameButton.textContent = "Tentar Novamente";
  resetGameButton.id = "reset-game";
  resetGameButton.onclick = () => {
    location.reload();
  };
  gameOverModal.className = "game-over-modal";

  gameOverModal.innerHTML = "Game Over";
  gameOverModal.appendChild(resetGameButton);

  gameContent.appendChild(gameOverModal);
};

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const game = new Game(context);

toolBarHandler.startToolbar(game);
mapSelectorHandler.renderMapList(game);

game.start();
