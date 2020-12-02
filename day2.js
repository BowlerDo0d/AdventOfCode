function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

var fs = require('fs'),
  input = fs.readFileSync('./day2.txt', { encoding: 'utf-8' }).split('\n'),
  // input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'],
  debug = true;


let validPasswords = 0;

// Part 1
// input.forEach((pass) => {
//   const data = pass.split(' '),
//     range = data[0].split('-'),
//     min = +range[0],
//     max = +range[1],
//     chr = data[1].replace(':',''),
//     password = data[2],
//     matches = password.match(new RegExp(chr, 'g')) || [],
//     chrCount = matches.length;

//     log(chrCount);

//     if (chrCount >= min && chrCount <= max) {
//       validPasswords++;
//     }
// });

// Part 2
input.forEach((pass) => {
  const data = pass.split(' '),
    range = data[0].split('-'),
    min = +range[0],
    max = +range[1],
    chr = data[1].replace(':',''),
    password = data[2],
    firstPosMatch = password[min-1] === chr || false,
    secondPosMatch = password[max-1] === chr || false;

    if ((firstPosMatch || secondPosMatch) && firstPosMatch !== secondPosMatch) {
      validPasswords++;
    }
});

console.log('Valid passwords:', validPasswords);
