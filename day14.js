function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var Crypto = require('crypto'),
    salt = 'ahsbgdzn',
    debug = false,
    hashIndex = -1,
    keysFound = 0,
    hashes = new Array(1001),
    addIndex = 0,
    hash = null,
    matches = null,
    regexp = null;

// setup hashes array
for (var i = 0; i < hashes.length; i++) {
    // Part 1
    hashes[i] = Crypto.createHash('md5').update(salt + i).digest('hex');

    // Part 2
    for (var k = 0; k < 2016; k++) {
        hashes[i] = Crypto.createHash('md5').update(hashes[i]).digest('hex');
    }
}

while (keysFound < 64) {
    hashIndex += 1;
    hash = hashes[0];
    matches = hash.match(/(.)\1\1/);

    if (matches) {
        regexp = new RegExp('(' + matches[1] + ')\\1\\1\\1\\1');

        for (var j = 1; j < hashes.length; j++) {
            if (regexp.test(hashes[j])) {
                keysFound += 1;
            }
        }
    }

    addIndex = hashIndex + 1001;
    hashes.shift();

    // Part 1
    hashes.push(Crypto.createHash('md5').update(salt + addIndex).digest('hex'));

    // Part 2
    for (var x = 0; x < 2016; x++) {
        hashes[hashes.length - 1] = Crypto.createHash('md5').update(hashes[hashes.length - 1]).digest('hex');
    }
}

console.log(hashIndex);
