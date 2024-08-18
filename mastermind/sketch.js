const WIDTH = 400;
const HEIGHT = 800;

var BACKGROUNDCOLOUR;

var RED;
var BLUE;
var GREEN;
var YELLOW;
var WHITE;
var BLACK;
var PURPLE;
var OFFWHITE;
var ORANGE;
var colours;

const NUMCOLOURS = 4;

const MAXROUNDS = 10;

var debugMode = false;

class GameState {
  static MENU = new GameState(0);
  static GAME = new GameState(1);
  static END = new GameState(2);

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

var selectedColours;

var pips;
var pipColours;

var roundCounter;

var colourIndex = 0;

function defineGlobals() {
  textFont("Bahnschrift");
  currentState = GameState.MENU;
  RED = color(255, 0, 0);
  GREEN = color(0, 255, 0);
  BLUE = color(0, 0, 255);
  YELLOW = color(255, 255, 0);
  WHITE = color(255);
  BLACK = color(0);
  PURPLE = color(107, 22, 162);
  OFFWHITE = color(200);
  ORANGE = color(255, 149, 0)
  colours = [RED, BLUE, GREEN, YELLOW, OFFWHITE];
  pipColours = [BLACK, OFFWHITE, RED];
  BACKGROUNDCOLOUR = color(0x12);
  roundCounter = 0;
  colourIndex = 0;
}

function drawMenu() {
  fill(PURPLE);
  textSize(50);
  text("New Game", 200, 200);

  fill(GREEN);
  rect(100, 300, 200, 100, 25, 25, 0, 0);
  fill(ORANGE);
  rect(100, 400, 200, 100);
  fill(RED);
  rect(100, 500, 200, 100, 0, 0, 25, 25);
  push();
  {
    fill(BLACK);
    textFont("Comic Sans MS")
    text("Easy", 200, 350);
    textFont("Bahnschrift")
    text("Medium", 200, 450);
    textFont("Chiller")
    text("Hard", 200, 550);
  }
  pop();
}

function setupGame() {
  correctColours = new Array(difficultyFactor);

  for (let i = 0; i < difficultyFactor; i++) {
    correctColours[i] = floor(random(0, NUMCOLOURS));
  }
  selectedColours = new Array(MAXROUNDS);
  pips = new Array(MAXROUNDS);
  for (let i = 0; i < MAXROUNDS; i++) {
    selectedColours[i] = new Array(difficultyFactor);
    pips[i] = new Array(difficultyFactor);
    for (let j = 0; j < difficultyFactor; j++) {
      selectedColours[i][j] = NUMCOLOURS;
    }
    for (let j = 0; j < difficultyFactor; j++) {
      pips[i][j] = 0;
    }
  }
}

function clearSelectedColours() {
  for (let i = 0; i < difficultyFactor; i++) {
    selectedColours[roundCounter][i] = NUMCOLOURS;
  }
  colourIndex = 0;
}

function selectColour(colourVal) {
  if (colourIndex == difficultyFactor) {
    return;
  }
  selectedColours[roundCounter][colourIndex++] = colourVal;
}

function checkColours() {
  let correct = true;
  let whitePips = 0;
  let redPips = 0;
  for (let i = 0; i < difficultyFactor; i++) {
    if (selectedColours[roundCounter][i] != correctColours[i]) {
      correct = false;
      for (let j = 0; j < difficultyFactor; j++) {
        if (i != j) {
          if (selectedColours[roundCounter][j] == correctColours[i]) {
            whitePips++;
            break;
          }
        }
      }
    }
    else {
      redPips++;
    }
  }
  if (!correct) {
    // check for end
    let index = 0;
    for (let i = 0; i < redPips; i++) {
      pips[roundCounter][index++] = 2;
    }
    for (let i = 0; i < whitePips; i++) {
      pips[roundCounter][index++] = 1;
    }
    return;
  }
  currentState = GameState.END;

}
function drawGame() {
  if (debugMode) {
    let xVal = 50;
    let offsetVal = 200 / (difficultyFactor - 1);
    for (let i = 0; i < difficultyFactor; i++) {
      fill(colours[correctColours[i]]);
      circle(xVal, 550, 30);
      xVal = xVal + offsetVal;
    }
  }
  for (let j = 0; j < roundCounter + 1; j++) {
    {
      let xVal = 50;
      let offsetVal = 200 / (difficultyFactor - 1);
      for (let i = 0; i < difficultyFactor; i++) {
        fill(colours[selectedColours[j][i]]);
        circle(xVal, 150 + (j * 35), 30);
        xVal = xVal + offsetVal;
      }
    }
    {
      let xVal = 300;
      let offsetVal = 75 / difficultyFactor - 1;
      for (let i = 0; i < difficultyFactor; i++) {
        fill(pipColours[pips[j][i]]);
        circle(xVal, 150 + (j * 35), 10);
        xVal = xVal + offsetVal;
      }
    }
  }
  let xVal = 50;
  let offsetVal = 300 / (3);
  for (let i = 0; i < NUMCOLOURS; i++) {
    fill(colours[i]);
    circle(xVal, HEIGHT - 150, 100);
    xVal = xVal + offsetVal;
  }
  push();
  {
    fill(OFFWHITE);
    rect(0, HEIGHT - 100, 200, 100, 75);
    if (colourIndex == difficultyFactor) {
      fill(PURPLE);
    }

    rect(200, HEIGHT - 100, 200, 100, 75);
    fill(BLACK);
    textSize(50);
    text("Clear", 100, HEIGHT - 50);
    text("Enter", 300, HEIGHT - 50);
  }
  pop();
}

function drawEnd() {
  background(GREEN);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  textAlign(CENTER, CENTER);
  defineGlobals();
}

function draw() {
  background(BACKGROUNDCOLOUR);
  textSize(65);
  push();
  {
    textStyle(ITALIC)
    fill(RED);
    text("Main🧠Mind", 200, 80);
  }
  pop();
  if (currentState == GameState.MENU) {
    drawMenu();
  }
  else if (currentState == GameState.GAME) {
    drawGame();
  }
  else if (currentState == GameState.END) {
    drawEnd();
  }
  push();
  if (debugMode) {
    fill(RED);
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
          if ((roundCounter != MAXROUNDS - 1) && (colourIndex == difficultyFactor)) {
            checkColours();
            roundCounter++;
            colourIndex = 0;
          }
        }
        else {
          clearSelectedColours();
        }
      }
      else {
        let button = floor(mouseX / 100);
        switch (button) {
          case 0:
            selectColour(0);
            break;
          case 1:
            selectColour(1);
            break;
          case 2:
            selectColour(2);
            break;
          case 3:
            selectColour(3);
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
  if (key == 'D') {
    if (!debugMode) {
      debugMode = true;
    }
    else {
      debugMode = false;
    }
  }
}
