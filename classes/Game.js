import { Enemy } from "./Enemy.js";

export class Game {
    constructor(context) {
        this.context = context;

        this.width = context.canvas.width;
        this.height = context.canvas.height;

        this.enemies = [];
    }


    gameLoop = () => {
        this.context.clearRect(0, 0, this.width, this.height);
        this.renderBackground();

        for (let enemy of this.enemies) {
            enemy.draw();
            enemy.move();
        }

        requestAnimationFrame(this.gameLoop)
    };


    startGame = () => {
        console.log("Got context form gameCanvas:", this.context);
        this.gameLoop();
    };

    renderBackground = () => {
        this.context.fillStyle = "#593";
        this.context.fillRect(0, 0, this.width, this.height);
    };

    spawnEnemy = () => {
        const newEnemy = new Enemy(this.context);
        this.enemies.push(newEnemy);
    }
}
