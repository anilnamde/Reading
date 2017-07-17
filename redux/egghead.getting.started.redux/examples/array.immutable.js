
function add(array, value) {
  // return array.concat(array, value);
  return [...array, value];
}

function remove(array, index) {
  // return array.concat(array.slice(0, index), array.slice(index + 1));
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

function increment(array, index) {
  // return array.concat(array.slice(0, index), array[index]+1, array.slice(index + 1));
  // console.log(array.slice(0, index))
  // console.log(array[index])
  // console.log(array.slice(index + 1))

  return [...array.slice(0, index), array[index] + 1,...array.slice(index + 1)];
}


module.exports =  { add, remove, increment};