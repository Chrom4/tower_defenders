const enemyCountUpdate = (enemies) => {
  const enemyCount = document.getElementById("enemy-count");
  if (enemyCount.firstChild) enemyCount.removeChild(enemyCount.firstChild);
  enemyCount.appendChild(document.createTextNode(enemies));
};

export const statsBarUpdate = (game) => {
  enemyCountUpdate(game.enemies.length);
};
