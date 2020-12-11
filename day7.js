function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 7,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  debug = true,
  luggageRules = {};

// const luggageRules = {
//   'light red': [{
//     style: 'bright white',
//     quantity: 1
//   },{
//     style: 'muted yellow',
//     quantity: 2
//   }]
// };

input.forEach((rule) => {
  const firstIndex = rule.indexOf('bags contain'),
    bagStyle = rule.substring(0, firstIndex - 1),
    bagRules = rule.substring(firstIndex + 13, rule.length).split(', ');

  luggageRules[bagStyle] = [];

  bagRules.forEach((bagRule) => {
    const segments = bagRule.split(' '),
      quantity = segments[0];

    if (!isNaN(quantity)) {
      luggageRules[bagStyle].push({
        style: segments.splice(1, segments.length - 2).join(' '),
        quantity: +quantity
      });
    }
  });
});

const startingBag = 'shiny gold';

// Part one
// let allPossibleBags = [],
//   newPossibleBags = [];

// function checkBags(targetBag) {
//   Object.keys(luggageRules).forEach((key) => {
//     luggageRules[key].forEach((bag) => {
//       if (bag.style === targetBag && newPossibleBags.indexOf(key) === -1) {
//         newPossibleBags.push(key);
//       }
//     });
//   });
// }

// checkBags(startingBag);

// do {
//   let tempBags = [...newPossibleBags];
//   newPossibleBags.forEach((newBag) => {
//     if (allPossibleBags.indexOf(newBag) === -1) {
//       allPossibleBags.push(newBag);
//     }
//   });
//   newPossibleBags = [];

//   tempBags.forEach((newBag) => checkBags(newBag));
// } while(newPossibleBags.length > 0);

// console.log(`Possible bags to eventually contain ${startingBag}:`, allPossibleBags.length);

// Part two
function countBags(bagStyle) {
  let totalBags = 0;
  luggageRules[bagStyle].forEach((bag) => {
    totalBags += bag.quantity + (countBags(bag.style) * bag.quantity);
  });

  return totalBags;
}

console.log('Total bags:', countBags('shiny gold'));
