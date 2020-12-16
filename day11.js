function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 11,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n').map((line) => {
    const chars = [];
    for(let i=0; i<line.length; i++) {
      chars.push(line[i]);
    }
    return chars;
  }),
  debug = true;

function isEqual(array1, array2) {
  let equality = true;

  for (let i=0; i<array1.length; i++) {
    for (let j=0; j<array1[i].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        equality = false;
        break;
      }
    }

    if (!equality) {
      break;
    }
  }

  return equality;
}

function clone(sourceArray) {
  return JSON.parse(JSON.stringify(sourceArray));
}

function countOccupiedSeats(arr) {
  let count = 0;

  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr[i].length; j++) {
      if (arr[i][j] === '#') {
        count += 1;
      }
    }
  }

  return count;
}

function prettyPrint(arr) {
  arr.forEach((line) => {
    let str = '';
    line.forEach((chr) => str += `[${chr}]`);
    console.log(str);
  });
}

// Part one
// function shouldOccupySeat(chart, seatRow, seatCol) {
//   if (
//     // Check same row
//     (seatCol-1 >= 0 && chart[seatRow][seatCol-1] === '#') ||
//     (seatCol+1 < chart[seatRow].length && chart[seatRow][seatCol+1] === '#') ||
//     // Check upper row
//     (seatRow-1 >= 0 &&
//      ((seatCol-1 >= 0 && chart[seatRow-1][seatCol-1] === '#') ||
//        chart[seatRow-1][seatCol] === '#' ||
//       (seatCol+1 < chart[seatRow].length && chart[seatRow-1][seatCol+1] === '#'))) ||
//     // Check lower row
//     (seatRow+1 < chart.length &&
//      ((seatCol-1 >= 0 && chart[seatRow+1][seatCol-1] === '#') ||
//        chart[seatRow+1][seatCol] === '#' ||
//       (seatCol+1 < chart[seatRow].length && chart[seatRow+1][seatCol+1] === '#')))
//   ) {
//     return false;
//   }

//   return true;
// }

// function shouldEmptySeat(chart, seatRow, seatCol) {
//   let occupiedSeats = 0;

//   // Check same row
//   if (seatCol-1 >= 0 && chart[seatRow][seatCol-1] === '#') {
//     occupiedSeats += 1;
//   }
//   if (seatCol+1 < chart[seatRow].length && chart[seatRow][seatCol+1] === '#') {
//     occupiedSeats += 1;
//   }

//   // Check upper row
//   if (seatRow-1 >= 0) {
//     if (seatCol-1 >= 0 && chart[seatRow-1][seatCol-1] === '#') {
//       occupiedSeats += 1;
//     }
//     if (chart[seatRow-1][seatCol] === '#') {
//       occupiedSeats += 1;
//     }
//     if (occupiedSeats < 4 && seatCol+1 < chart[seatRow].length && chart[seatRow-1][seatCol+1] === '#') {
//       occupiedSeats += 1;
//     }
//   }

//   // Check lower row
//   if (occupiedSeats < 4 && seatRow+1 < chart.length) {
//     if (seatCol-1 >= 0 && chart[seatRow+1][seatCol-1] === '#') {
//       occupiedSeats += 1;
//     }
//     if (occupiedSeats < 4 && chart[seatRow+1][seatCol] === '#') {
//       occupiedSeats += 1;
//     }
//     if (occupiedSeats < 4 && seatCol+1 < chart[seatRow].length && chart[seatRow+1][seatCol+1] === '#') {
//       occupiedSeats += 1;
//     }
//   }

//   return occupiedSeats >= 4;
// }

// Part two
function isSeat(chart, seatRow, seatCol) {
  if (seatRow < 0 || seatRow > chart.length ||
      seatCol < 0 || seatCol > chart[seatRow].length) {
    return false;
  }

  return chart[seatRow][seatCol] !== '.';
}

function isSeatOccupied(chart, seatRow, seatCol) {
  if (seatRow < 0 || seatRow > chart.length ||
      seatCol < 0 || seatCol > chart[seatRow].length) {
    return false;
  }

  return chart[seatRow][seatCol] === '#';
}

