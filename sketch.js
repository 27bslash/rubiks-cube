let daisy;
let solved_cross;
let solved_white_corners;
let solved_f2l;
let solved_yellow_edges;
let solved_yellow_corners;
let solved_cube = true;
let first_rotation = false;
let scramble_moves = [];
function setup() {
  frameRate(5);
  createCanvas(window.innerWidth - 8, window.innerHeight - 58, WEBGL);
  // drawCube();
  // button = createButton("scramble");
  // button.mousePressed(scramble(40));
  // button.position(400, 400);
  cam = createEasyCam({ distance: 400 });
  // suppress right-click context menu
  document.oncontextmenu = function () {
    return false;
  };
  solved_cross = false;
  // moveList([
  //   "R",
  //   "R",
  //   "F'",
  //   "R",
  //   "R",
  //   "U'",
  //   "U'",
  //   "R",
  //   "B'",
  //   "B",
  //   "U",
  //   "U",
  //   "B",
  //   "B'",
  //   "D'",
  //   "L'",
  //   "F",
  //   "R'",
  //   "D",
  //   "U",
  // ]);
  // moveList("M M U M M U M' U U M M U U M' U U");
  // M M U M M U M' U U M M U U M' U U
  moveList("U");
  for (let i = 0; i < 20; i++) {
    if (!testing) {
      // scramble(1);
    }
  }
  // rotateX(90);
  // rotateY(90);
  angleMode(DEGREES);
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
    if (!solved_cross) {
      cross_button();
    } else {
      solve_white_corners();
    }
  }
};
const f2l_button = () => {
  let i = 0;
  while (!solved_f2l) {
    if (!solved_white_corners) {
      console.log("run corners");
      white_corners_button();
    } else {
      solve_colored_edges();
    }
  }
};
const oll_button = () => {
  while (!solved_yellow_edges) {
    if (!solved_f2l) {
      f2l_button();
    }
    solve_yellow_edges();
  }
  while (!solved_yellow_corners) {
    if (!solved_yellow_edges) {
      solve_yellow_edges();
    }
    solve_yellow_corners();
  }
};
const pll_button = () => {
  if (!solved_yellow_corners) {
    oll_button();
  }
  if (arrays[0][0].join("") !== cube[0].join("")) {
    solve_final_face();
  }
};
const solve_cube = () => {
  solved_cube = false;
};
// console.log(moves);
let d = 0;
const move_shortener = () => {
  let new_moves = [];
  let test_moves = [
    "U",
    "U",
    "L",
    "U",
    "U'",
    "U",
    "U",
    "U",
    "U",
    "U",
    "U",
    "U",
  ];
  for (let i = 0; i < moves.length; i++) {
    ac_move = moves[i].split("'").length > 1;
    if (
      (i < moves.length - 1 &&
        moves[i].split("'").length > 1 &&
        moves[i + 1].split("'").length < 1) ||
      (i < moves.length - 1 &&
        moves[i + 1].split("'").length > 1 &&
        moves[i].split("'").length < 1)
    ) {
      i += 1;
    }

    // 3 consecutive turns is one anti clockwise turn
    if (moves[i] === moves[i + 1] && moves[i] === moves[i + 2]) {
      if (moves[i].split("'").length > 1) {
        new_moves.push(moves[i].split[0]);
      } else {
        new_moves.push(`${moves[i].split[0]}'`);
      }
      i += 2;
    }
    // else if (moves[i] === moves[i + 1]) {
    //   ac_move
    //     ? new_moves.push(`${moves[i].split("'")[0]}2'`)
    //     : new_moves.push(`${moves[i]}2`);
    //   i += 1;
    // }
    else {
      new_moves.push(moves[i]);
    }
  }
  // test_moves.forEach((x, i) => {
  //   console.log(x);
  // });
  console.log(new_moves);
};
function draw() {
  background(200);
  // rotateY(frameCount * 0.01);
  // rotateX(frameCount * 0.01);

  rotateX(-30);
  rotateY(-45);
  drawCube();
  // console.log(solved_cross)
  if (!solved_cube) {
    if (!solved_cross) {
      // noLoop();
      white_cross();
      // line_edges_up()
    } else if (!solved_white_corners) {
      // console.log(cube);
      solve_white_corners();
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
  return cub[2][0] === "white_0" && !cub[5][6].includes("blue");
};
const drafwCube = () => {
  let sqWidth = 100;
  for (let i = 0; i < cube.length; i++) {
    rectMode(CORNER);
    let sideText = ["Top", "Face", "Bottom", "Back", "Right", "Left"];
    // fill("black");
    // textSize(30);
    // text(sideText[i], 113 + i * 305, 350);
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
      // if (arrays[d][i][j] == "white_0") {'
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

      let len = 30;
      let offset = (3 - 1) * len * 0.5;
      let x = len * i - offset;
      // let y = len * j - offset;
      // fill(arrays[d][i][j].split("_")[0]);
      strokeWeight(2);
      // rect(i/2, y, sqWidth);
      console.log(x, y, j % 3);
      arrays[d][i][j] = new Cubie((j % 3) * len, y / 3 - len, 5, len);
      arrays[d][i][j].show();
      // change to arrays[d][i][j]
      // for (let i = 0; i < 3; i++) {
      //   for (let j = 0; j < 3; j++) {
      //     for (let k = 0; k < 3; j++) {
      //       let len = 30;
      //       let offset = (3 - 1) * len * 0.5;
      //       let x = len * i - offset;
      //       let y = len * j - offset;
      //       let z = len * k - offset;
      //       let cubdd;
      //       cubdd[i][j][k] = new Cubie(x, y, z, len);
      //       cubdd[i][j][k].show();
      //       console.log(cubdd);
      //     }
      //   }
      // }
    }
  }
};
//left
// moveList("U' L U L' U F U' F'", "blue");
//right
// moveList(left_algorithm);
function drawCube() {
  let r = 30;
  let offset = r * 2;
  for (let i = 0; i < 6; i++) {
    rectMode(CORNER);
    for (let j = 0; j < 9; j++) {
      rectMode(CORNER);
      let y;
      if (j < 3) {
        y = 0;
      } else if (j < 6) {
        y = r * 2;
      } else if (j < 9) {
        y = r * 4;
      }
      push();
      // translate(0, 0, 0);
      fill("cyan");
      ellipse(0, 0, 3);
      pop();
      if (i == 0) {
        push();
        translate((j % 3) * r * 2 - offset, -offset, -y + offset);
        beginShape();
        fill(arrays[d][i][j].split("_")[0]);
        strokeWeight(2);
        vertex(-r, -r, -r);
        vertex(-r, -r, r);
        vertex(r, -r, r);
        vertex(r, -r, -r);
        endShape();
        pop();
      }
      if (i == 1) {
        push();
        translate((j % 3) * r * 2 - offset, y - offset, +offset);
        beginShape();
        fill(arrays[d][i][j].split("_")[0]);
        strokeWeight(2);
        vertex(-r, -r, r);
        vertex(-r, r, r);
        vertex(r, r, r);
        vertex(r, -r, r);
        endShape();
        pop();
      }
      if (i == 2) {
        push();
        translate((j % 3) * r * 2 - offset, r * 4 - offset, -y + offset);
        beginShape();
        fill(arrays[d][i][j].split("_")[0]);
        strokeWeight(2);
        vertex(-r, r, -r);
        vertex(-r, r, r);
        vertex(r, r, r);
        vertex(r, r, -r);
        endShape();
        pop();
      }
      if (i == 3) {
        push();
        translate((j % 3) * r * 2 - offset, y - offset, -r * 4 + offset);
        beginShape();
        fill(arrays[d][i][j].split("_")[0]);
        strokeWeight(2);
        vertex(-r, -r, -r);
        vertex(-r, r, -r);
        vertex(r, r, -r);
        vertex(r, -r, -r);
        endShape();
        pop();
      }
      if (i == 4) {
        push();
        translate(r * 4 - offset, y - offset, -(j % 3) * r * 2 + offset);
        beginShape();
        fill(arrays[d][i][j].split("_")[0]);
        strokeWeight(2);
        vertex(r, -r, -r);
        vertex(r, -r, r);
        vertex(r, r, r);
        vertex(r, r, -r);
        endShape();
        pop();
      }
      if (i == 5) {
        push();
        translate(0 - offset, y - offset, -(j % 3) * r * 2 + offset);
        beginShape();
        fill(arrays[d][i][j].split("_")[0]);
        strokeWeight(2);
        vertex(-r, -r, -r);
        vertex(-r, -r, r);
        vertex(-r, r, r);
        vertex(-r, r, -r);
        endShape();
        pop();
      }
    }
  }
}
