
var Extend = function(files, channels) {

	this.files = files;
	this.channels = channels;
	
	this.process = function() {
		
		console.log(' PROCESS - EXTEND ');

		var extenda = '_extenda',
		 	zigzaga = '_zigzaga',
		 	baktobak = '_ceracu',
		 	drunka = '_drunka',
		 	loopa = '_loopa',
		 	scramblea = '_scramblea',
		 	zigzagb = '_zigzagb',
		 	drunkb = '_drunkb',
		 	drunkd = '_drunkd',
		 	self = this;
		
		this.files.forEach(function(file) {

			for (var i = 1; i <= channels; i++) {
				self.run('extend loop 2 ' + self.params(file, extenda, i) + self.ws + self.rrange(14, 16) + self.ws + '0.000000 152.345 -l76 -w15.000000 -s63');
				self.run('extend zigzag 1 ' + self.params(file, zigzaga, i) + ' 0.957 22.3 32.360003 0.0505 -s15.200000 -m0.232 -r0');
				self.run('extend baktobak ' + self.params(file, baktobak, i) + ' 1.913 15.000000');
				self.run('extend drunk 2 ' + self.params(file, drunka, i) + ' 27  1  2  0.2  0.08  10  30  -c0.5');
				self.run('extend loop 2 '+ self.params(file, loopa, i) + ' 25.36 0.000000 67.500000 -l18.18000 -w28.000000 -s0.800000');
				self.run('extend zigzag 1 ' + self.params(file, zigzagb, i) + ' 0.85 1.05 32.454558 0.045000 -s15.000000 -m0.075546875 -r0');
				self.run('extend drunk 1 ' + self.params(file, drunkb, i) + ' 25.454 processes/extend/brk/drieddrunk.txt 2.133 0.020000 0.1080859375 -s22 -c0.0203125 -o0.0928125 -r0');
				self.run('extend drunk 1 ' + self.params(file, drunkd, i) + ' 25 0.8 processes/extend/brk/xm_ambitusb.txt 0.08203125 processes/extend/brk/xm_clocktick.txt -s18 -c0.01953125 -o0.78890625 -r0');
				self.run('extend scramble 2 ' + self.params(file, scramblea, i) + ' 0.4 0.8 28');
			}

			self.collect(file, zigzaga);
			self.collect(file, extenda);
			self.collect(file, baktobak);
			self.collect(file, drunka);
			self.collect(file, loopa);
			self.collect(file, scramblea);
			self.collect(file, zigzagb);
			self.collect(file, drunkb);
			self.collect(file, drunkd);

		});
	};
};

Extend.prototype.process = function(transform) {

// var drunkc_low = 'drunk_low';
// var drunkc = '_drunkc';
// var temp_low = snd1+drunkc_low;
// run('extend drunk 1 ' + params(snd1, drunkc_low, c1) + ' 25 1.8 brk/xm_ambitus.txt 0.08203125 brk/xm_clocktick.txt -s13 -c0.01953125 -obrk/xm_overlay.txt -r0');
// run('extend drunk 1 ' + params(snd1, drunkc_low, c2) + ' 25 1.8 brk/xm_ambitus.txt 0.08203125 brk/xm_clocktick.txt -s13 -c0.01953125 -obrk/xm_overlay.txt -r0');
// run('modify loudness 3 ' + input(temp_low, c1) + output(snd1, drunkc, c1)  + ' -l0.5');
// run('modify loudness 3 ' + input(temp_low, c2) + output(snd1, drunkc, c2)  + ' -l0.5');
// collect(snd1, drunkc_low);
// collect(snd1, drunkc);
// cleanStereo(temp_low);

};

module.exports = Extend;