const toogleButton = (button, condition) => {
  if (condition) {
    button.style.display = "none";
  } else {
    button.style.display = "flex";
  }
};

export const toolbarUpdate = (game) => {
  toogleButton(document.getElementById("start-game"), game.isRunning);
  toogleButton(document.getElementById("pause-game"), !game.isRunning);
};

export const startToolbar = (game) => {
  const startButton = document.getElementById("start-game");
  startButton.onclick = () => {
    game.start();
  };

  const pauseButton = document.getElementById("pause-game");
  pauseButton.onclick = () => {
    game.pause();
  };

  const spawnEnemyButton = document.getElementById("spawn-enemy");
  const despawnEnemyButton = document.getElementById("despawn-enemy");

  spawnEnemyButton.onclick = () => {
    game.spawnEnemy();
  };
  despawnEnemyButton.onclick = () => {
    game.despawnEnemy();
  };
};
