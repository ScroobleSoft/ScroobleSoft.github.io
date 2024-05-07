
//---------------------------------------------------------
//----------- SLIDESHOW DETAILS VIEW ----------------------  UNLOGGED
var SlideshowDetailsView = function() {
	var PaintingIndex;
	var Paintings, Titles, Dimensions, Prices;
	var Ratio;

	var x, y;
};
SlideshowDetailsView.prototype = new GenieDialogView();
SlideshowDetailsView.prototype.Set = function(cnvs, specs, pView, gTool, tWriter) {

	this.SetLinks(gTool, tWriter);

	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);
};
SlideshowDetailsView.prototype.SetData = function() {

	this.Paintings = [ 111, 112, 113, 111, 111, 111, 111, 111, 111 ];
	this.Titles = [ "2 Ladies.", "Pink Flowers.", "Purple Flowers.", "", "", "", "", "", "" ];
	this.Dimensions = [ "0x0", "18x24", "18x24", "0x0", "0x0", "0x0", "0x0", "0x0", "0x0" ];
	this.Prices = [ 30, 30, 60, -1, -1, -1, -1, -1, -1 ];
};
SlideshowDetailsView.prototype.SetImages = function() {

};
SlideshowDetailsView.prototype.Draw = function() {

//	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);
	this.DrawPic();
	this.WriteText();
};
SlideshowDetailsView.prototype.SetPaintingIndex = function(iPntng) {

	this.PaintingIndex = iPntng;
};
SlideshowDetailsView.prototype.DrawPic = function() {
	var Pntng;

	this.ColourScape();

	Pntng = Paintings[this.Paintings[this.PaintingIndex]-1];
	this.Ratio = Pntng.Pic.width / Pntng.Pic.height;
	if (this.Ratio>1) {
		this.x = 50;
		this.y = 50 + ((500-(500/this.Ratio))/2);
		Pntng.DrawScaled(this.x, Math.round(this.y), 500, 500/this.Ratio);
	} else {
		this.x = 50 + ((500-(500*this.Ratio))/2);
		this.y = 50;
		Pntng.DrawScaled(this.x, Math.round(this.y), 500*this.Ratio, 500);
	}
};
SlideshowDetailsView.prototype.WriteText = function() {

	this.TextWriter.Write(this.Titles[this.PaintingIndex], 50, 580, { FONT: "18px Arial" } );
	this.TextWriter.Write(this.Dimensions[this.PaintingIndex]+" in", 250, 580, { FONT: "18px Arial" } );
	this.TextWriter.Write(this.Prices[this.PaintingIndex]+",000 Rs", 400, 580, { FONT: "18px Arial" } );
};
