function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 3,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n').map((line) => line.substring(0, line.length-1)),
  // input = [
  //   '..##.......',
  //   '#...#...#..',
  //   '.#....#..#.',
  //   '..#.#...#.#',
  //   '.#...##..#.',
  //   '..#.##.....',
  //   '.#.#.#....#',
  //   '.#........#',
  //   '#.##...#...',
  //   '#...##....#',
  //   '.#..#...#.#'
  // ],
  debug = false,
  patternLength = input[0].length;

function checkSlope(right, down) {
  let currentRow = 0,
    currentCol = 0,
    treeCount = 0;

  while (currentRow < input.length - 1) {
    currentRow += down;
    currentCol += right;

    // Shift for repeating patterns
    if (currentCol >= patternLength) {
      currentCol -= patternLength;
    }

    log('Row:', currentRow+1);
    log('Col:', currentCol+1);
    log('---');
    log(input[currentRow]);
    log(input[currentRow].charAt(currentCol));

    if (input[currentRow].charAt(currentCol) === '#') {
      treeCount++;
    }
  }

  return treeCount;
}

// Part one
// console.log('Total trees smacked:', checkSlope(3, 1));

// Part two
console.log('Plethora of trees:', checkSlope(1,1) * checkSlope(3,1) * checkSlope(5,1) * checkSlope(7,1) * checkSlope(1,2));
