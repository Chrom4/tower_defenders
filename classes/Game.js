import { statsBarUpdate } from "../handlers/statsbarHandler.js";
import { toolbarUpdate } from "../handlers/toolbarHandler.js";
import { Enemy } from "./Enemy.js";
import { Scenery } from "./Scenery.js";

export class Game {
  constructor(context) {
    this.context = context;
    this.isRunning = false;

    this.width = context.canvas.width;
    this.height = context.canvas.height;

    this.enemies = [];
    this.path = [
      { x: 0, y: 100 },
      { x: 400, y: 100 },
      { x: 400, y: 300 },
      { x: 200, y: 300 },
      { x: 200, y: 500 },
      { x: 600, y: 500 },
      { x: 600, y: 100 },
      { x: 800, y: 100 },
    

    ];
    // [
    //   { x: 0, y: 200 },
    //   { x: 100, y: 200 },
    //   { x: 300, y: 200 },
    //   { x: 300, y: 400 },
    //   { x: 500, y: 400 },
    //   { x: 500, y: 300 },
    //   { x: 600, y: 300 },
    //   { x: 600, y: 100 },
    //   { x: 800, y: 100 },
    // ]
  }

  gameLoop = () => {
    this.context.clearRect(0, 0, this.width, this.height);
    this.render();
    this.update();
    requestAnimationFrame(this.gameLoop);
  };

  update = () => {
    statsBarUpdate(this);
    toolbarUpdate(this);
  };

  startGame = () => {
    console.log("=========== GAME STARTED ===========", this.context);
    this.isRunning = true;
    this.gameLoop();
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

  render = () => {
    const scenery = new Scenery(this.context);

    scenery.renderBackground();
    // scenery.renderGrid();
    scenery.renderPath(this.path);

    for (let enemy of this.enemies) {
      enemy.render();
      enemy.move();
    }
  };
}
