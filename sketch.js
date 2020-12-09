let solved_cross;

function setup() {
  frameRate(60);
  createCanvas(window.innerWidth, window.innerHeight);
  background(200);
  // drawCube();
  // button = createButton("scramble");
  // button.mousePressed(scramble(40));
  // button.position(400, 400);
  solved_cross = false;
  for (let i = 0; i < 20; i++) {
    scramble(1);
  }
}
// console.log(moves);
let d = 0;
function draw() {
  drawCube();
  // console.log(solved_cross)
  if (!solved_cross) {
    // noLoop();
    white_cross("white");
    // line_edges_up()
  }
  if (solved_cross) {
    // console.log(cube);
  }
  // moveList("F R U' R' U' R U R' F' R U R' U' R' F R F'");
  // scramble(1)
  // edges("white");
  // scramble(1);
  if (pink_check()) {
    // console.log("break");
    // noLoop();
  }
  if (d >= depth) {
    // noLoop();
  } else {
    d++;
  }
  if (arrays.length > 10000) noLoop();
}

const pink_check = () => {
  cub = cube.map((arr) => arr.slice());
  return (
    (cub[2][7] === "pink" && cub[1][7] !== "purple") ||
    (cub[2][5] === "pink" && cub[4][7] !== "purple") ||
    (cub[2][1] === "pink" && cub[3][7] !== "purple") ||
    (cub[2][3] === "pink" && cub[5][7] !== "purple")
  );
};
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
      // if (pink_check() && i == "test") {
      //   console.log(d);
      //   fill(cube[i][j]);
      //   rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      //   noLoop();
      //   break;
      // } else {
      if (arrays[d][i][j] == "white_0") {
        fill("pink");
        rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      } else {
        fill(arrays[d][i][j]);
        rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      }
    }
  }
};
