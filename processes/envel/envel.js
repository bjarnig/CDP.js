
var Envel = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - ENVEL ');

		var envela = '_envela',
			envelb = '_envelb',
			envelc = '_envelc',
			enveld = '_enveld',
			envele = '_envele',
			envelf = '_envelf',
			envelg = '_envelg',
			envelh = '_envelh',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/trema.txt 0.01 -e0.5');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + envela + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/tremb.txt 0.12 -e1');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + envelb + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/tremc.txt 0.23 -e2');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + envelc + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/tremd.txt 0.21 -e3');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + enveld + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/treme.txt 0.18 -e4');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + envele + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/tremf.txt 0.3 -e3.6');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + envelf + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/tremg.txt 0.43 -e32');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + envelg + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('distort envel 3 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/envel/brk/tremh.txt 0.3 -e3.6');
				self.run('modify loudness 3 ' + file + 'l_c' + i + '.wav ' + file + envelh + '_c' + i + '.wav -l0.900000');
				self.run('rm ' + file +'l_c' + i + '.wav');
			}

			self.collect(file, envela);
			self.collect(file, envelb);
			self.collect(file, envelc);
			self.collect(file, enveld);
			self.collect(file, envele);
			self.collect(file, envelf);
			self.collect(file, envelg);
			self.collect(file, envelh);
		});
	};
};

module.exports = Envel;