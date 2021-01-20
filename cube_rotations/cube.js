let cube = [
  // face
  [
    "yellow_0",
    "yellow_1",
    "yellow_2",
    "yellow_3",
    "yellow_4",
    "yellow_5",
    "yellow_6",
    "yellow_7",
    "yellow_8",
  ],
  [
    "red_0",
    "red_1",
    "red_2",
    "red_3",
    "red_4",
    "red_5",
    "red_6",
    "red_7",
    "red_8",
  ],
  [
    "white_0",
    "white_1",
    "white_2",
    "white_3",
    "white_4",
    "white_5",
    "white_6",
    "white_7",
    "white_8",
  ],
  [
    "orange_0",
    "orange_1",
    "orange_2",
    "orange_3",
    "orange_4",
    "orange_5",
    "orange_6",
    "orange_7",
    "orange_8",
  ],
  // right
  [
    "green_0",
    "green_1",
    "green_2",
    "green_3",
    "green_4",
    "green_5",
    "green_6",
    "green_7",
    "green_8",
  ],
  [
    "blue_0",
    "blue_1",
    "blue_2",
    "blue_3",
    "blue_4",
    "blue_5",
    "blue_6",
    "blue_7",
    "blue_8",
  ],

  /*top 
   face
   bottom
   back
   right
   left
  */
];
let test_cube = [
  [
    "black",
    "black",
    "black",
    "black",
    "yellow",
    "black",
    "black",
    "black",
    "black",
  ],
  [
    "white_6",
    "black",
    "black",
    "black",
    "red",
    "black",
    "black",
    "black",
    "black",
  ],
  [
    "black",
    "black",
    "black",
    "black",
    "white",
    "black",
    "black",
    "black",
    "black",
  ],
  [
    "black",
    "black",
    "black",
    "black",
    "orange",
    "black",
    "black",
    "black",
    "black",
  ],
  // right
  [
    "black",
    "black",
    "black",
    "black",
    "green",
    "black",
    "black",
    "black",
    "black",
  ],
  [
    "black",
    "black",
    "black",
    "black",
    "blue",
    "black",
    "black",
    "black",
    "black",
  ],
];
let moves = [],
  arrays = [],
  depth = 0;
