const solve_colored_edges = () => {
  const left_algorithm = "U' L U L' U F U' F'";
  const right_algorithm = "U R U' R' U' F' U F";
  for (let i = 0; i < cube.length; i++) {
    for (let j = 3; j <= 5; j += 2) {
      const center = cube[i][4].split("_")[0];
      // console.log(center, i);
      // console.log(check_for_edges_in_top_layer());
      // console.log("lyers", check_cube_by_layer(center, 1));
      if (check_for_edges_in_top_layer()) {
        if (i > 0 && i !== 2 && !center.includes("yellow")) {
          while (check_cubelet_in_top_layer(`${center}_${j}`)) {
            if (
              cube[i][1] !== `${center}_${j}` &&
              cube[i][j] !== `${center}_${j}`
            ) {
              // console.log("rotate edge in position", i, center + "_" + j);
              moveList("U");
            }
            if (cube[i][1] == `${center}_3`) {
              center !== "blue" && center !== "orange"
                ? moveList(left_algorithm, center)
                : moveList(right_algorithm, center);
              console.log("left", `${center}_${j}`, cube[i]);
            } else if (cube[i][1] == `${center}_5`) {
              center !== "blue" && center !== "orange"
                ? moveList(right_algorithm, center)
                : moveList(left_algorithm, center);
              console.log("right", `${center}_${j}`, cube[i]);
            }
          }
        }
        // if (cube[i][3] !== `${center}_3`) {
        //   moveList(left_algorithm, center);
        //   console.log("left", cube[i][4], cube[i]);
        // } else if (cube[i][5] !== `${center}_5`) {
        //   moveList(right_algorithm, center);
        //   console.log("right", cube[i][4], cube[i]);
        // }
      } else {
        // this is wrong it's checking every face for one cube edge
        if (center !== "white" && center !== "yellow") {
          if (cube[i][4] === `${center}_4` && cube[i][3] !== `${center}_3`) {
            console.log(cube[i], cube[i][3], center, cube[i][4]);
            console.log(
              "rotate out edge left algorithm",
              `${center}_${j}`,
              i,
              cube[i]
            );
            center !== "blue" && center !== "orange"
              ? moveList(left_algorithm, center)
              : moveList(right_algorithm, center);
          } else if (cube[i][5] !== `${center}_5`) {
            console.log(
              "rotate out edge right algorithm",
              `${center}_${j}`,
              cube[i]
            );
            center !== "blue" && center !== "orange"
              ? moveList(right_algorithm, center)
              : moveList(left_algorithm, center);
          }
        }
      }
    }
  }
  if (check_all_edges()) {
    solved_f2l = true;
  }
};
const check_cubelet_in_top_layer = (cubelet) => {
  for (let i = 0; i < cube.length; i++) {
    if (cube[i].indexOf(cubelet) === 1) {
      return true;
    }
  }
};
const check_for_edges_in_top_layer = (cubelet) => {
  for (let i = 0; i < cube.length; i++) {
    if (i != 0 && i != 2) {
      const center = cube[i][4].split("_")[0];
      for (let j = 3; j <= 5; j += 2) {
        if (!cube[i][1].includes("yellow") && cube[i][1].includes(j)) {
          return true;
        }
        // console.log("check top: ", i, center, j);
        // console.log(cube[i].indexOf(`${center}_${j}`), cubelet);
      }
    }
  }
  return false;
};
const check_all_edges = () => {
  let correct_edges = [];
  for (let i = 1; i < cube.length; i++) {
    if (arrays[0][i].slice(3, 9).join("") == cube[i].slice(3, 9).join("")) {
      correct_edges.push(cube[i]);
    }
  }
  return correct_edges.length == 5;
};
check_all_edges();
