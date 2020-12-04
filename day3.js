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
  // input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  input = [
    'A.##.......',
    '#..A#...#..',
    '.#....A..#.',
    '..#.#...#A#',
    '.A...##..#.',
    '..#.A#.....',
    '.#.#.#.A..#',
    '.#........A',
    '#.A#...#...',
    '#...#A....#',
    '.#..#...A.#'
  ],
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
  debug = true,
  patternLength = input[0].length,
  slopeRight = 3,
  slopeDown = 1;

let currentRow = 0,
  currentCol = 0,
  treeCount = 0;

while (currentRow < input.length - 1) {
  currentRow += slopeDown;
  currentCol += slopeRight;

  // Shift for repeating patterns
  if (currentCol > patternLength) {
    log(currentCol);
    log(patternLength);
    currentCol = currentCol - patternLength;
  }
  log('Row:', currentRow+1);
  log('Col:', currentCol+1);
  log(input[currentRow]);
  log(input[currentRow].charAt(currentCol));
  if (input[currentRow].charAt(currentCol) === '#') {
    treeCount++;
  }
}

console.log('Total trees smacked:', treeCount);
