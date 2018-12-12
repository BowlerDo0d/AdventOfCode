import * as _ from 'lodash';

class Day4 {
    private data = [];
    private day = 4;
    private debug = true;
    private input = null;
    private fs = require('fs');
    private prettyInput = [];

    constructor() {
        this.input = this.fs.readFileSync(`./day${this.day}input.txt`, { encoding: 'utf-8' }).split('\n');

        _.forEach(this.input, (entry) => {
            this.prettyInput.push(entry.replace('[','').split('] '));
        });

        this.prettyInput.sort();
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

    parseData() {
        let guard = null,
            guardID = null;

        _.forEach(this.prettyInput, (entry, idx) => {
            let tstamp = entry[0],
                command = entry[1];

            if (command.indexOf('Guard') > -1) {
                // New guard on duty!
                guardID = command.split(' ')[1].replace('#','');

                if (!_.find(this.data, ['id', +guardID])) {
                    this.data.push({
                        id: +guardID,
                        timeAsleep: 0,
                        minutesAsleep: []
                    });
                }

                guard = _.find(this.data, ['id', +guardID]);
            } else if (command.indexOf('falls') > -1) {
                // He's sleeping!
                let minuteMarker = null,
                    sleepMinute = new Date(tstamp).getMinutes(),
                    wakeMinute = new Date(this.prettyInput[idx + 1][0]).getMinutes();

                guard.timeAsleep += (wakeMinute - sleepMinute);

                for (let i = sleepMinute; i < wakeMinute; i++) {
                    if (!_.find(guard.minutesAsleep, ['minute', i])) {
                        guard.minutesAsleep.push({
                            minute: i,
                            count: 0
                        });
                    }

                    minuteMarker = _.find(guard.minutesAsleep, ['minute', i]);
                    minuteMarker.count++;
                }
            }
        });
    }

    run() {
        // Part 1
        this.parseData();

        this.data.sort((a,b) => {
            if (a.timeAsleep < b.timeAsleep) {
                return 1;
            } else if (a.timeAsleep > b.timeAsleep) {
                return -1;
            }

            return 0;
        });

        this.data[0].minutesAsleep.sort((a,b) => {
            if (a.count < b.count) {
                return 1;
            } else if (a.count > b.count) {
                return -1;
            }

            return 0;
        });

        console.log(`Guard #${this.data[0].id} at minute ${this.data[0].minutesAsleep[0].minute} = ${+this.data[0].id * +this.data[0].minutesAsleep[0].minute}`);
    }

    run2() {
        // Part 2
        this.parseData();

        _.forEach(this.data, (entry) => {
            entry.minutesAsleep.sort((a,b) => {
                if (a.count < b.count) {
                    return 1;
                } else if (a.count > b.count) {
                    return -1;
                }

                return 0;
            });
        });

        this.data.sort((a,b) => {
            let A = a.minutesAsleep.length ? a.minutesAsleep[0].count : 0,
                B = b.minutesAsleep.length ? b.minutesAsleep[0].count : 0;

            if (A < B) {
                return 1;
            } else if (A > B) {
                return -1;
            }

            return 0;
        });

        console.log(`Guard #${this.data[0].id} at minute ${this.data[0].minutesAsleep[0].minute} = ${+this.data[0].id * +this.data[0].minutesAsleep[0].minute}`);
    }
}

const day4 = new Day4();
day4.run2();
