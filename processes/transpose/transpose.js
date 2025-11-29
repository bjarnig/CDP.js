class Transpose {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - TRANSPOSE ');

		const transposea = '_octdown';
		const transposeb = '_twooctdown';
		const transposec = '_octup';
		const transposed = '_fifth';
		const transposee = '_fifthdown';
		const transposef = '_seventh';
		const transposeg = '_seventhdown';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`modify speed 2 ${this.params(file, transposea, i)} -12`);
				this.run(`modify speed 2 ${this.params(file, transposeb, i)} -24`);
				this.run(`modify speed 2 ${this.params(file, transposec, i)} 12`);
				this.run(`modify speed 2 ${this.params(file, transposed, i)} 5`);
				this.run(`modify speed 2 ${this.params(file, transposee, i)} -5`);
				this.run(`modify speed 2 ${this.params(file, transposef, i)} 7`);
				this.run(`modify speed 2 ${this.params(file, transposeg, i)} -7`);
			}

			this.collect(file, transposea);
			this.collect(file, transposeb);
			this.collect(file, transposec);
			this.collect(file, transposed);
			this.collect(file, transposee);
			this.collect(file, transposef);
			this.collect(file, transposeg);
		});
	}
}

module.exports = Transpose;