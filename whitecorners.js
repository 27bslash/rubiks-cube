const rotate_corner_from_top_layer = () => {
  // cube[3][0-6] back
  // cube[5][2-8] left
  // cube[0][0]
  const face_lookup = { 0: "blue", 2: "orange", 6: null, 8: "green" };
  for (let i = 0; i < 9; i += 2) {
    if (cube[0][i] === `white_${i}`) {
      return moveList("F R U U R' F'", face_lookup[i]);
    } else if (cube[0].includes(`white_${i}`) && cube[0][i] !== `white_${i}`) {
      console.log("pending", i);
      return moveList("U");
    }
  }
};

const rotate_corner_from_face = () => {
  const face_lookup = { 0: 5, 2: 3, 6: 1, 8: 4 };
  const top_layer_face_lookup = { 0: "blue", 2: "orange", 6: null, 8: "green" };
  const face_conversion = { 5: "blue", 3: "orange", 1: "red", 4: "green" };
  for (let i = 0; i < 9; i += 2) {
    if (cube[0][0] === `white_${0}`) {
      return moveList("F R U U R' F'", top_layer_face_lookup[i]);
    } else if (cube[0].includes(`white_${0}`) && cube[0][0] !== `white_${0}`) {
      console.log("pending", i);
      return moveList("U");
    }

    let idx_to_check = 0;
    if (cube[face_lookup[i] === 5]) {
      idx_to_check = 2;
    }
    if (check_cube_by_layer("white", 1)) {
      console.log(
        "location of target piece: ",
        check_cube_by_layer("white", 1)
      );
      if (i != 4 && cube[5][2] === `white_${0}`) {
        console.log("front", face_conversion[face_lookup[0]]);
        return moveList("F U F'", face_conversion[face_lookup[0]]);
      } else if (
        i != 4 &&
        cube[face_lookup[i]] !== 5 &&
        cube[3][2] === `white_0`
      ) {
        console.log("right");
        return moveList("F' U' F", "orange");
      } else if (cube[5][2] !== `white_0` && cube[3][2] !== `white_0`) {
        console.log("rotate piece in top layer");
        moveList("U");
        // noLoop();
      }
    } else if (check_cube_by_layer("white", 3)) {
      let center = cube[check_cube_by_layer("white", 3)][4];
      console.log(
        "remove from bottom layer",
        cube[check_cube_by_layer("white", 3)].indexOf("white_0")
      );
      let idx = cube[check_cube_by_layer("white", 3)].indexOf("white_0");
      console.log(idx % 3);
      if (idx % 3 === 0 && !center.includes("blue")) {
        return moveList("F U F'", center);
      } else if (idx % 3 !== 0 && !center.includes("blue")) {
        return moveList("F' U' F", center);
      } else if (idx % 3 !== 0 && center.includes("blue")) {
        return moveList("F U F'", center);
      } else {
        return moveList("F' U' F", center);
      }
    }
    if (i == 0) {
      remove_corner_from_bottom_layer();
    }
    // if (check_cube_by_layer("white", 1)) {
    //   console.log(cube[face_lookup[i]]);
    //   if (i != 4 && cube[face_lookup[i]][idx_to_check] === `white_${i}`) {
    //     console.log("front");
    //     return moveList("F U F'", face_conversion[face_lookup[i]]);
    //   } else if (
    //     i != 4 &&
    //     cube[face_lookup[i]] !== 5 &&
    //     cube[face_lookup[i]][2] === `white_${i}`
    //   ) {
    //     console.log("right");
    //     return moveList("L U' L'", face_conversion[face_lookup[i]]);
    //   }
    //   // moveList("U");
    // } else if (check_cube_by_layer("white", 3)) {
    //   // moveList("F U F'", face_conversion[face_lookup[i]]);
    // }
    // L' U' L
    // if (cube[4][0] === "white_8") {
    //   moveList("F U F'", "green");
    // } else if (cube[1][0] === "white_6") {
    //   moveList("F U F'");
    // } else if (cube[5][0] === "white_0") {
    //   moveList("F U F'", "blue");
    // } else if (cube[3][0] === "white_2") {
    //   moveList("F U F'", "orange");
    // }
    // moveList("U");
  }
  // console.log(cube[2]);
};
const check_cube_by_layer = (color, layer) => {
  for (let i = 1; i < cube.length; i++) {
    for (let j = layer * 3 - 3; j < layer * 3; j++) {
      if (
        !cube[i][4].includes("white") &&
        !cube[i][4].includes("yellow") &&
        cube[i][j].includes(color + "_0")
      ) {
        // return center of cube
        return i;
      }
    }
  }
};
const solve_corners = () => {
  if ("solved_cross") {
    // rotate_corner_from_top_layer();
    rotate_corner_from_face();
  }
};
const remove_corner_from_bottom_layer = () => {
  for (let i = 0; i < 9; i++) {
    if (i == 0) {
      if (cube[2][i] !== `white_${i}` && cube[2][i].includes("white")) {
        console.log(i);
        if (i === 0 || i === 6) {
          if (i < 4) {
            return moveList("L U L'");
          } else {
            return moveList("L' U L");
          }
        } else {
          if (i < 4) {
            return moveList("R U R'");
          } else {
            return moveList("R' U R");
          }
        }
      }
    }
  }
};
