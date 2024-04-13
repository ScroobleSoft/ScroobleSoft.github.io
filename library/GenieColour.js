
//--------------------------------------------
//---------- GENIE COLOUR --------------------
var GenieColour = function() {
	var Randomizer;
	var Name;
	var RGB;
	var R, G, B;
	var OriginalHue;
	var Shades;
};
GenieColour.prototype = {
	Set(rGenerator, colour, bLookupname) {  //NOTE: if colour is passed in decimal form, it must have the format "rgb(000,000,000)"
		this.Randomizer = rGenerator;

		if (bLookupname)
			this.GetColour();
		else if (colour)
			this.SetColour(colour);
	},
	SetColour(colour) {  //TODO: make processing of decimal form more flexible
		var i;
		var cHex;  //c- colour

		colour.substr(0,3).toUpperCase();  //NOTE: colour is expected to be in rgb format
		this.RGB = colour;
		if (colour.length==19) {  //check if hexadecimal form
			this.R = parseInt(this.RGB.substr(4, 4), 16);
			this.G = parseInt(this.RGB.substr(9, 4), 16);
			this.B = parseInt(this.RGB.substr(14, 4), 16);
		} else {
			this.R = parseInt(this.RGB.substr(4, 3));
			this.G = parseInt(this.RGB.substr(8, 3));
			this.B = parseInt(this.RGB.substr(12, 3));
		}
		
		//NOTE: step below is a bit spurious, and unlikely to be used
		cHex = (0x010000*this.R) + (0x000100*this.G) + this.B;
		for (i=0;i<JSColours.length;++i)
			if (colour_hex==JSColours[i][COLOUrTABLE.HEX]) {
				this.Name = JSColours[i][COLOUrTABLE.NAME];
				break;
			}
	},
	GetColour(colour) {
		var i;
		var cHex;  //c- colour

		this.Name = colour;

		//Get rgb values from a look-up table
		for (i=0;i<JSColours.length;++i)
			if (colour.toLowerCase()==JSColours[i][COLOUrTABLE.NAME]) {
				cHex = JSColours[i][COLOUrTABLE.HEX];
				break;
			}

		//Convert to RGB format
		if (i!=JSColours.length) {
			this.R = (cHex & 0xFF0000) % 0x00FF00;
			this.G = (cHex & 0x00FF00) % 0x0000FF;
			this.B = cHex & 0x0000FF;
			this.RGB = "rgb(" + this.R + ", " + this.G + ", " + this.B + ")";
		}
	},
	SeparateRGB() {
		this.R = parseInt(this.RGB.substr(4, 3));
		this.G = parseInt(this.RGB.substr(8, 3));
		this.B = parseInt(this.RGB.substr(12, 3));
	},
	GenerateRandom() {

		this.R = this.Randomizer.GetIndex(256);
		this.G = this.Randomizer.GetIndex(256);
		this.B = this.Randomizer.GetIndex(256);
	},
	SetRGBFormat() {

		this.RGB = "rgb(" + this.R + ", " + this.G + ", " + this.B + ")";
	},
	GetRGBFormat() {

		if (!this.RGB)
			this.RGB = "rgb(" + this.R + ", " + this.G + ", " + this.B + ")";

		return (this.RGB);
	},
	GetLighter(scale) {
		var r, g, b;

		r = this.R + Math.round((255-this.R)*scale);
		g = this.G + Math.round((255-this.G)*scale);
		b = this.B + Math.round((255-this.B)*scale);

		return ( "rgb(" + r + ", " + g + ", " + b + ")" );
	},
	Lighten(percentage) {
		//Can only do this with hex values
		if (!this.RGB)
			return;

		//Make colours lighter
		this.R += Math.round((255-this.R)*(percentage/100));
		this.G += Math.round((255-this.G)*(percentage/100));
		this.B += Math.round((255-this.B)*(percentage/100));
		this.RGB = "rgb("+ this.R + "," + this.G +"," + this.B + ")";
	},
	Darken(percentage) {
		//Can only do this with hex values
		if (!this.RGB)
			return;

		//Make colours lighter
		this.R -= Math.round(this.R*(percentage/100));
		this.G -= Math.round(this.G*(percentage/100));
		this.B -= Math.round(this.B*(percentage/100));
		this.RGB = "rgb(" + this.R + ", " + this.G + ", " + this.B + ")";
	},
	Invert() {
		this.R = 255 - this.R;
		this.G = 255 - this.G;
		this.B = 255 - this.B;
		this.RGB = "rgb(" + this.R + ", " + this.G + ", " + this.B + ")";
	},
	CombineColours(colour1, colour2) {  //NOTE: both are expected in GenieColour format
		this.R = colour1.R + colour2.R;
		this.G = colour1.G + colour2.G;
		this.B = colour1.B + colour2.B;
		this.RGB = "rgb(" + this.R + ", " + this.G + ", " + this.B + ")";
	},
	CheckColourClash(colour) {
		return ((Math.abs(this.R-colour.R)+Math.abs(this.G-colour.G)+Math.abs(this.B-colour.B))<96);
	},
	CheckGreyTone() {
		return ((Math.abs(this.R-this.G)+Math.abs(this.G-this.B)+Math.abs(this.B-this.R))<64);
	},
	Reset() {
		this.RGB = this.OriginalHue;
	},
	CreateShades(num) {  //creates lighter shades of number specified, up to, but not including, white
		var i;
		var r, g, b;

		this.Shades = new Array(10);
		for (i=0;i<num;++i) {
	 r = this.R + (Math.round((255-this.R)*(i/num)));
	 g = this.G + (Math.round((255-this.G)*(i/num)));
	 b = this.B + (Math.round((255-this.B)*(i/num)));
	 this.Shades[i] = "rgb("+ r + "," + g +"," + b + ")";
		}
	}
};
