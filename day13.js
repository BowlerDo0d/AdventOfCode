function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var input = 10, // 1364,
    debug = true,
    grid = [],
    xStop = 9,
    yStop = 6,
    formulaAns = null,
    binary = null,
    numOfBits1 = null;

function printGrid() {
    var line = '';

    for (var y = 0; y < yStop; y++) {
        for (var x = 0; x < xStop; x++) {
            line += grid[x][y];
        }
        console.log(line);
    }
}

for (var y = 0; y < yStop; y++) {
    grid[y] = [];
    for (var x = 0; x < xStop; x++) {
        formulaAns = (x * x) + (3 * x) + (2 * x * y) + y + (y * y);
        binary = (formulaAns >>> 0).toString(2);
        numOfBits1 = binary.replace('0', '').length;

        grid[x][y] = numOfBits1 % 2 === 0 ? '.' : '#';
    }
}

printGrid();
