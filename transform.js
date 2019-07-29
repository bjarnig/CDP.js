var exec = require('sync-exec');
var Extend = require('./processes/extend/extend');
var Cycles = require('./processes/cycles/cycles');
var Multi = require('./processes/multi/multi');
var Chords = require('./processes/chords/chords');
var Filter = require('./processes/filter/filter');
var Envel = require('./processes/envel/envel');
var Distort = require('./processes/distort/distort');
var Fade = require('./processes/fade/fade');
var Granulate = require('./processes/granulate/granulate');
var Radical = require('./processes/radical/radical');
var Delete = require('./processes/delete/delete');
var ZigZag = require('./processes/zigzag/zigzag');
var Tremolo = require('./processes/tremolo/tremolo');
var Delverb = require('./processes/delverb/delverb');
var Transpose = require('./processes/transpose/transpose');
var Speca = require('./processes/speca/speca');
var Pitchspec = require('./processes/pitchspec/pitchspec.js');

var Transform = function(channels) {

	this.channels = channels,

	this.init = function() {
		var self = this;
		this.files.forEach(function(file) {
			self.run('housekeep chans 2 ' + file + self.wav);
		});
	},

	this.cleanFiles = function() {
		var self = this;
		this.files.forEach(function(file) {
			self.clean(file);
		});
	}
};

// Transform.prototype.run = function(args, time) {
// 	console.log(args); // temp debug
// 	var code = sh.run(args);
// 	if(code.length > 1) { console.log(code); }
// };

Transform.prototype.run = function(args, time) {
	console.log(args);
	var code = exec(args);
	if(code.length > 1) { console.log(code); }
};

Transform.prototype.collect = function(file, append) {
	this.collectAna(file, append, false);
};

Transform.prototype.collectAna = function(file, append, ana) {
	var interleave = '';

	for (var i = 1; i <= this.channels; i++) {
		interleave =  interleave + file + append + this.c + i + this.wav + this.ws;
	}

	this.run('submix interleave ' + interleave + file + append + this.wav);

	for (var i = 1; i <= this.channels; i++) {
		this.run('rm ' + file + append + this.c + i + this.wav);

		if(ana) {
			this.run('rm ' + file + append + this.c + i + this.ana);
			this.run('rm ' + file + this.c + i + this.ana);
		}
	}
};

Transform.prototype.combine = function(file, append, files) {
	var mergemany = '';

	for(var i = 0; i < files.length; i++) {
		mergemany =  mergemany + file + files[i] + this.wav + this.ws;
	}

	this.run('submix mergemany ' + mergemany + file + append + this.wav);

	for(var i = 0; i < files.length; i++) {
		this.run('rm ' + file + files[i] + this.wav);
	}
};

Transform.prototype.clean = function(file) {

	for (var i = 1; i <= this.channels; i++) {
		this.run('rm ' + file + this.c + i + this.wav);
	}
};

Transform.prototype.cleanStereo = function(file) {
	this.run('rm ' + file + this.wav);
};

Transform.prototype.inputAna = function(file, channel) {
	return file + channel + this.ana + this.ws;
};

Transform.prototype.input = function(file, channel) {
	return file + channel + this.wav + this.ws;
};

Transform.prototype.output = function(file, extension, channel) {
	return  file + extension + channel + this.wav;
};

Transform.prototype.outputAna = function(file, extension, channel) {
	return  file + extension + channel + this.ana;
};

Transform.prototype.params = function(file, extension, channel) {
	return this.input(file, this.c + channel) + this.output(file, extension, this.c + channel)
};

Transform.prototype.paramsSimple = function(file, extension) {
	return file + this.wav + this.ws + file + extension + this.wav;
};

Transform.prototype.paramsAna = function(file, extension, channel) {
	return this.inputAna(file, this.c + channel) + this.outputAna(file, extension, this.c + channel)
};

Transform.prototype.paramsToAna = function(file, channel) {
	return this.input(file, this.c + channel) + this.outputAna(file, '', this.c + channel)
};

