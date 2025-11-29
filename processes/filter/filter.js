class Filter {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - FILTER ');

		const filtera = '_lopa';
		const filterb = '_hipa';
		const filterc = '_lopb';
		const filterd = '_hopb';
		const filtere = '_cylop';
		const filterf = '_cyhip';
		const filterg = '_band';
		const filterh = '_notch';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`filter lohi 1 ${this.params(file, filtera, i)} -6 ${this.rrange(70, 120)}${this.ws}${this.rrange(122, 160)}`);
				this.run(`filter lohi 1 ${this.params(file, filterb, i)} -6 ${this.rrange(6001, 8000)}${this.ws}${this.rrange(4000, 6000)}`);
				this.run(`filter lohi 1 ${this.params(file, filterc, i)} -6 ${this.rrange(60, 100)}${this.ws}${this.rrange(120, 180)}`);
				this.run(`filter lohi 1 ${this.params(file, filterd, i)} -6 ${this.rrange(8001, 10000)}${this.ws}${this.rrange(5000, 8000)}`);
				this.run(`distort filter 1 ${this.params(file, filtere, i)}${this.ws}${this.rrange(1000, 4000)} -s0`);
				this.run(`distort filter 2 ${this.params(file, filterf, i)}${this.ws}${this.rrange(500, 2000)} -s0`);
				this.run(`filter variable 3 ${this.params(file, filterg, i)}${this.ws}${this.rrange(0.2, 0.8)} 2 ${this.rrange(200, 2000)}`);
				this.run(`filter variable 4 ${this.params(file, filterh, i)}${this.ws}${this.rrange(0.1, 0.8)} 2 ${this.rrange(400, 3000)}`);
			}

			this.collect(file, filtera);
			this.collect(file, filterb);
			this.collect(file, filterc);
			this.collect(file, filterd);
			this.collect(file, filtere);
			this.collect(file, filterf);
			this.collect(file, filterg);
			this.collect(file, filterh);
		});
	}
}

module.exports = Filter;