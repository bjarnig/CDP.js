#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const Extend = require('./processes/extend/extend');
const Cycles = require('./processes/cycles/cycles');
const Multi = require('./processes/multi/multi');
const Chords = require('./processes/chords/chords');
const Filter = require('./processes/filter/filter');
const Envel = require('./processes/envel/envel');
const Distort = require('./processes/distort/distort');
const Fade = require('./processes/fade/fade');
const Granulate = require('./processes/granulate/granulate');
const Radical = require('./processes/radical/radical');
const Delete = require('./processes/delete/delete');
const ZigZag = require('./processes/zigzag/zigzag');
const Tremolo = require('./processes/tremolo/tremolo');
const Delverb = require('./processes/delverb/delverb');
const Transpose = require('./processes/transpose/transpose');
const Speca = require('./processes/speca/speca');
const Pitchspec = require('./processes/pitchspec/pitchspec.js');

class Transform {
	constructor(channels) {
		this.channels = channels;
		this.files = [];
		this.wav = '.wav';
		this.ana = '.ana';
		this.ws = ' ';
		this.c = '_c';
		this.outputFolder = 'transformed/';
	}

	init() {
		this.files.forEach((file) => {
			this.run(`housekeep chans 2 ${file}${this.wav}`);
		});
	}

	cleanFiles() {
		this.files.forEach((file) => {
			this.clean(file);
		});
	}

	run(args) {
		console.log(args);
		try {
			const output = execSync(args, { encoding: 'utf8', stdio: 'pipe' });
			if (output && output.trim().length > 0) {
				console.log(output);
			}
		} catch (error) {
			console.error(`Error executing: ${args}`);
			if (error.stdout) console.log(error.stdout);
			if (error.stderr) console.error(error.stderr);
		}
	}

	collect(file, append) {
		this.collectAna(file, append, false);
	}

	collectAna(file, append, ana) {
		let interleave = '';

		for (let i = 1; i <= this.channels; i++) {
			interleave += `${file}${append}${this.c}${i}${this.wav}${this.ws}`;
		}

		this.run(`submix interleave ${interleave}${file}${append}${this.wav}`);

		for (let i = 1; i <= this.channels; i++) {
			this.run(`rm ${file}${append}${this.c}${i}${this.wav}`);

			if (ana) {
				this.run(`rm ${file}${append}${this.c}${i}${this.ana}`);
				this.run(`rm ${file}${this.c}${i}${this.ana}`);
			}
		}
	}

	combine(file, append, files) {
		let mergemany = '';

		for (let i = 0; i < files.length; i++) {
			mergemany += `${file}${files[i]}${this.wav}${this.ws}`;
		}

		this.run(`submix mergemany ${mergemany}${file}${append}${this.wav}`);

		for (let i = 0; i < files.length; i++) {
			this.run(`rm ${file}${files[i]}${this.wav}`);
		}
	}

	clean(file) {
		for (let i = 1; i <= this.channels; i++) {
			this.run(`rm ${file}${this.c}${i}${this.wav}`);
		}
	}

	cleanStereo(file) {
		this.run(`rm ${file}${this.wav}`);
	}

	inputAna(file, channel) {
		return `${file}${channel}${this.ana}${this.ws}`;
	}

	input(file, channel) {
		return `${file}${channel}${this.wav}${this.ws}`;
	}

	output(file, extension, channel) {
		return `${file}${extension}${channel}${this.wav}`;
	}

	outputAna(file, extension, channel) {
		return `${file}${extension}${channel}${this.ana}`;
	}

	params(file, extension, channel) {
		return `${this.input(file, this.c + channel)}${this.output(file, extension, this.c + channel)}`;
	}

	paramsSimple(file, extension) {
		return `${file}${this.wav}${this.ws}${file}${extension}${this.wav}`;
	}

	paramsAna(file, extension, channel) {
		return `${this.inputAna(file, this.c + channel)}${this.outputAna(file, extension, this.c + channel)}`;
	}

	paramsToAna(file, channel) {
		return `${this.input(file, this.c + channel)}${this.outputAna(file, '', this.c + channel)}`;
	}

	paramsToWav(file, extension, channel) {
		return `${this.inputAna(file + extension, this.c + channel)}${this.output(file, extension, this.c + channel)}`;
	}

	rrange(hi, low) {
		return (Math.random() * (hi - low) + low).toFixed(2);
	}