Transform.prototype.paramsToWav = function(file, extension, channel) {
	return this.inputAna(file + extension, this.c + channel) + this.output(file, extension, this.c + channel)
};

Transform.prototype.rrange = function(hi, low) {
	return (Math.random() * (hi - low) + low).toFixed(2);
};

Transform.prototype.readFiles = function() {
	var fs = require('fs'),
		path = require('path'),
		files = fs.readdirSync(__dirname);

   	this.files = [];

	for(var i in files) {
	    if(path.extname(files[i]) === this.wav && path.basename(files[i]).slice(0,2) !== '._') {
	    	this.files.push(path.basename(files[i], this.wav));
	    }
	}
};

/* Variables */

Transform.prototype.wav = '.aif';
Transform.prototype.ana = '.ana';
Transform.prototype.ws = ' ';
Transform.prototype.c = '_c';
Transform.prototype.outputFolder = 'transformed/';

/* Process */

var inputChannels = 2,
    inputChannels = process.argv[2];

console.log('  -  CDP  - ');
console.log('Number of channels : ' + inputChannels);

Extend.prototype = new Transform(inputChannels);
Cycles.prototype = new Transform(inputChannels);
Chords.prototype = new Transform(inputChannels);
Multi.prototype = new Transform(inputChannels);
Filter.prototype = new Transform(inputChannels);
Envel.prototype = new Transform(inputChannels);
Distort.prototype = new Transform(inputChannels);
Fade.prototype = new Transform(inputChannels);
Granulate.prototype = new Transform(inputChannels);
Radical.prototype = new Transform(inputChannels);
Delete.prototype = new Transform(inputChannels);
ZigZag.prototype = new Transform(inputChannels);
Tremolo.prototype = new Transform(inputChannels);
Delverb.prototype = new Transform(inputChannels);
Transpose.prototype = new Transform(inputChannels);
Speca.prototype = new Transform(inputChannels);
Pitchspec.prototype = new Transform(inputChannels);

var transform = new Transform(inputChannels);

transform.readFiles();
transform.init();

console.log('Processing begins');

for (var i = 3; i < process.argv.length; i++) {

	switch(process.argv[i]){

		case 'cycles':
		cycles = new Cycles(transform.files, inputChannels);
		cycles.process();
		break;

		case 'extend':
		extend = new Extend(transform.files, inputChannels);
		extend.process();
		break;

		case 'chords':
		chords = new Chords(transform.files, inputChannels);
		chords.process();
		break;

		case 'multi':
		multi = new Multi(transform.files, inputChannels);
		multi.process();
		break;

		case 'filter':
		filter = new Filter(transform.files, inputChannels);
		filter.process();
		break;

		case 'envel':
		envel = new Envel(transform.files, inputChannels);
		envel.process();
		break;

		case 'distort':
		distort = new Distort(transform.files, inputChannels);
		distort.process();
		break;

		case 'fade':
		fade = new Fade(transform.files, inputChannels);
		fade.process();
		break;

		case 'granulate':
		granulate = new Granulate(transform.files, inputChannels);
		granulate.process();
		break;

		case 'radical':
		radical = new Radical(transform.files, inputChannels);
		radical.process();
		break;

		case 'delete':
		del = new Delete(transform.files, inputChannels);
		del.process();
		break;

		case 'tremolo':
		tremolo = new Tremolo(transform.files, inputChannels);
		tremolo.process();
		break;

		case 'zigzag':
		zigzag = new ZigZag(transform.files, inputChannels);
		zigzag.process();
		break;

		case 'delverb':
		delverb = new Delverb(transform.files, inputChannels);
		delverb.process();
		break;

		case 'transpose':
		transpose = new Transpose(transform.files, inputChannels);
		transpose.process();
		break;

		case 'speca':
		speca = new Speca(transform.files, inputChannels);
		speca.process();
		break;

		case 'pitchspec':
		pitchspec = new Pitchspec(transform.files, inputChannels);
		pitchspec.process();
		break;
	}
}

/* Terminate  */

transform.cleanFiles();
