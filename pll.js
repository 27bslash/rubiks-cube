const solve_final_face = () => {
  let wrong_corners = {};
  let wrong_edges = {};
  let corners = [0, 2, 6, 8];
  let edges = [1, 3, 5, 7];
  if (!solved_cube && arrays[0][0].join("") === cube[0].join("")) {
    solved_cube = true;
    return;
  }
  for (let i = 0; i < cube[0].length; i++) {
    if (cube[0][i] !== `yellow_${i}`) {
      if (corners.includes(i)) {
        wrong_corners[i] = cube[0][i];
      } else if (edges.includes(i)) {
        wrong_edges[i] = cube[0][i];
      }
    }
  }

  let amount_of_corners = Object.keys(wrong_corners).length;
  if (
    (amount_of_corners === 4 && Object.keys(wrong_edges).length === 4) ||
    check_for_same_corners()
  ) {
    console.log("comple");
    moveList("U");
  } else {
    if (
      (cube[0][0] === "yellow_8" && cube[0][8] === "yellow_0") ||
      amount_of_corners === 4
    ) {
      console.log("corner swap green");
      moveList("F R U' R' U' R U R' F' R U R' U' R' F R F'", "green");
      // opposite corners
    }
    if (cube[0][2] === "yellow_6" && cube[0][6] === "yellow_2") {
      // opposite corners
      console.log("corner swap");
      moveList("F R U' R' U' R U R' F' R U R' U' R' F R F'");
    } else if (cube[0][2] === "yellow_8" && cube[0][8] === "yellow_2") {
      console.log("headlights");
      moveList("R U R' U' R' F R R U' R' U' R U R' F'");
    } else if (cube[0][0] === "yellow_2" && cube[0][2] === "yellow_0") {
      console.log("headlights", "blue");
      moveList("R U R' U' R' F R R U' R' U' R U R' F'", "blue");
    } else if (cube[0][0] === "yellow_6" && cube[0][6] === "yellow_0") {
      console.log("headlights", "orange");
      moveList("R U R' U' R' F R R U' R' U' R U R' F'", "orange");
    } else if (cube[0][6] === "yellow_8" && cube[0][8] === "yellow_6") {
      console.log("headlights", "green");
      moveList("R U R' U' R' F R R U' R' U' R U R' F'", "green");
    }
    if (amount_of_corners === 3) {
      console.log("rotgate corner");
      moveList("R B' R F F R' B R F F R R");
    }
    if (Object.keys(wrong_edges).length === 4 && amount_of_corners === 0) {
      console.log("4 edge case", wrong_edges);
      if (cube[0][1] === "yellow_7" && cube[0][7] === "yellow_1") {
        console.log(wrong_edges, "H perm");
        moveList("M M U M M U U M M U M M");
      } else if (cube[0][1] === "yellow_3" && cube[0][3] === "yellow_1") {
        console.log(wrong_edges, "Z perm", "red");
        moveList("M' U M M U M M U M' U U M M U'");
      } else if (cube[0][5] === "yellow_1" && cube[0][1] === "yellow_5") {
        console.log(wrong_edges, "Z perm green");
        moveList("S' U S S U S S U S' U U S S U'", "green");
      }
    } else if (
      Object.keys(wrong_edges).length === 3 &&
      amount_of_corners === 0
    ) {
      // console.log(wrong_edges,Object.keys(wrong_edges))
      let difference = edges.filter(
        (x) => +Object.keys(wrong_edges).indexOf("" + x) < 0
      );
      const face_lookup = { 1: "orange", 5: "blue", 7: "red", 3: "green" };
      let rotation_face = face_lookup[difference[0]];
      let opposite_face_lookup = { 1: 7, 7: 1, 3: 5, 5: 3 };
      // console.log(
      //   opposite_face_lookup[difference[0]],
      //   cube[0][opposite_face_lookup[difference[0]]]
      // );
      edge = opposite_face_lookup[difference[0]];
      edge_idx = cube[0][edge].split("_")[1];
      console.log("3 edges");
      moveList("R U' R U R U R U' R' U' R R", rotation_face);
    }
  }
};
const check_for_same_corners = () => {
  const similiar = [];
  for (let i = 1; i < cube.length; i++) {
    if (i != 2) {
      // let split = cube[i][j].split("_")[0];
      if (
        cube[i][0].split("_")[0] !== cube[i][4].split("_")[0] &&
        cube[i][0].split("_")[0] === cube[i][2].split("_")[0]
      ) {
        similiar.push(cube[i][4].split("_")[0]);
      }
    }
  }
  console.log(similiar);
  return similiar.length === 4;
};
