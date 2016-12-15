function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var input = 1364,
    debug = false,
    grid = [],
    rows = 50,
    cols = 50,
    formulaAns = null,
    binary = null,
    numOfBits1 = null;

function printGrid() {
    var line = '';

    for (var y = 0; y < rows; y++) {
        line = '';
        for (var x = 0; x < cols; x++) {
            if (y === 39 && x === 31) {
                line += 'X';
            } else {
                line += grid[y][x].toString().slice(-1);
                // line += '(' + x + ',' + y + ')';
            }
        }
        console.log(line);
    }
}

function determinePathToPoint(targetX, targetY) {
    var startX = 1,
        startY = 1,
        cartesianCounter = 0,
        pointReached = 1; // Start at 1 to include your starting location

    // Set starting point
    grid[startY][startX] = cartesianCounter;
    cartesianCounter += 1;

    while (cartesianCounter <= 50) {// grid[targetY][targetX] === '.') {
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                if (grid[y][x] === cartesianCounter - 1) {
                    if (y + 1 < rows && grid[y + 1][x] === '.') {
                        grid[y + 1][x] = cartesianCounter;
                        pointReached += 1;
                    }
                    if (y - 1 >= 0 && grid[y - 1][x] === '.') {
                        grid[y - 1][x] = cartesianCounter;
                        pointReached += 1;
                    }
                    if (x + 1 < cols && grid[y][x + 1] === '.') {
                        grid[y][x + 1] = cartesianCounter;
                        pointReached += 1;
                    }
                    if (x - 1 >= 0 && grid[y][x - 1] === '.') {
                        grid[y][x - 1] = cartesianCounter;
                        pointReached += 1;
                    }
                }
            }
        }

        cartesianCounter += 1;
    }

    console.log('Shortest path: ' + grid[targetY][targetX]);
    console.log('Points reached in 50 steps: ' + pointReached);
}

for (var y = 0; y < rows; y++) {
    grid[y] = [];
    for (var x = 0; x < cols; x++) {
        formulaAns = ((x * x) + (3 * x) + (2 * x * y) + y + (y * y)) + input;
        log(formulaAns);
        binary = (formulaAns >>> 0).toString(2);
        log(binary);
        numOfBits1 = binary.replace(/0/g, '').length;
        log(numOfBits1);

        grid[y][x] = numOfBits1 % 2 === 0 ? '.' : '#';
    }
}

printGrid();

// determinePathToPoint(7, 4);
determinePathToPoint(31, 39);

printGrid();
