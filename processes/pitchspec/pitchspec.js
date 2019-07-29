
var Pitchspec = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - SPECPITCH ');

		var specaa = '_spechorda',
			specab = '_downshift',
			specac = '_tune',
			specad = '_spechordb',
			specae = '_tuneb',
			specaf = '_spechordc',
		 	windowSize = 'c8192',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {

				self.run('pvoc anal 1 ' + self.paramsToAna(file, i) + ' -' + windowSize + ' -o3');

				// CHORDA
				self.run('pitch chord ' + self.paramsAna(file, specaa, i) + ' processes/pitchspec/brk/chorda.txt -x');
				self.run('pvoc synth ' + self.paramsToWav(file, specaa, i));

				// DOWNSHIFT
				self.run('pitch transp 2 ' + self.paramsAna(file, specab, i) + self.ws + self.rrange(800, 2000) + ' -d1.0');
				self.run('pvoc synth ' + self.paramsToWav(file, specab, i));

				// TUNE
				self.run('pitch tune 2 ' + self.paramsAna(file, specac, i) + ' processes/pitchspec/brk/tune_midilista.txt -c' + self.rrange(0.0, 1.0));
				self.run('pvoc synth ' + self.paramsToWav(file, specac, i));

				// CHORD B
				self.run('pitch chord ' + self.paramsAna(file, specad, i) + ' processes/pitchspec/brk/chordb.txt -x');
				self.run('pvoc synth ' + self.paramsToWav(file, specad, i));

				// TUNE B
				self.run('pitch tune 2 ' + self.paramsAna(file, specae, i) + ' processes/pitchspec/brk/tune_midilistb.txt -c' + self.rrange(0.0, 1.0));
				self.run('pvoc synth ' + self.paramsToWav(file, specae, i));

				// CHORD C
				self.run('pitch chord ' + self.paramsAna(file, specaf, i) + ' processes/pitchspec/brk/chordc.txt -x');
				self.run('pvoc synth ' + self.paramsToWav(file, specaf, i));
			}

			self.collectAna(file, specaa, true);
			self.collectAna(file, specab, true);
			self.collectAna(file, specac, true);
			self.collectAna(file, specad, true);
			self.collectAna(file, specae, true);
			self.collectAna(file, specaf, true);
		});
	};
};

module.exports = Pitchspec;