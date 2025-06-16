import { changeDirections } from "../helpers/enemyHelper.js";

export class Enemy {
  constructor(context) {
    this.context = context;

    this.width = 40;
    this.height = 40;

    this.x = 0;
    this.y = 0;

    this.color = "#f00";
    this.speed = 2;
    this.direction = null;
  }

  spawn = (game) => {
    let startCoord = { ...game.path[0] };
    let nextCoord = { ...game.path[1] };

    if (!nextCoord) {
      console.error("Invalid Path.");
      return;
    }

    this.x = startCoord.x;
    this.y = startCoord.y;

    if (this.x != nextCoord.x) {
      this.direction = "x";
      this.y += 50 - this.height / 2;
    } else if (this.y != nextCoord.y) {
      this.direction = "y";
      this.x -= 50 + this.width / 2;
      this.y += 100;
    }

    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  render = (game) => {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  move = (game) => {
    const path = game.path.slice(1);

    const xDestiny = game.width;
    const yDestiny = game.height;

    if (this.x >= xDestiny || this.y >= yDestiny) {
      console.log("Chegou!");
      // this is despawning all the enemies when just one arrives
      // maybe because of the calls to the function, apperantly it calls
      // multiple times
      game.despawnEnemy();
    } else {
      const enemyPosition = path.find(
        (coord) => coord[this.direction] >= this[this.direction]
      );
      const enemySize = this.direction === "x" ? "width" : "height";

      console.log(
        "this[this.direction]:",
        this[this.direction],
        "enemyPosition:",
        enemyPosition,
        "this.direction:",
        this.direction,
        "enemyPosition[this.direction]:",
        enemyPosition[this.direction]
      );

      if (
        this[this.direction] + this[enemySize] / 2 >=
        enemyPosition[this.direction] - 50
      ) {
        this.direction = changeDirections(this.direction);
        // this.speed = 0;
      }

      this[this.direction] += this.speed;
    }
  };

  destroy = () => {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  };
}
