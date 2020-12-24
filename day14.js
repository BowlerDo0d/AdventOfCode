function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 14,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  debug = true;

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

const memory = {};
let mask = null;

// Part one
// input.forEach((line) => {
//   if (line.indexOf('mask') !== -1) {
//     mask = line.split(' ')[2];
//   } else {
//     const pattern = new RegExp(/^mem\[(\d+)\] = (\d+)/),
//       pieces = line.match(pattern),
//       address = +pieces[1];
//     let binaryValue = ('000000000000000000000000000000000000' + (pieces[2] >>> 0).toString(2)).slice(-36);

//     for (let i=0; i<mask.length; i++) {
//       if (mask[i] !== 'X') {
//         binaryValue = replaceAt(binaryValue, i, mask[i]);
//       }
//     }

//     memory[address] = parseInt(binaryValue, 2);
//   }
// });

// Part two
function writeToMemory(address, value) {
  const indexOfX = address.indexOf('X');

  if (indexOfX === -1) {
    memory[parseInt(address, 2)] = value;
  } else {
    writeToMemory(replaceAt(address, indexOfX, '0'), value);
    writeToMemory(replaceAt(address, indexOfX, '1'), value);
  }
}

input.forEach((line) => {
  if (line.indexOf('mask') !== -1) {
    mask = line.split(' ')[2];
  } else {
    const pattern = new RegExp(/^mem\[(\d+)\] = (\d+)/),
      pieces = line.match(pattern),
      address = +pieces[1],
      value = +pieces[2];
    let binaryAddress = ('000000000000000000000000000000000000' + (address >>> 0).toString(2)).slice(-36);

    for (let i=0; i<mask.length; i++) {
      if (mask[i] !== '0') {
        binaryAddress = replaceAt(binaryAddress, i, mask[i]);
      }
    }

    writeToMemory(binaryAddress, value);
  }
});

let total = 0;
Object.keys(memory).forEach((slot) => total += isNaN(memory[slot]) ? 0 : memory[slot]);

console.log('Total:', total);
