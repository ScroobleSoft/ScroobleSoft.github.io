
//-----------------------------------------------
//----------  GENIE SPECTRUM --------------------
var GenieSpectrum = function() {
	var Start, End;		//format is { R: num, G: num, B: num }
	var ColourSteps;
	var Colours;
};
GenieSpectrum.prototype = {
	Set(start, end, steps) {	//start and end colours are in "rgb(xxx,xxx,xxx)" format
		this.Start = this.ProcessColour(start);
		this.End = this.ProcessColour(end);
		this.Colours = new Array(steps);
		this.ColourSteps = this.DetermineSteps(steps);
		this.Generate();
	},
	ProcessColour(colour) {
		var r, g, b;

		r = parseInt(colour.substr(4, 3));
		g = parseInt(colour.substr(8, 3));
		b = parseInt(colour.substr(12, 3));

		return ( { R: r, G: g, B: b } );
	},
	DetermineSteps(steps) {
		var r, g, b;

		r = (this.End.R-this.Start.R)/(steps-1);
		g = (this.End.G-this.Start.G)/(steps-1);
		b = (this.End.B-this.Start.B)/(steps-1);

		return ( { R: r, G: g, B: b } );
	},
	Generate() {
		var i;
		var r, g, b;

		for (i=0;i<this.Colours.length;++i) {
			r = Math.round(this.Start.R + (i*this.ColourSteps.R));
			g = Math.round(this.Start.G + (i*this.ColourSteps.G));
			b = Math.round(this.Start.B + (i*this.ColourSteps.B));
			this.Colours[i] = "rgb(" + r + ", " + g + ", " + b + ")";
		}
	}
};
