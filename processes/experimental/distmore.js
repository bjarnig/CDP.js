/**
 * Experimental DISTMORE Process
 * 
 * This file extracts DISTMORE and related commands from CDP documentation.
 * 
 * Extracted from: docs-cdp/html/cdistort.htm
 * 
 * Commands included:
 * - distmore double: Double (quadruple etc.) frequency of each waveset
 * - distortt: Repeat wavesets within given duration
 * - distrep: Timestretch soundfile by repeating wavesets
 * - distshift: Time-shift or swap wavecycles
 */

class Distmore {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - DISTMORE (Experimental) ');

		const doublea = '_double';
		const doubleb = '_double2';
		const distortta = '_distortt';
		const distorttb = '_distortt2';
		const distrepa = '_distrep';
		const distrepb = '_distrep2';
		const distshifta = '_distshift';
		const distshiftb = '_distshift2';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				// DISTMORE DOUBLE - Double (quadruple etc.) frequency of each waveset
				// mult: octave step up (Range: 1 to 4 octaves, possibly fractional)
				this.run(`distmore double ${this.params(file, doublea, i)}${this.ws}${this.rrange(1.0, 2.5)}`);
				this.run(`distmore double ${this.params(file, doubleb, i)}${this.ws}${this.rrange(2.0, 4.0)}`);

				// DISTORTT - Repeat wavesets within given duration
				// gpcnt: number of wavesets in the group to be repeated
				// rpt: number of repetitions of each waveset group
				// offset: time to skip before starting waveset process
				// dur: required duration of output
				const gpcnt1 = Math.floor(this.rrange(5, 20));
				const rpt1 = Math.floor(this.rrange(3, 10));
				const offset1 = this.rrange(0.0, 0.5);
				const dur1 = this.rrange(2.0, 5.0);
				this.run(`distortt repeat ${this.params(file, distortta, i)}${this.ws}${gpcnt1}${this.ws}${rpt1}${this.ws}${offset1}${this.ws}${dur1}`);

				const gpcnt2 = Math.floor(this.rrange(10, 30));
				const rpt2 = Math.floor(this.rrange(5, 15));
				const offset2 = this.rrange(0.0, 1.0);
				const dur2 = this.rrange(3.0, 8.0);
				this.run(`distortt repeat ${this.params(file, distorttb, i)}${this.ws}${gpcnt2}${this.ws}${rpt2}${this.ws}${offset2}${this.ws}${dur2} -t`);

				// DISTREP - Timestretch soundfile by repeating wavesets
				// Mode 1: Timestretch file by repeating wavecycles
				// Mode 2: Repeat wavecycles, but skip cycles to avoid timestretch
				// multiplier: no. of times each wavecycle (group) repeats (Range: 2 to 32767, integer)
				// cyclecnt: number of wavecycles in repeated groups (Range: 1 to 32767)
				const mult1 = Math.floor(this.rrange(2, 10));
				const cyclecnt1 = Math.floor(this.rrange(1, 8));
				this.run(`distrep distrep 1 ${this.params(file, distrepa, i)}${this.ws}${mult1}${this.ws}${cyclecnt1} -s${this.rrange(5, 20)}`);

				const mult2 = Math.floor(this.rrange(3, 15));
				const cyclecnt2 = Math.floor(this.rrange(2, 12));
				this.run(`distrep distrep 2 ${this.params(file, distrepb, i)}${this.ws}${mult2}${this.ws}${cyclecnt2} -k${Math.floor(this.rrange(0, 10))}`);

				// DISTSHIFT - Time-shift or swap wavecycles
				// Mode 1: Shift alternate (groups of) half-wavecycles forward in time
				// Mode 2: Swap alternate half-wavecycle (groups)
				// grpcnt: size of elements to operate on
				// shift: amount of shift (Mode 1 only)
				const grpcnt1 = Math.floor(this.rrange(1, 10));
				const shift1 = this.rrange(0.01, 0.1);
				this.run(`distshift distshift 1 ${this.params(file, distshifta, i)}${this.ws}${grpcnt1}${this.ws}${shift1}`);

				const grpcnt2 = Math.floor(this.rrange(2, 15));
				this.run(`distshift distshift 2 ${this.params(file, distshiftb, i)}${this.ws}${grpcnt2}`);
			}

			this.collect(file, doublea);
			this.collect(file, doubleb);
			this.collect(file, distortta);
			this.collect(file, distorttb);
			this.collect(file, distrepa);
			this.collect(file, distrepb);
			this.collect(file, distshifta);
			this.collect(file, distshiftb);
		});
	}
}

module.exports = Distmore;

