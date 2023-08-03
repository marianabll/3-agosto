var backgroundImage;
var database;
var form, game, player;
var track, car1, car2, car1_img, car2_img, cars = [];
var gameState, playerCount, allPlayers, moeda_img, tanque_img;
var moedas, tanques;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  track = loadImage("./assets/track.jpeg")
  car1_img = loadImage("./assets/car1.png")
  car2_img = loadImage("./assets/car2.png")
  moeda_img = loadImage('./assets/goldCoin.png')
  tanque_img = loadImage('./assets/fuel.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  
  game = new Game();
  game.getState();
  game.start(); //cria o formulário
}

function draw() {
  background(backgroundImage);

  if (playerCount === 2) {
    game.update(1)
  }

  if (gameState === 1) {
    game.play() //começa a corrida
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
