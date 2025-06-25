import {
  healthBarUpdate,
  statsBarUpdate,
} from "../handlers/statsbarHandler.js";
import { toolbarUpdate } from "../handlers/toolbarHandler.js";
import { renderGameOverScreen } from "../script.js";
import { Enemy } from "./Enemy.js";
import { Scenery } from "./Scenery.js";
import maps from "../assets/maps/coordinates.json" with {type: "json"};

export class Game {
  constructor(context) {
    this.context = context;

    this.health = 5;

    this.isRunning = false;

    this.width = context.canvas.width;
    this.height = context.canvas.height;

    this.enemies = new Map();
    this.map = maps[0];
    this.allMaps = maps;
  }

  gameLoop = () => {
    if (this.health <= 0) {
      this.gameOver();
      return;
    }
    if (!this.isRunning) {
      toolbarUpdate(this);
      return;
    }
    this.context.clearRect(0, 0, this.width, this.height);
    this.render();
    this.update();
    requestAnimationFrame(this.gameLoop);
  };

  start = () => {
    console.log("=========== GAME STARTED ===========", this.context);
    this.isRunning = true;
    this.gameLoop();
  };

  pause = () => {
    this.isRunning = false;
  };

  gameOver = () => {
    this.isRunning = false;
    renderGameOverScreen(this);
  };

  spawnEnemy = () => {
    const enemyId = this.enemies.size
      ? Math.max(...this.enemies.keys()) + 1
      : 0;
    const newEnemy = new Enemy(enemyId, this.context);
    newEnemy.spawn(this);
    this.enemies.set(enemyId, newEnemy);
  };

  despawnEnemy = (id) => {
    if (this.enemies.size) {
      this.enemies.get(id).destroy();
      this.enemies.delete(id);
    }
  };

  enemyArrived = (id) => {
    this.health -= 1;
    this.despawnEnemy(id);
  };

  update = () => {
    statsBarUpdate(this);
    toolbarUpdate(this);
    healthBarUpdate(this);
  };

  changeMap = (id) => {
    this.health = 5;
    this.enemies = new Map();
    this.map = maps[id];
  };

  render = () => {
    const scenery = new Scenery(this.context);

    scenery.renderBackground();
    // scenery.renderGrid();
    scenery.renderMap(this.map);

    this.enemies.forEach((enemy) => {
      enemy.render(this);
      enemy.move(this);
    });
  };
}
