const enemyCountUpdate = (enemies) => {
  const enemyCount = document.getElementById("enemy-count");
  if (enemyCount.firstChild) enemyCount.removeChild(enemyCount.firstChild);
  enemyCount.appendChild(document.createTextNode(enemies));
};

export const statsBarUpdate = (game) => {
  enemyCountUpdate(game.enemies.size);
};

export const healthBarUpdate = (games) => {
  const healthBar = document.getElementById("healthbar");
  healthBar.innerHTML = "";

  let healthPoints = games.health;

  console.log(healthPoints)
  for (let i = 0; i < 5; i++) {
    const heartImage = document.createElement("img");
    heartImage.src = "./assets/images/heart.png";


    heartImage.className = healthPoints ? "active" : "inactive";
    healthBar.appendChild(heartImage);

    if (healthPoints != 0) healthPoints--;
  }
};
