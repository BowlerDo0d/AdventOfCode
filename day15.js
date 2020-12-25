function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 15,
  fs = require('fs'),
  input = [0,3,6],
  debug = true;

const totalTurns = 2020;
  spokenNumbers = [];

input.forEach((value) => spokenNumbers.unshift(value));
spokenNumbers.unshift(0);

for (let i=spokenNumbers.length; i < totalTurns; i++) {
  let target = spokenNumbers[0],
    targetIndex = spokenNumbers.indexOf(target, 1);

  if (targetIndex === -1) {
    // New number
    spokenNumbers.unshift(0);
  } else {
    spokenNumbers.unshift(targetIndex);
  }
  console.log(`Turn ${i+1}: ${spokenNumbers[0]}`);
}

console.log(`Last spoken number after ${totalTurns} turns: ${spokenNumbers[0]}`);

// Part two after attempts at optimization
// const totalTurns = 30000000, // 2020,
//   spokenNumbers = {};

// input.forEach((value, idx) => spokenNumbers[value] = idx+1);

// let lastSpokenNumber = 0;

// for (let i=input.length+1; i < totalTurns; i++) {
//   let target = spokenNumbers[lastSpokenNumber] || false;

//   spokenNumbers[lastSpokenNumber] = i;

//   if (!target) {
//     // New number
//     lastSpokenNumber = 0;
//   } else {
//     lastSpokenNumber = i - target;
//   }

//   // console.log(`Turn ${i+1}: ${lastSpokenNumber}`);
// }

// console.log(`Last spoken number after ${totalTurns} turns: ${lastSpokenNumber}`);
