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
      const parts = line.split(' '),
        fieldName = parts[0].replace(':',''),
        set1 = parts[1],
        set2 = parts[3];

      rules[fieldName] = new RegExp(`/${buildRegex(set1)}|${buildRegex(set2)}/`);
    } else if (line.indexOf('your ticket') !== -1) {
      // Grab my ticket from next line
      i++;
      myTicket = input[i];
    } else if (line.indexOf('nearby') !== -1) {
      continue;
    } else {
      // Get ticket
      tickets.push(line);
    }
  }
}

let errorRate = 0;

tickets.forEach((ticket) => {
  const values = ticket.split(',');
  values.forEach((val) => {
    let valid = Object.keys(rules).some((rule) => {
      return rules[rule].test(val);
    });

    if (!valid) {
      errorRate += +val;
    }
  });
});

console.log('Error rate:', errorRate);
