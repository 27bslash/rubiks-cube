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

const scramble = () => {
  // console.log(idx, directions[idx]);
  // let moves = Math.floor(Math.random() * (100 - 0 + 1) + 1);
  // console.log("moves: ", moves);
  // moves = 2;
  let direction_idx = Math.floor(Math.random() * (5 - 0 + 1) + 0);
  let lane_idx = Math.floor(Math.random() * (2 - 1 + 1) + 1);
  let directions = ["u", "d", "l", "r", "fC", "fA"];
  rotate(directions[direction_idx], lane_idx);
  moves.push(directions[direction_idx] + lane_idx);
  // console.log(cube);
};

// rotate("fA", 1);
// scramble();
const solveXd = () => {
  console.log(moves);
};
solveXd()