const PATH_MARGIN = 50;

export class Enemy {
  constructor(context) {
    this.context = context;

    this.width = 40;
    this.height = 40;

    this.x = 0;
    this.y = 0;

    this.color = "#f00";
    this.traveled = 0;

    // I decided to treat my moviment logic
    // like vectors, with magnitude (speed),
    // direction (x or y), and
    this.speed = 4;
    this.direction = null;
    this.target = null;
    this.sense = null;

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
      this.y += PATH_MARGIN - this.height / 2;
    } else if (this.y != nextCoord.y) {
      this.direction = "y";
      this.x -= PATH_MARGIN + this.width / 2;
      this.y += 100;
    }

    this.sense =
      nextCoord[this.direction] > startCoord[this.direction] ? "+" : "-";

    this.changeTarget(game.path);

    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  render = (game) => {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  changeTarget = (path) => {
    const enemySize = this[this.direction === "x" ? "width" : "height"];
    const enemyCenter = this[this.direction] + enemySize / 2;

    this.traveled += 1;

    let nextPath = path[this.traveled];
    let lastPath = false;

    if (!nextPath) {
      nextPath = path[this.traveled - 1];
      lastPath = true;
    }

    this.sense = enemyCenter < nextPath[this.direction] ? "+" : "-";

    let nextCheckpoint = nextPath[this.direction] - enemyCenter - PATH_MARGIN;

    if (this.direction === "y") {
      nextCheckpoint += 2 * PATH_MARGIN;
    }

    console.log(nextPath, lastPath);
    if (lastPath) {
      if (this.sense === "+") nextCheckpoint += PATH_MARGIN + enemySize;
      else nextCheckpoint -= PATH_MARGIN + enemySize;
    }
    console.log(nextCheckpoint);

    this.target = Math.abs(nextCheckpoint);
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
      // console.log(
      //   "----------\nthis[this.direction]:",
      //   this[this.direction],
      //   "\nthis.target:",
      //   this.target,
      //   "\nsense:",
      //   this.sense,
      //   "\nthis.direction:",
      //   this.direction
      // );

      if (this.target <= 0) {
        this.direction = this.direction === "x" ? "y" : "x";
        console.log("changed -> ", this.direction);
        this.changeTarget(path);
        // this.speed = 0;
      }

      console.log(this.target);

      const step = this.sense === "+" ? this.speed : -this.speed;
      this[this.direction] += step;
      this.target -= this.speed;
    }
  };

  destroy = () => {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  };
}
