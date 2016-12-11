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
    input = fs.readFileSync('./day9input.txt'),
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

// input = input.replace(/[\s\n\t\r]/g, '');

// log(input);

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

function decompressString2(buffer) {
  var decompressCount = 0,
    openParen = '('.charCodeAt(),
    closingParen = ')'.charCodeAt(),
    cursorPosition = 0,
    nextOpenParenIndex = buffer.indexOf(openParen, cursorPosition),
    answerFile = './day9input.txt',
    closingParenIndex = null,
    marker = null,
    matches = null,
    numOfChars = null,
    repeatBy = null,
    bufferToRepeat = null;

  while (nextOpenParenIndex !== -1) {
    decompressCount += nextOpenParenIndex - cursorPosition;
    cursorPosition = nextOpenParenIndex;

    closingParenIndex = buffer.indexOf(closingParen, cursorPosition) + 1;
    marker = buffer.slice(cursorPosition, closingParenIndex).toString('utf-8');
    matches = marker.match(/\((\d+)x(\d+)\)/);
    numOfChars = parseInt(matches[1], 10);
    repeatBy = parseInt(matches[2], 10);

    log('Marker: ' + marker);
    log('Matches: ' + matches);
    log('Num of chars: ' + numOfChars);
    log('Repeat by: ' + repeatBy);

    bufferToRepeat = buffer.slice(closingParenIndex, closingParenIndex + numOfChars);
    log('String to repeat: ' + bufferToRepeat.toString());

    if (bufferToRepeat.indexOf(openParen, 0) > -1) {
      decompressCount += decompressString2(bufferToRepeat) * repeatBy;
    } else {
      decompressCount += (bufferToRepeat.length * repeatBy);
    }

    cursorPosition = closingParenIndex + numOfChars;

    nextOpenParenIndex = buffer.indexOf(openParen, cursorPosition);
  }

  decompressCount += buffer.length - cursorPosition;

  return decompressCount;
}

// decompressedString = decompressString(input);
// console.log(decompressedString);

console.log(decompressString2(input));
