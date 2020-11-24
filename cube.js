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
let moves = [],
  arrays = [],
  depth = 0;
arrays.push(cube.map((arr) => arr.slice()));
// console.log(arrays);
// ToDO visualize scramble in 2d
const rotate = (direction, lane) => {
  const prev = cube.map((arr) => arr.slice());
  // console.log(direction, lane, cube, prev);
  switch (direction) {
    case "U":
      lane = 1;
      break;
    case "U'":
      lane = 1;
      break;
    case "D":
      lane = 3;
      break;
    case "D'":
      lane = 3;
      break;
    case "L":
      lane = 1;
      break;
    case "L'":
      lane = 1;
      break;
    case "R":
      lane = 3;
      break;
    case "R'":
      lane = 3;
      break;
    case "F":
      lane = 1;
      break;
    case "F'":
      lane = 1;
      break;
    case "B":
      lane = 3;
      break;
    case "B'":
      lane = 3;
      break;
    default:
      break;
  }

  for (let j = lane * 3 - 3; j < lane * 3; j++) {
    if (direction == "D" || direction == "U") {
      cube[1][j] = prev[5][j];
      cube[3][j] = prev[4][j];
      cube[4][j] = prev[1][j];
      cube[5][j] = prev[3][j];
    } else if (direction == "D'" || direction === "U'") {
      cube[1][j] = prev[4][j];
      cube[3][j] = prev[5][j];
      cube[4][j] = prev[3][j];
      cube[5][j] = prev[1][j];
    }
  }
  for (let j = lane * 3 - 3; j < lane * 3; j++) {
    let added = 0;
    if (direction === "B'" || direction === "B") added = 2;
    if (direction == "F" || direction === "B'") {
      cube[0][j] = prev[5][(j % 3) * 3 + added];
      cube[2][j] = prev[4][(j % 3) * 3 + added];
      cube[4][(j % 3) * 3 + added] = prev[0][j];
      cube[5][(j % 3) * 3 + added] = prev[2][j];
    } else if (direction == "F'" || direction === "B") {
      cube[2][j] = prev[5][(j % 3) * 3 + added];
      cube[0][j] = prev[4][(j % 3) * 3 + added];
      cube[4][(j % 3) * 3 + added] = prev[2][j];
      cube[5][(j % 3) * 3 + added] = prev[0][j];
      // console.log(
      //   j,
      //   (j % 3) * 3,
      //   "curr: ",
      //   cube[2][j],
      //   "pre: ",
      //   prev[5][j],
      //   "prev: ",
      //   prev[2]
      // );
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = lane - 1; j < 9; j += 3) {
      if (direction == "L" || direction === "R") {
        if (i < 3) {
          cube[0][j] = prev[3][j];
          cube[i + 1][j] = prev[i][j];
        }
      } else if (direction == "L'" || direction === "R'") {
        if (i < 3) {
          cube[3][j] = prev[0][j];
          cube[i][j] = prev[i + 1][j];
        }
      }
    }
  }
  console.log(cube == prev);
  arrays.push(cube.map((arr) => arr.slice()));
  // console.log(arrays);
  depth++;
};

function scramble(num) {
  // console.log(idx, directions[idx]);
  // let moves = Math.floor(Math.random() * (100 - 0 + 1) + 1);
  // console.log("moves: ", moves);
  // moves = 2;
  let i = 0;
  while (i < num) {
    let direction_idx = Math.floor(Math.random() * (12 - 0 + 1) + 0);
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
    rotate(directions[direction_idx]);
    // moves.push(directions[direction_idx]);
    i++;
  }
}

// rotate("fA", 1);
// scramble();

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
  let cross = [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ];
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
const moveList = (mList) => {
  mList = mList.split(" ");
  for (let move of mList) {
    rotate(move);
    console.log(arrays);
  }
};
// moveList("R' F D U L");
// rotate("R")
// rotate("F")
// rotate("D")
// rotate("U")
// rotate("L")

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

const edges = (colour) => {
  const edge_locations = [1, 3, 5, 7];
  /* 
   top: yellow
   face: red
   bottom: white
   back: orange
   right: green
   left: blue
  */
  for (let face of cube) {
    for (let i = 1; i < 8; i += 2) {
      if (face[i] === colour) {
        console.log(face[4], i);
      }
    }
  }
};
edges("white");
moveList("F U D R L'");
// console.log(arrays);
