
var Filter = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - FILTER ');

		var filtera = '_lopa',
			filterb = '_hipa',
			filterc = '_lopb',
			filterd = '_hopb',
			filtere = '_cylop',
			filterf = '_cyhip',
			filterg = '_band',
			filterh = '_notch',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				self.run('filter lohi 1 ' + self.params(file, filtera, i) + ' -6 ' + self.rrange(70, 120) + self.ws + self.rrange(122, 160));
				self.run('filter lohi 1 ' + self.params(file, filterb, i) + ' -6 ' + self.rrange(6001, 8000) + self.ws + self.rrange(4000, 6000));
				self.run('filter lohi 1 ' + self.params(file, filterc, i) + ' -6 ' + self.rrange(60, 100) + self.ws + self.rrange(120, 180));
				self.run('filter lohi 1 ' + self.params(file, filterd, i) + ' -6 ' + self.rrange(8001, 10000) + self.ws + self.rrange(5000, 8000));
				self.run('distort filter 1 ' + self.params(file, filtere, i) + self.ws + self.rrange(1000, 4000) + ' -s0');
				self.run('distort filter 2 ' + self.params(file, filterf, i) + self.ws + self.rrange(500, 2000) + ' -s0');
				self.run('filter variable 3 ' + self.params(file, filterg, i) + self.ws + self.rrange(0.2, 0.8) + ' 2 ' + self.rrange(200, 2000));
				self.run('filter variable 4 ' + self.params(file, filterh, i) + self.ws + self.rrange(0.1, 0.8) + ' 2 ' + self.rrange(400, 3000));
				
			}

			self.collect(file, filtera);
			self.collect(file, filterb);
			self.collect(file, filterc);
			self.collect(file, filterd);
			self.collect(file, filtere);
			self.collect(file, filterf);
			self.collect(file, filterg);
			self.collect(file, filterh);
		});
	};
};

module.exports = Filter;