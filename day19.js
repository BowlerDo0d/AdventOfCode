function log(msg, value) {
    if (debug) {
        if (msg && (value || value === 0)) {
            console.log(msg, value);
        } else {
            console.log(msg);
        }
    }
}

var startingElves = 3005290,
    elfCirlce = [],
    debug = false,
    nextIterationStart = 1,
    elvesLeft = 0;

for (var i=1; i <= startingElves; i += 2) {
    elfCirlce.push('' + i);
}

log(elfCirlce);

if (startingElves % 2 === 0) {
    nextIterationStart = 0;
} else {
    nextIterationStart = 1;
}

while (elfCirlce.length > 1) {
    elvesLeft = elfCirlce.length;

    elfCirlce = elfCirlce.filter(function (elf, idx) {
        return ((idx + nextIterationStart) % 2 === 0 || (idx + nextIterationStart) === 0);
    });

    if (elvesLeft % 2 === 0) {
        nextIterationStart = 0;
    } else {
        nextIterationStart = 1;
    }

    // elvesLeft = elfCirlce.length;
    //
    // for (var y = nextIterationStart; y < elfCirlce.length; y += 2) {
    //     elfCirlce.splice(y--, 1);
    // }
    //
    // if (elvesLeft % 2 === 0) {
    //     nextIterationStart = 1;
    // } else {
    //     nextIterationStart = 0;
    // }
}

console.log(elfCirlce);
