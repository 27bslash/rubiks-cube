let solved_cross;
function setup() {
  frameRate(6000);
  createCanvas(window.innerWidth, window.innerHeight);
  background(200);
  // drawCube();
  // button = createButton("scramble");
  // button.mousePressed(scramble(40));
  // button.position(400, 400);
  solved_cross = false;
  for (let i = 0; i < 20; i++) {
    if (!testing) {
      scramble(1);
    }
  }
}
// console.log(moves);
let d = 0;
function draw() {
  drawCube();
  // console.log(solved_cross)
  if (!testing) {
    if (!solved_cross) {
      // noLoop();
      white_cross("white");
      // line_edges_up()
    }
    if (solved_cross) {
      // console.log(cube);
      solve_corners();
    }
  }
  // moveList("F R U' R' U' R U R' F' R U R' U' R' F R F'");
  // scramble(1)
  // edges("white");
  // scramble(1);
  if (pink_check()) {
    console.log("break");
    console.log(moves);
    noLoop();
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
  // return (
  //   (cub[2][7] === "pink" && cub[1][7] !== "purple") ||
  //   (cub[2][5] === "pink" && cub[4][7] !== "purple") ||
  //   (cub[2][1] === "pink" && cub[3][7] !== "purple") ||
  //   (cub[2][3] === "pink" && cub[5][7] !== "purple")
  // );
  return cub[2][0] === "white_0" && !cub[5][8].includes("blue");
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
      // if (arrays[d][i][j] == "white_0") {
      //   fill("pink");
      //   rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      // } else if (arrays[d][i][j] == "white_2") {
      //   fill("cyan");
      //   rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      //   //   rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      //   // } else if (arrays[d][i][j] == "white_2") {
      //   //   fill("lime");
      //   //   rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      // } else if (arrays[d][i][j] == "white_8") {
      //   fill("purple");
      //   rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      // } else if (arrays[d][i][j] == "white_6") {
      //   fill("lime");
      //   rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      // } else {

      fill(arrays[d][i][j].split("_")[0]);
      rect((j % 3) * sqWidth + i * 305, y, sqWidth);
    }
  }
};
// F L D2 L' F'
// moveList("B' L' U U L B")
// bottom left
// moveList("F R U U R' F'");
// moveList("B L' U U L B'")
// bottom left
// F R U U R' F'  =>  R B U U B' R'
//green
// moveList("R B U U B' R'");
// top left
// F R U U R' F'  =>  L' F U U F' L
// top right
// B L' U U L B'
// moveList("F R U U R' F'");
// moveList("R U R'",'blue')
// moveList(
//   "U' R D B' R F' L' D' B R' B' U' U' D L' R' B B' B B R R B U R' U U R F F U B B R R U L' L' U B' B'"
// );
// moveList("L' U' L")
// moveList("F' U' F", 'blue');
// moveList(
//   "F",
//   "L",
//   "U",
//   "F",
//   "L'",
//   "L'",
//   "D'",
//   "D",
//   "R",
//   "F",
//   "B",
//   "U'",
//   "U",
//   "F'",
//   "L'",
//   "F'",
//   "L'",
//   "B'",
//   "U",
//   "L'",
//   "D'",
//   "L",
//   "L",
//   "U",
//   "L",
//   "D'",
//   "F",
//   "U",
//   "L",
//   "U",
//   "U",
//   "U",
//   "R",
//   "R",
//   "B",
//   "B",
//   "L'",
//   "L'",
//   "U",
//   "F",
//   "F",
//   "U",
//   "U",
//   "R",
//   "R",
//   "U",
//   "B'",
//   "U'",
//   "B",
//   "L",
//   "U'",
//   "L'"
// );
