let cube = [
  // face
  [
    "yellow",
    "yellow",
    "yellow",
    "yellow",
    "yellow",
    "yellow",
    "yellow",
    "yellow",
    "yellow",
  ],
  ["red", "red", "red", "red", "red", "red", "red", "red", "red"],
  [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ],
  [
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
  ],
  // right
  [
    "green",
    "green",
    "green",
    "green",
    "green",
    "green",
    "green",
    "green",
    "green",
  ],
  ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],

  /*top 
   face
   bottom
   back
   right
   left
  */
];
let moves = [];
// ToDO visualize scramble in 2d
const rotate = (direction, lane) => {
  // console.log(direction, lane, cube);
  const prev = cube.map((arr) => arr.slice());
  for (let j = lane * 3 - 3; j < lane * 3; j++) {
    if (direction == "r") {
      cube[1][j] = prev[5][j];
      cube[3][j] = prev[4][j];
      cube[4][j] = prev[1][j];
      cube[5][j] = prev[3][j];
    } else if (direction == "l") {
      cube[1][j] = prev[4][j];
      cube[3][j] = prev[5][j];
      cube[4][j] = prev[3][j];
      cube[5][j] = prev[1][j];
    }
  }
  for (let j = 0; j < 9; j += 3) {
    if (direction == "fC") {
      cube[2][j] = prev[4][j];
      cube[3][j] = prev[5][j];
      cube[4][j] = prev[3][j];
      cube[5][j] = prev[2][j];
    } else if (direction == "fA") {
      cube[2][j] = prev[5][j];
      cube[3][j] = prev[4][j];
      cube[4][j] = prev[2][j];
      cube[5][j] = prev[3][j];
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = lane - 1; j < 9; j += 3) {
      if (direction == "d") {
        if (i < 3) {
          cube[0][j] = prev[3][j];
          cube[i + 1][j] = prev[i][j];
        }
      } else if (direction == "u") {
        if (i < 3) {
          cube[3][j] = prev[0][j];
          cube[i][j] = prev[i + 1][j];
        }
      }
    }
  }
  // console.log(cube == prev);
};

function scramble(num) {
  // console.log(idx, directions[idx]);
  // let moves = Math.floor(Math.random() * (100 - 0 + 1) + 1);
  // console.log("moves: ", moves);
  // moves = 2;
  let i = 0;
  while (i < num) {
    i++;
    let direction_idx = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    let lane_idx = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    let directions = ["u", "d", "l", "r", "fC", "fA"];
    if (lane_idx !== 2) {
      rotate(directions[direction_idx], lane_idx);
      moves.push(directions[direction_idx] + lane_idx);
    }
  }
}

// rotate("fA", 1);
// scramble();
const solveXd = () => {
  console.log(moves);
};
solveXd();

// left right rotations needed
// restructure directions to official terminology
const whiteCross = () => {
  let end = [0, "white", 0, "white", "white", "white", 0, "white", 0];
  console.log(cube[2][1], end[1], cube);
  let filtered = [];
  for (let i = 0; i < cube[2].length; i++) {
    if (cube[2][i] != "white") {
      filtered.push(0);
    } else {
      filtered.push("white");
    }
  }
  console.log(filtered);

  // console.log(cube);
  console.log(moves);
};

const checkCross = () => {
  let cross = [0, "white", 0, "white", "white", "white", 0, "white", 0];
  let edge = [0, 0, 0, 0, "orange", 0, 0, "orange", 0];
  // console.log(cube[2][1], cross[1], cube);
  let edgeFilter = [];
  let filtered = [];
  for (let i = 0; i < 9; i++) {
    if (edge[i] === 0 && cube[3][i] === "orange") {
      edgeFilter.push(0);
    }
    if (cube[3][i] !== "orange") {
      edgeFilter.push(0);
    } else {
      edgeFilter.push("orange");
    }
    if (cross[i] === 0 && cube[2][i] === "white") {
      filtered.push(0);
    }
    if (cube[2][i] != "white") {
      filtered.push(0);
    } else {
      filtered.push("white");
    }
  }
  return cross.join() === filtered.join();
};
