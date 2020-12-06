function log(msg, value) {
  if (debug) {
    if (msg && (value || value === 0)) {
      console.log(msg, value);
    } else {
      console.log(msg);
    }
  }
}

const day = 4,
  fs = require('fs'),
  input = fs.readFileSync(`./day${day}.txt`, { encoding: 'utf-8' }).split('\n'),
  debug = true;

let validPassports = 0,
  passport = '';

// Part one validation
// function isPassportValid(passport) {
//   const reqFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

//   return !reqFields.some((field) => passport.indexOf(`${field}:`) === -1);
// }

// Part two validation
function isPassportValid(passport) {
  const reqFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

  return !reqFields.some((field) => {
    const fieldIndex = passport.indexOf(`${field}:`);

    if (fieldIndex === -1) {
      return true;
    } else {
      const fieldValue = passport.substring(fieldIndex+4, passport.indexOf(' ', fieldIndex));

      switch (field) {
        case 'byr':

          return (isNaN(fieldValue) || +fieldValue < 1920 || +fieldValue > 2002);
        case 'iyr':
          return (isNaN(fieldValue) || +fieldValue < 2010 || +fieldValue > 2020);
        case 'eyr':
          return (isNaN(fieldValue) || +fieldValue < 2020 || +fieldValue > 2030);
        case 'hgt':
          const isValidPattern = fieldValue.match(new RegExp(/^(\d+)(cm|in)$/));

          if (isValidPattern) {
            const heightValue = isValidPattern[1],
              heightUnit = isValidPattern[2];

            if (heightUnit === 'cm') {
              return heightValue < 150 || heightValue > 193;
            } else {
              return heightValue < 59 || heightValue > 76;
            }
          }

          return !isValidPattern;
        case 'hcl':
          return !fieldValue.match(new RegExp(/^#[0-9|a-f]{6}$/));
        case 'ecl':
          return !fieldValue.match(new RegExp(/^(amb|blu|brn|gry|grn|hzl|oth)$/));
        case 'pid':
          return !fieldValue.match(new RegExp(/^\d{9}$/));
        default:
          return false;
      }
    }
  });
}

input.forEach((line) => {
  if (line.length > 1) {
    passport += line + ' ';
  } else {
    validPassports += isPassportValid(passport) ? 1 : 0;
    passport = '';
  }
});

console.log('Valid passports:', validPassports);
