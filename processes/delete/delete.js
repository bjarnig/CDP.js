class Delete {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - DELETE ');

		const deletea = '_deletea';
		const deleteb = '_deleteb';
		const deletec = '_deletec';
		const deleted = '_deleted';
		const deletee = '_deletee';
		const deletef = '_deletef';
		const deleteg = '_deleteg';
		const deleteh = '_deleteh';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`distort delete 1 ${this.params(file, deletea, i)} processes/delete/brk/trema.txt`);
				this.run(`distort delete 2 ${this.params(file, deleteb, i)} processes/delete/brk/tremb.txt`);
				this.run(`distort delete 3 ${this.params(file, deletec, i)} processes/delete/brk/tremc.txt`);
				this.run(`distort delete 1 ${this.params(file, deleted, i)} processes/delete/brk/tremd.txt`);
				this.run(`distort delete 2 ${this.params(file, deletee, i)} processes/delete/brk/treme.txt`);
				this.run(`distort delete 3 ${this.params(file, deletef, i)} processes/delete/brk/tremf.txt`);
				this.run(`distort delete 2 ${this.params(file, deleteg, i)} processes/delete/brk/tremg.txt`);
				this.run(`distort delete 1 ${this.params(file, deleteh, i)} processes/delete/brk/tremh.txt`);
			}

			this.collect(file, deletea);
			this.collect(file, deleteb);
			this.collect(file, deletec);
			this.collect(file, deleted);
			this.collect(file, deletee);
			this.collect(file, deletef);
			this.collect(file, deleteg);
			this.collect(file, deleteh);
		});
	}
}

module.exports = Delete;
