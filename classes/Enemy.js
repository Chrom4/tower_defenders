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

    // direction should object, like a vector
    // with direction: x or y
    // AND sense: + or -

    // because it has to calculate where to go first
    // based on the current enemy position and the next one
    // like the path logic; it has to know the axis that are equal
    // and the different ones to know where it should move

    // NOTES:
    // - Revisit the path logic and try to replicate here.
    // - eval() must do the trick if the vectors logic is implemented
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
        "----------\nthis[this.direction]:",
        this[this.direction],
        "\nenemyPosition:",
        enemyPosition,
        "\nthis.direction:",
        this.direction,
        "\nenemyPosition[this.direction]:",
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
