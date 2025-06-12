export class Enemy {
  constructor(context) {
    this.context = context;

    this.width = 40;
    this.height = 40;

    this.x = 50;
    this.y = 50;

    this.color = "#f00";
    this.speed = 2;
  }

  render = () => {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  move = () => {
    const { right: limitRight } = this.context.canvas.getBoundingClientRect();

    if (this.x + this.width >= limitRight) {
    } else {
      // this.x += this.speed;
    }
  };

  destroy = () => {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  };
}
