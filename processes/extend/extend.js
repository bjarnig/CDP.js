class Extend {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - EXTEND ');

		const extenda = '_extenda';
		const zigzaga = '_zigzaga';
		const baktobak = '_ceracu';
		const drunka = '_drunka';
		const loopa = '_loopa';
		const scramblea = '_scramblea';
		const zigzagb = '_zigzagb';
		const drunkb = '_drunkb';
		const drunkd = '_drunkd';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`extend loop 2 ${this.params(file, extenda, i)}${this.ws}${this.rrange(14, 16)}${this.ws}0.000000 152.345 -l76 -w15.000000 -s63`);
				this.run(`extend zigzag 1 ${this.params(file, zigzaga, i)} 0.957 22.3 32.360003 0.0505 -s15.200000 -m0.232 -r0`);
				this.run(`extend baktobak ${this.params(file, baktobak, i)} 1.913 15.000000`);
				this.run(`extend drunk 2 ${this.params(file, drunka, i)} 27  1  2  0.2  0.08  10  30  -c0.5`);
				this.run(`extend loop 2 ${this.params(file, loopa, i)} 25.36 0.000000 67.500000 -l18.18000 -w28.000000 -s0.800000`);
				this.run(`extend zigzag 1 ${this.params(file, zigzagb, i)} 0.85 1.05 32.454558 0.045000 -s15.000000 -m0.075546875 -r0`);
				this.run(`extend drunk 1 ${this.params(file, drunkb, i)} 25.454 processes/extend/brk/drieddrunk.txt 2.133 0.020000 0.1080859375 -s22 -c0.0203125 -o0.0928125 -r0`);
				this.run(`extend drunk 1 ${this.params(file, drunkd, i)} 25 0.8 processes/extend/brk/xm_ambitusb.txt 0.08203125 processes/extend/brk/xm_clocktick.txt -s18 -c0.01953125 -o0.78890625 -r0`);
				this.run(`extend scramble 2 ${this.params(file, scramblea, i)} 0.4 0.8 28`);
			}

			this.collect(file, zigzaga);
			this.collect(file, extenda);
			this.collect(file, baktobak);
			this.collect(file, drunka);
			this.collect(file, loopa);
			this.collect(file, scramblea);
			this.collect(file, zigzagb);
			this.collect(file, drunkb);
			this.collect(file, drunkd);
		});
	}
}

module.exports = Extend;