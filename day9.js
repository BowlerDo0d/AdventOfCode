function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 9,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n').map((number) => +number),
  // input = [35,20,15,25,47,40,62,55,65,95,102,117,150,182,127,219,299,277,309,576],
  debug = true,
  preamble = 25;
let problemNumber = 0;

// Part one
for(let i=preamble; i<input.length; i++) {
  const possibles = [];
  for(let j=preamble; j>0; j--) {
    for(let k=j-1; k>0; k--) {
      possibles.push(input[i-j] + input[i-k]);
    }
  }

  if (possibles.indexOf(input[i]) === -1) {
    problemNumber = input[i];
    console.log('First issue:', problemNumber);
    break;
  }
}

// Part two (using part one)
for(let x=0; x<input.length; x++) {
  const range = [];
  let sum = 0,
    answer = 0;

  for(let y=x; y<input.length; y++) {
    sum += input[y];
    range.push(input[y]);

    if (sum > problemNumber) {
      break;
    } else if (sum === problemNumber) {
      console.log('Start index:', x);
      console.log('End index:', y);
      console.log('Range:', range);
      console.log('Range sorted:', range.sort((a,b) => +a-+b));
      console.log('Lowest:', range[0]);
      console.log('Highest:', range[range.length-1]);
      answer = range[0] + range[range.length-1];
      console.log('Answer:', answer);
      break;
    }
  }

  if (answer) {
    break;
  }
}
