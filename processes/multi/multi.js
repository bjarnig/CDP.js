
var Multi = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - Multi ');

		var multia = '_multipol',
		 	multib = '_multiwrap',
		 	multic = '_multimit',
		 	multid = '_multidrunk',
		 	multie = '_multibrato',
		 	multif = '_multizag',
		 	multig = '_multriverse',
		 	multih = '_multipass',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				
				self.run('distort interpolate ' + self.params(file, '_multiaa', i) + self.ws + self.rrange(2, 3));
				self.run('distort interpolate ' + self.params(file, '_multiab', i) + self.ws + self.rrange(2, 4));
				self.run('distort interpolate ' + self.params(file, '_multiac', i) + self.ws + self.rrange(2, 5));
				self.run('distort interpolate ' + self.params(file, '_multiad', i) + self.ws + self.rrange(2, 8));

				self.run('distort pitch ' + self.params(file, '_multiba', i) + self.ws + self.rrange(0.5, 4) + ' -c' + self.rrange(11, 89));
				self.run('distort pitch ' + self.params(file, '_multibb', i) + self.ws + self.rrange(0.5, 4) + ' -c' + self.rrange(11, 89));

				self.run('distort omit ' + self.params(file, '_multica', i) + self.ws + self.rrange(2, 4) + self.ws + self.rrange(5, 8));
				self.run('distort omit ' + self.params(file, '_multicb', i) + self.ws + self.rrange(2, 4) + self.ws + self.rrange(5, 8));
				self.run('distort omit ' + self.params(file, '_multicc', i) + self.ws + self.rrange(2, 4) + self.ws + self.rrange(5, 8));
				self.run('distort omit ' + self.params(file, '_multicd', i) + self.ws + self.rrange(2, 4) + self.ws + self.rrange(5, 8));

				self.run('extend drunk 1 ' + self.params(file, '_multida', i) + ' 22.000 ' + self.rrange(0.8, 4.2) + ' 0.046875 0.0703125 0.2080859375 -s73 -c0.1015625 -o0.703828125 -r0');
				self.run('extend drunk 1 ' + self.params(file, '_multidb', i) + ' 22.000 ' + self.rrange(1.2, 5.2) + ' 0.046875 0.0703125 0.2080859375 -s73 -c0.1015625 -o0.703828125 -r0');

				self.run('modify speed 6 ' + self.params(file, '_multiea', i) + self.ws + self.rrange(2, 60) + self.ws + self.rrange(0.2, 40));
				self.run('modify speed 6 ' + self.params(file, '_multieb', i) + self.ws + self.rrange(2, 60) + self.ws + self.rrange(0.2, 40));
				self.run('modify speed 6 ' + self.params(file, '_multiec', i) + self.ws + self.rrange(2, 60) + self.ws + self.rrange(0.2, 40));
				self.run('modify speed 6 ' + self.params(file, '_multied', i) + self.ws + self.rrange(2, 60) + self.ws + self.rrange(0.2, 40));

				self.run('extend zigzag 1 ' + self.params(file, '_multifa', i) + self.ws + self.rrange(1.2, 2.2) + self.ws + self.rrange(2.8, 4.2) + ' 25.000 0.06181640625 -s15.000000 -m0.43447265625 -r0');
				self.run('extend zigzag 1 ' + self.params(file, '_multifb', i) + self.ws + self.rrange(1.2, 2.2) + self.ws + self.rrange(2.8, 4.2) + ' 25.000 0.06181640625 -s15.000000 -m0.43447265625 -r0');

				self.run('distort reverse ' + self.params(file, '_multiga', i) + self.ws + self.rrange(11, 80));
				self.run('distort reverse ' + self.params(file, '_multigb', i) + self.ws + self.rrange(11, 80));
				self.run('distort reverse ' + self.params(file, '_multigc', i) + self.ws + self.rrange(11, 80));
				self.run('distort reverse ' + self.params(file, '_multigd', i) + self.ws + self.rrange(11, 80));

				self.run('distort filter 1 ' + self.params(file, '_multiha', i) + self.ws + self.rrange(100, 1200) + ' -s0');
				self.run('distort filter 1 ' + self.params(file, '_multihb', i) + self.ws + self.rrange(400, 4000) + ' -s0');
			}

			self.collect(file, '_multiaa');
			self.collect(file, '_multiab');
			self.collect(file, '_multiac');
			self.collect(file, '_multiad');
			self.combine(file, multia, ['_multiaa','_multiab','_multiac','_multiad']);

			self.collect(file, '_multiba');
			self.collect(file, '_multibb');
			self.combine(file, multib, ['_multiba','_multibb']);

			self.collect(file, '_multica');
			self.collect(file, '_multicb');
			self.collect(file, '_multicc');
			self.collect(file, '_multicd');
			self.combine(file, multic, ['_multica','_multicb','_multicc','_multicd']);

			self.collect(file, '_multida');
			self.collect(file, '_multidb');
			self.combine(file, multid, ['_multida','_multidb']);

			self.collect(file, '_multiea');
			self.collect(file, '_multieb');
			self.collect(file, '_multiec');
			self.collect(file, '_multied');
			self.combine(file, multie, ['_multiea','_multieb','_multiec','_multied']);

			self.collect(file, '_multifa');
			self.collect(file, '_multifb');
			self.combine(file, multif, ['_multifa','_multifb']);

			self.collect(file, '_multiga');
			self.collect(file, '_multigb');
			self.collect(file, '_multigc');
			self.collect(file, '_multigd');
			self.combine(file, multig, ['_multiga','_multigb','_multigc','_multigd']);

			self.collect(file, '_multiha');
			self.collect(file, '_multihb');
			self.combine(file, multih, ['_multiha','_multihb']);
		});
	};
};

module.exports = Multi;