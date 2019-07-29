
var Delete = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - DELVERB ');

		var deletea = '_deletea',
			deleteb = '_deleteb',
			deletec = '_deletec',
			deleted = '_deleted',
			deletee = '_deletee',
			deletef = '_deletef',
			deleteg = '_deleteg',
			deleteh = '_deleteh',
		 	
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				self.run('distort delete 1 ' + self.params(file, deletea, i) + ' processes/delete/brk/trema.txt');
				self.run('distort delete 2 ' + self.params(file, deleteb, i) + ' processes/delete/brk/tremb.txt');
				self.run('distort delete 3 ' + self.params(file, deletec, i) + ' processes/delete/brk/tremc.txt');
				self.run('distort delete 1 ' + self.params(file, deleted, i) + ' processes/delete/brk/tremd.txt');
				self.run('distort delete 2 ' + self.params(file, deletee, i) + ' processes/delete/brk/treme.txt');
				self.run('distort delete 3 ' + self.params(file, deletef, i) + ' processes/delete/brk/tremf.txt');
				self.run('distort delete 2 ' + self.params(file, deleteg, i) + ' processes/delete/brk/tremg.txt');
				self.run('distort delete 1 ' + self.params(file, deleteh, i) + ' processes/delete/brk/tremh.txt');
				
			}

			self.collect(file, deletea);
			self.collect(file, deleteb);
			self.collect(file, deletec);
			self.collect(file, deleted);
			self.collect(file, deletee);
			self.collect(file, deletef);
			self.collect(file, deleteg);
			self.collect(file, deleteh);

		});
	};
};

module.exports = Delete;