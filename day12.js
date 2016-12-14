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
    input = fs.readFileSync('./day12input.txt', { encoding: 'utf-8' }).split('\n'),
    debug = false,
    cursor = -1,
    registers = {
        a: 0,
        b: 0,
        c: 1,
        d: 0
    };

input = input.slice(0, input.length - 1); // Removes the newline from the editor addition

while (cursor < input.length - 1) {
    cursor += 1;
    log('Cursor: ' + cursor);

    instruction = input[cursor].replace(/\r/g, '').split(' ');
    log(instruction);

    switch (instruction[0]) {
        case 'cpy':
            if (isNaN(instruction[1]) && registers[instruction[1]]) {
                registers[instruction[2]] = registers[instruction[1]];
            } else {
                registers[instruction[2]] = parseInt(instruction[1], 10);
            }
            break;
        case 'inc':
            registers[instruction[1]] += 1;
            break;
        case 'dec':
            registers[instruction[1]] -= 1;
            break;
        case 'jnz':
            if ((isNaN(instruction[1]) && registers[instruction[1]] && registers[instruction[1]] !== 0) || (!isNaN(instruction[1]) && parseInt(instruction[1], 10) !== 0)) {
                cursor += parseInt(instruction[2], 10) - 1;
            }
            break;
    }

    log(registers);
}

console.log(registers.a);
