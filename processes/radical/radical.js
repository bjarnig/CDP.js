
var Radical = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - Radical ');

		var radicala = '_reverse',
			radicalb = '_shred',
			radicalc = '_ringa',
			radicald = '_degrade',
			radicale = '_ringm',
			radicalf = '_shredb',
			radicalg = '_degradeb', 
			radicalh = '_ringmb',
		 	
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {

				self.run('modify radical 1 ' + self.params(file, radicala, i) + self.ws );
				self.run('modify radical 2 ' + self.params(file, radicalb, i) + ' 8 0.8 -n'); // repeats chunklen
				self.run('modify radical 5 ' + self.params(file, radicalc, i) + self.ws + self.rrange(7, 15)); 
				self.run('modify radical 4 ' + self.params(file, radicald, i) + ' 8 4'); // bit_resolution srate_division
				self.run('modify radical 5 ' + self.params(file, radicale, i) + self.ws + self.rrange(60, 150)); 
				self.run('modify radical 2 ' + self.params(file, radicalf, i) + self.ws + ' 32 0.4 -n'); // repeats chunklen
				self.run('modify radical 4 ' + self.params(file, radicalg, i) + ' 6 4'); // bit_resolution srate_division
				self.run('modify radical 5 ' + self.params(file, radicalh, i) + self.ws + self.rrange(500, 1500)); 
			
			}

			self.collect(file, radicala);
			self.collect(file, radicalb);
			self.collect(file, radicalc);
			self.collect(file, radicald);
			self.collect(file, radicale);
			self.collect(file, radicalf);
			self.collect(file, radicalg);
			self.collect(file, radicalh);

		});
	};
};

module.exports = Radical;