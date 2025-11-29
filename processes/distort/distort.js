class Distort {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - DISTORT ');

		const distorta = '_average';
		const distortb = '_repeat';
		const distortc = '_fractal';
		const distortd = '_overload';
		const distorte = '_interpol';
		const distortf = '_omit';
		const distortg = '_replim';
		const distorth = '_replace';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`distort average ${this.params(file, distorta, i)}${this.ws}${this.rrange(12, 80)}`);
				this.run(`distort repeat ${this.params(file, distortb, i)}${this.ws}${this.rrange(2, 6)} -c40`);
				this.run(`distort fractal ${this.params(file, distortc, i)}${this.ws}${this.rrange(4, 60)}${this.ws}${this.rrange(0.1, 0.6)}`);
				this.run(`distort overload 2 ${this.params(file, distortd, i)}${this.ws}${this.rrange(0.001, 0.025)}${this.ws}${this.rrange(0.8, 0.99)}${this.ws}${this.rrange(100, 4000)}`);
				this.run(`distort interpolate ${this.params(file, distorte, i)}${this.ws}${this.rrange(4, 8)}`);
				this.run(`distort omit ${this.params(file, distortf, i)}${this.ws}${this.rrange(2, 5)}${this.ws}${this.rrange(6, 8)}`);
				this.run(`distort replim ${this.params(file, distortg, i)}${this.ws}${this.rrange(2, 10)} -c30 -s0 -f2000`);
				this.run(`distort replace ${this.params(file, distorth, i)}${this.ws}${this.rrange(2, 12)}`);
			}

			this.collect(file, distorta);
			this.collect(file, distortb);
			this.collect(file, distortc);
			this.collect(file, distortd);
			this.collect(file, distorte);
			this.collect(file, distortf);
			this.collect(file, distortg);
			this.collect(file, distorth);
		});
	}
}

module.exports = Distort;
