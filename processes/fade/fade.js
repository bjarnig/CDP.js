class Fade {
	constructor(files, channels) {
		this.files = files;
		this.channels = channels;
	}

	process() {
		console.log(' PROCESS - FADE ');

		const fadea = '_fadea';
		const fadeb = '_fadeb';
		const fadec = '_fadec';
		const faded = '_faded';
		const fadee = '_fadee';
		const fadef = '_fadef';
		const fadeg = '_fadeg';
		const fadeh = '_fadeh';

		this.files.forEach((file) => {
			for (let i = 1; i <= this.channels; i++) {
				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/fadea.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${fadea}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/fadeb.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${fadeb}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/fadec.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${fadec}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/faded.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${faded}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/fadee.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${fadee}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/fadef.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${fadef}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/fadeg.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${fadeg}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);

				this.run(`modify loudness 1 ${file}_c${i}.wav ${file}l_c${i}.wav processes/fade/brk/fadeh.brk`);
				this.run(`sfedit cut 1 ${file}l_c${i}.wav ${file}${fadeh}_c${i}.wav 0 26`);
				this.run(`rm ${file}l_c${i}.wav`);
			}

			this.collect(file, fadea);
			this.collect(file, fadeb);
			this.collect(file, fadec);
			this.collect(file, faded);
			this.collect(file, fadee);
			this.collect(file, fadef);
			this.collect(file, fadeg);
			this.collect(file, fadeh);
		});
	}
}

module.exports = Fade;