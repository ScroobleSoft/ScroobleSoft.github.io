
//-------------------------------------------------
//---------- SALE GALLERY VIEW --------------------
var SaleGalleryView = function() {
	var ThumbnailImages;
	var ImageMaps;
	var FirstOpenFlag;

	var i;
};
SaleGalleryView.prototype = new GenieView();
SaleGalleryView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {

	this.SetLinks(gTool, tWriter, rGenerator);

	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetImageMaps();
};
SaleGalleryView.prototype.SetImages = function() {

	this.ThumbnailImages = new GenieImage();
	this.ThumbnailImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SALE], this.Specs.IMAGE.THUMBNAILS);

	this.ImageMaps = ArrayUtils.Create(9, GenieRect);
};
SaleGalleryView.prototype.SetImageMaps = function() {
	var i;
	var x, y;

	for (i=0;i<9;++i) {
		x = 30 + (190*(i % 3));
		y = 40 + (190*Math.floor(i/3));
		this.ImageMaps[i].Set(x, y, 160, 160);
	}
};
SaleGalleryView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	this.Update();
};
SaleGalleryView.prototype.Draw = function() {
	var i;

	this.TextWriter.Write("Choose a painting:", 230, 25, { FONT: "18px Arial", COLOUR: "blue" } );
	for (i=0;i<9;++i) {
		this.GraphicsTool.DrawRectangle(this.ImageMaps[i].L-4, this.ImageMaps[i].T-4, 168, 168, "blue", 4);
		this.ThumbnailImages.DrawPatchNumber(i, this.ImageMaps[i].L, this.ImageMaps[i].T);
	}
};
SaleGalleryView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//Check image clicks
	if (Mouse.CheckDowned(CANVAS.PRIME)) {

		//Start music
		if (!this.FirstOpenFlag) {
			this.i = this.Randomizer.GetIndex(Soundtracks.length);
			if (Soundtracks[this.i].Playable) {
				Soundtracks[this.i].Play();
				this.FirstOpenFlag = true;
			}
		}

		//Check if images clicked
		for (this.i=0;this.i<9;++this.i)
			if (SpaceUtils.CheckPointInBox(Mouse.Down, this.ImageMaps[this.i])) {
				cancelAnimationFrame(this.AnimationFrameHandle);
				DetailsView.SetPaintingIndex(this.i);
				DetailsView.Open();
				DetailsView.Update();
				break;
			}
	}
};
