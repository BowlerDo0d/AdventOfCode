function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 5,
  fs = require('fs'),
  debug = true;
let input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n');

// input = input.sort();

function translate(str, alphabet) {
  var abc = "BFLR";
  return [].map.call(str, function(c) {
      return alphabet[abc.indexOf(c)] || c;
  }).join("");
}

var sortingString = "BFRL";

input.sort(function(a, b) {
  return translate(a, sortingString).localeCompare(translate(b, sortingString));
});

for(let i=0; i < 872 ; i++) {
  console.log(input[i]);
}

// Disclaimer: This one isn't pretty because I brute forced it by sorting :(