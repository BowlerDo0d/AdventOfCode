function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 16,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  debug = true;

const rules = {},
  tickets = [];
let myTicket = null;

function buildRegex(range) {
  const parts = range.split('-'),
    start = parts[0],
    end = parts[1];

  let regex = '';

  if (start.length === 1 && end.length === 1) {
      regex += `[${start}-${end}]{1}`;
  } else {
    if (start.length === 1) {
      regex += `[${start}-9]{1}`;
    } else {
      regex += `${start.substr(0,start.length-1)}[${start[start.length-1]}-9]`;
    }

    for (let i=+start.substr(0,start.length-1)+1; i < Math.floor(+end/10); i++) {
      regex += `|${i}[0-9]`;
    }

    regex += `|${end.substr(0,end.length-1)}[0-${end[end.length-1]}]`;
  }

  return `^(${regex})$`;
}

for (let i=0; i<input.length; i++) {
  const line = input[i];

  if (line.length) {
    if (line.indexOf(': ') !== -1) {
      // Add rule
      const parts = line.split(':'),
        fieldName = parts[0],
        sets = parts[1].split(' '),
        set1 = sets[1],
        set2 = sets[3];

      rules[fieldName] = new RegExp(`${buildRegex(set1)}|${buildRegex(set2)}`);
    } else if (line.indexOf('your ticket') !== -1) {
      // Grab my ticket from next line
      i++;
      myTicket = input[i];
    } else if (line.indexOf('nearby') !== -1) {
      continue;
    } else {
      // Get ticket
      tickets.push(line.split(','));
    }
  }
}

const validTickets = [myTicket.split(',')];
let errorRate = 0;

tickets.forEach((ticket) => {
  let validTicket = true;

  ticket.forEach((value) => {
    let valid = Object.keys(rules).some((rule) => {
      return rules[rule].test(value);
    });

    if (!valid) {
      // Part one
      errorRate += +value;
      validTicket = false;
    }
  });

  if (validTicket) {
    validTickets.push(ticket);
  }
});

console.log(errorRate);

const possiblePositions = {};

Object.keys(rules).forEach((rule) => {
  let pattern = rules[rule];

  for (let i=0; i < validTickets[0].length; i++) {
    let invalidRule = validTickets.some((ticket) => {
      return !pattern.test(ticket[i]);
    });

    if (!invalidRule) {
      // Save the rule position
      if (possiblePositions[rule]) {
        possiblePositions[rule] = [...possiblePositions[rule], i];
      } else {
        possiblePositions[rule] = [i];
      }
    }
  }
});

const rulePositions = {},
  remainingPositions = [];
validTickets[0].forEach((v, i) => remainingPositions.push(i));

while (Object.keys(possiblePositions).length) {
  Object.keys(possiblePositions).forEach((ruleName) => {
    if (possiblePositions[ruleName].length === 1) {
      // Winner
      rulePositions[ruleName] = possiblePositions[ruleName][0];
      remainingPositions.splice(remainingPositions.indexOf(possiblePositions[ruleName][0]), 1);
      delete possiblePositions[ruleName];
    } else {
      possiblePositions[ruleName].forEach((pos, idx) => {
        if (remainingPositions.indexOf(pos) === -1) {
          possiblePositions[ruleName].splice(idx, 1);
        }
      });
    }
  });
}

console.log(possiblePositions);
console.log(rulePositions);

let answer = 1;

Object.keys(rulePositions).forEach((rulePosition) => {
  if (rulePosition.indexOf('departure') !== -1) {
    answer *= validTickets[0][rulePositions[rulePosition]];
  }
});

console.log(answer);
