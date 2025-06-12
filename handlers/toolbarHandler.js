export const startToolbar = (game) => {
  const startGameButton = document.getElementById("start-game");
  if (game.isRunning) startGameButton.style.display = "none";
  startGameButton.onclick = () => {
    game.startGame();
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
