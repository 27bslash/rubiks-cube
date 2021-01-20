const white_cross = () => {
  if (!daisy) {
    for (let face of cube) {
      for (let i = 1; i < 8; i += 2) {
        if (face[i].includes("white") && !face[4].includes("yellow")) {
          return rotate_top_layer(face[4].split("_")[0], i);
        }
      }
    }
  }
  line_edges_up();
};

const get_empty_edges = () => {
  let empty = [];
  for (let i = 1; i < 8; i += 2) {
    if (!cube[0][i].includes("white")) {
      empty.push(i);
    }
  }
  return empty;
};

const rotate_top_layer = (face, i) => {
  console.log(face, i);
  if (checkCross()) {
    daisy = true;
    solved_cross = true;
    return;
  }
  if (get_empty_edges().length > 0) {
    if (face.includes("green") || face.includes("blue")) {
      // console.log(i);
      if (i === 1 || i === 7) {
        if (
          (face.includes("green") && get_empty_edges().includes(5)) ||
          (face.includes("blue") && get_empty_edges().includes(3))
        ) {
          console.log("1 or 7");
          return moveList("F", face);
        }
      } else if (i === 3) {
        if (check_edges(face, i)) {
          return face.includes("green") ? moveList("F'") : moveList("F");
        }
        if (!check_edges(face, i)) {
          // console.log("rotate top");
          return moveList("U");
        }
      } else if (i === 5) {
        if (check_edges(face, i)) {
          return face.includes("green") ? moveList("B'") : moveList("B'");
        }
      }
      if (!check_edges(face, i)) {
        // console.log("rotate top");
        return moveList("U");
      }
    } else {
      if (i === 1 || i === 7) {
        console.log("f");
        return face.includes("white")
          ? moveList("D'", face)
          : moveList("F", face);
      } else if (i === 3) {
        if (!check_edges(face, i)) {
          // console.log("rotate top");
          return moveList("U");
        }
        if (check_edges(face, i)) {
          return face.includes("orange")
            ? moveList("R", face)
            : moveList("L", face);
        }
      } else if (i === 5) {
        if (!check_edges(face, i)) {
          // console.log("rotate top");
          return moveList("U");
        }
        if (check_edges(face, i)) {
          return face.includes("orange")
            ? moveList("L", face)
            : moveList("R", face);
        }
      }
    }
  }
};

const check_edges = (face, i) => {
  if (
    face.includes("red") ||
    face.includes("orange") ||
    face.includes("white")
  ) {
    return get_empty_edges().includes(i);
  } else if (i === 3 && (face.includes("green") || face.includes("blue"))) {
    return get_empty_edges().includes(1);
  } else if (i === 5 && (face.includes("green") || face.includes("blue"))) {
    return get_empty_edges().includes(7);
  }
};

const line_edges_up = (edge) => {
  daisy = true;
  if (checkCross()) {
    solved_cross = true;
    return;
  }
  const lookup = { 0: 1, 1: 3, 2: 5, 3: 7 };
  let k = -1;
  for (let i = 0; i < 6; i++) {
    if (i !== 0 && i !== 2) {
      for (let j = 1; j < cube[0].length; j += 2) {
        // console.log(
        //   k,
        //   cube[2][j],
        //   cube[i][1].split("_")[0],
        //   cube[i][4].split("_")[0]
        // );
        if (
          !cube[2][j].includes("white") &&
          cube[i][1].split("_")[0] === cube[i][4].split("_")[0]
        ) {
          rotate_cross(cube[i][1].split("_")[0]);
        }
      }
    }
  }
  return moveList("U");
};
const rotate_cross = (face) => {
  console.log(face);
  return moveList("F F", face);
};
