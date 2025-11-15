
//NOTE: one major difference beween GenieDialog and GenieText is latter only writes one line (former is for paragraphs)

//--------------------------------------
//---------- GENIE TEXT ----------------
var GenieText = function() {
	var Context;
	var Screen, ControlPanel, InfoBox, Ticker, Tabloid;
	var Specs;
	var Font, Colour;

	var gap, cntxt;		//scratch variables
};
GenieText.prototype = {
	Set(cntxt, specs, iBox, cPanel, tTape, tRoll) {
		this.Context = cntxt;
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.Ticker = tTape;
		this.Tabloid = tRoll;
		this.Specs = specs || TEXT;
		if (!this.Specs.FONT)
			this.Specs.FONT = FONT.DEFAULT;
		if (!this.Specs.COLOUR)
			this.Specs.COLOUR = "black";
	},
	SetContext(cntxt) {

		this.Context = cntxt;
	},
	SwitchContext(cnvs) {

		switch (cnvs) {
			case CANVAS.PRIME:
				this.Context = this.Screen;
				break;
			case CANVAS.ZOOM:
				this.Context = this.InfoBox;
				break;
			case CANVAS.CONSOLE:
				this.Context = this.ControlPanel;
				break;
			case CANVAS.TICKER:
				this.Context = this.Ticker;
				break;
			case CANVAS.HELP:
				this.Context = this.Tabloid;
				break;
		}
	},
	ResetContext() {	//TODO: will replace ::RestoreContext

		this.Context = this.Screen;
	},
	RestoreContext(cntxt) {

		if (cntxt)
			this.Context = cntxt;
		else
			this.Context = this.Screen;
	},
	SetFont(fnt) {

		this.Font = this.Specs.FONT;
		this.Specs.FONT = fnt;
	},
	ResetFont() {	//TODO: will replace ::RestoreFont

		this.Specs.FONT = this.Font;
		this.Context.font = this.Font;
	},
	RestoreFont() {

		this.Specs.FONT = this.Font;
	},
	SetColour(clr) {

		this.Colour = clr;
	},
	ResetColour() {	//TODO: will replace ::RestoreColour

		this.Colour = null;
	},
	RestoreColour() {

		this.Colour = null;
	},
	Write(strng, x, y, specs, cnvs) {
		var tLength;  //t- text
		var colour;

		//Switch context if thus specified
		if (cnvs) {	//ASSUMPTION: cnvs is passed only if writing to other than Screen
			this.cntxt = this.Context;
			switch (cnvs) {
				case CANVAS.PRIME:
					this.Context = this.Screen;
					break;
				case CANVAS.ZOOM:
					this.Context = this.InfoBox;
					break;
				case CANVAS.CONSOLE:
					this.Context = this.ControlPanel;
					break;
				case CANVAS.TICKER:
					this.Context = this.TickerTape;
					break;
				case CANVAS.HELP:
					this.Context = this.Tabloid;
					break;
			}
		}

		//Set correct colour
		colour = this.Colour || this.Specs.COLOUR;
		if (specs)
			colour = specs.COLOUR || colour;
		this.Context.fillStyle = colour;
		this.Context.strokeStyle = colour;

		if (specs) {
			this.Context.font = specs.FONT || this.Specs.FONT;
			if (specs.STYLE) {
				if (specs.STYLE & FONT.STYLE.BOLD)
					this.Context.font = "bold " + this.Context.font;
				if (specs.STYLE & FONT.STYLE.ITALICS)
					this.Context.font = "italic " + this.Context.font;
				if (specs.STYLE & FONT.STYLE.UNDERLINED) {
					tLength = this.Context.measureText(strng).width;
					this.Context.beginPath();
					this.Context.lineWidth = 2;
					this.Context.moveTo(x, y+4);
					this.Context.lineTo(Math.round(x+tLength), y+4);
					this.Context.stroke();
					this.Context.closePath();
				}
			}
		} else
			this.Context.font = this.Specs.FONT;
		this.Context.fillText(strng, x, y);

		//Restore original settings
		this.Context.font = this.Specs.FONT;
		this.Context.fillStyle = this.Colour || this.Specs.COLOUR;
		this.Context.strokeStyle = this.Colour || this.Specs.COLOUR;
		if (this.cntxt) {
			this.Context = this.cntxt;
			this.cntxt = null;
		}
	},
	WriteMulti(aStrng, x, y, specs, cnvs) {
		var i;
		var gap;

		//Set gap
		if (specs)
			gap = specs.GAP || TEXT.GAP;
		else
			gap = TEXT.GAP;

		//Write strings
		for (i=0;i<aStrng.length;++i)
			this.Write(aStrng[i], x, y+(gap*i), specs, cnvs);
	},
	WriteParagraphs(aStrngs, x, y, specs, cnvs, space) {
		var i, j;
		var gap;

		//Set gap
		if (specs)
			gap = specs.GAP || TEXT.GAP;
		else
			gap = TEXT.GAP;

		//Write strings
		for (i=0;i<aStrngs.length;++i) {
			this.WriteMulti(aStrngs[i], x, y+(space*i), specs, cnvs);
			y += gap * aStrngs[i].length;
		}
	}
};

var Text = new GenieText();
//Text.Set(Interface.Screen, Interface.InfoBox, Interface.ControlPanel);  //TODO: enable when Interface is defined
