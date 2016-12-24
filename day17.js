function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var Crypto = require('crypto'),
  input = 'ihgpwlah',
  debug = false,
  maxRows = 3,
  maxCols = 3,
  targetRow = 3,
  targetCol = 3,
  paths = [],
  shortestPath = null,
  isPathStillWorking = true,
  doorLocks = null,
  openOptions = [],
  unlockedValues = ['b', 'c', 'd', 'e', 'f'];

function pathFound() {
  var shortPath = false;

  paths.some(function (thisPath) {
    if (thisPath.row === targetRow && thisPath.col === targetCol) {
      shortPath = thisPath.path;
      return true;
    }
  });

  return shortPath;
}

// Setup initial path
paths.push({
  row: 0,
  col: 0,
  path: '',
  deadEnd: false,
  isFinished: false
});

while (isPathStillWorking && paths.length) {
  paths.forEach(function (thisPath, pathIndex) {
    if (!thisPath.isFinished) {
      openOptions.length = 0;
      // Determine open doors from current location
      doorLocks = Crypto.createHash('md5').update(input + thisPath.path).digest('hex').substr(0,4).split('');
      // log('Door locks ' + doorLocks);
      doorLocks.forEach(function (lock, idx) {
        if (unlockedValues.includes(lock)) {
          // Determine direction of unlocked door
          switch (idx) {
            case 0:
              // Up
              if (thisPath.row - 1 >= 0) {
                // log('Go up!');
                openOptions.push({
                  direction: 'U',
                  toRow: thisPath.row - 1,
                  toCol: thisPath.col
                });
              }
              break;
            case 1:
              // Down
              if (thisPath.row + 1 <= maxRows) {
                // log('Go down!');
                openOptions.push({
                  direction: 'D',
                  toRow: thisPath.row + 1,
                  toCol: thisPath.col
                });
              }
              break;
            case 2:
              // Left
              if (thisPath.col - 1 >= 0) {
                // log('Go left!');
                openOptions.push({
                  direction: 'L',
                  toRow: thisPath.row,
                  toCol: thisPath.col - 1
                });
              }
              break;
            case 3:
              // Right
              if (thisPath.col + 1 <= maxCols) {
                // log('Go right!');
                openOptions.push({
                  direction: 'R',
                  toRow: thisPath.row,
                  toCol: thisPath.col + 1
                });
              }
              break;
          }
        }
      });

      // Update/add possible paths to array
      if (openOptions.length) {
        if (openOptions.length > 1) {
          // Add new available paths to array
          openOptions.forEach(function (option, idx) {
            if (idx > 0) {
              paths.push({
                row: option.toRow,
                col: option.toCol,
                path: thisPath.path + option.direction,
                deadEnd: false,
                isFinished: false
              });
            }
          });
        }

        // Update current path
        thisPath.path += openOptions[0].direction;
        thisPath.row = openOptions[0].toRow;
        thisPath.col = openOptions[0].toCol;

        if (thisPath.row === targetRow && thisPath.col === targetCol) {
          thisPath.isFinished = true;
        }
      } else {
        // Dead end, flag path for removal
        thisPath.deadEnd = true;
        //log('Dead end');
      }
    }
  });

  for (var i = 0; i < paths.length; i++) {
    if (paths[i].deadEnd) {
      paths.splice(i--, 1);
    }
  }

  // Part 1
  // shortestPath = pathFound();

  // Part 2
  isPathStillWorking = paths.find(function (path) {
    return !path.isFinished;
  });
}

// console.log(shortestPath);
// console.log(paths.length);

paths.sort(function (pathA, pathB) {
  return pathA.path.length - pathB.path.length;
});

console.log(paths[0].path.length);
