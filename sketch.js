function setup() {
  frameRate();
  createCanvas(window.innerWidth, window.innerHeight);
  background(200);
  // drawCube();
  // button = createButton("scramble");
  // button.mousePressed(scramble(40));
  // button.position(400, 400);
  for (let i = 0; i < 40; i++) {
    // scramble(1);
  }
}
// console.log(moves);
let d = 0;
function draw() {
  drawCube();
  if (!checkCross()) {
    scramble(1);
    edges("white");
  }
  if (d > depth) {
    console.log("test");
    noLoop();
  }
  d++;
  if (arrays.length > 10000) noLoop();
}

const drawCube = () => {
  let sqWidth = 100;
  for (let i = 0; i < cube.length; i++) {
    rectMode(CORNER);
    let sideText = ["Top", "Face", "Bottom", "Back", "Right", "Left"];
    fill("black");
    textSize(30);
    text(sideText[i], 113 + i * 305, 350);
    for (let j = 0; j < cube[i].length; j++) {
      rectMode(CORNER);
      let y;
      if (j < 3) {
        y = 0;
      } else if (j < 6) {
        y = 100;
      } else if (j < 9) {
        y = 200;
      }
      fill(arrays[d][i][j]);
      rect((j % 3) * sqWidth + i * 305, y, sqWidth);
    }
  }
};
