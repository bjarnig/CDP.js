/**
 * Experimental DISTORT Extended Process
 * 
 * This file extracts additional DISTORT commands from CDP documentation
 * that are not yet included in the main distort.js process.
 * 
 * Extracted from: docs-cdp/html/cdistort.htm
 * 
 * Commands included:
 * - clip: Clip signal at specified level
 * - divide: Distortion by dividing wavecycle frequency
 * - multiply: Distortion by multiplying wavecycle frequency
 * - pitch: Pitchwarp wavecycles
 * - pulsed: Impose regular pulsations
 * - reform: Modify the shape of wavecycles
 * - shuffle: Distortion by shuffling wavecycles
 * - distcut: Cut sound into elements with falling envelope
 */

class DistortExtended {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - DISTORT EXTENDED (Experimental) ');

		const clipa = '_clip';
		const clipb = '_clip2';
		const dividea = '_divide';
		const divideb = '_divide2';
		const multiplya = '_multiply';
		const multiplyb = '_multiply2';
		const pitcha = '_pitch';
		const pitchb = '_pitch2';
		const reforma = '_reform';
		const reformb = '_reform2';
		const shufflea = '_shuffle';
		const shuffleb = '_shuffle2';
		const distcuta = '_distcut';
		const distcutb = '_distcut2';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				// CLIP - Clip signal at specified level
				// Mode 1: Clip signal at specified level (Range: 0 to 1)
				this.run(`clip clip 1 ${this.params(file, clipa, i)}${this.ws}${this.rrange(0.3, 0.8)}`);
				// Mode 2: Clip half-waveforms at specified fraction (Range: 0 to 1)
				this.run(`clip clip 2 ${this.params(file, clipb, i)}${this.ws}${this.rrange(0.2, 0.7)}`);

				// DIVIDE - Distortion by dividing wavecycle frequency
				// N: divider (Range: integer only, 2 to 16)
				this.run(`distort divide ${this.params(file, dividea, i)}${this.ws}${Math.floor(this.rrange(2, 8))}`);
				this.run(`distort divide ${this.params(file, divideb, i)}${this.ws}${Math.floor(this.rrange(3, 12))} -i`);

				// MULTIPLY - Distortion by multiplying wavecycle frequency
				// N: multiplier (Range: 2 to 16, integer only)
				this.run(`distort multiply ${this.params(file, multiplya, i)}${this.ws}${Math.floor(this.rrange(2, 6))}`);
				this.run(`distort multiply ${this.params(file, multiplyb, i)}${this.ws}${Math.floor(this.rrange(3, 8))} -s`);

				// PITCH - Pitchwarp wavecycles
				// octvary: maximum transposition in octaves (Range: > 0.0 to 8.0)
				this.run(`distort pitch ${this.params(file, pitcha, i)}${this.ws}${this.rrange(0.5, 2.0)} -c${Math.floor(this.rrange(32, 128))}`);
				this.run(`distort pitch ${this.params(file, pitchb, i)}${this.ws}${this.rrange(1.0, 4.0)} -c${Math.floor(this.rrange(64, 256))}`);

				// REFORM - Modify the shape of wavecycles
				// Modes 1-7: Various waveform conversions, Mode 8: Exaggerate contour
				this.run(`distort reform ${Math.floor(this.rrange(1, 7))} ${this.params(file, reforma, i)}`);
				this.run(`distort reform 8 ${this.params(file, reformb, i)}${this.ws}${this.rrange(0.1, 5.0)}`);

				// SHUFFLE - Distortion by shuffling wavecycles
				// domain-image: pattern like "abcd-dcba" or "abcd-aacccbdd"
				const domains = ['abcd', 'abc', 'abcdef', 'abcde'];
				const images = ['dcba', 'cba', 'fedcba', 'edcba', 'aacccbdd', 'ccbbaa'];
				const domain = domains[Math.floor(Math.random() * domains.length)];
				const image = images[Math.floor(Math.random() * images.length)];
				this.run(`distort shuffle ${this.params(file, shufflea, i)}${this.ws}${domain}-${image} -c${Math.floor(this.rrange(1, 8))}`);
				const domain2 = domains[Math.floor(Math.random() * domains.length)];
				const image2 = images[Math.floor(Math.random() * images.length)];
				this.run(`distort shuffle ${this.params(file, shuffleb, i)}${this.ws}${domain2}-${image2} -c${Math.floor(this.rrange(2, 16))}`);

				// DISTCUT - Cut sound into elements with falling envelope
				// NOTE: distcut creates multiple numbered output files (e.g., generic_outfilename_001.wav, _002.wav, etc.)
				// So we can't use collect() on it. The files will be created but not interleaved.
				// Using larger cyclecnt values to create fewer output files (fewer segments = fewer files)
				// Mode 1: Waveset-groups are adjacent
				// cyclecnt: number of wavesets in each outfile (Range: 1 to 1000)
				// exp: envelope decay shape (1 = linear, >1 = more rapid, <1 = less rapid)
				// Using larger cyclecnt (50-200) to create fewer, longer segments
				this.run(`distcut distcut 1 ${this.params(file, distcuta, i)}${this.ws}${Math.floor(this.rrange(50, 200))}${this.ws}${this.rrange(0.5, 2.0)}`);
				// Mode 2: Set gap between waveset-groups
				// cyclestep: number of wavesets steps from start of one group to start of next
				// Using larger values to create fewer output files
				this.run(`distcut distcut 2 ${this.params(file, distcutb, i)}${this.ws}${Math.floor(this.rrange(100, 300))}${this.ws}${Math.floor(this.rrange(50, 150))}${this.ws}${this.rrange(0.8, 1.5)}`);
			}

			this.collect(file, clipa);
			this.collect(file, clipb);
			this.collect(file, dividea);
			this.collect(file, divideb);
			this.collect(file, multiplya);
			this.collect(file, multiplyb);
			this.collect(file, pitcha);
			this.collect(file, pitchb);
			this.collect(file, reforma);
			this.collect(file, reformb);
			this.collect(file, shufflea);
			this.collect(file, shuffleb);
			// Note: distcut creates multiple numbered files, so we skip collect() for it
			// The files will be: caa_distcut_c1_001.wav, caa_distcut_c1_002.wav, etc.
		});
	}
}

module.exports = DistortExtended;

