
var Delverb = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - DELVERB ');

		var delaya = '_delaya',
			delayb = '_delayb',
			delayc = '_delayc',
			delayd = '_delayd',
			reva = '_reva',
			revb = '_revb',
			revc = '_revc',
			revd = '_revd',
		 	self = this;
		
		this.files.forEach(function(file) {

			var revecho = false;

			for (var i = 1; i <= channels; i++) {
				var deltima = self.rrange(0.4, 8);
				self.run('modify revecho 1 ' + self.params(file, '_delayaa', i) + self.ws + deltima + ' 0.5 0.8 2 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delayab', i) + self.ws + (deltima * 2) + ' 0.5 0.8 2 -p1.000000');

				var deltimb = self.rrange(0.4, 8);
				self.run('modify revecho 1 ' + self.params(file, '_delayba', i) + self.ws + deltimb + ' 0.5 0.8 4 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaybb', i) + self.ws + (deltimb * 8) + ' 0.5 0.8 4 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaybc', i) + self.ws + (deltimb * 16) + ' 0.5 0.8 4 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaybd', i) + self.ws + (deltimb * 32) + ' 0.5 0.8 4 -p1.000000');

				var deltimc = self.rrange(0.2, 2);
				self.run('modify revecho 1 ' + self.params(file, '_delayca', i) + self.ws + deltimc + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaycb', i) + self.ws + (deltimc * 2) + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaycc', i) + self.ws + (deltimc * 4) + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaycd', i) + self.ws + (deltimc * 8) + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delayce', i) + self.ws + (deltimc * 16) + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaycf', i) + self.ws + (deltimc * 32) + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaycg', i) + self.ws + (deltimc * 64) + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaych', i) + self.ws + (deltimc * 128) + ' 0.5 0.8 2.8 -p1.000000');

				var deltimd = self.rrange(100, 200);
				self.run('modify revecho 1 ' + self.params(file, '_delayda', i) + self.ws + deltimd + ' 0.5 0.8 2.8 -p1.000000');
				self.run('modify revecho 1 ' + self.params(file, '_delaydb', i) + self.ws + (deltimd * 2) + ' 0.5 0.8 2.8 -p1.000000');

				if(!revecho) {

					self.run('fastconv -a0.7 ' + file + '.wav' + ' processes/delverb/impulses/a.wav ' + file + '_revata.wav');
					self.run('modify loudness 3 ' + file + '_revata.wav ' + file + reva + '.wav -l0.8');
					self.run('rm ' + file + '_revata.wav');
					
					self.run('fastconv -a0.7 ' + file + '.wav' + ' processes/delverb/impulses/b.wav ' + file + '_revatb.wav');
					self.run('modify loudness 3 ' + file + '_revatb.wav ' + file + revb + '.wav -l0.8');
					self.run('rm ' + file + '_revatb.wav');

					self.run('fastconv -a0.7 ' + file + '.wav' + ' processes/delverb/impulses/c.wav ' + file + '_revatc.wav');
					self.run('modify loudness 3 ' + file + '_revatc.wav ' + file + revc + '.wav -l0.8');
					self.run('rm ' + file + '_revatc.wav');

					self.run('fastconv -a0.7 ' + file + '.wav' + ' processes/delverb/impulses/d.wav ' + file + '_revatd.wav');
					self.run('modify loudness 3 ' + file + '_revatd.wav ' + file + revd + '.wav -l0.8');
					self.run('rm ' + file + '_revatd.wav');

					revecho = false;
				}
			}

			self.collect(file, '_delayaa');
			self.collect(file, '_delayab');
			self.combine(file, delaya, ['_delayaa','_delayab']);

			self.collect(file, '_delayba');
			self.collect(file, '_delaybb');
			self.collect(file, '_delaybc');
			self.collect(file, '_delaybd');
			self.combine(file, delayb, ['_delayba','_delaybb', '_delaybc','_delaybd']);

			self.collect(file, '_delayca');
			self.collect(file, '_delaycb');
			self.collect(file, '_delaycc');
			self.collect(file, '_delaycd');
			self.collect(file, '_delayce');
			self.collect(file, '_delaycf');
			self.collect(file, '_delaycg');
			self.collect(file, '_delaych');
			self.combine(file, delayc, ['_delayca','_delaycb','_delaycc','_delaycd', '_delayce','_delaycf','_delaycg','_delaych']);

			self.collect(file, '_delayda');
			self.collect(file, '_delaydb');
			self.combine(file, delayd, ['_delayda','_delaydb']);
			
		});
	};
};

module.exports = Delverb;