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

const solve_white_corners = () => {
  const front_lookup = { 0: 5, 2: 3, 6: 1, 8: 1 };
  const right_lookup = { 0: 3, 2: 4, 6: 5, 8: 4 };
  const top_layer_face_lookup = {
    0: null,
    2: "green",
    6: "blue",
    8: "orange",
  };
  const face_conversion = { 5: "blue", 3: "orange", 1: "red", 4: "green" };
  for (let i = 0; i < 9; i += 2) {
    if (cube[0][i] === `white_${i}`) {
      console.log(top_layer_face_lookup[i]);
      return moveList("F R U U R' F'", top_layer_face_lookup[i]);
    } else if (cube[0].includes(`white_${i}`) && cube[0][i] !== `white_${i}`) {
      console.log("pending", i);
      return moveList("U");
    }

    let idx_to_check = 0;
    if (i === 0) {
      idx_to_check = 2;
    }
    let top_layer = check_cube_by_layer("white", 1);

    if (top_layer) {
      console.log(
        "location of target piece:",
        face_conversion[top_layer],
        "idx:",
        cube[top_layer].indexOf(`white_${i}`),
        cube[top_layer],
        "piece to check: ",
        i
      );
      console
        .log
        // face_conversion[front_lookup[i]],
        // cube[front_lookup[i]][idx_to_check]
        ();
      // right of face ac
      // const top_layer_face_lookup = {
      //   0: null,
      //   2: "green",
      //   6: "blue",
      //   8: "orange",
      // };
      // const top_layer_face_lookup = { 0: "blue", 2: "orange", 6: null, 8: "green" };
      if (cube[1][0] === `white_0`) {
        return moveList("F U F'");
      } else if (cube[5][0] === "white_0") {
        return moveList("F' U' F", "blue");
      } else if (cube[1][2] === "white_2") {
        return moveList("F' U' F");
      } else if (cube[4][0] === "white_2") {
        return moveList("F U F'", "green");
      } else if (cube[4][2] === "white_8") {
        return moveList("F' U' F", "green");
      } else if (cube[3][2] === "white_8") {
        return moveList("F U F'", "orange");
      } else if (cube[3][0] === "white_6") {
        return moveList("F' U' F", "orange");
      } else if (cube[5][2] === "white_6") {
        return moveList("F U F'", "blue");
      } else {
        console.log("rotate piece to correct position");
        return moveList("U");
      }
      // if (cube[front_lookup[i]][2] === `white_${i}`) {
      //   console.log("front", face_conversion[front_lookup[i]], 2);
      //   return moveList("F U F'", face_conversion[front_lookup[i]]);
      // } else if (cube[right_lookup[i]][0] === `white_${i}`) {
      //   console.log("right");
      //   if (face_conversion[right_lookup[i]] === "green") {
      //     return moveList("F U' F'", "green");
      //   } else {
      //     return moveList("F' U' F", face_conversion[right_lookup[i]]);
      //   }
      // } else if (
      //   (i !== 4 && cube[front_lookup[i]][idx_to_check] !== `white_${i}`) ||
      //   cube[right_lookup[i]][idx_to_check] !== `white_${i}`
      // ) {
      //   console.log("rotate piece in top layer");
      //   moveList("U");
      //   // noLoop();
      // }
    } else if (
      check_cube_by_layer("white", 3)
      // check_cube_by_layer("white", 3) !== -1
    ) {
      let bottom_layer = check_cube_by_layer("white", 3);
      let center = cube[bottom_layer][4].split("_")[0];
      let idx = cube[bottom_layer].indexOf(`white_${i}`);
      console.log(idx % 3, cube[bottom_layer]);
      if (idx >= 6) {
        console.log(
          "remove from bottom layer",
          face_conversion[bottom_layer],
          cube[bottom_layer].indexOf(`white_${i}`)
        );
        if (
          idx % 3 === 0 &&
          !center.includes("orange") &&
          !center.includes("blue")
        ) {
          console.log("cw", center);
          return moveList("F U F'", center);
        } else if (
          idx % 3 !== 0 &&
          !center.includes("orange") &&
          !center.includes("blue")
        ) {
          return moveList("F' U' F", center);
        } else if (
          (idx % 3 === 0 && center.includes("orange")) ||
          (idx % 3 === 0 && center.includes("blue"))
        ) {
          console.log("edge case: ", i, center);
          return moveList("F' U F", center);
        } else if (
          (idx % 3 !== 0 && center.includes("orange")) ||
          (idx % 3 !== 0 && center.includes("blue"))
        ) {
          console.log("rip", idx, center);
          // noLoop();
          return moveList("F U' F'", center);
        }
      }
    }
    remove_corner_from_bottom_layer();
    if (check_corners()) {
      solved_white_corners = true;
    }
    // if (top_layer) {
    //   console.log(cube[face_lookup[i]]);
    //   if ( cube[face_lookup[i]][idx_to_check] === `white_${i}`) {
    //     console.log("front");
    //     return moveList("F U F'", face_conversion[face_lookup[i]]);
    //   } else if (
    //
    //     cube[face_lookup[i]] !== 5 &&
    //     cube[face_lookup[i]][idx_to_check] === `white_${i}`
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
    //   moveList("F U F'", "ort");
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
        cube[i][j].includes(color)
      ) {
        // return center of cube
        // console.log("check cube by layer: ", i, j, cube[i]);
        return i;
      }
    }
  }
};

const remove_corner_from_bottom_layer = () => {
  for (let i = 0; i < 9; i++) {
    if (cube[2][i] !== `white_${i}` && cube[2][i].includes("white")) {
      console.log("bottom layer", i);
      if (i === 0 || i === 6) {
        if (i === 0) {
          console.log("remove corner 6");
          return moveList("L U L'");
        } else {
          return moveList("L' U L");
        }
      } else {
        if (i === 2) {
          return moveList("R U R'");
        } else {
          console.log("r bottom");
          return moveList("R' U' R");
        }
      }
    }
  }
};
// remove_corner_from_bottom_layer();
const check_corners = () => {
  arr = [];
  for (let i = 0; i < 9; i++) {
    if (cube[2][i] === `white_${i}`) {
      arr.push(`white_${i}`);
    }
  }
  return arr.join("") == arrays[0][2].join("");
};
