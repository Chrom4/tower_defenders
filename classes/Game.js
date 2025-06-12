import { statsBarUpdate } from "../handlers/statsbarHandler.js";
import { Enemy } from "./Enemy.js";

export class Game {
  constructor(context) {
    this.context = context;
    this.isRunning = false;

    this.width = context.canvas.width;
    this.height = context.canvas.height;

    this.enemies = [];
    this.path = [{ x: 10, y: 50 }];
  }

  gameLoop = () => {
    this.context.clearRect(0, 0, this.width, this.height);
    this.renderBackground();

    for (let enemy of this.enemies) {
      enemy.render();
      enemy.move();
    }

    statsBarUpdate(this);
    requestAnimationFrame(this.gameLoop);
  };

  startGame = () => {
    console.log("=========== GAME STARTED ===========", this.context);
    this.isRunning = true;
    this.gameLoop();
  };

  renderBackground = () => {
    this.context.fillStyle = "#593";
    this.context.fillRect(0, 0, this.width, this.height);
  };

  spawnEnemy = () => {
    const newEnemy = new Enemy(this.context);
    this.enemies.push(newEnemy);
  };

  despawnEnemy = () => {
    if (this.enemies.length) {
      this.enemies.at(-1).destroy();
      this.enemies.pop();
    }
  };
}
