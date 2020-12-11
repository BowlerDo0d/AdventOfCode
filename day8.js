function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 8,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n').map((cmd) => {
    return {
      operation: cmd.substr(0, 3),
      value: +cmd.substring(4, cmd.length),
      hasExecuted: false
    };
  }),
  debug = true;

let accumulator = 0,
  instruction = 0,
  jmps = [];

function execute(command) {
  switch(command.operation) {
    case 'acc':
      accumulator += command.value;
      instruction += 1;
      break;
    case 'jmp':
      instruction += command.value;
      // if (jmps.indexOf(command.value) === -1) {
      //   jmps.push(command.value);
      // }
      break;
    default:
      instruction += 1;
  }
}

let running = true;
while (instruction < input.length && running) {
  let nextCommand = input[instruction];

  if (nextCommand.hasExecuted) {
    console.log('Infinite loop starting!');
    running = false;
  }

  execute(nextCommand);
  nextCommand.hasExecuted = true;
}

console.log('Accumulator:', accumulator);
// console.log(jmps.length);
// console.log(jmps);
