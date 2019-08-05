
var Granulate = function(files, channels) {

	this.files = files;
	this.channels = channels;

	this.process = function() {

		console.log(' PROCESS - Granulate ');

		var granulatea = '_granulatea',
			granulateb = '_granulateb',
			granulatec = '_granulatec',
			granulated = '_granulated',
			granulatee = '_granulatee',
			granulatef = '_granulatef',
			granulateg = '_granulateg',
			granulateh = '_granulateh',

		 	self = this;

		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {

				self.run('modify brassage 4 ' + self.params(file, granulatea, i) + ' 80 -r40'); // scramble grainsize & scramble_range - search for next grain, before infile 'now' (Default: 0 ms)
				self.run('modify brassage 5 ' + self.params(file, granulateb, i) + ' 2'); // Granulate density (Range 0 - 2)
				self.run('modify brassage 2 ' + self.params(file, granulatec, i) + ' 0.25'); // timeshrink – speed of advance in infile, relative to outfile (Range: >= 0)
				self.run('modify brassage 2 ' + self.params(file, granulated, i) + ' 1.5'); // timeshrink – speed of advance in infile, relative to outfile (Range: >= 0)
				self.run('modify brassage 2 ' + self.params(file, granulatee, i) + ' 1.5'); // timeshrink – speed of advance in infile, relative to outfile (Range: >= 0)

			}

			self.collect(file, granulatea);
			self.collect(file, granulateb);
			self.collect(file, granulatec);
			self.collect(file, granulated);
			self.collect(file, granulatee);
		});
	};
};

module.exports = Granulate;
