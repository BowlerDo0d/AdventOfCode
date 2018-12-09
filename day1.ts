import * as _ from 'lodash';

class Day1 {
    private day = 1;
    private debug = true;
    private input = null;
    private fs = require('fs');

    constructor() {
        this.input = this.fs.readFileSync(`./day${this.day}input.txt`, { encoding: 'utf-8' }).split('\n');
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
        let answer = 0;

        _.each(this.input, (change) => {
            answer += +change;
        });

        this.log(answer);
    }

    run2() {
        let answer = 0,
            answers = [],
            frequencyFound = false;

        do {
            _.some(this.input, (change) => {
                answer += +change;

                if (_.includes(answers, answer)) {
                    this.log(answer);
                    frequencyFound = true;
                } else {
                    answers.push(answer);
                }

                return frequencyFound;
            });
        } while (!frequencyFound);
    }
}

const d1 = new Day1();
d1.run2();
