class Radical {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - Radical ');

		const radicala = '_reverse';
		const radicalb = '_shred';
		const radicalc = '_ringa';
		const radicald = '_degrade';
		const radicale = '_ringm';
		const radicalf = '_shredb';
		const radicalg = '_degradeb';
		const radicalh = '_ringmb';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`modify radical 1 ${this.params(file, radicala, i)}${this.ws}`);
				// repeats chunklen
				this.run(`modify radical 2 ${this.params(file, radicalb, i)} 8 0.8 -n`);
				this.run(`modify radical 5 ${this.params(file, radicalc, i)}${this.ws}${this.rrange(7, 15)}`);
				// bit_resolution srate_division
				this.run(`modify radical 4 ${this.params(file, radicald, i)} 8 4`);
				this.run(`modify radical 5 ${this.params(file, radicale, i)}${this.ws}${this.rrange(60, 150)}`);
				// repeats chunklen
				this.run(`modify radical 2 ${this.params(file, radicalf, i)}${this.ws}32 0.4 -n`);
				// bit_resolution srate_division
				this.run(`modify radical 4 ${this.params(file, radicalg, i)} 6 4`);
				this.run(`modify radical 5 ${this.params(file, radicalh, i)}${this.ws}${this.rrange(500, 1500)}`);
			}

			this.collect(file, radicala);
			this.collect(file, radicalb);
			this.collect(file, radicalc);
			this.collect(file, radicald);
			this.collect(file, radicale);
			this.collect(file, radicalf);
			this.collect(file, radicalg);
			this.collect(file, radicalh);
		});
	}
}

module.exports = Radical;