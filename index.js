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
const DistortExtended = require('./processes/experimental/distort_extended');
const Distmore = require('./processes/experimental/distmore');

class Transform {
	constructor(channels) {
		this.channels = channels;
		this.files = [];
		this.wav = '.wav';
		this.ana = '.ana';
		this.ws = ' ';
		this.c = '_c';
		this.outputFolder = 'transformed/';
		// Store project root directory (where index.js is located)
		this.projectRoot = __dirname;
	}

	init() {
		const currentDir = process.cwd();
		let maxChannelsFound = 0;
		
		this.files.forEach((file) => {
			const inputFile = `${file}${this.wav}`;
			
			if (this.channels > 1) {
				// Try to extract channels (works for multi-channel files)
				this.run(`housekeep chans 2 ${inputFile}`);
				
				// Check if we got the expected number of channel files
				// If the file is mono, only _c1.wav will be created
				const lastChannelFile = path.join(currentDir, `${file}${this.c}${this.channels}${this.wav}`);
				
				// Since execSync is synchronous, check immediately after command completes
				if (!fs.existsSync(lastChannelFile)) {
					// File is mono, convert to stereo first, then split
					const stereoFile = `${file}_stereo${this.wav}`;
					this.run(`housekeep chans 5 ${inputFile} ${stereoFile}`);
					// Now split the stereo file - this creates stereoFile_c1.wav and stereoFile_c2.wav
					this.run(`housekeep chans 2 ${stereoFile}`);
					
					// Rename the channel files to match expected naming (remove _stereo from name)
					for (let i = 1; i <= this.channels; i++) {
						const oldName = path.join(currentDir, `${file}_stereo${this.c}${i}${this.wav}`);
						const newName = path.join(currentDir, `${file}${this.c}${i}${this.wav}`);
						if (fs.existsSync(oldName)) {
							this.run(`mv "${oldName}" "${newName}"`);
						}
					}
					
					// Remove the temporary stereo file
					this.run(`rm ${stereoFile}`);
				}
				
				// Count how many channel files actually exist for this file
				let actualChannels = 0;
				for (let i = 1; i <= this.channels; i++) {
					const channelFile = path.join(currentDir, `${file}${this.c}${i}${this.wav}`);
					if (fs.existsSync(channelFile)) {
						actualChannels = i;
					} else {
						break;
					}
				}
				
				// Track the maximum number of channels found across all files
				if (actualChannels > maxChannelsFound) {
					maxChannelsFound = actualChannels;
				}
			}
		});
		
		// Update channels to match the actual number of channels available
		// This prevents errors when requesting more channels than the file has
		if (maxChannelsFound > 0 && maxChannelsFound < this.channels) {
			console.log(`Warning: Requested ${this.channels} channels but only ${maxChannelsFound} channels found. Processing ${maxChannelsFound} channels.`);
			this.channels = maxChannelsFound;
		}
	}

	cleanFiles() {
		this.files.forEach((file) => {
			this.clean(file);
		});
	}

