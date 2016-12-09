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
    input = fs.readFileSync('./day9input.txt', { encoding: 'utf-8' }),
    debug = false,
    decompressedString = '';

// input = 'ADVENT';
// input = 'A(1x5)BC';
// input = '(3x3)XYZ';
// input = 'A(2x2)BCD(2x2)EFG';
// input = '(6x1)(1x3)A';
// input = 'X(8x2)(3x3)ABCY';
// input = '(27x12)(20x12)(13x14)(7x10)(1x12)A';
// input = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN';

input = input.replace(/[\s\n\t\r]/g, '');

log(input);

function decompressString(str) {
    var decompString = '',
        endOfString = false,
        charIndex = 0;

    while (!endOfString) {
        var char = str[charIndex];

        if (char === '(') {
            var closingParen = str.indexOf(')', charIndex) + 1;
            var marker = str.substring(charIndex, closingParen);
            var matches = marker.match(/\((\d+)x(\d+)\)/);
            var numOfChars = parseInt(matches[1], 10);
            var repeatBy = parseInt(matches[2], 10);

            log(marker);
            log(numOfChars);
            log(repeatBy);

            var stringToRepeat = str.substr(closingParen, numOfChars);

            log(stringToRepeat);

            for (var i=0; i < repeatBy; i++) {
                decompString += stringToRepeat;
            }

            log('charIndex is ' + charIndex);
            charIndex += numOfChars + marker.length;
            log('charIndex increased to ' + charIndex);
        } else {
            decompString += char;
            charIndex += 1;
        }

        if (charIndex >= str.length) {
            endOfString = true;
        }
    }

    // Addition for part 2 - Recursion!  buffer overflows means you can't do the normal way :(
    // if (decompString.indexOf('(') > -1) {
    //     decompString = decompressString(decompString);
    // }

    return decompString;
}

decompressedString = decompressString(input);

// console.log(decompressedString);
console.log(decompressedString.length);

// fs.writeFileSync('./day9input.txt', decompressedString);
