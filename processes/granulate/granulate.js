class Granulate {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - Granulate ');

		const granulatea = '_granulatea';
		const granulateb = '_granulateb';
		const granulatec = '_granulatec';
		const granulated = '_granulated';
		const granulatee = '_granulatee';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				// scramble grainsize & scramble_range - search for next grain, before infile 'now' (Default: 0 ms)
				this.run(`modify brassage 4 ${this.params(file, granulatea, i)} 80 -r40`);
				// Granulate density (Range 0 - 2)
				this.run(`modify brassage 5 ${this.params(file, granulateb, i)} 2`);
				// timeshrink – speed of advance in infile, relative to outfile (Range: >= 0)
				this.run(`modify brassage 2 ${this.params(file, granulatec, i)} 0.25`);
				// timeshrink – speed of advance in infile, relative to outfile (Range: >= 0)
				this.run(`modify brassage 2 ${this.params(file, granulated, i)} 1.5`);
				// timeshrink – speed of advance in infile, relative to outfile (Range: >= 0)
				this.run(`modify brassage 2 ${this.params(file, granulatee, i)} 1.5`);
			}

			this.collect(file, granulatea);
			this.collect(file, granulateb);
			this.collect(file, granulatec);
			this.collect(file, granulated);
			this.collect(file, granulatee);
		});
	}
}

module.exports = Granulate;
