function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 6,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  // input = [
  //   'abc',
  //   '',
  //   'a',
  //   'b',
  //   'c',
  //   '',
  //   'ab',
  //   'ac',
  //   '',
  //   'a',
  //   'a',
  //   'a',
  //   'a',
  //   '',
  //   'b',
  //   ''
  // ];
  debug = true;

let group = {},
  persons = 0,
  totalYes = 0;

// Part one
// input.forEach((line) => {
//   if (line.length > 0) {
//     for (let i=0; i < line.length; i++) {
//       group[line[i]] = 1;
//     }
//   } else {
//     totalYes += Object.keys(group).length;
//     group = {};
//   }
// });

// Part two
input.forEach((line) => {
  if (line.length > 0) {
    for (let i=0; i < line.length; i++) {
      if (group[line[i]]) {
        group[line[i]] += 1;
      } else {
        group[line[i]] = 1;
      }
    }
    persons += 1;
  } else {
    Object.keys(group).forEach((question) => {
      if (group[question] === persons) {
        totalYes += 1;
      }
    });
    group = {};
    persons = 0;
  }
});

console.log(totalYes);
