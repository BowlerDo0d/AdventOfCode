function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var debug = false,
  discs = [
    [1, 0, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 18, 17, 16, 15, 14, 13, 12, 11],
    [2, 1, 0],
    [1, 0, 6, 5, 4, 3, 2],
    [3, 2, 1, 0, 4],
    [5, 4, 3, 2, 1, 0, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
    // Part 2
    [0, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  ],
  last = null,
  timer = -1; // Start at -1 to compensate for the 1 second delay of the initial drop to first disc

for (var i = 1; i < discs.length; i++) {
  for (var j = 0; j < i; j++) {
    last = discs[i].pop();
    discs[i].unshift(last);
  }
}

function goTime() {
  return !discs.some(function (disc) {
    return disc[0] !== 0;
  });
}

function shift() {
  discs.forEach(function (disc) {
    var last = disc.pop();
    disc.unshift(last);
  });
}

log(discs);

while (!goTime()) {
// while (timer < 5) {
  shift();
  timer += 1;
  log(discs);
}

console.log(timer);
// console.log(discs);
