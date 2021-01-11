let daisy;
let solved_cross;
let solved_white_corners;
let solved_f2l;
let solved_yellow_edges;
let solved_yellow_corners;
let solved_cube = true;
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
    if (!testing) {
      scramble(1);
    }
  }
}
const scramble_button = () => {
  for (let i = 0; i < 20; i++) {
    if (!testing) {
      scramble(1);
    }
  }
};
const cross_button = () => {
  while (!solved_cross) {
    white_cross();
  }
};
const white_corners_button = () => {
  while (!solved_white_corners) {
    solve_corners();
  }
};
const f2l_button = () => {
  while (!solved_f2l) {
    solve_colored_edges();
  }
};
const oll_button = () => {
  while (!solved_yellow_edges) {
    solve_yellow_edges();
  }
  while (!solved_yellow_corners) {
    solve_yellow_corners();
  }
};
const pll_button = () => {
  while (arrays[0][0].join("") !== cube[0].join("")) {
    solve_final_face();
  }
};
const solve_cube = () => {
  solved_cube = false;
};
// console.log(moves);
let d = 0;
function draw() {
  drawCube();
  // console.log(solved_cross)
  if (!solved_cube) {
    if (!solved_cross) {
      // noLoop();
      white_cross();
      // line_edges_up()
    } else if (!solved_white_corners) {
      // console.log(cube);
      solve_corners();
    } else if (!solved_f2l) {
      solve_colored_edges();
    } else if (!solved_yellow_edges) {
      solve_yellow_edges();
    } else if (!solved_yellow_corners) {
      solve_yellow_corners();
    } else {
      solve_final_face();
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
  if (arrays.length > 100000) noLoop();
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

      // change to arrays[d][i][j]
      if (arrays.length > 0) {
        fill(arrays[d][i][j].split("_")[0]);
        rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      } else {
        fill(arrays[d][i][j].split("_")[0]);
        rect((j % 3) * sqWidth + i * 305, y, sqWidth);
      }
    }
  }
};
//left
// moveList("U' L U L' U F U' F'", "blue");
//right
// moveList(left_algorithm);
