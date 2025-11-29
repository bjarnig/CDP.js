class Speca {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - SPECTRAL ');

		const specaa = '_stretch';
		const specab = '_blura';
		const specac = '_shufflea';
		const specad = '_drunka';
		const specae = '_spread';
		const specaf = '_blurb';
		const specag = '_shuffleb';
		const specah = '_drunkb';
		const windowSize = 'c4096';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`pvoc anal 1 ${this.paramsToAna(file, i)} -${windowSize} -o3`);

				// STRETCH
				this.run(`stretch time 1 ${this.paramsAna(file, specaa, i)} 4`);
				this.run(`pvoc synth ${this.paramsToWav(file, specaa, i)}`);

				// BLUR
				this.run(`blur blur ${this.paramsAna(file, specab, i)} 200`);
				this.run(`pvoc synth ${this.paramsToWav(file, specab, i)}`);

				// SHUFFLE
				this.run(`blur shuffle ${this.paramsAna(file, specac, i)} ABC-CBA 20`);
				this.run(`pvoc synth ${this.paramsToWav(file, specac, i)}`);

				// DRUNK
				this.run(`blur drunk ${this.paramsAna(file, specad, i)} 16 4 32`);
				this.run(`pvoc synth ${this.paramsToWav(file, specad, i)}`);

				// SPREAD
				this.run(`blur spread ${this.paramsAna(file, specae, i)}  -f${this.rrange(10, 50)}`);
				this.run(`pvoc synth ${this.paramsToWav(file, specae, i)}`);

				// BLUR B
				this.run(`blur blur ${this.paramsAna(file, specaf, i)}${this.ws}${this.rrange(300, 550)}`);
				this.run(`pvoc synth ${this.paramsToWav(file, specaf, i)}`);

				// SHUFFLE B
				this.run(`blur shuffle ${this.paramsAna(file, specag, i)} ABCDEFG-CBAGFED 10`);
				this.run(`pvoc synth ${this.paramsToWav(file, specag, i)}`);

				// DRUNK B
				this.run(`blur drunk ${this.paramsAna(file, specah, i)} 30 1 32`);
				this.run(`pvoc synth ${this.paramsToWav(file, specah, i)}`);
			}

			this.collectAna(file, specaa, true);
			this.collectAna(file, specab, true);
			this.collectAna(file, specac, true);
			this.collectAna(file, specad, true);
			this.collectAna(file, specae, true);
			this.collectAna(file, specaf, true);
			this.collectAna(file, specag, true);
			this.collectAna(file, specah, true);
		});
	}
}

module.exports = Speca;