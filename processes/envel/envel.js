class Envel {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - ENVEL ');

		const envela = '_envela';
		const envelb = '_envelb';
		const envelc = '_envelc';
		const enveld = '_enveld';
		const envele = '_envele';
		const envelf = '_envelf';
		const envelg = '_envelg';
		const envelh = '_envelh';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/trema.txt 0.01 -e0.5`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${envela}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/tremb.txt 0.12 -e1`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${envelb}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/tremc.txt 0.23 -e2`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${envelc}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/tremd.txt 0.21 -e3`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${enveld}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/treme.txt 0.18 -e4`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${envele}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/tremf.txt 0.3 -e3.6`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${envelf}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/tremg.txt 0.43 -e32`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${envelg}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`distort envel 3 ${file}_c${i}.wav ${file}l_c${i}.wav processes/envel/brk/tremh.txt 0.3 -e3.6`);
				this.run(`modify loudness 3 ${file}l_c${i}.wav ${file}${envelh}_c${i}.wav -l0.900000`);
				this.run(`rm ${file}l_c${i}.wav`);
			}

			this.collect(file, envela);
			this.collect(file, envelb);
			this.collect(file, envelc);
			this.collect(file, enveld);
			this.collect(file, envele);
			this.collect(file, envelf);
			this.collect(file, envelg);
			this.collect(file, envelh);
		});
	}
}

module.exports = Envel;