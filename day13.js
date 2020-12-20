function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 13,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  debug = true;

// Part one
// const timestamp = +input[0],
//   buses = input[1].split(',').filter((bus) => bus !== 'x').map((bus) => +bus).sort((a,b) => +a-+b),
//   schedule = buses.map((bus) => {
//     return {
//       waitTime: bus - timestamp%bus,
//       bus
//     };
//   }).sort((a,b) => +a.waitTime-+b.waitTime);

// console.log('Bus to take:', schedule[0].bus * schedule[0].waitTime);

// Part two (An attempt at CRT)
// const routes = [],
//   offsets = [];

// input[1].split(',').forEach((bus, idx) => {
//   if (bus !== 'x') {
//     routes.push(+bus);
//     offsets.push(idx);
//   }
// });

// let prod = 1;
// routes.forEach((route) => prod *= route);

// function getXi(Ni, mod) {
//   let a = Ni - (mod * Math.floor(Ni/mod));

//   if (a === 1) {
//     return a;
//   }

//   let i = 2;
//   while ((i*a) % mod != 1) {
//     i += 1;
//   }

//   return i;
// }

// function createBus(id, offset, N) {
//   const bi = offset,
//     mod = id,
//     Ni = Math.floor(N / mod),
//     xi = getXi(Ni, mod),
//     product = bi*Ni*xi;

//   return {
//     bi,
//     mod,
//     Ni,
//     xi,
//     product
//   };
// }

// const buses = [];
// routes.forEach((route, idx) => {
//   buses.push(createBus(route, offsets[idx], prod));
// })

// let sum = 0;
// buses.forEach((bus) => sum += bus.product);

// let reducedRemainder = sum - prod * Math.floor(sum/prod);

// console.log(prod-reducedRemainder);
// console.log(prod%reducedRemainder);
// console.log(sum%prod);

// Part two (someone's converted Python script)
// create pairs of (divisor, remainder) for every available bus
const buses = [];
input[1].split(',').forEach((bus, idx) => {
  if (bus !== 'x') {
    buses.push({
      id: +bus,
      mod: idx === 0 ? 0 : +bus - idx % +bus
    });
  }
});

console.log(buses);

let result = 0,
  increment = 1;

buses.forEach((bus) => {
  while (result % bus.id !== bus.mod) {
    result += increment;
  }
  increment *= bus.id;
});

console.log(result);
