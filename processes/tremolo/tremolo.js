class Tremolo {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - TREMOLO ');

		const tremoloa = '_tremoloa';
		const tremolob = '_tremolob';
		const tremoloc = '_tremoloc';
		const tremolod = '_tremolod';
		const tremoloe = '_tremoloe';
		const tremolof = '_tremolof';
		const tremolog = '_tremolog';
		const tremoloh = '_tremoloh';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`envel tremolo 1 ${this.params(file, tremoloa, i)} processes/tremolo/brk/trema.txt ${this.rrange(0.4, 0.8)} 1.000000`);
				this.run(`envel tremolo 1 ${this.params(file, tremolob, i)} processes/tremolo/brk/tremb.txt ${this.rrange(0.8, 0.99)}  1.000000`);
				this.run(`envel tremolo 1 ${this.params(file, tremoloc, i)} processes/tremolo/brk/tremc.txt ${this.rrange(0.5, 0.95)}  1.000000`);
				this.run(`envel tremolo 1 ${this.params(file, tremolod, i)} processes/tremolo/brk/tremd.txt ${this.rrange(0.85, 0.95)}  1.000000`);
				this.run(`envel tremolo 1 ${this.params(file, tremoloe, i)} processes/tremolo/brk/treme.txt ${this.rrange(0.4, 0.8)}  1.000000`);
				this.run(`envel tremolo 1 ${this.params(file, tremolof, i)} processes/tremolo/brk/tremf.txt ${this.rrange(0.5, 0.7)}  1.000000`);
				this.run(`envel tremolo 1 ${this.params(file, tremolog, i)} processes/tremolo/brk/tremg.txt ${this.rrange(0.6, 0.9)}  1.000000`);
				this.run(`envel tremolo 1 ${this.params(file, tremoloh, i)} processes/tremolo/brk/tremh.txt ${this.rrange(0.3, 0.5)}  1.000000`);
			}

			this.collect(file, tremoloa);
			this.collect(file, tremolob);
			this.collect(file, tremoloc);
			this.collect(file, tremolod);
			this.collect(file, tremoloe);
			this.collect(file, tremolof);
			this.collect(file, tremolog);
			this.collect(file, tremoloh);
		});
	}
}

module.exports = Tremolo;
