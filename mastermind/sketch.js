const WIDTH = 400;
const HEIGHT = 800;

var BACKGROUNDCOLOUR;

var RED;
var BLUE;
var GREEN;
var YELLOW;
var colours;

const NUMCOLOURS = 4;

class GameState {
  static MENU = new GameState(0);
  static GAME = new GameState(1);

  constructor(val) {
    this.id = val;
  }

  getState() {
    return id;
  }

  id;
};

var currentState;

var debugText = "";

var difficultyFactor = 0;

var correctColours;

function defineGlobals() {
  currentState = GameState.MENU;
  RED = color(255, 0, 0);
  GREEN = color(0, 255, 0);
  BLUE = color(0, 0, 255);
  YELLOW = color(255, 255, 0);
  colours = [RED, BLUE, GREEN, YELLOW];
  BACKGROUNDCOLOUR = color(0);
}

function drawMenu() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(20);
  text("New Game", 200, 200);

  rect(100, 300, 200, 100);
  rect(100, 400, 200, 100);
  rect(100, 500, 200, 100);
  push();
  {
    fill(0);
    text("Easy", 200, 350)
    text("Medium", 200, 450)
    text("Hard", 200, 550)
  }
  pop();
}

function setupGame() {
  correctColours = new Array(difficultyFactor);

  for (let i = 0; i < difficultyFactor; i++) {
    correctColours[i] = floor(random(0, NUMCOLOURS));
  }

}


function drawGame() {
  let xVal = 100;
  let offsetVal = 200 / (difficultyFactor - 1);
  for (let i = 0; i < difficultyFactor; i++) {
    fill(colours[correctColours[i]]);
    circle(xVal, 200, 30);
    xVal = xVal + offsetVal;
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  defineGlobals();
}

function draw() {
  background(BACKGROUNDCOLOUR);
  if (currentState == GameState.MENU) {
    drawMenu();
  }
  if (currentState == GameState.GAME) {
    drawGame();
  }
  push();
  {
    fill(255, 0, 0);
    text(debugText, WIDTH / 2, HEIGHT - 100);
  }
  pop();
}


function mouseClicked() {
  if (currentState == GameState.MENU) {
    if (((mouseX > 100) && (mouseX < 300)) && ((mouseY > 300) && (mouseY < 600))) {
      let y = floor((mouseY - 300) / 100);
      switch (y) {
        case 0:
          difficultyFactor = 4;
          break;
        case 1:
          difficultyFactor = 5;
          break;
        case 2:
          difficultyFactor = 6;
          break;

        default:
          return;
      }
      currentState = GameState.GAME;
      setupGame();
    }
  }
}

function keyPressed() {
  if (key == 'r') {
    setup();
  }
}
