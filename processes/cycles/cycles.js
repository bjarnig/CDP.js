class Cycles {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - Cycles ');

		const omit = '_omit';
		const reform = '_reform';
		const multiply = '_multiply';
		const divide = '_divide';
		const deletea = '_deletea';
		const deleteb = '_deleteb';
		const fractal = '_fractal';
		const telescope = '_telescope';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`distort omit ${this.params(file, omit, i)}${this.ws}${this.rrange(2, 4)}${this.ws}${this.rrange(6, 8)}`);
				this.run(`distort reform 7 ${this.params(file, reform, i)}`);
				this.run(`distort divide ${this.params(file, multiply, i)}${this.ws}${this.rrange(2, 3)}`);
				this.run(`distort multiply ${this.params(file, divide, i)}${this.ws}${this.rrange(2, 3)}`);
				this.run(`distort delete 2 ${this.params(file, deletea, i)}${this.ws}${this.rrange(2, 8)}`);
				this.run(`distort delete 2 ${this.params(file, deleteb, i)}${this.ws}${this.rrange(12, 32)}`);
				this.run(`distort fractal ${this.params(file, fractal, i)}${this.ws}${this.rrange(25, 800)}${this.ws}0.6`);
				this.run(`distort telescope ${this.params(file, telescope, i)}${this.ws}${this.rrange(2, 8)}`);
			}

			this.collect(file, omit);
			this.collect(file, reform);
			this.collect(file, multiply);
			this.collect(file, divide);
			this.collect(file, deletea);
			this.collect(file, deleteb);
			this.collect(file, fractal);
			this.collect(file, telescope);
		});
	}
}

module.exports = Cycles;