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
    this.path =
    [
      {x: 400, y: -100},
      {x: 400, y: 100},
      {x: 600, y: 100},
      {x: 600, y: 300},
      {x: 400, y: 300},
      {x: 400, y: 500},
    ]
    // [
    //   { x: 0, y: 100 },
    //   { x: 400, y: 100 },
    //   { x: 400, y: 300 },
    //   { x: 200, y: 300 },
    //   { x: 200, y: 500 },
    //   { x: 600, y: 500 },
    //   { x: 600, y: 100 },
    //   { x: 800, y: 100 },
    // ];
    // [
    //   { x: 0, y: 200 },
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

  spawnEnemy = () => {
    const newEnemy = new Enemy(this.context);
    newEnemy.spawn(this);
    this.enemies.push(newEnemy);
  };

  despawnEnemy = () => {
    console.log("here")
    if (this.enemies.length) {
      this.enemies.at(-1).destroy();
      this.enemies.pop();
    }
  };

  update = () => {
    statsBarUpdate(this);
    toolbarUpdate(this);
  };

  render = () => {
    const scenery = new Scenery(this.context);

    scenery.renderBackground();
    scenery.renderGrid();
    scenery.renderPath(this.path);

    for (let enemy of this.enemies) {
      enemy.render(this);
      enemy.move(this);
    }
  };
}
