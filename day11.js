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
    input = fs.readFileSync('./day11input.txt', { encoding: 'utf-8' }).split('\n'),
    debug = true;
