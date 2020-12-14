function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 10,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n').map((voltage) => +voltage),
  debug = true;

// Part one
// let jolt1 = 0,
//   jolt3 = 1; // Start with 1 to account for device

// input.push(0); // Charging adapter
// input.sort((a,b) => +b-+a);

// input.forEach((adapter, idx) => {
//   if (idx < input.length) {
//     switch(input[idx]-input[idx+1]) {
//       case 1:
//         jolt1 += 1;
//         break;
//       case 3:
//         jolt3 += 1;
//         break;
//     }
//   }
// });

// console.log('1-jolt:', jolt1);
// console.log('3-jolt:', jolt3);
// console.log('Answer:', jolt1*jolt3);

// Part two
input.sort((a,b) => +a-+b);
input.unshift(0);

const branchTable = {};

function countBranches(node) {
  const idx = input.indexOf(node);
  let branches = 0;

  if (node === input[input.length-1]) {
    return 1;
  }

  if (branchTable[node]) {
    return branchTable[node];
  }

  if (input[idx+1] - node <= 3) {
    branches += countBranches(input[idx+1]);
  }

  if (input[idx+2] - node <= 3) {
    branches += countBranches(input[idx+2]);
  }

  if (input[idx+3] - node <= 3) {
    branches += countBranches(input[idx+3]);
  }

  branchTable[node] = branches;

  return branches;
}

console.log(countBranches(0));
