function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 12,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  debug = true;

// Part one
let facing = 0,
  x = 10,
  y = 1,
  shipX = 0,
  shipY = 0;

input.forEach((instruction) => {
  const command = instruction[0],
    value = +instruction.substr(1);
  let temp = null;

  switch (command) {
    case 'N':
      y += value;
      break;
    case 'S':
      y -= value;
      break;
    case 'E':
      x += value;
      break;
    case 'W':
      x -= value;
      break;
    case 'L':
      switch (value) {
        case 90:
          temp = x;
          x = y * -1;
          y = temp;
          break;
        case 180:
          x *= -1;
          y *= -1;
          break;
        case 270:
          temp = y;
          y = x * -1;
          x = temp;
          break;
      }
      break;
    case 'R':
      switch (value) {
        case 90:
          temp = y;
          y = x * -1;
          x = temp;
          break;
        case 180:
          x *= -1;
          y *= -1;
          break;
        case 270:
          temp = x;
          x = y * -1;
          y = temp;
          break;
      }
      break;
    case 'F':
      shipX += x * value;
      shipY += y * value;
      break;
    // Part one
    // case 'L':
    //   facing += value;

    //   if (facing >= 360) {
    //     facing -= 360;
    //   }
    //   break;
    // case 'R':
    //   facing -= value;

    //   if (facing < 0) {
    //     facing += 360;
    //   }
    //   break;
    // case 'F':
    //   switch (facing) {
    //     case 0:
    //       x += value;
    //       break;
    //     case 90:
    //       y += value;
    //       break;
    //     case 180:
    //       x -= value;
    //       break;
    //     case 270:
    //       y -= value;
    //       break;
    //   }
    //   break;
  }
});

console.log('Manhattan distance:', Math.abs(shipX) + Math.abs(shipY));