	readFiles() {
		const files = fs.readdirSync(__dirname);

		console.log(JSON.stringify(files));

		this.files = [];

		for (const file of files) {
			if (path.extname(file) === this.wav && path.basename(file).slice(0, 2) !== '._') {
				this.files.push(path.basename(file, this.wav));
			}
		}
	}
}

// Get input channels from command line arguments
const inputChannels = process.argv[2] || '2';

console.log('  -  CDP  - ');
console.log(`Number of channels : ${inputChannels}`);

// Initialize transform instance
const transform = new Transform(inputChannels);

// Set up process prototypes
Extend.prototype = Object.create(Transform.prototype);
Cycles.prototype = Object.create(Transform.prototype);
Chords.prototype = Object.create(Transform.prototype);
Multi.prototype = Object.create(Transform.prototype);
Filter.prototype = Object.create(Transform.prototype);
Envel.prototype = Object.create(Transform.prototype);
Distort.prototype = Object.create(Transform.prototype);
Fade.prototype = Object.create(Transform.prototype);
Granulate.prototype = Object.create(Transform.prototype);
Radical.prototype = Object.create(Transform.prototype);
Delete.prototype = Object.create(Transform.prototype);
ZigZag.prototype = Object.create(Transform.prototype);
Tremolo.prototype = Object.create(Transform.prototype);
Delverb.prototype = Object.create(Transform.prototype);
Transpose.prototype = Object.create(Transform.prototype);
Speca.prototype = Object.create(Transform.prototype);
Pitchspec.prototype = Object.create(Transform.prototype);

// Initialize transform methods on all process prototypes
const processClasses = [
	Extend, Cycles, Chords, Multi, Filter, Envel, Distort, Fade,
	Granulate, Radical, Delete, ZigZag, Tremolo, Delverb, Transpose, Speca, Pitchspec
];

processClasses.forEach((ProcessClass) => {
	const instance = new ProcessClass([], inputChannels);
	Object.setPrototypeOf(instance, Transform.prototype);
	Object.setPrototypeOf(ProcessClass.prototype, Transform.prototype);
});

transform.readFiles();
transform.init();

console.log('## CDP processing begins, processing:');
console.log(JSON.stringify(transform.files));

// Process command line arguments
for (let i = 3; i < process.argv.length; i++) {
	const processName = process.argv[i];

	switch (processName) {
		case 'cycles': {
			const cycles = new Cycles(transform.files, inputChannels);
			cycles.process();
			break;
		}

		case 'extend': {
			const extend = new Extend(transform.files, inputChannels);
			extend.process();
			break;
		}

		case 'chords': {
			const chords = new Chords(transform.files, inputChannels);
			chords.process();
			break;
		}

		case 'multi': {
			const multi = new Multi(transform.files, inputChannels);
			multi.process();
			break;
		}

		case 'filter': {
			const filter = new Filter(transform.files, inputChannels);
			filter.process();
			break;
		}

		case 'envel': {
			const envel = new Envel(transform.files, inputChannels);
			envel.process();
			break;
		}

		case 'distort': {
			const distort = new Distort(transform.files, inputChannels);
			distort.process();
			break;
		}

		case 'fade': {
			const fade = new Fade(transform.files, inputChannels);
			fade.process();
			break;
		}

		case 'granulate': {
			const granulate = new Granulate(transform.files, inputChannels);
			granulate.process();
			break;
		}

		case 'radical': {
			const radical = new Radical(transform.files, inputChannels);
			radical.process();
			break;
		}

		case 'delete': {
			const del = new Delete(transform.files, inputChannels);
			del.process();
			break;
		}

		case 'tremolo': {
			const tremolo = new Tremolo(transform.files, inputChannels);
			tremolo.process();
			break;
		}

		case 'zigzag': {
			const zigzag = new ZigZag(transform.files, inputChannels);
			zigzag.process();
			break;
		}

		case 'delverb': {
			const delverb = new Delverb(transform.files, inputChannels);
			delverb.process();
			break;
		}

		case 'transpose': {
			const transpose = new Transpose(transform.files, inputChannels);
			transpose.process();
			break;
		}

		case 'speca': {
			const speca = new Speca(transform.files, inputChannels);
			speca.process();
			break;
		}

		case 'pitchspec': {
			const pitchspec = new Pitchspec(transform.files, inputChannels);
			pitchspec.process();
			break;
		}

		default:
			console.warn(`Unknown process: ${processName}`);
	}
}

// Clean up temporary files
transform.cleanFiles();
