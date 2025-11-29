class Multi {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - Multi ');

		const multia = '_multipol';
		const multib = '_multiwrap';
		const multic = '_multimit';
		const multid = '_multidrunk';
		const multie = '_multibrato';
		const multif = '_multizag';
		const multig = '_multriverse';
		const multih = '_multipass';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`distort interpolate ${this.params(file, '_multiaa', i)}${this.ws}${this.rrange(2, 3)}`);
				this.run(`distort interpolate ${this.params(file, '_multiab', i)}${this.ws}${this.rrange(2, 4)}`);
				this.run(`distort interpolate ${this.params(file, '_multiac', i)}${this.ws}${this.rrange(2, 5)}`);
				this.run(`distort interpolate ${this.params(file, '_multiad', i)}${this.ws}${this.rrange(2, 8)}`);

				this.run(`distort pitch ${this.params(file, '_multiba', i)}${this.ws}${this.rrange(0.5, 4)} -c${this.rrange(11, 89)}`);
				this.run(`distort pitch ${this.params(file, '_multibb', i)}${this.ws}${this.rrange(0.5, 4)} -c${this.rrange(11, 89)}`);

				this.run(`distort omit ${this.params(file, '_multica', i)}${this.ws}${this.rrange(2, 4)}${this.ws}${this.rrange(5, 8)}`);
				this.run(`distort omit ${this.params(file, '_multicb', i)}${this.ws}${this.rrange(2, 4)}${this.ws}${this.rrange(5, 8)}`);
				this.run(`distort omit ${this.params(file, '_multicc', i)}${this.ws}${this.rrange(2, 4)}${this.ws}${this.rrange(5, 8)}`);
				this.run(`distort omit ${this.params(file, '_multicd', i)}${this.ws}${this.rrange(2, 4)}${this.ws}${this.rrange(5, 8)}`);

				this.run(`extend drunk 1 ${this.params(file, '_multida', i)} 22.000 ${this.rrange(0.8, 4.2)} 0.046875 0.0703125 0.2080859375 -s73 -c0.1015625 -o0.703828125 -r0`);
				this.run(`extend drunk 1 ${this.params(file, '_multidb', i)} 22.000 ${this.rrange(1.2, 5.2)} 0.046875 0.0703125 0.2080859375 -s73 -c0.1015625 -o0.703828125 -r0`);

				this.run(`modify speed 6 ${this.params(file, '_multiea', i)}${this.ws}${this.rrange(2, 60)}${this.ws}${this.rrange(0.2, 40)}`);
				this.run(`modify speed 6 ${this.params(file, '_multieb', i)}${this.ws}${this.rrange(2, 60)}${this.ws}${this.rrange(0.2, 40)}`);
				this.run(`modify speed 6 ${this.params(file, '_multiec', i)}${this.ws}${this.rrange(2, 60)}${this.ws}${this.rrange(0.2, 40)}`);
				this.run(`modify speed 6 ${this.params(file, '_multied', i)}${this.ws}${this.rrange(2, 60)}${this.ws}${this.rrange(0.2, 40)}`);

				this.run(`extend zigzag 1 ${this.params(file, '_multifa', i)}${this.ws}${this.rrange(1.2, 2.2)}${this.ws}${this.rrange(2.8, 4.2)} 25.000 0.06181640625 -s15.000000 -m0.43447265625 -r0`);
				this.run(`extend zigzag 1 ${this.params(file, '_multifb', i)}${this.ws}${this.rrange(1.2, 2.2)}${this.ws}${this.rrange(2.8, 4.2)} 25.000 0.06181640625 -s15.000000 -m0.43447265625 -r0`);

				this.run(`distort reverse ${this.params(file, '_multiga', i)}${this.ws}${this.rrange(11, 80)}`);
				this.run(`distort reverse ${this.params(file, '_multigb', i)}${this.ws}${this.rrange(11, 80)}`);
				this.run(`distort reverse ${this.params(file, '_multigc', i)}${this.ws}${this.rrange(11, 80)}`);
				this.run(`distort reverse ${this.params(file, '_multigd', i)}${this.ws}${this.rrange(11, 80)}`);

				this.run(`distort filter 1 ${this.params(file, '_multiha', i)}${this.ws}${this.rrange(100, 1200)} -s0`);
				this.run(`distort filter 1 ${this.params(file, '_multihb', i)}${this.ws}${this.rrange(400, 4000)} -s0`);
			}

			this.collect(file, '_multiaa');
			this.collect(file, '_multiab');
			this.collect(file, '_multiac');
			this.collect(file, '_multiad');
			this.combine(file, multia, ['_multiaa', '_multiab', '_multiac', '_multiad']);

			this.collect(file, '_multiba');
			this.collect(file, '_multibb');
			this.combine(file, multib, ['_multiba', '_multibb']);

			this.collect(file, '_multica');
			this.collect(file, '_multicb');
			this.collect(file, '_multicc');
			this.collect(file, '_multicd');
			this.combine(file, multic, ['_multica', '_multicb', '_multicc', '_multicd']);

			this.collect(file, '_multida');
			this.collect(file, '_multidb');
			this.combine(file, multid, ['_multida', '_multidb']);

			this.collect(file, '_multiea');
			this.collect(file, '_multieb');
			this.collect(file, '_multiec');
			this.collect(file, '_multied');
			this.combine(file, multie, ['_multiea', '_multieb', '_multiec', '_multied']);

			this.collect(file, '_multifa');
			this.collect(file, '_multifb');
			this.combine(file, multif, ['_multifa', '_multifb']);

			this.collect(file, '_multiga');
			this.collect(file, '_multigb');
			this.collect(file, '_multigc');
			this.collect(file, '_multigd');
			this.combine(file, multig, ['_multiga', '_multigb', '_multigc', '_multigd']);

			this.collect(file, '_multiha');
			this.collect(file, '_multihb');
			this.combine(file, multih, ['_multiha', '_multihb']);
		});
	}
}

module.exports = Multi;