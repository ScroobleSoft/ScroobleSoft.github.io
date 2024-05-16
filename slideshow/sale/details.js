
//---------------------------------------------------------
//----------- SLIDESHOW DETAILS VIEW ----------------------
var SlideshowDetailsView = function() {
	var PaintingIndex;
	var Titles, Dimensions, Prices;
	var Ratio, Height;

	var x;
};
SlideshowDetailsView.prototype = new GenieDialogView();
SlideshowDetailsView.prototype.Set = function(cnvs, specs, pView, gTool, tWriter) {

	this.SetLinks(gTool, tWriter);

	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);
};
SlideshowDetailsView.prototype.SetData = function() {

	this.Titles = [ "Courtesan.", "Montreal Botanical.", "Montreal Botanical Gardens 2.", "Bougainvillea Munira.",
						 "Flowers in Vase a la Van Gogh.", "Spray of Roses.", "Portrait in Charcoal.", "Sunset and a Field of Poppies.",
						 "2 Abstract Flowers.", "Purple Lilies.", "Flower Bouquet.", "Transparent Jars.",
						 "Maroon Flowers.", "Abstract Lilies in Vase." ];
	this.Dimensions = [ "32x20", "18x24", "18x24", "19x23", "21x19", "21x19", "22x30", "30x24", "18x24", "12x24", "14x17", "24x12", "24x18", "24x18" ];
	this.Prices = [ 25, 35, 35, 20, 25, 25, 50, 25, 20, 15, 25, 25, 20, 60 ];
};
SlideshowDetailsView.prototype.Open = function() {
	//UNLOGGED
	this.Canvas.View = this;
	if (this.Specs.COLOUR)
		this.ColourScape(null, this.Specs.COLOUR);
	this.Draw();
	this.Specs.BUTTON.OK.T = this.Height + 40;
	this.OkButton.Show();
	this.Canvas.ResumeInput();
};
SlideshowDetailsView.prototype.Draw = function() {

//	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);
	this.DrawPic();
	this.WriteText();
};
SlideshowDetailsView.prototype.SetPaintingIndex = function(ipntng) {

	this.PaintingIndex = ipntng;
};
SlideshowDetailsView.prototype.DrawPic = function() {
	var pntng;

	this.ColourScape();

	pntng = Paintings[this.PaintingIndex];
	this.Ratio = pntng.Pic.width / pntng.Pic.height;
	if (this.Ratio>0.6) {
		this.x = 20;
		this.y = 20 + ((320-(320/this.Ratio))/2);
		pntng.DrawScaled(this.x, 20, 320, 320/this.Ratio);
		this.Height = 320 / this.Ratio;
	} else {
		this.x = 20 + ((320-(320*this.Ratio))/2);
		pntng.DrawScaled(this.x, 20, 320*this.Ratio, 320);
		this.Height = 320;
	}
};
SlideshowDetailsView.prototype.WriteText = function() {

	if (this.Height) {
		this.TextWriter.Write(this.Titles[this.PaintingIndex], 20, this.Height+40, { FONT: "18px Arial" } );
		this.TextWriter.Write(this.Dimensions[this.PaintingIndex]+" in", 20, this.Height+60, { FONT: "18px Arial" } );
		this.TextWriter.Write(this.Prices[this.PaintingIndex]+",000 Rs", 20, this.Height+80, { FONT: "18px Arial" } );
	} else {
		this.TextWriter.Write(this.Titles[this.PaintingIndex], 20, 380, { FONT: "18px Arial" } );
		this.TextWriter.Write(this.Dimensions[this.PaintingIndex]+" in.", 20, 400, { FONT: "18px Arial" } );
		this.TextWriter.Write(this.Prices[this.PaintingIndex]+",000 Rs.", 20, 420, { FONT: "18px Arial" } );
	}
};
