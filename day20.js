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
    input = fs.readFileSync('./day20input.txt', { encoding: 'utf-8' }).split('\n'),
    debug = true,
    ranges = [],
    nextRange = null,
    lowVal = null,
    highVal = null,
    skipRange = false,
    maxIPValue = 4294967295,
    lowestIP = 23923783,
    difference = null,
    ipIsBlacklisted = false,
    totalAllowed = 0;

for (var i = 0; i < input.length; i++) {
    nextRange = input[i];
    skipRange = false;

    if (nextRange.length > 1) {
        nextRange = nextRange.split('-');

        lowVal = parseInt(nextRange[0], 10) < parseInt(nextRange[1], 10) ? parseInt(nextRange[0], 10) : parseInt(nextRange[1], 10);
        highVal = parseInt(nextRange[0], 10) > parseInt(nextRange[1], 10) ? parseInt(nextRange[0], 10) : parseInt(nextRange[1], 10);

        for (var k = 0; k < ranges.length; k++) {
            if (ranges[k].low < lowVal && ranges[k].high > highVal) {
                // Skip subset since it's inclusive
                skipRange = true;
                break;
            }
        }

        if (!skipRange && (lowVal >= lowestIP || highVal >= lowestIP) && (lowVal <= maxIPValue || highVal <= maxIPValue)) {
            ranges.push({
                low: lowVal,
                high: highVal
            });
        }
    }

    nextRange = null;
}

ranges.sort(function (a, b) {
    return a.low - b.low;
});

// Part 1
// for (var ip = lowestIP; ip <= maxIPValue; ip++) {
//     ipIsBlacklisted = false;
//     ranges.some(function (range) {
//         if (range.low <= ip && range.high >= ip) {
//             // IP is excluded
//             ipIsBlacklisted = true;
//             return true;
//         }
//     });
//
//     if (!ipIsBlacklisted) {
//         console.log('Lowest IP whitelist: ' + ip);
//         break;
//     }
// }

// Part 2
for (var ip = lowestIP; ip <= maxIPValue; ip++) {
    ipIsBlacklisted = false;
    ranges.some(function (range) {
        if (range.low <= ip && range.high >= ip) {
            // IP is excluded
            ipIsBlacklisted = true;
            // Jump ip to max in range since all others would be blacklisted too
            ip = range.high;
            return true;
        }
    });

    if (!ipIsBlacklisted) {
        totalAllowed += 1;
    }
}

console.log(totalAllowed);