const testing = false;
if (testing) cube = test_cube;
arrays.push(cube.map((arr) => arr.slice()));
// console.log(arrays);
// ToDO visualize scramble in 2d
const rotate = (direction, display_moves, scramble_mves) => {
  const prev = cube.map((arr) => arr.slice());
  // console.log(direction, /[EMS]/g.test(direction));
  // console.log(display_moves);
  if (!display_moves) moves.push(direction);
  let lane;
  let middle_layer_test = /[EMS]/g.test(direction);
  if (middle_layer_test) lane = 2;
  // console.log(direction, lane, cube, prev);
  // console.log(direction);
  switch (direction) {
    case "U":
      lane = 1;
      cube[0] = rotate_face([...cube[0]], "ac");
      break;
    case "U'":
      lane = 1;
      cube[0] = rotate_face([...cube[0]], "cw");
      break;
    case "D":
      lane = 3;
      cube[2] = rotate_face([...cube[2]], "ac");
      break;
    case "D'":
      lane = 3;
      cube[2] = rotate_face([...cube[2]], "cw");
      break;
    case "L":
      lane = 1;
      cube[5] = rotate_face([...cube[5]], "cw");
      break;
    case "L'":
      lane = 1;
      cube[5] = rotate_face([...cube[5]], "ac");
      break;
    case "R":
      lane = 3;
      cube[4] = rotate_face([...cube[4]], "cw");
      break;
    case "R'":
      lane = 3;
      cube[4] = rotate_face([...cube[4]], "ac");
      break;
    case "F":
      lane = 1;
      cube[1] = rotate_face([...cube[1]], "cw");
      break;
    case "F'":
      lane = 1;
      cube[1] = rotate_face([...cube[1]], "ac");
      break;
    case "B'":
      lane = 3;
      cube[3] = rotate_face([...cube[3]], "cw");
      break;
    case "B":
      lane = 3;
      cube[3] = rotate_face([...cube[3]], "ac");
      break;
    default:
      break;
  }
  for (let j = lane * 3 - 3; j < lane * 3; j++) {
    let num_to_reverse = (lane * 3 - 3 + 1) * 2;
    if (direction == "D'" || direction == "U'" || direction === "E'") {
      cube[1][j] = prev[5][num_to_reverse - j];
      cube[3][j] = prev[4][num_to_reverse - j];
      cube[4][j] = prev[1][j];
      cube[5][j] = prev[3][j];
      // wrong reeeeeeeeeeeeeeee
    } else if (direction === "D" || direction === "U" || direction === "E") {
      // console.log("D", num_to_reverse - j);
      // console.log(num_to_reverse, j);
      cube[1][j] = prev[4][j];
      cube[3][j] = prev[5][j];
      cube[4][j] = prev[3][num_to_reverse - j];
      cube[5][j] = prev[1][num_to_reverse - j];
    }
  }
  for (let j = lane * 3 - 3; j < lane * 3; j++) {
    let added = lane - 1,
      left_added = 6;
    if (lane == 3) left_added = -6;
    if (lane == 2) left_added = 0;
    if (direction == "F" || direction === "B'" || direction === "S") {
      // console.log(j, j + left_added, (j % 3) * 3 + added);
      cube[0][j] = prev[5][6 - (j % 3) * 3 + added];
      cube[2][j] = prev[4][6 - (j % 3) * 3 + added];
      cube[4][(j % 3) * 3 + added] = prev[0][j];
      cube[5][(j % 3) * 3 + added] = prev[2][j];
    } else if (direction == "F'" || direction === "B" || direction === "S'") {
      // console.log(j, left_added, added);
      cube[2][j] = prev[5][(j % 3) * 3 + added];
      cube[0][j] = prev[4][(j % 3) * 3 + added];
      cube[4][6 - (j % 3) * 3 + added] = prev[2][j];
      cube[5][6 - (j % 3) * 3 + added] = prev[0][j];
    }
  }
  for (let j = lane - 1; j < cube[0].length; j += 3) {
    let num_to_reverse = (lane - 1 + 3) * 2,
      k_added = 10,
      k = j + 2;
    // 1 > 10;
    // 2 > 8;
    // 3 > 6;
    // 1 > j + 2;
    // 1 > j;
    // 1 > j - 2;
    if (lane === 3) (k_added = 6), (k = j - 2);
    if (lane === 2) (k_added = 8), (k = j);
    // console.log(j, k_added, k_added - k);
    if (direction === "L" || direction === "R" || direction === "M") {
      cube[0][j] = prev[1][num_to_reverse - j];
      cube[1][j] = prev[2][j];
      cube[2][num_to_reverse - j] = prev[3][j];
      cube[3][j] = prev[0][j];
    } else if (direction === "L'" || direction === "R'" || direction === "M'") {
      cube[0][j] = prev[3][j];
      cube[1][j] = prev[0][num_to_reverse - j];
      cube[2][j] = prev[1][j];
      cube[3][j] = prev[2][num_to_reverse - j];
    }
  }
  if (display_moves || scramble_mves) {
    arrays.push(cube.map((arr) => arr.slice()));
    depth++;
  }
  // console.log(arrays);
};

function scramble(num) {
  // console.log(idx, directions[idx]);
  // let moves = Math.floor(Math.random() * (100 - 0 + 1) + 1);
  // console.log("moves: ", moves);
  // moves = 2;
  solved_cross = false;
  solved_white_corners = false;
  solved_f2l = false;
  solved_yellow_edges = false;
  solved_yellow_corners = false;
  solved_cube = false;
  daisy = false;

  let i = 0;
  while (i < num) {
    let direction_idx = Math.floor(Math.random() * (11 - 0 + 1) + 0);
    // console.log(direction_idx);
    let directions = [
      "U",
      "U'",
      "D",
      "D'",
      "L",
      "L'",
      "R",
      "R'",
      "F",
      "F'",
      "B",
      "B'",
    ];
    rotate(directions[direction_idx], null, true);
    scramble_moves.push(directions[direction_idx]);
    if (pink_check()) {
      // console.log(directions[direction_idx]);
    }
    // moves.push(directions[direction_idx]);
    i++;
  }
  moves = [];
  // moveList(scramble_moves)
}

