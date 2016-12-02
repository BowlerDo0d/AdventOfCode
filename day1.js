var moves = ['L4', 'L3', 'R1', 'L4', 'R2', 'R2', 'L1', 'L2', 'R1', 'R1', 'L3', 'R5', 'L2', 'R5', 'L4', 'L3', 'R2', 'R2', 'L5', 'L1', 'R4', 'L1', 'R3', 'L3', 'R5', 'R2', 'L5', 'R2', 'R1', 'R1', 'L5', 'R1', 'L3', 'L2', 'L5', 'R4', 'R4', 'L2', 'L1', 'L1', 'R1', 'R1', 'L185', 'R4', 'L1', 'L1', 'R5', 'R1', 'L1', 'L3', 'L2', 'L1', 'R2', 'R2', 'R2', 'L1', 'L1', 'R4', 'R5', 'R53', 'L1', 'R1', 'R78', 'R3', 'R4', 'L1', 'R5', 'L1', 'L4', 'R3', 'R3', 'L3', 'L3', 'R191', 'R4', 'R1', 'L4', 'L1', 'R3', 'L1', 'L2', 'R3', 'R2', 'R4', 'R5', 'R5', 'L3', 'L5', 'R2', 'R3', 'L1', 'L1', 'L3', 'R1', 'R4', 'R1', 'R3', 'R4', 'R4', 'R4', 'R5', 'R2', 'L5', 'R1', 'R2', 'R5', 'L3', 'L4', 'R1', 'L5', 'R1', 'L4', 'L3', 'R5', 'R5', 'L3', 'L4', 'L4', 'R2', 'R2', 'L5', 'R3', 'R1', 'R2', 'R5', 'L5', 'L3', 'R4', 'L5', 'R5', 'L3', 'R1', 'L1', 'R4', 'R4', 'L3', 'R2', 'R5', 'R1', 'R2', 'L1', 'R4', 'R1', 'L3', 'L3', 'L5', 'R2', 'R5', 'L1', 'L4', 'R3', 'R3', 'L3', 'R2', 'L5', 'R1', 'R3', 'L3', 'R2', 'L1', 'R4', 'R3', 'L4', 'R5', 'L2', 'L2', 'R5', 'R1', 'R2', 'L4', 'L4', 'L5', 'R3', 'L4'];
//var moves = ['R5', 'L5', 'R5', 'R3'];
//var moves = ['R2', 'R2', 'R2'];
//var moves = ['R2', 'L3'];
//var moves = ['R8', 'R4', 'R4', 'R8', 'R5', 'L5', 'R5', 'R3'];
//var moves = ['R8', 'L4', 'L4', 'L8'];

// 0 - North
// 1 - East
// 2 - South
// 3 - West
var distanceAway = 0,
    facing = 0,
    HQx = 0,
    HQy = 0,
    visitedX = [0],
    visitedY = [0],
    HQFound = false,
    HQLocationX = 0,
    HQLocationY = 0,
    debug = false;

function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

function parseFacing(face) {
    var cardinal = null;

    switch(face) {
        case 0:
            cardinal = 'North';
            break;
        case 1:
            cardinal = 'East';
            break;
        case 2:
            cardinal = 'South';
            break;
        case 3:
            cardinal = 'West';
            break;
    }

    return cardinal;
}

function pointVisited(newX, newY) {
    var visited = false;

    visitedX.forEach(function (x, idx) {
        if (x === newX && visitedY[idx] === newY) {
            visited = true;
        }
    });

    return visited;
}

moves.some(function (move) {
    var direction = move.substr(0, 1),
        distance = parseInt(move.substr(1, move.length), 10);

    log('Direction: ', direction);

    if (direction === 'L') {
        if (facing === 0) {
            facing = 3;
        } else {
            facing -= 1;
        }
    } else if (direction === 'R') {
        if (facing === 3) {
            facing = 0;
        } else {
            facing += 1;
        }
    } else {
        console.log('Random direction....unknown variable!');
    }

    log('Facing: ', parseFacing(facing));
    log('Distance: ', distance);

    switch(facing) {
        case 0:
            for (var i = 1; i <= distance; i++) {
                if (!pointVisited(HQx, HQy + i)) {
                    visitedY.push(HQy + i);
                    visitedX.push(HQx);
                } else {
                    HQFound = true;
                    HQLocationX = HQx;
                    HQLocationY = HQy + i;
                    break;
                }
            }
            if (!HQFound) {
                HQy += distance;
            }
            break;
        case 1:
            for (var i = 1; i <= distance; i++) {
                if (!pointVisited(HQx + i, HQy)) {
                    visitedY.push(HQy);
                    visitedX.push(HQx + i);
                } else {
                    HQFound = true;
                    HQLocationX = HQx + i;
                    HQLocationY = HQy;
                    break;
                }
            }
            if (!HQFound) {
                HQx += distance;
            }
            break;
        case 2:
            for (var i = 1; i <= distance; i++) {
                if (!pointVisited(HQx, HQy - i)) {
                    visitedY.push(HQy - i);
                    visitedX.push(HQx);
                } else {
                    HQFound = true;
                    HQLocationX = HQx;
                    HQLocationY = HQy - i;
                    break;
                }
            }
            if (!HQFound) {
                HQy -= distance;
            }
            break;
        case 3:
            for (var i = 1; i <= distance; i++) {
                if (!pointVisited(HQx - i, HQy)) {
                    visitedY.push(HQy);
                    visitedX.push(HQx - i);
                } else {
                    HQFound = true;
                    HQLocationX = HQx - i;
                    HQLocationY = HQy;
                    break;
                }
            }
            if (!HQFound) {
                HQx -= distance;
            }
            break;
    }

    log('Coords: (' + HQx + ', ' + HQy + ')');

    return HQFound;
});

// Answer part 1
// distanceAway = Math.abs(HQx) + Math.abs(HQy);

// Answer part 2
if (HQFound) {
    distanceAway = Math.abs(HQLocationX) + Math.abs(HQLocationY);
} else {
    distanceAway = 'Unknown';
}

console.log(distanceAway);

log('X: ', visitedX);
log('Y: ', visitedY);
