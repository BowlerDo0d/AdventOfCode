import * as _ from 'lodash';

class Day5 {
    private day = 5;
    private debug = true;
    private input = null;
    private fs = require('fs');

    constructor() {
        this.input = this.fs.readFileSync(`./day${this.day}input.txt`, { encoding: 'utf-8' }).split('');
    }

    log(msg, value = null) {
        if (this.debug) {
            if (msg && (value || value === 0)) {
                console.log(msg, value);
            } else {
                console.log(msg);
            }
        }
    }

    run() {
        // Part 1
        let count: number;

        do {
            count = 0;

            _.forEach(this.input, (unit, idx) => {
                let A = unit,
                    B = this.input[+idx + 1];

                count++;

                if (A !== null && B) {
                    if (A.toUpperCase() === B.toUpperCase()) {
                        if (A !== B) {
                            this.input[idx] = null;
                            this.input[+idx + 1] = null;
                        }
                    }
                }
            });

            this.input = _.compact(this.input);
        } while (count !== this.input.length);

        console.log(this.input.length);
    }

    run2() {
        // Part 2
        let count: number;
        let polymers = [];

        _.forEach('abcdefghijklmnopqrstuvwxyz', (letter) => {
            let input = _.without(_.clone(this.input), letter.toLowerCase(), letter.toUpperCase());

            do {
                count = 0;

                _.forEach(input, (unit, idx) => {
                    let A = unit,
                        B = input[+idx + 1];

                    count++;

                    if (A !== null && B) {
                        if (A.toUpperCase() === B.toUpperCase()) {
                            if (A !== B) {
                                input[idx] = null;
                                input[+idx + 1] = null;
                            }
                        }
                    }
                });

                input = _.compact(input);
            } while (count !== input.length);

            polymers.push(input.length);
        });

        console.log(_.min(polymers));
    }
}

const bp = new Day5();
bp.run2();
