class Pitchspec {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - SPECPITCH ');

		const specaa = '_spechorda';
		const specab = '_downshift';
		const specac = '_tune';
		const specad = '_spechordb';
		const specae = '_tuneb';
		const specaf = '_spechordc';
		const windowSize = 'c8192';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`pvoc anal 1 ${this.paramsToAna(file, i)} -${windowSize} -o3`);

				// CHORDA
				this.run(`pitch chord ${this.paramsAna(file, specaa, i)} processes/pitchspec/brk/chorda.txt -x`);
				this.run(`pvoc synth ${this.paramsToWav(file, specaa, i)}`);

				// DOWNSHIFT
				this.run(`pitch transp 2 ${this.paramsAna(file, specab, i)}${this.ws}${this.rrange(800, 2000)} -d1.0`);
				this.run(`pvoc synth ${this.paramsToWav(file, specab, i)}`);

				// TUNE
				this.run(`pitch tune 2 ${this.paramsAna(file, specac, i)} processes/pitchspec/brk/tune_midilista.txt -c${this.rrange(0.0, 1.0)}`);
				this.run(`pvoc synth ${this.paramsToWav(file, specac, i)}`);

				// CHORD B
				this.run(`pitch chord ${this.paramsAna(file, specad, i)} processes/pitchspec/brk/chordb.txt -x`);
				this.run(`pvoc synth ${this.paramsToWav(file, specad, i)}`);

				// TUNE B
				this.run(`pitch tune 2 ${this.paramsAna(file, specae, i)} processes/pitchspec/brk/tune_midilistb.txt -c${this.rrange(0.0, 1.0)}`);
				this.run(`pvoc synth ${this.paramsToWav(file, specae, i)}`);

				// CHORD C
				this.run(`pitch chord ${this.paramsAna(file, specaf, i)} processes/pitchspec/brk/chordc.txt -x`);
				this.run(`pvoc synth ${this.paramsToWav(file, specaf, i)}`);
			}

			this.collectAna(file, specaa, true);
			this.collectAna(file, specab, true);
			this.collectAna(file, specac, true);
			this.collectAna(file, specad, true);
			this.collectAna(file, specae, true);
			this.collectAna(file, specaf, true);
		});
	}
}

module.exports = Pitchspec;