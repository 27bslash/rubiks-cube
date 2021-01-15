let patterns = {
  dot: [0, 0, 0, 0, "yellow", 0, 0, 0, 0],
  line: [0, 0, 0, "yellow", "yellow", "yellow", 0, 0, 0],
  L_shape: [0, 0, 0, 0, "yellow", "yellow", 0, "yellow", 0],
};

const check_yellow_pieces = (start) => {
  cubelets = [];
  for (let i = start; i < 9; i += 2) {
    if (cube[0][i].includes("yellow") && i !== 4) {
      cubelets.push(i);
    }
  }
  // console.log(cubelets);
  return cubelets;
};
const solve_yellow_edges = () => {
  const yellow_edges = check_yellow_pieces(1);
  // console.log(yellow_edges);
  if (solved_yellow_edges) return;
  if (yellow_edges.length === 4) {
    solved_yellow_edges = true;
    return;
  }
  if (yellow_edges.length == 0) {
    //dot
    moveList("F R U R' U' F' F S R U R' U' F' S'");
    console.log("dot");
  }
  // line
  if (compare_arrays(yellow_edges, [1, 7])) {
    moveList("U");
  } else if (compare_arrays(yellow_edges, [3, 5])) {
    console.log("line");
    moveList("F R U R' U' F'");
  } else {
    // L
    if (!compare_arrays(yellow_edges, [1, 5])) {
      moveList("U");
    } else {
      console.log("L");
      moveList("F S R U R' U' F' S'");
    }
  }
};
const solve_yellow_corners = () => {
  // check total solved corners on yellow face
  const yellow_corners = check_yellow_pieces(0);
  // amount of corners on faces other than yellow
  const corners_on_faces = Object.keys(check_faces_for_yellow_pieces()).length;
  // console.log(Object.keys(check_faces_for_yellow_pieces()).length);
  // console.log(yellow_corners);
  if (yellow_corners.length === 4) {
    solved_yellow_corners = true;
    return;
  }
  if (yellow_corners.length === 0 && corners_on_faces === 2) {
    console.log("cross case");
    moveList("R U R' U R U' R' U R U U R'");
  } else if (yellow_corners.length === 0 && corners_on_faces === 3) {
    if (!cube[1][2].includes("yellow")) {
      moveList("U");
    } else {
      console.log("pi case");
      moveList("R U U R R U' R R U' R R U U R");
    }
  }
  if (yellow_corners.length === 2) {
    if (corners_on_faces === 1) {
      if (cube[1][0].includes("yellow")) {
        console.log("U case");
        moveList("R R D' R' U U R D R' U U R'");
      } else {
        moveList("U");
      }
    } else if (
      corners_on_faces === 2 &&
      yellow_corners.join("") !== "08" &&
      yellow_corners.join("") !== "26"
    ) {
      if (cube[1][0].includes("yellow")) {
        console.log("T case");
        moveList("R M U R' U' R' M' F R F'");
      } else {
        moveList("U");
      }
    } else {
      if (cube[1][0].includes("yellow")) {
        console.log("L case");
        moveList("F R' F' R M U R U' R' M'");
      } else {
        moveList("U");
      }
    }
  } else if (yellow_corners.length === 1) {
    if (
      Object.values(check_faces_for_yellow_pieces()).includes(0) &&
      !cube[5][0].includes("yellow")
    ) {
      if (cube[0][2].includes("yellow")) {
        console.log("antisune");
        moveList("R U U R' U' R U' R'");
      } else {
        moveList("U");
      }
    } else if (
      Object.values(check_faces_for_yellow_pieces()).includes(2) &&
      !cube[5][2].includes("yellow")
    ) {
      if (cube[0][6].includes("yellow")) {
        console.log("sune");
        moveList("R U R' U R U U R'");
      } else {
        moveList("U");
      }
    }
  }
};

const solve_yellow_face = () => {
  solve_yellow_edges();
  solve_yellow_corners();
};
const compare_arrays = (x, y) => {
  return x.join("") === y.join("");
};
const check_faces_for_yellow_pieces = () => {
  let pieces = {};
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (i !== 0 && cube[i][j].includes("yellow")) {
        pieces[i] = j;
      }
    }
  }
  return pieces;
};
