/*
 *  NOTE: to be used as a tool either in addition to GenieColour (which will then be scaled down), or in place of it
 */
//------------------------------------------------
//---------- GENIE COLOURIZER --------------------
var GenieColourizer = function() {
	var Colour;
	var RGB1, RGB2;
	var R, G, B;
};
GenieColourizer.prototype = {
	Set() {  //NOTE: if colour is passed in decimal form, it must have the format "rgb(000,000,000)"
	},
	SeparateRGB(colour) {

		this.R = parseInt(colour.substr(4, 3));
		this.G = parseInt(colour.substr(8, 3));
		this.B = parseInt(colour.substr(12, 3));

		return ( { R: this.R, G: this.G, B: this.B } );
	},
	ComposeColour(r, g, b) {

		function CorrectFormat(pColour) {
			var prfx;

			//Affix relevant number of 0's
			prfx = "";
			if (pColour<10)
				prfx += "00";
			else if (pColour<100)
				prfx += "0";
			pColour = prfx + pColour;

			return (pColour);
		}

		this.Colour = "rgb(" + CorrectFormat(r) + "," + CorrectFormat(g) + "," + CorrectFormat(b) + ")";
	},
	GetMedianColour(colour1, colour2) {

		this.RGB1 = this.SeparateRGB(colour1);
		this.RGB2 = this.SeparateRGB(colour2);
		this.R = Math.round((this.RGB1.R+this.RGB2.R)/2);
		this.G = Math.round((this.RGB1.G+this.RGB2.G)/2);
		this.B = Math.round((this.RGB1.B+this.RGB2.B)/2);
		return ("rgb("+this.R+","+this.G+","+this.B+")");
	},
	GetLighterShades(colour, nShades) {
		var i;
		var rSteps, gSteps, bSteps;
		var r, g, b;
		var aShades;

		//Determine shade differentials
		this.RGB1 = this.SeparateRGB(colour);
		rSteps = (255-this.RGB1.R)/nShades;
		gSteps = (255-this.RGB1.G)/nShades;
		bSteps = (255-this.RGB1.B)/nShades;

		//Create shades
		aShades = new Array(nShades);
		for (i=1;i<=nShades;++i) {
	 r = Math.round(255-(i*rSteps));
	 g = Math.round(255-(i*gSteps));
	 b = Math.round(255-(i*bSteps));
	 aShades[i-1] = this.ComposeColour(r, g, b);
		}

		return (aShades);
	},
	GetInvertedColour(colour) {

		this.SeparateRGB(colour);

		this.R = 255 - this.R;
		this.G = 255 - this.G;
		this.B = 255 - this.B;

		this.Colour = this.ComposeColour(this.R, this.G, this.B);

		return (this.Colour);
	}
};
