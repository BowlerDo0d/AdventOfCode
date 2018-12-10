import * as _ from 'lodash';

class Day3 {
    private day = 3;
    private debug = true;
    private input = null;
    private fs = require('fs');
    private prettyInput = [];
    private material = [];

    constructor() {
        const gridSize = 1000;
        this.input = this.fs.readFileSync(`./day${this.day}input.txt`, { encoding: 'utf-8' }).split('\n');
        // this.input = ['#1 @ 1,3: 4x4','#2 @ 3,1: 4x4','#3 @ 5,5: 2x2'];

        _.forEach(this.input, (data) => {
            let tmp = data.split(' ');
            this.prettyInput.push({
                id: tmp[0].replace('#',''),
                startX: tmp[2].split(',')[0],
                startY: tmp[2].split(',')[1].replace(':',''),
                distX: tmp[3].split('x')[0],
                distY: tmp[3].split('x')[1]
            });
        });

        for (let i = 0; i < gridSize; i++) {
            this.material[i] = [];
            for (let j = 0; j < gridSize; j++) {
                this.material[i].push({
                    total: 0,
                    ids: []
                });
            }
        }
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
        let overlap = 0;

        _.forEach(this.prettyInput, (coords) => {
            for (let i = 0; i < coords.distX; i++) {
                for (let j = 0; j < coords.distY; j++) {
                    this.material[+j + +coords.startY][+i + +coords.startX].total++;
                }
            }
        });

        _.forEach(this.material, (row) => {
            _.forEach(row, (col) => {
                if (col.total > 1) {
                    overlap++;
                }
            });
        });

        console.log(overlap);
    }

    run2() {
        // Part 2
        let count = 0;

        _.forEach(this.prettyInput, (coords) => {
            for (let i = 0; i < coords.distX; i++) {
                for (let j = 0; j < coords.distY; j++) {
                    this.material[+j + +coords.startY][+i + +coords.startX].total++;
                    this.material[+j + +coords.startY][+i + +coords.startX].ids.push(coords);
                }
            }
        });

        _.some(this.material, (row) => {
            return _.some(row, (col) => {
                if (col.total === 1 && col.ids.length === 1) {

                    count = 0;

                    for (let i = 0; i < col.ids[0].distX; i++) {
                        for (let j = 0; j < col.ids[0].distY; j++) {
                            let tmp = this.material[+j + +col.ids[0].startY][+i + +col.ids[0].startX];

                            if (tmp.ids.length === 1 && tmp.ids[0].id === col.ids[0].id) {
                                count++;
                            }
                        }
                    }

                    if (count === (+col.ids[0].distX * +col.ids[0].distY)) {
                        console.log(col.ids[0].id);
                        return true;
                    }

                    return false;
                }
            });
        });
    }
}

const day3 = new Day3();
day3.run2();
