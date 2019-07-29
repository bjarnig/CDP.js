
var Cycles = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - Cycles ');

		var omit = '_omit',
		 	reform = '_reform',
		 	multiply = '_multiply',
		 	divide = '_divide',
		 	deletea = '_deletea',
		 	deleteb = '_deleteb',
		 	fractal = '_fractal',
		 	telescope = '_telescope',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				
				self.run('distort omit ' + self.params(file, omit, i) + self.ws  + self.rrange(2, 4) + self.ws + self.rrange(6, 8));
				self.run('distort reform 7 ' + self.params(file, reform, i));
				self.run('distort divide ' + self.params(file, multiply, i) + self.ws  + self.rrange(2, 3));
				self.run('distort multiply ' + self.params(file, divide, i) + self.ws  + self.rrange(2, 3));
				self.run('distort delete 2 ' + self.params(file, deletea, i) + self.ws  + self.rrange(2, 8));
				self.run('distort delete 2 ' + self.params(file, deleteb, i) + self.ws  + self.rrange(12, 32));
				self.run('distort fractal ' + self.params(file, fractal, i) + self.ws  + self.rrange(25, 800) + self.ws + 0.6 );
				self.run('distort telescope ' + self.params(file, telescope, i) + self.ws  + self.rrange(2, 8));
			}

			self.collect(file, omit);
			self.collect(file, reform);
			self.collect(file, multiply);
			self.collect(file, divide);
			self.collect(file, deletea);
			self.collect(file, deleteb);
			self.collect(file, fractal);
			self.collect(file, telescope);

		});
	};
};

module.exports = Cycles;