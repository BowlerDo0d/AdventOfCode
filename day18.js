var fs = require('fs'),
    input = fs.readFileSync('./day18input.txt', { encoding: 'utf-8' }),
    totalRows = 400000,
    grid = [];

input = input.replace(/(\r|\n)/g, '').split('');

grid.push(input);

function printGrid() {
    for (var y = 0; y < grid.length; y++) {
        var row = '';
        for (var x = 0; x < grid[y].length; x++) {
            row += grid[y][x];
        }
        console.log(row);
    }
}

function getSafeZones() {
    var safeZones = 0;

    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            safeZones += grid[y][x] === '.' ? 1 : 0;
        }
    }

    return safeZones;
}

for (var row = 1; row < totalRows; row++) {
    var prevRow = grid[row - 1],
        nextRow = [];

    for (var i = 0; i < input.length; i++) {
        var leftIsSafe = false,
            centerIsSafe = false,
            rightIsSafe = false,
            leftIsTrap = false,
            centerIsTrap = false,
            rightIsTrap = false;

        if (i === 0) {
            leftIsSafe = true;
            centerIsTrap = (prevRow[i] === '^');
            centerIsSafe = (prevRow[i] === '.');
            rightIsTrap = (prevRow[i+1] === '^');
            rightIsSafe = (prevRow[i+1] === '.');
        } else if (i === input.length - 1) {
            leftIsTrap = (prevRow[i-1] === '^');
            leftIsSafe = (prevRow[i-1] === '.');
            centerIsTrap = (prevRow[i] === '^');
            centerIsSafe = (prevRow[i] === '.');
            rightIsSafe = true;
        } else {
            leftIsTrap = (prevRow[i-1] === '^');
            leftIsSafe = (prevRow[i-1] === '.');
            centerIsTrap = (prevRow[i] === '^');
            centerIsSafe = (prevRow[i] === '.');
            rightIsTrap = (prevRow[i+1] === '^');
            rightIsSafe = (prevRow[i+1] === '.');
        }

        if ((leftIsTrap && centerIsTrap && rightIsSafe) ||
            (leftIsSafe && centerIsTrap && rightIsTrap) ||
            (leftIsTrap && centerIsSafe && rightIsSafe) ||
            (leftIsSafe && centerIsSafe && rightIsTrap)) {
            nextRow.push('^');
        } else {
            nextRow.push('.');
        }
    }

    grid.push(nextRow);
}

// printGrid();
console.log(getSafeZones());
