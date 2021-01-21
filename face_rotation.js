const spiral = (array) => {
  res = [];
  for (let i = 0; i < 3; i++) {
    res.push(array[i]);
  }
  for (let i = 5; i < 8; i += 3) {
    res.push(array[i]);
  }
  for (let i = 8; i > 5; i--) {
    res.push(array[i]);
  }
  res.push(array[3]);
  return res;
};

const rotate_array = (array, direction) => {
  for (let i = 0; i < 2; i++) {
    if (direction === "cw") {
      array.unshift(array.pop());
    } else {
      array.push(array.shift());
    }
  }
  return array;
};

const rotate_face = (face, direction) => {
  arr = spiral(face);
  arr = rotate_array(arr, direction);
  let res = [];
  for (let i = 0; i < 3; i++) {
    res.push(arr[i]);
  }
  res.push(arr[7]);
  res.push(face[4]);
  res.push(arr[3]);
  for (let i = 6; i > 3; i--) {
    res.push(arr[i]);
  }

  return res;
};
