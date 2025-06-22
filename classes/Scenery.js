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
      size: 100,
      coord: [],
    };
  }

  renderBackground = () => {
    this.context.fillStyle = this.grass.color;
    this.context.fillRect(0, 0, this.width, this.height);
  };

  renderGrid = () => {
    for (let i = 0; i < 8; i++) {
      this.context.fillStyle = "#fff";
      this.context.fillRect(i * 100, 0, 1, this.height);
    }
    for (let i = 0; i < 6; i++) {
      this.context.fillStyle = "#fff";
      this.context.fillRect(0, i * 100, this.width, 1);
    }
  };

  renderPath = (path) => {
    this.path.coord = path;

    for (const index in this.path.coord) {
      const coord = this.path.coord[index];
      const nextCoord = this.path.coord[parseInt(index) + 1];

      let width, height;

      let x = coord.x;
      let y = coord.y;

      if (nextCoord && nextCoord.x === coord.x) {
        width = this.path.size;
        height = nextCoord.y - coord.y;

        x -= 100;
        if (height > 0) {
          y += 100;
        }
      } else if (nextCoord && nextCoord.y === coord.y) {
        width = nextCoord.x - coord.x;
        height = this.path.size;
        if (width < 0) {
          x -= 100;
        }
      }

      this.context.fillStyle = this.path.color;
      this.context.fillRect(x, y, width, height);
    }
  };
}
