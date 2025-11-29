class Delverb {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - DELVERB ');

		const delaya = '_delaya';
		const delayb = '_delayb';
		const delayc = '_delayc';
		const delayd = '_delayd';
		const reva = '_reva';
		const revb = '_revb';
		const revc = '_revc';
		const revd = '_revd';

		this.files.forEach((file) => {
			let revecho = false;

			for (let i = 1; i <= this.channels; i++) {
				const deltima = this.rrange(0.4, 8);
				this.run(`modify revecho 1 ${this.params(file, '_delayaa', i)}${this.ws}${deltima} 0.5 0.8 2 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delayab', i)}${this.ws}${deltima * 2} 0.5 0.8 2 -p1.000000`);

				const deltimb = this.rrange(0.4, 8);
				this.run(`modify revecho 1 ${this.params(file, '_delayba', i)}${this.ws}${deltimb} 0.5 0.8 4 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaybb', i)}${this.ws}${deltimb * 8} 0.5 0.8 4 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaybc', i)}${this.ws}${deltimb * 16} 0.5 0.8 4 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaybd', i)}${this.ws}${deltimb * 32} 0.5 0.8 4 -p1.000000`);

				const deltimc = this.rrange(0.2, 2);
				this.run(`modify revecho 1 ${this.params(file, '_delayca', i)}${this.ws}${deltimc} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaycb', i)}${this.ws}${deltimc * 2} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaycc', i)}${this.ws}${deltimc * 4} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaycd', i)}${this.ws}${deltimc * 8} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delayce', i)}${this.ws}${deltimc * 16} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaycf', i)}${this.ws}${deltimc * 32} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaycg', i)}${this.ws}${deltimc * 64} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaych', i)}${this.ws}${deltimc * 128} 0.5 0.8 2.8 -p1.000000`);

				const deltimd = this.rrange(100, 200);
				this.run(`modify revecho 1 ${this.params(file, '_delayda', i)}${this.ws}${deltimd} 0.5 0.8 2.8 -p1.000000`);
				this.run(`modify revecho 1 ${this.params(file, '_delaydb', i)}${this.ws}${deltimd * 2} 0.5 0.8 2.8 -p1.000000`);

				if (!revecho) {
					this.run(`fastconv -a0.7 ${file}.wav processes/delverb/impulses/a.wav ${file}_revata.wav`);
					this.run(`modify loudness 3 ${file}_revata.wav ${file}${reva}.wav -l0.8`);
					this.run(`rm ${file}_revata.wav`);

					this.run(`fastconv -a0.7 ${file}.wav processes/delverb/impulses/b.wav ${file}_revatb.wav`);
					this.run(`modify loudness 3 ${file}_revatb.wav ${file}${revb}.wav -l0.8`);
					this.run(`rm ${file}_revatb.wav`);

					this.run(`fastconv -a0.7 ${file}.wav processes/delverb/impulses/c.wav ${file}_revatc.wav`);
					this.run(`modify loudness 3 ${file}_revatc.wav ${file}${revc}.wav -l0.8`);
					this.run(`rm ${file}_revatc.wav`);

					this.run(`fastconv -a0.7 ${file}.wav processes/delverb/impulses/d.wav ${file}_revatd.wav`);
					this.run(`modify loudness 3 ${file}_revatd.wav ${file}${revd}.wav -l0.8`);
					this.run(`rm ${file}_revatd.wav`);

					revecho = true;
				}
			}

			this.collect(file, '_delayaa');
			this.collect(file, '_delayab');
			this.combine(file, delaya, ['_delayaa', '_delayab']);

			this.collect(file, '_delayba');
			this.collect(file, '_delaybb');
			this.collect(file, '_delaybc');
			this.collect(file, '_delaybd');
			this.combine(file, delayb, ['_delayba', '_delaybb', '_delaybc', '_delaybd']);

			this.collect(file, '_delayca');
			this.collect(file, '_delaycb');
			this.collect(file, '_delaycc');
			this.collect(file, '_delaycd');
			this.collect(file, '_delayce');
			this.collect(file, '_delaycf');
			this.collect(file, '_delaycg');
			this.collect(file, '_delaych');
			this.combine(file, delayc, ['_delayca', '_delaycb', '_delaycc', '_delaycd', '_delayce', '_delaycf', '_delaycg', '_delaych']);

			this.collect(file, '_delayda');
			this.collect(file, '_delaydb');
			this.combine(file, delayd, ['_delayda', '_delaydb']);
		});
	}
}

module.exports = Delverb;