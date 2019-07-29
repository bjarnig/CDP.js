
var Fade = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - FADE ');

		var fadea = '_fadea',
			fadeb = '_fadeb',
			fadec = '_fadec',
			faded = '_faded',
			fadee = '_fadee',
			fadef = '_fadef',
			fadeg = '_fadeg',
			fadeh = '_fadeh',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/fadea.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + fadea + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/fadeb.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + fadeb + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/fadec.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + fadec + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/faded.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + faded + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/fadee.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + fadee + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/fadef.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + fadef + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/fadeg.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + fadeg + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');

				self.run('modify loudness 1 '+ file + '_c' + i + '.wav ' + file + 'l_c' + i + '.wav processes/fade/brk/fadeh.brk');
				self.run('sfedit cut 1 ' + file + 'l_c' + i + '.wav ' + file + fadeh + '_c' + i + '.wav 0 26');
				self.run('rm ' + file +'l_c' + i + '.wav');
			}

			self.collect(file, fadea);
			self.collect(file, fadeb);
			self.collect(file, fadec);
			self.collect(file, faded);
			self.collect(file, fadee);
			self.collect(file, fadef);
			self.collect(file, fadeg);
			self.collect(file, fadeh);
		});
	};
};

module.exports = Fade;