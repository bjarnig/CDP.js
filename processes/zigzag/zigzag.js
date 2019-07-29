
var ZigZag = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - ZIGZAG ');

		var zigzaga = '_zigzaga',
			zigzagb = '_zigzagb',
			zigzagc = '_zigzagc',
			zigzagd = '_zigzagd',
			zigzage = '_loopa',
			zigzagf = '_loopb',
			zigzagg = '_loopc',
			zigzagh = '_loopd',
		 	
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				self.run('extend zigzag 1 ' + self.params(file, zigzaga, i) + self.ws + self.rrange(0.3, 0.9) + self.ws + self.rrange(1.1, 1.4) + ' 41.454558 0.199 -s15.000000 -m1.95 -r0');
				self.run('extend zigzag 1 ' + self.params(file, zigzagb, i) + self.ws + self.rrange(0.7, 0.9) + self.ws + self.rrange(1.1, 1.3) + ' 45.360003 0.0505 -s15.200000 -m0.232 -r0');
				self.run('extend zigzag 1 ' + self.params(file, zigzagc, i) + self.ws + self.rrange(0.8, 1.2) + self.ws + self.rrange(1.4, 1.8) + ' 43.454558 0.045000 -s15.000000 -m0.075546875 -r0');
				self.run('extend zigzag 1 ' + self.params(file, zigzagd, i) + self.ws + self.rrange(0.8, 1.8) + self.ws + self.rrange(2.4, 4.8) + ' 42.454558 0.199 -s15.000000 -m1.95 -r0');

				// self.run('extend loop 1 ' + self.params(file, zigzage, i) + self.ws + self.rrange(0.8, 1.2) + ' 100 70 -w15.000000 -s0.000000');
				// self.run('extend loop 1 ' + self.params(file, zigzagf, i) + self.ws + self.rrange(0.8, 3.8) + ' 35 51 -w15.000000 -s0.000000');
				// self.run('extend loop 1 ' + self.params(file, zigzagg, i) + self.ws + self.rrange(1.1, 1.8) + ' 50 80 -w15.000000 -s789');
				// self.run('extend loop 1 ' + self.params(file, zigzagh, i) + self.ws + self.rrange(0.6, 1.2) + ' 150 200 -w15.000000 -s0.000000');
			}

			self.collect(file, zigzaga);
			self.collect(file, zigzagb);
			self.collect(file, zigzagc);
			self.collect(file, zigzagd);
			// self.collect(file, zigzage);
			// self.collect(file, zigzagf);
			// self.collect(file, zigzagg);
			// self.collect(file, zigzagh);

		});
	};
};

module.exports = ZigZag;