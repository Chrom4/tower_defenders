export class Enemy {
  constructor(context) {
    this.context = context;

    this.width = 40;
    this.height = 40;

    this.x = 0;
    this.y = 0;

    this.color = "#f00";
    this.speed = 2;
    this.direction = "x";
  }

  spawn = (game) => {
    let startPoint = { ...game.path[0] };

    this.x = startPoint.x;
    this.y = startPoint.y;

    if (this.direction == "x") {
      this.y += 50 - this.height / 2;
    } else if (this.direction == "y") {
      this.x += 50 - this.width / 2;
    }

    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  render = (game) => {
    // if (this.direction == "x") {
    //   this.y += 50 - this.height / 2;
    // } else if (this.direction == "y") {
    //   this.x += 50 - this.width / 2;
    // }

    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  move = (game) => {
    const path = game.path;
    const { right: destiny } = this.context.canvas.getBoundingClientRect();

    console.log(this.x, this.width, destiny);

    if (this.x + this.width >= destiny) {
      console.log("Chegou!")
      // this is despawning all the enemies when just one arrives
      // maybe because of the calls to the function, apperantly it calls 
      // multiple times
      game.despawnEnemy();
    } else {
      this.x += this.speed;
    }
  };

  destroy = () => {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  };
}
