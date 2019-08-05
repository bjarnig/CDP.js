
var Distort = function(files, channels) {

	this.files = files;
	this.channels = channels;

	this.process = function() {

		console.log(' PROCESS - DISTORT ');

		var distorta = '_average',
			distortb = '_repeat',
			distortc = '_fractal',
			distortd = '_overload',
			distorte = '_interpol',
			distortf = '_omit',
			distortg = '_replim',
			distorth = '_replace',
		 	self = this;

		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				self.run('distort average ' + self.params(file, distorta, i) + self.ws + self.rrange(12, 80));
				self.run('distort repeat ' + self.params(file, distortb, i) + self.ws + self.rrange(2, 6) + ' -c40');
				self.run('distort fractal ' + self.params(file, distortc, i) + self.ws + self.rrange(4, 60) + self.ws + self.rrange(0.1, 0.6));
				self.run('distort overload 2 ' + self.params(file, distortd, i) + self.ws + self.rrange(0.001, 0.025) + self.ws + self.rrange(0.8, 0.99) + self.ws + self.rrange(100, 4000));
				self.run('distort interpolate ' + self.params(file, distorte, i) + self.ws + self.rrange(4, 8));
				self.run('distort omit ' + self.params(file, distortf, i) + self.ws + self.rrange(2, 5) + self.ws + self.rrange(6, 8));
				self.run('distort replim ' + self.params(file, distortg, i) + self.ws + self.rrange(2, 10) + ' -c30 -s0 -f2000');
				self.run('distort replace ' + self.params(file, distorth, i) + self.ws + self.rrange(2, 12));

			}

			self.collect(file, distorta);
			self.collect(file, distortb);
			self.collect(file, distortc);
			self.collect(file, distortd);
			self.collect(file, distorte);
			self.collect(file, distortf);
			self.collect(file, distortg);
			self.collect(file, distorth);
		});
	};
};

module.exports = Distort;