	run(args) {
		// Resolve paths that start with "processes/" to absolute paths relative to project root
		// This allows processes to work from any directory
		let resolvedArgs = args;
		if (this.projectRoot) {
			// Replace relative paths starting with "processes/" with absolute paths
			// Match "processes/" followed by non-whitespace characters (handles paths with spaces in quotes)
			resolvedArgs = args.replace(/\bprocesses\/[^\s]+/g, (match) => {
				// Remove quotes if present, resolve path, then add quotes back if needed
				const hasQuotes = (match.startsWith('"') || match.startsWith("'"));
				const cleanMatch = hasQuotes ? match.slice(1, -1) : match;
				const resolved = path.join(this.projectRoot, cleanMatch);
				return hasQuotes ? `"${resolved}"` : resolved;
			});
		}
		
		console.log(resolvedArgs);
		try {
			const output = execSync(resolvedArgs, { encoding: 'utf8', stdio: 'pipe' });
			if (output && output.trim().length > 0) {
				console.log(output);
			}
		} catch (error) {
			console.error(`Error executing: ${resolvedArgs}`);
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
		// Use process.cwd() to read files from the current working directory
		// This allows the command to work from any directory
		const currentDir = process.cwd();
		const files = fs.readdirSync(currentDir);

		console.log(JSON.stringify(files));

		this.files = [];

		for (const file of files) {
			// Only process .wav files
			if (path.extname(file) !== this.wav) {
				continue;
			}
			
			const basename = path.basename(file, this.wav);
			
			// Filter out system files, invalid names, and files that are just underscores or dots
			if (basename.length > 0 
				&& basename.slice(0, 2) !== '._' 
				&& basename !== '_' 
				&& !basename.match(/^\.+$/)
				&& !basename.match(/^_+$/)) {
				this.files.push(basename);
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

// Set up process prototypes - ensure they inherit from Transform
const processClasses = [
	Extend, Cycles, Chords, Multi, Filter, Envel, Distort, Fade,
	Granulate, Radical, Delete, ZigZag, Tremolo, Delverb, Transpose, Speca, Pitchspec,
	DistortExtended, Distmore
];

processClasses.forEach((ProcessClass) => {
	// Set prototype to Transform.prototype
	Object.setPrototypeOf(ProcessClass.prototype, Transform.prototype);
});

transform.readFiles();
transform.init();

console.log('## CDP processing begins, processing:');
console.log(JSON.stringify(transform.files));

// Helper function to initialize process instance with Transform properties
function initializeProcess(instance, channels) {
	instance.channels = channels;
	instance.wav = '.wav';
	instance.ana = '.ana';
	instance.ws = ' ';
	instance.c = '_c';
	instance.outputFolder = 'transformed/';
	// Set project root so processes can resolve resource file paths
	instance.projectRoot = __dirname;
	return instance;
}

// Process command line arguments
for (let i = 3; i < process.argv.length; i++) {
	const processName = process.argv[i];

	switch (processName) {
		case 'cycles': {
			const cycles = initializeProcess(new Cycles(transform.files, inputChannels), inputChannels);
			cycles.process();
			break;
		}

		case 'extend': {
			const extend = initializeProcess(new Extend(transform.files, inputChannels), inputChannels);
			extend.process();
			break;
		}

		case 'chords': {
			const chords = initializeProcess(new Chords(transform.files, inputChannels), inputChannels);
			chords.process();
			break;
		}

		case 'multi': {
			const multi = initializeProcess(new Multi(transform.files, inputChannels), inputChannels);
			multi.process();
			break;
		}

		case 'filter': {
			const filter = initializeProcess(new Filter(transform.files, inputChannels), inputChannels);
			filter.process();
			break;
		}

		case 'envel': {
			const envel = initializeProcess(new Envel(transform.files, inputChannels), inputChannels);
			envel.process();
			break;
		}

		case 'distort': {
			const distort = initializeProcess(new Distort(transform.files, inputChannels), inputChannels);
			distort.process();
			break;
		}

		case 'fade': {
			const fade = initializeProcess(new Fade(transform.files, inputChannels), inputChannels);
			fade.process();
			break;
		}

		case 'granulate': {
			const granulate = initializeProcess(new Granulate(transform.files, inputChannels), inputChannels);
			granulate.process();
			break;
		}

		case 'radical': {
			const radical = initializeProcess(new Radical(transform.files, inputChannels), inputChannels);
			radical.process();
			break;
		}

		case 'delete': {
			const del = initializeProcess(new Delete(transform.files, inputChannels), inputChannels);
			del.process();
			break;
		}

		case 'tremolo': {
			const tremolo = initializeProcess(new Tremolo(transform.files, inputChannels), inputChannels);
			tremolo.process();
			break;
		}

		case 'zigzag': {
			const zigzag = initializeProcess(new ZigZag(transform.files, inputChannels), inputChannels);
			zigzag.process();
			break;
		}

		case 'delverb': {
			const delverb = initializeProcess(new Delverb(transform.files, inputChannels), inputChannels);
			delverb.process();
			break;
		}

		case 'transpose': {
			const transpose = initializeProcess(new Transpose(transform.files, inputChannels), inputChannels);
			transpose.process();
			break;
		}

		case 'speca': {
			const speca = initializeProcess(new Speca(transform.files, inputChannels), inputChannels);
			speca.process();
			break;
		}

		case 'pitchspec': {
			const pitchspec = initializeProcess(new Pitchspec(transform.files, inputChannels), inputChannels);
			pitchspec.process();
			break;
		}

		case 'distort_extended': {
			const distortExtended = initializeProcess(new DistortExtended(transform.files, inputChannels), inputChannels);
			distortExtended.process();
			break;
		}

		case 'distmore': {
			const distmore = initializeProcess(new Distmore(transform.files, inputChannels), inputChannels);
			distmore.process();
			break;
		}

		default:
			console.warn(`Unknown process: ${processName}`);
	}
}

// Clean up temporary files
transform.cleanFiles();
