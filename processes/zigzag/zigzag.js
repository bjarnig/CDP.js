class ZigZag {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - ZIGZAG ');

		const zigzaga = '_zigzaga';
		const zigzagb = '_zigzagb';
		const zigzagc = '_zigzagc';
		const zigzagd = '_zigzagd';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`extend zigzag 1 ${this.params(file, zigzaga, i)}${this.ws}${this.rrange(0.3, 0.9)}${this.ws}${this.rrange(1.1, 1.4)} 41.454558 0.199 -s15.000000 -m1.95 -r0`);
				this.run(`extend zigzag 1 ${this.params(file, zigzagb, i)}${this.ws}${this.rrange(0.7, 0.9)}${this.ws}${this.rrange(1.1, 1.3)} 45.360003 0.0505 -s15.200000 -m0.232 -r0`);
				this.run(`extend zigzag 1 ${this.params(file, zigzagc, i)}${this.ws}${this.rrange(0.8, 1.2)}${this.ws}${this.rrange(1.4, 1.8)} 43.454558 0.045000 -s15.000000 -m0.075546875 -r0`);
				this.run(`extend zigzag 1 ${this.params(file, zigzagd, i)}${this.ws}${this.rrange(0.8, 1.8)}${this.ws}${this.rrange(2.4, 4.8)} 42.454558 0.199 -s15.000000 -m1.95 -r0`);
			}

			this.collect(file, zigzaga);
			this.collect(file, zigzagb);
			this.collect(file, zigzagc);
			this.collect(file, zigzagd);
		});
	}
}

module.exports = ZigZag;