let daisy = false;

const white_cross = (colour) => {
  const edge_locations = [1, 3, 5, 7];
  if (!daisy) {
    for (let face of cube) {
      for (let i = 1; i < 8; i += 2) {
        if (face[i].includes(colour) && face[4] !== "yellow") {
          return rotate_top_layer(face[4], i);
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
  if (get_empty_edges().length > 0) {
    if (face === "green" || face === "blue") {
      // console.log(i);
      if (i === 1 || i === 7) {
        if (
          (face === "green" && get_empty_edges().includes(5)) ||
          (face === "blue" && get_empty_edges().includes(3))
        )
          moveList("F", face);
      } else if (i === 3) {
        if (check_edges(face, i)) {
          return face === "green" ? moveList("F") : moveList("F");
        }
        if (!check_edges(face, i)) {
          // console.log("rotate top");
          moveList("U");
        }
      } else if (i === 5) {
        if (check_edges(face, i)) {
          return face === "green" ? moveList("B'") : moveList("B'");
        }
      }
      if (!check_edges(face, i)) {
        // console.log("rotate top");
        moveList("U");
      }
    } else {
      if (i === 1 || i === 7) {
        console.log(face);
        return face.includes("white")
          ? moveList("D'", face)
          : moveList("F", face);
      } else if (i === 3) {
        if (!check_edges(face, i)) {
          // console.log("rotate top");
          moveList("U");
        }
        if (check_edges(face, i)) {
          return moveList("L", face);
        }
      } else if (i === 5) {
        if (!check_edges(face, i)) {
          // console.log("rotate top");
          moveList("U");
        }
        if (check_edges(face, i)) {
          return moveList("R", face);
        }
      }
    }
  }
};

const check_edges = (face, i) => {
  if (face === "red" || face === "orange" || face.includes("white")) {
    return get_empty_edges().includes(i);
  } else if (i === 3 && (face === "green" || face === "blue")) {
    return get_empty_edges().includes(7);
  } else if (i === 5 && (face === "green" || face === "blue")) {
    return get_empty_edges().includes(1);
  }
};

const line_edges_up = (edge) => {
  daisy = true;
  if (checkCross()) {
    solved_cross = true;
    return;
  }
  const lookup = { 0: 7, 1: 1, 2: 5, 3: 3 };
  let k = -1;
  for (let i = 0; i < 6; i++) {
    if (i !== 0 && i !== 2) {
      k++;
      if (!cube[2][lookup[k]].includes("white") && cube[i][1] === cube[i][4]) {
        rotate_cross(cube[i][1]);
      }
    }
  }
  moveList("U");
};
const rotate_cross = (face) => {
  moveList("F F", face);
};
