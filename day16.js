function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var input = '10011111011011001',
    debug = false,
    // Part 1
    // fillSize = 272,
    // Part 2
    fillSize = 35651584,
    checksum = '';

function dragonCurve(data) {
    var copy = data.split('');
    log('Original copy: ' + copy);

    copy.reverse();
    log('Reversed: ' + copy);

    // flip bits
    copy.forEach(function (bit, idx) {
        log('bit ' + bit);
        copy[idx] = (bit === '0') ? '1' : '0';
        log('flipped to ' + copy[idx]);
    });
    log('Bit flipped: ' + copy);

    copy = copy.join('');
    log('Joined array: ' + copy);

    return data + '0' + copy;
}

function generateChecksum(data) {
    var checksum = '';

    for (var i = 0; i < data.length; i += 2) {
        if (data[i] === data[i + 1]) {
            checksum += '1';
        } else {
            checksum += '0';
        }
    }

    return checksum;
}

while (input.length < fillSize) {
    input = dragonCurve(input);
}

if (input.length > fillSize) {
    input = input.slice(0, fillSize);
}

log('Data: ' + input + ' is length ' + input.length);

checksum = input;

while (checksum.length % 2 === 0) {
    checksum = generateChecksum(checksum);
}

console.log('Checksum: ' + checksum);
