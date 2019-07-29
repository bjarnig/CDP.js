
var Transpose = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - TRANSPOSE ');

		var transposea = '_octdown',
			transposeb = '_twooctdown',
			transposec = '_octup',
			transposed = '_fifth',
			transposee = '_fifthdown',
			transposef = '_seventh',
			transposeg = '_seventhdown'
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				self.run('modify speed 2 ' + self.params(file, transposea, i) + ' -12');
				self.run('modify speed 2 ' + self.params(file, transposeb, i) + ' -24');
				self.run('modify speed 2 ' + self.params(file, transposec, i) + ' 12');
				self.run('modify speed 2 ' + self.params(file, transposed, i) + ' 5');
				self.run('modify speed 2 ' + self.params(file, transposee, i) + ' -5');
				self.run('modify speed 2 ' + self.params(file, transposef, i) + ' 7');
				self.run('modify speed 2 ' + self.params(file, transposeg, i) + ' -7');
			}

			self.collect(file, transposea);
			self.collect(file, transposeb);
			self.collect(file, transposec);
			self.collect(file, transposed);
			self.collect(file, transposee);
			self.collect(file, transposef);
			self.collect(file, transposeg);
		});
	};
};

module.exports = Transpose;