function shouldOccupySeat(chart, seatRow, seatCol) {
  let canSeeOccupiedSeat = false;

  // Check W
  for (let w=seatCol-1; w>=0; w--) {
    if (isSeat(chart, seatRow, w)) {
      canSeeOccupiedSeat = isSeatOccupied(chart, seatRow, w);
      break;
    }
  }

  if (!canSeeOccupiedSeat) {
    // Check E
    for (let e=seatCol+1; e<chart[seatRow].length; e++) {
      if (isSeat(chart, seatRow, e)) {
        canSeeOccupiedSeat = isSeatOccupied(chart, seatRow, e);
        break;
      }
    }

    if (!canSeeOccupiedSeat) {
      // Check N
      for (let n=seatRow-1; n>=0; n--) {
        if (isSeat(chart, n, seatCol)) {
          canSeeOccupiedSeat = isSeatOccupied(chart, n, seatCol);
          break;
        }
      }

      if (!canSeeOccupiedSeat) {
        // Check S
        for (let s=seatRow+1; s<chart.length; s++) {
          if (isSeat(chart, s, seatCol)) {
            canSeeOccupiedSeat = isSeatOccupied(chart, s, seatCol);
            break;
          }
        }

        if (!canSeeOccupiedSeat) {
          const max = chart.length - chart[0].length > 0 ? chart.length : chart[0].length;

          // Check NW
          for (let nwr=seatRow-1, nwc=seatCol-1; nwr>=0; nwr--, nwc--) {
            if (isSeat(chart, nwr, nwc)) {
              canSeeOccupiedSeat = isSeatOccupied(chart, nwr, nwc);
              break;
            }
          }

          if (!canSeeOccupiedSeat) {
            // Check NE
            for (let ner=seatRow-1, nec=seatCol+1; nec<max; ner--, nec++) {
              if (isSeat(chart, ner, nec)) {
                canSeeOccupiedSeat = isSeatOccupied(chart, ner, nec);
                break;
              }
            }

            if (!canSeeOccupiedSeat) {
              // Check SW
              for (let swr=seatRow+1, swc=seatCol-1; swr<max; swr++, swc--) {
                if (isSeat(chart, swr, swc)) {
                  canSeeOccupiedSeat = isSeatOccupied(chart, swr, swc);
                  break;
                }
              }

              if (!canSeeOccupiedSeat) {
                // Check SE
                for (let ser=seatRow+1, sec=seatCol+1; ser<max; ser++, sec++) {
                  if (isSeat(chart, ser, sec)) {
                    canSeeOccupiedSeat = isSeatOccupied(chart, ser, sec);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return !canSeeOccupiedSeat;
}

function shouldEmptySeat(chart, seatRow, seatCol) {
  let occupiedSeats = 0;

  // Check W
  for (let w=seatCol-1; w>=0; w--) {
    if (isSeat(chart, seatRow, w)) {
      if (isSeatOccupied(chart, seatRow, w)) {
        occupiedSeats += 1;
      }
      break;
    }
  }

  // Check E
  for (let e=seatCol+1; e<chart[seatRow].length; e++) {
    if (isSeat(chart, seatRow, e)) {
      if (isSeatOccupied(chart, seatRow, e)) {
        occupiedSeats += 1;
      }
      break;
    }
  }

  // Check N
  for (let n=seatRow-1; n>=0; n--) {
    if (isSeat(chart, n, seatCol)) {
      if (isSeatOccupied(chart, n, seatCol)) {
        occupiedSeats += 1;
      }
      break;
    }
  }

  // Check S
  for (let s=seatRow+1; s<chart.length; s++) {
    if (isSeat(chart, s, seatCol)) {
      if (isSeatOccupied(chart, s, seatCol)) {
        occupiedSeats += 1;
      }
      break;
    }
  }

  const max = chart.length - chart[0].length > 0 ? chart.length : chart[0].length;

  // Check NW
  for (let nwr=seatRow-1, nwc=seatCol-1; nwr>=0; nwr--, nwc--) {
    if (isSeat(chart, nwr, nwc)) {
      if (isSeatOccupied(chart, nwr, nwc)) {
        occupiedSeats += 1;
      }
      break;
    }
  }

  if (occupiedSeats < 5) {
    // Check NE
    for (let ner=seatRow-1, nec=seatCol+1; nec<max; ner--, nec++) {
      if (isSeat(chart, ner, nec)) {
        if (isSeatOccupied(chart, ner, nec)) {
          occupiedSeats += 1;
        }
        break;
      }
    }

    if (occupiedSeats < 5) {
      // Check SW
      for (let swr=seatRow+1, swc=seatCol-1; swr<max; swr++, swc--) {
        if (isSeat(chart, swr, swc)) {
          if (isSeatOccupied(chart, swr, swc)) {
            occupiedSeats += 1;
          }
          break;
        }
      }

      if (occupiedSeats < 5) {
        // Check SE
        for (let ser=seatRow+1, sec=seatCol+1; ser<max; ser++, sec++) {
          if (isSeat(chart, ser, sec)) {
            if (isSeatOccupied(chart, ser, sec)) {
              occupiedSeats += 1;
            }
            break;
          }
        }
      }
    }
  }

  return occupiedSeats >= 5;
}

let chartB = clone(input),
  chartA = [];

do {
  chartA = clone(chartB);

  for (let i=0; i<chartA.length; i++) {
    for (let j=0; j<chartA[i].length; j++) {
      let seat = chartA[i][j];
      switch (seat) {
        case 'L':
          if (shouldOccupySeat(chartA, i, j)) {
            chartB[i][j] = '#';
          }
          break;
        case '#':
          if (shouldEmptySeat(chartA, i, j)) {
            chartB[i][j] = 'L';
          }
          break;
      }
    }
  }

  // prettyPrint(chartB);
  // console.log('----------------------');
} while (!isEqual(chartA, chartB));

console.log('Occupied seats:', countOccupiedSeats(chartA));
