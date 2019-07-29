
var Tremolo = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - TREMOLO ');

		var tremoloa = '_tremoloa',
			tremolob = '_tremolob',
			tremoloc = '_tremoloc',
			tremolod = '_tremolod',
			tremoloe = '_tremoloe',
			tremolof = '_tremolof',
			tremolog = '_tremolog',
			tremoloh = '_tremoloh',
		 	
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				self.run('envel tremolo 1 ' + self.params(file, tremoloa, i) + ' processes/tremolo/brk/trema.txt ' + self.rrange(0.4, 0.8) + ' 1.000000');
				self.run('envel tremolo 1 ' + self.params(file, tremolob, i) + ' processes/tremolo/brk/tremb.txt ' + self.rrange(0.8, 0.99) + '  1.000000');
				self.run('envel tremolo 1 ' + self.params(file, tremoloc, i) + ' processes/tremolo/brk/tremc.txt ' + self.rrange(0.5, 0.95) + '  1.000000');
				self.run('envel tremolo 1 ' + self.params(file, tremolod, i) + ' processes/tremolo/brk/tremd.txt ' + self.rrange(0.85, 0.95) + '  1.000000');
				self.run('envel tremolo 1 ' + self.params(file, tremoloe, i) + ' processes/tremolo/brk/treme.txt ' + self.rrange(0.4, 0.8) + '  1.000000');
				self.run('envel tremolo 1 ' + self.params(file, tremolof, i) + ' processes/tremolo/brk/tremf.txt ' + self.rrange(0.5, 0.7) + '  1.000000');
				self.run('envel tremolo 1 ' + self.params(file, tremolog, i) + ' processes/tremolo/brk/tremg.txt ' + self.rrange(0.6, 0.9) + '  1.000000');
				self.run('envel tremolo 1 ' + self.params(file, tremoloh, i) + ' processes/tremolo/brk/tremh.txt ' + self.rrange(0.3, 0.5) + '  1.000000');
				
			}

			self.collect(file, tremoloa);
			self.collect(file, tremolob);
			self.collect(file, tremoloc);
			self.collect(file, tremolod);
			self.collect(file, tremoloe);
			self.collect(file, tremolof);
			self.collect(file, tremolog);
			self.collect(file, tremoloh);

		});
	};
};

module.exports = Tremolo;