const checkCross = () => {
  let cross = [0, "white", 0, "white", "white", "white", 0, "white", 0];
  let edge = [0, 0, 0, 0, "orange", 0, 0, "orange", 0];
  // console.log(cube[2][1], cross[1], cube);
  let edgeFilter = [];
  let filtered = [];
  for (let i = 0; i < 9; i++) {
    // if (edge[i] === 0 && cube[3][i] === "orange") {
    //   edgeFilter.push(0);
    // }
    // if (cube[3][i] !== "orange") {
    //   edgeFilter.push(0);
    // } else {
    //   edgeFilter.push("orange");
    // }
    if (cross[i] === 0 && cube[2][i].includes("white")) {
      filtered[i] = 0;
    } else if (!cube[2][i].includes("white")) {
      filtered[i] = 0;
    } else {
      filtered[i] = "white";
    }
  }
  // console.log(cross, filtered);
  return cross.join() === filtered.join() || solved_cross === true;
};
const moveList = (mList, face, display_moves) => {
  // console.log(Array.isArray(mList));
  if (!Array.isArray(mList)) {
    mList = mList.split(" ");
  }
  for (let move of mList) {
    if (move.includes("2")) {
      rotate(move.replace("2", ""));
      rotate(move.replace("2", ""));
    }
    move = move_translator(face, move);
    rotate(move, display_moves);
  }
};

// moveList("F R U' R' U' R U R' F' R U R' U' R' F R F'");
const count_occurances = (arr) => {
  flat = [];
  for (let face of cube) {
    for (let cubie of face) {
      flat.push(cubie);
    }
  }
  return flat.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );
};
for (let i = 0; i < 6; i++) {
  // console.log(count_occurances(cube[i]));
}
// L' D F D'
// moveList("F U D R L'");
// console.log(arrays);
const move_translator = (location, moves) => {
  switch (location) {
    case "green":
      if (moves.includes("F")) {
        moves = moves.split("'").length > 1 ? "R'" : "R";
      } else if (moves.includes("R")) {
        moves = moves.split("'").length > 1 ? "B'" : "B";
      } else if (moves.includes("L")) {
        moves = moves.split("'").length > 1 ? "F" : "F'";
      } else if (moves.includes("B")) {
        //    these have the highest chance of being wrong
        moves = moves.split("'").length > 1 ? "L" : "L'";
      }
      break;
    case "blue":
      if (moves.includes("F")) {
        moves = moves.split("'").length > 1 ? "L" : "L'";
      } else if (moves.includes("R")) {
        moves = moves.split("'").length > 1 ? "F'" : "F";
      } else if (moves.includes("L")) {
        moves = moves.split("'").length > 1 ? "B" : "B'";
      } else if (moves.includes("B")) {
        //    these have the highest chance of being wrong
        moves = moves.split("'").length > 1 ? "R" : "R'";
      } else if (moves.includes("U")) {
        //    these have the highest chance of being wrong
        // moves = moves.split("'").length > 1 ? "U" : "U'";
      }
      break;
    case "orange":
      if (moves.includes("F")) {
        moves = moves.split("'").length > 1 ? "B'" : "B";
      } else if (moves.includes("L")) {
        moves = moves.split("'").length > 1 ? "R" : "R'";
      } else if (moves.includes("R")) {
        moves = moves.split("'").length > 1 ? "L" : "L'";
      } else if (moves.includes("B")) {
        moves = moves.split("'").length > 1 ? "F" : "F'";
      }
      break;
    default:
      return moves;
  }
  // console.log(location, moves);
  return moves;
};
// moveList("F U F'",'blue')
