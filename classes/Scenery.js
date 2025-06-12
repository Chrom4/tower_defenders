export class Scenery {
  constructor(context) {
    this.context = context;

    this.width = context.canvas.width;
    this.height = context.canvas.height;

    this.grass = {
      color: "#593",
    };

    this.path = {
      color: "#aaa",
      size: 60,
      coord: [],
    };
  }

  renderBackground = () => {
    this.context.fillStyle = this.grass.color;
    this.context.fillRect(0, 0, this.width, this.height);
  };

  renderPath = (path) => {
    this.path.coord = path;

    this.path.coord.forEach((coord, index) => {
      this.context.fillStyle = this.path.color;

      const nextCoord = this.path.coord[index + 1];

      let width, height;

      if (nextCoord.y === coord.y) {
      } else if (nextCoord.x === coord.x) {
      }

      this.context.fillRect(coord.x, coord.y, this.path.width, 10);
    });
  };
}
