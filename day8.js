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
  instructions = fs.readFileSync('./day8input.txt', { encoding: 'utf-8' }).split('\n'),
  debug = true,
  lcdWidth = 50,
  lcdHeight = 6,
  lcd = new Array(lcdHeight);

for (var i=0; i < lcd.length; i++) {
  lcd[i] = new Array(lcdWidth);
  for (var j=0; j < lcd[i].length; j++) {
    lcd[i][j] = 0;
  }
}

function printLCD() {
  log(new Array(100).join('-'));
  for (var i=0; i < lcd.length; i++) {
    var row = '';
    for (var j=0; j < lcd[i].length; j++) {
      row += (lcd[i][j] ? '#' : '-') + ' ';
    }
    log(row);
  }
  log(new Array(100).join('-'));
}

function activeBits() {
  var active = 0;
  for (var i=0; i < lcd.length; i++) {
    for (var j=0; j < lcd[i].length; j++) {
      active += lcd[i][j];
    }
  }
  return active;
}

function drawRect(width, height) {
  for (var i=0; i < height; i++) {
    for (var j=0; j < width; j++) {
      lcd[i][j] = 1;
    }
  }
}

function rotate(axis, idx, distance) {
  var temp = null;
  if (axis === 'row') {
    for (var i=0; i < distance; i++) {
      temp = lcd[idx][lcd[idx].length - 1];
      for (var j=lcd[idx].length - 1; j >= 0; j--) {
        if (j === 0) {
          lcd[idx][j] = temp;
        } else {
          lcd[idx][j] = lcd[idx][j-1];
        }
      }
    }
  } else if (axis === 'column') {
    for (var i=0; i < distance; i++) {
      temp = lcd[lcd.length - 1][idx];
      for (var j=lcd.length - 1; j >= 0; j--) {
        if (j === 0) {
          lcd[j][idx] = temp;
        } else {
          lcd[j][idx] = lcd[j-1][idx];
        }
      }
    }
  }
}

instructions.forEach(function (instruction) {
  var pieces = instruction.split(' '),
    action = pieces[0],
    sizes = null,
    axis = null,
    idx = null,
    distance = null;

  if (instruction.trim().length > 0) {
    log('Instruction: ' + instruction);

    if (action === 'rect') {
      sizes = pieces[1].split('x');
      log('You should draw a rect ' + sizes[0] + ' wide by ' + sizes[1] + ' tall!');

      drawRect(sizes[0], sizes[1]);
      printLCD();

    } else if (action === 'rotate') {
      axis = pieces[1];
      idx = pieces[2].split('=')[1];
      distance = pieces[4];
      log('You should rotate ' + axis + ' #' + idx + ' by ' + distance);

      rotate(axis, idx, distance);
      printLCD();

    }
  }
});

printLCD();
console.log(activeBits());
