
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

	this.Paintings = [ 111, 112, 113, 114, 115, 116, 117, 118, 111 ];
	this.Titles = [ "2 Ladies.", "Pink Flowers.", "Purple Flowers.", "Pink Shrub.", "Lilies.", "Two Roses.", "Blue Vase.", "Tulip Field.", "" ];
	this.Dimensions = [ "32x20", "18x24", "18x24", "19x23", "21x19", "21x19", "19x22", "30x24", "0x0" ];
	this.Prices = [ 60, 30, 30, 40, 40, 40, 40, 50, -1 ];
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
