class Boilerplate {
    private day = 0;
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
        this.log(this.input);
    }
}

const bp = new Boilerplate();
bp.run();
