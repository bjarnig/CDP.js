class Chords {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - Chords ');

		const chorda = '_chorda';
		const chordb = '_chordb';
		const chordc = '_chordc';
		const chordd = '_chordd';
		const chorde = '_chorde';
		const chordf = '_chordf';
		const chordg = '_chordg';
		const chordh = '_chordh';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`modify speed 2 ${this.params(file, '_chordaa', i)}${this.ws}${this.rrange(-12, 12)}`);
				this.run(`modify speed 2 ${this.params(file, '_chordab', i)}${this.ws}${this.rrange(-24, 24)}`);
				this.run(`modify speed 2 ${this.params(file, '_chordac', i)}${this.ws}${this.rrange(-24, 24)}`);
				this.run(`modify speed 2 ${this.params(file, '_chordad', i)}${this.ws}${this.rrange(-12, 12)}`);

				this.run(`modify speed 2 ${this.params(file, '_chordba', i)} -12`);
				this.run(`modify speed 2 ${this.params(file, '_chordbb', i)} -24`);

				this.run(`modify speed 2 ${this.params(file, '_chordca', i)} -5`);
				this.run(`modify speed 2 ${this.params(file, '_chordcb', i)} -7`);
				this.run(`modify speed 2 ${this.params(file, '_chordcc', i)} 5`);
				this.run(`modify speed 2 ${this.params(file, '_chordcd', i)} 7`);

				this.run(`modify speed 2 ${this.params(file, '_chordda', i)}${this.ws}${this.rrange(-24, 24)}`);
				this.run(`modify speed 2 ${this.params(file, '_chorddb', i)}${this.ws}${this.rrange(-24, 24)}`);

				this.run(`modify speed 2 ${this.params(file, '_chordea', i)}${this.ws}${this.rrange(-12, 12)}`);
				this.run(`modify speed 2 ${this.params(file, '_chordeb', i)}${this.ws}${this.rrange(-24, 24)}`);
				this.run(`modify speed 2 ${this.params(file, '_chordec', i)}${this.ws}${this.rrange(-24, 24)}`);
				this.run(`modify speed 2 ${this.params(file, '_chorded', i)}${this.ws}${this.rrange(-12, 12)}`);

				this.run(`modify speed 2 ${this.params(file, '_chordfa', i)} -12`);
				this.run(`modify speed 2 ${this.params(file, '_chordfb', i)} -24`);

				this.run(`modify speed 2 ${this.params(file, '_chordga', i)} -8`);
				this.run(`modify speed 2 ${this.params(file, '_chordgb', i)} -2`);
				this.run(`modify speed 2 ${this.params(file, '_chordgc', i)} 2`);
				this.run(`modify speed 2 ${this.params(file, '_chordgd', i)} 8`);

				this.run(`modify speed 2 ${this.params(file, '_chordha', i)}${this.ws}${this.rrange(-18, 8)}`);
				this.run(`modify speed 2 ${this.params(file, '_chordhb', i)}${this.ws}${this.rrange(-18, 8)}`);
			}

			this.collect(file, '_chordaa');
			this.collect(file, '_chordab');
			this.collect(file, '_chordac');
			this.collect(file, '_chordad');
			this.combine(file, chorda, ['_chordaa', '_chordab', '_chordac', '_chordad']);

			this.collect(file, '_chordba');
			this.collect(file, '_chordbb');
			this.combine(file, chordb, ['_chordba', '_chordbb']);

			this.collect(file, '_chordca');
			this.collect(file, '_chordcb');
			this.collect(file, '_chordcc');
			this.collect(file, '_chordcd');
			this.combine(file, chordc, ['_chordca', '_chordcb', '_chordcc', '_chordcd']);

			this.collect(file, '_chordda');
			this.collect(file, '_chorddb');
			this.combine(file, chordd, ['_chordda', '_chorddb']);

			this.collect(file, '_chordea');
			this.collect(file, '_chordeb');
			this.collect(file, '_chordec');
			this.collect(file, '_chorded');
			this.combine(file, chorde, ['_chordea', '_chordeb', '_chordec', '_chorded']);

			this.collect(file, '_chordfa');
			this.collect(file, '_chordfb');
			this.combine(file, chordf, ['_chordfa', '_chordfb']);

			this.collect(file, '_chordga');
			this.collect(file, '_chordgb');
			this.collect(file, '_chordgc');
			this.collect(file, '_chordgd');
			this.combine(file, chordg, ['_chordga', '_chordgb', '_chordgc', '_chordgd']);

			this.collect(file, '_chordha');
			this.collect(file, '_chordhb');
			this.combine(file, chordh, ['_chordha', '_chordhb']);
		});
	}
}

module.exports = Chords;