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
  frameRate(60);
  createCanvas(window.innerWidth - 8, window.innerHeight - 58, WEBGL);
  cam = createEasyCam({ distance: 400 });
  // suppress right-click context menu
  document.oncontextmenu = function () {
    return false;
  };
  solved_cross = false;
  for (let i = 0; i < 20; i++) {
    if (!testing) {
      scramble(1);
    }
  }
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
  while (arrays[0][0].join("") !== cube[0].join("")) {
    if (!solved_yellow_corners) {
      oll_button();
    }
    solve_final_face();
  }
};
const solve_cube = () => {
  solved_cube = false;
};

let d = 0;
function draw() {
  background(200);
  rotateX(-30);
  rotateY(-45);
  drawCube();
  if (!solved_cube) {
    if (!solved_cross) {
      white_cross();
    } else if (!solved_white_corners) {
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
  if (d >= depth) {
    // noLoop();
  } else {
    d++;
  }
  if (arrays.length > 100000) noLoop();
}
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
