import * as _ from 'lodash';

class Day2 {
    private day = 2;
    private debug = true;
    private input = null;
    private fs = require('fs');

    constructor() {
        this.input = this.fs.readFileSync(`./day${this.day}input.txt`, { encoding: 'utf-8' }).split('\n');
        // this.input = ['abcdef','bababc','abbcde','abcccd','aabcdd','abcdee','ababab'];
        // this.input = ['abcde','fghij','klmno','pqrst','fghiz','axcye','wvxyz'];
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
        const stats = [];

        _.each(this.input, (boxID) => {
            stats.push({
                id: boxID,
                hasTwo: _.includes(_.countBy(boxID), 2),
                hasThree: _.includes(_.countBy(boxID), 3)
            });
        });

        let checksum = _.countBy(stats, 'hasTwo').true * _.countBy(stats, 'hasThree').true;

        this.log(checksum);
    }

    run2() {
        let count = 0,
            copy = null;

        _.some(this.input, (boxID1) => {
            return _.some(this.input, (boxID2) => {
                count = 0;
                copy = boxID1.split('');

                if (boxID1 !== boxID2) {
                    if (!_.some(boxID1, (ltr, idx: number) => {
                            if (boxID1[idx] !== boxID2[idx]) {
                                delete copy[idx];
                                count++;
                            }

                            return count > 1;
                        })
                    ) {
                        console.log(copy.join(''));
                        return true;
                    }

                    return false;
                } else {
                    return false;
                }
            });
        });
    }
}

const day2 = new Day2();
day2.run2();
