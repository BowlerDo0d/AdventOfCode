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
  input = fs.readFileSync('./day1.txt', { encoding: 'utf-8' }).split('\n'),
  // input = [1721, 979, 366, 299, 675, 1456],
  debug = true,
  product = 0;

input = input.filter((val) => {
  return +val >= 0 && +val <= 2000;
});

// Part 1
// input.some((val1, idx1) => {
//   return input.some((val2, idx2) => {
//     if (idx1 === idx2) {
//       return false;
//     }

//     sum = +val1 + +val2;

//     if (sum === 2020) {
//       product = +val1 * +val2;
//     }

//     return product;
//   });
// });

// Part 2
input.some((val1, idx1) => {
  return input.some((val2, idx2) => {
    return input.some((val3, idx3) => {
      if (idx1 === idx2 && idx2 === idx3) {
        return false;
      }

      sum = +val1 + +val2 + +val3;

      if (sum === 2020) {
        product = +val1 * +val2 * +val3;
      }

      return product;
    });
  });
});

console.log('Answer: ', product);
