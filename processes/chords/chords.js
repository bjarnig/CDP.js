
var Chords = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - Chords ');

		var chorda = '_chorda',
		 	chordb = '_chordb',
		 	chordc = '_chordc',
		 	chordd = '_chordd',
		 	chorde = '_chorde',
		 	chordf = '_chordf',
		 	chordg = '_chordg',
		 	chordh = '_chordh',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				
				self.run('modify speed 2 ' + self.params(file, '_chordaa', i) + self.ws + self.rrange(-12, 12));
				self.run('modify speed 2 ' + self.params(file, '_chordab', i) + self.ws + self.rrange(-24, 24));
				self.run('modify speed 2 ' + self.params(file, '_chordac', i) + self.ws + self.rrange(-24, 24));
				self.run('modify speed 2 ' + self.params(file, '_chordad', i) + self.ws + self.rrange(-12, 12));

				self.run('modify speed 2 ' + self.params(file, '_chordba', i) + ' -12');
				self.run('modify speed 2 ' + self.params(file, '_chordbb', i) + ' -24');

				self.run('modify speed 2 ' + self.params(file, '_chordca', i) + ' -5');
				self.run('modify speed 2 ' + self.params(file, '_chordcb', i) + ' -7');
				self.run('modify speed 2 ' + self.params(file, '_chordcc', i) + ' 5');
				self.run('modify speed 2 ' + self.params(file, '_chordcd', i) + ' 7');

				self.run('modify speed 2 ' + self.params(file, '_chordda', i) + self.ws + self.rrange(-24, 24));
				self.run('modify speed 2 ' + self.params(file, '_chorddb', i) + self.ws + self.rrange(-24, 24));

				self.run('modify speed 2 ' + self.params(file, '_chordea', i) + self.ws + self.rrange(-12, 12));
				self.run('modify speed 2 ' + self.params(file, '_chordeb', i) + self.ws + self.rrange(-24, 24));
				self.run('modify speed 2 ' + self.params(file, '_chordec', i) + self.ws + self.rrange(-24, 24));
				self.run('modify speed 2 ' + self.params(file, '_chorded', i) + self.ws + self.rrange(-12, 12));

				self.run('modify speed 2 ' + self.params(file, '_chordfa', i) + ' -12');
				self.run('modify speed 2 ' + self.params(file, '_chordfb', i) + ' -24');

				self.run('modify speed 2 ' + self.params(file, '_chordga', i) + ' -8');
				self.run('modify speed 2 ' + self.params(file, '_chordgb', i) + ' -2');
				self.run('modify speed 2 ' + self.params(file, '_chordgc', i) + ' 2');
				self.run('modify speed 2 ' + self.params(file, '_chordgd', i) + ' 8');

				self.run('modify speed 2 ' + self.params(file, '_chordha', i) + self.ws + self.rrange(-18, 8));
				self.run('modify speed 2 ' + self.params(file, '_chordhb', i) + self.ws + self.rrange(-18, 8));
			}

			self.collect(file, '_chordaa');
			self.collect(file, '_chordab');
			self.collect(file, '_chordac');
			self.collect(file, '_chordad');
			self.combine(file, chorda, ['_chordaa','_chordab','_chordac','_chordad']);

			self.collect(file, '_chordba');
			self.collect(file, '_chordbb');
			self.combine(file, chordb, ['_chordba','_chordbb']);

			self.collect(file, '_chordca');
			self.collect(file, '_chordcb');
			self.collect(file, '_chordcc');
			self.collect(file, '_chordcd');
			self.combine(file, chordc, ['_chordca','_chordcb','_chordcc','_chordcd']);

			self.collect(file, '_chordda');
			self.collect(file, '_chorddb');
			self.combine(file, chordd, ['_chordda','_chorddb']);

			self.collect(file, '_chordea');
			self.collect(file, '_chordeb');
			self.collect(file, '_chordec');
			self.collect(file, '_chorded');
			self.combine(file, chorde, ['_chordea','_chordeb','_chordec','_chorded']);

			self.collect(file, '_chordfa');
			self.collect(file, '_chordfb');
			self.combine(file, chordf, ['_chordfa','_chordfb']);

			self.collect(file, '_chordga');
			self.collect(file, '_chordgb');
			self.collect(file, '_chordgc');
			self.collect(file, '_chordgd');
			self.combine(file, chordg, ['_chordga','_chordgb','_chordgc','_chordgd']);

			self.collect(file, '_chordha');
			self.collect(file, '_chordhb');
			self.combine(file, chordh, ['_chordha','_chordhb']);
		});
	};
};

module.exports = Chords;