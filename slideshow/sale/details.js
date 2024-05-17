
//---------------------------------------------------------
//----------- SLIDESHOW DETAILS VIEW ----------------------
var SlideshowDetailsView = function() {
	var PaintingIndex;
	var PaintingInfo;
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

	this.PaintingInfo = [ [ "Abstract Lilies in Vase.", "18x24", 20 ],
								 [ "Montreal Botanical.", "18x24", 35 ],
								 [ "Montreal Botanical Gardens 2.", "18x24", 35 ],
								 [ "Bougainvillea Munira.", "19x23", 20 ],
								 [ "Flowers in Vase a la Van Gogh.", "21x19", 25 ],
								 [ "Spray of Roses.", "21x19", 25 ],
								 [ "Portrait in Charcoal.", "22x30", 50 ],
								 [ "Sunset and a Field of Poppies.", "30x24", 25 ],
								 [ "2 Abstract Flowers.", "18x24", 20 ],
								 [ "Purple Lilies.", "12x24", 25 ],
								 [ "Flower Bouquet.", "14x17", 15 ],
								 [ "Transparent Jars.", "24x18", 25 ],
								 [ "Maroon Flowers.", "12x24", 25 ],
								 [ "Courtesan.", "32x20", 0 ]
							  ];
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

	this.TextWriter.Write(this.PaintingInfo[this.PaintingIndex][0], 20, this.Height+40, { FONT: "18px Arial" } );
	this.TextWriter.Write(this.PaintingInfo[this.PaintingIndex][1]+" in", 20, this.Height+60, { FONT: "18px Arial" } );
	if (this.PaintingInfo[this.PaintingIndex][2])
		this.TextWriter.Write(this.PaintingInfo[this.PaintingIndex][2]+",000 Rs", 20, this.Height+80, { FONT: "18px Arial" } );
};
