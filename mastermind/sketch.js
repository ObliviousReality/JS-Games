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
  xVal = 50;
  offsetVal = 300 / (3);
  for (let i = 0; i < NUMCOLOURS; i++) {
    fill(colours[i]);
    circle(xVal, HEIGHT - 150, 100);
    xVal = xVal + offsetVal;
  }
  push();
  {
    fill(128);
    rect(0, HEIGHT - 100, 200, 100, 75);
    fill(107, 22, 162);
    rect(200, HEIGHT - 100, 200, 100, 75);
    fill(0);
    textSize(50);
    text("Clear", 100, HEIGHT - 50);
    text("Enter", 300, HEIGHT - 50);
  }
  pop();
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
  else if (currentState == GameState.GAME) {
    if (mouseY > HEIGHT - 200) {
      if (mouseY > HEIGHT - 100) {
        if (mouseX > 200) {
          debugText = "Enter";
        }
        else {
          debugText = "Clear";
        }
      }
      else {
        let button = floor(mouseX / 100);
        switch (button) {
          case 0:
            debugText = "RED";
            break;
          case 1:
            debugText = "GREEN";
            break;
          case 2:
            debugText = "BLUE";
            break;
          case 3:
            debugText = "YELLOW";
            break;

          default:
            break;
        }
      }
    }

  }
}

function keyPressed() {
  if (key == 'r') {
    setup();
  }
  if (key == 'c') {
    debugText = "";
  }
}
