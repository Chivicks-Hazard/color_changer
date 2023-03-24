let sliderRed = document.getElementById('slideRed');

let sliderGreen = document.getElementById('slideGreen');

let sliderBlue = document.getElementById('slideBlue');

let sliderOpacity = document.getElementById('slideOpacity');

let ValueRed = document.getElementById('valueRed');
let ValueGreen = document.getElementById('valueGreen');
let ValueBlue = document.getElementById('valueBlue');
let ValueOpacity = document.getElementById('valueOpacity');

let CopyRGBA =document.getElementById('copyRGBA');


CopyRGBA.addEventListener('click', function() {
	let ColorRGBAResult = document.getElementById('theColorRGBACode');
	ColorRGBAResult.setSelectionRange(0, 99999);
	ColorRGBAResult.select();
	navigator.clipboard.writeText(ColorRGBAResult.innerHTML);
	alert('Copied');
})



sliderRed.defaultValue = 0;
sliderGreen.defaultValue = 0;
sliderBlue.defaultValue = 0;
sliderOpacity.defaultValue = 0;



sliderRed.oninput = function() {
	ValueRed.textContent = this.value;
}

sliderGreen.oninput = function() {
	ValueGreen.textContent = this.value;
}

sliderBlue.oninput = function() {
	ValueBlue.textContent = this.value;
}

sliderOpacity.oninput = function() {
	ValueOpacity.textContent = this.value / 10000;
}

sliderRed.addEventListener('input', changeColor);
sliderGreen.addEventListener('input', changeColor);
sliderBlue.addEventListener('input', changeColor);
sliderOpacity.addEventListener('input', changeColor);

function changeColor() {
	
	let Red = document.getElementById('slideRed').value;

	let Green = document.getElementById('slideGreen').value;

	let Blue = document.getElementById('slideBlue').value;
	
	let Opacity = document.getElementById('slideOpacity').value;
	let OpacityValue = Opacity / 10000;
	
	let colorResult = document.getElementById('theResult').children[0];
	
	let color = `rgba(${Red}, ${Green}, ${Blue}, ${OpacityValue})`;
	
	colorResult.style.backgroundColor = color;
	
	let ColorRGBAResult = document.getElementById('theColorRGBACode');
	
	ColorRGBAResult.value = 'RGBA Color Code: rgba(' + Red + ', ' + Green + ', ' + Blue + ', ' + OpacityValue + ')';
	
	let ColorHSLAResult = document.getElementById('theColorHSLACode');
	
	ColorHSLAResult.innerHTML = RGBAToHSLA('rgba(' + Red + ', ' + Green + ', ' + Blue + ', ' + OpacityValue + ')');
	
	
	let ColorHexResult = document.getElementById('theColorHexCode');
	
	ColorHexResult.innerHTML = RGBAToHEXa('rgba(' + Red + ', ' + Green + ', ' + Blue + ', ' + OpacityValue + ')');
	
	
	function RGBAToHEXa(rgba) {
		//Separate the values and to choose the right separator
		let sep = rgba.indexOf(',') > -1 ? ',' : ' ';
		
		//Turn rgba(r,g,b,a) to [r,g,b,a]
		rgba = rgba.substr(5).split(')')[0].split(sep);
		
		//Convert to Hexadecimal
		let r = (+rgba[0]).toString(16)
		let g = (+rgba[1]).toString(16)
		let b = (+rgba[2]).toString(16)
		let a = Math.round(+rgba[3] * 255).toString(16);
		
		//
		if (r.length == 1) {
			r = '0' + 1
		}
		
		if (g.length == 1) {
			g = '0' + 1
		}
		
		if (b.length == 1) {
			b = '0' + 1
		}
		
		if (a.length == 1) {
			a = '0' + 1
		}
		
		return 'HexA Color Code: #' + r + g + b + a;

	}
	
	function RGBAToHSLA(rgba) {
		let sep = rgba.indexOf(',') > -1 ? ',' : ' ';
		rgba = rgba.substr(5).split(')')[0].split(sep);
		
		//Turn r, g, and to fractions of 1
		let r = rgba[0] /= 255,
				g = rgba[1] /= 255,
				b = rgba[2] /= 255;
		//And leave a the way it is.
		let a = rgba[3];
		
		//Find the greatest and smallest values
		let cmin = Math.min(r,g,b),
				cmax = Math.max(r,g,b),
				delta = cmax - cmin,
				h = 0,
				s = 0,
				l = 0;
		
		//Calculate the hue
		if (delta == 0) {
			h = 0;
		}else if (cmax == r) {
			h = ((g - b) / delta % 6)
		}else if (cmax == g) {
			h = ((b - r) / delta + 2)
		}else {
			h = ((r - g) / delta + 4)
		}
		
		h = Math.round(h * 60);
	  
		if (h < 0) {
			h += 360;
		}
		
		//Calculate the lightness
		l = (cmax + cmin) / 2;
		
		//Calculate the saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		
		
		//Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		
		//Return the result
		return 'HSLA Color Code: hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
		
	}

	
}

