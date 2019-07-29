
var Speca = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - SPECTRAL ');

		var specaa = '_stretch',
			specab = '_blura',
			specac = '_shufflea',
			specad = '_drunka',
			specae = '_spread',
			specaf = '_blurb',
			specag = '_shuffleb',
			specah = '_drunkb',
		 	windowSize = 'c4096',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {

				self.run('pvoc anal 1 ' + self.paramsToAna(file, i) + ' -' + windowSize + ' -o3');

				// STRETCH
				self.run('stretch time 1 ' + self.paramsAna(file, specaa, i) + ' 4');
				self.run('pvoc synth ' + self.paramsToWav(file, specaa, i));
				
				// BLUR
				self.run('blur blur ' + self.paramsAna(file, specab, i) + ' 200');
				self.run('pvoc synth ' + self.paramsToWav(file, specab, i)); 

				// SHUFFLE 
				self.run('blur shuffle ' + self.paramsAna(file, specac, i) + ' ABC-CBA 20');
				self.run('pvoc synth ' + self.paramsToWav(file, specac, i));

				// DRUNK
				self.run('blur drunk ' + self.paramsAna(file, specad, i) + ' 16 4 32');
				self.run('pvoc synth ' + self.paramsToWav(file, specad, i));

				// SPREAD
				self.run('blur spread ' + self.paramsAna(file, specae, i) + '  -f' + self.rrange(10, 50) );
				self.run('pvoc synth ' + self.paramsToWav(file, specae, i));

				// BLUR B
				self.run('blur blur ' + self.paramsAna(file, specaf, i) + self.ws + self.rrange(300, 550));
				self.run('pvoc synth ' + self.paramsToWav(file, specaf, i)); 

				// SHUFFLE B
				self.run('blur shuffle ' + self.paramsAna(file, specag, i) + ' ABCDEFG-CBAGFED 10');
				self.run('pvoc synth ' + self.paramsToWav(file, specag, i));

				// DRUNK B
				self.run('blur drunk ' + self.paramsAna(file, specah, i) + ' 30 1 32');
				self.run('pvoc synth ' + self.paramsToWav(file, specah, i));
			}

			self.collectAna(file, specaa, true);
			self.collectAna(file, specab, true);
			self.collectAna(file, specac, true);
			self.collectAna(file, specad, true);
			self.collectAna(file, specae, true);
			self.collectAna(file, specaf, true);
			self.collectAna(file, specag, true);
			self.collectAna(file, specah, true);
		});
	};
};

module.exports = Speca;