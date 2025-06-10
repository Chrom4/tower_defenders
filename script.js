const startGame = () => {
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");

  console.log("Got context form gameCanvas:", context);

  renderBackground(context);
};

const renderBackground = (context) => {
  context.fillStyle = "#0f0";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.fillStyle = "#f00";
  context.fillRect(50, 50, 40, 40);
};

const gameLoop = (context) => {

};

startGame();
