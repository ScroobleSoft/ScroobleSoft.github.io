
//--------------------------------------------------
//---------- IMAGE GALLERY VIEW --------------------
var ImageGalleryView = function() {
	var GalleryButtons;
	var BannerImage, MosaicImages;

	var i;
};
ImageGalleryView.prototype = new GenieView();
ImageGalleryView.prototype.Set = function(cnvs, specs, gTool, tWriter) {

	this.SetLinks(gTool, tWriter);

	GenieView.prototype.Set.call(this, cnvs, specs);
};
ImageGalleryView.prototype.SetControls = function() {
	var i;
	var l, t;
	var specs;

	this.GalleryButtons = ArrayUtils.Create(this.Specs.BATCH.COUNT, ImageButton);
	for (i=0;i<this.Specs.BATCH.COUNT;++i) {
		l = this.Specs.BUTTON.GALLERY.L + (this.Specs.BUTTON.GALLERY.GAP*(i % BATCH.C));
		t = this.Specs.BUTTON.GALLERY.T + (this.Specs.BUTTON.GALLERY.GAP*Math.floor(i/BATCH.C));
		specs = { L: l, T: t, W: this.Specs.BUTTON.GALLERY.W, H: this.Specs.BUTTON.GALLERY.H, STYLE: this.Specs.BUTTON.GALLERY.STYLE,
					 SX: this.Specs.BUTTON.GALLERY.SX+(122*i), SY: this.Specs.BUTTON.GALLERY.SY, LW: this.Specs.BUTTON.GALLERY.LW };
		this.GalleryButtons[i].Set(this.Canvas, specs, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.GalleryButtons[i].SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.GalleryButtons[i]);
	}
};
ImageGalleryView.prototype.SetImages = function() {

	this.BannerImage = new GenieImage();
	this.BannerImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.BANNER);

	this.MosaicImages = new GenieImage();
	this.MosaicImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MOSAIC);
};
ImageGalleryView.prototype.Draw = function() {

	this.BannerImage.Draw();

	this.TextWriter.Write("Choose a gallery.", 230, 175, { FONT: "18px Arial", COLOUR: "blue" } );
	this.TextWriter.Write("1", 195, 365, { FONT: "18px Arial", COLOUR: "blue" } );
	this.TextWriter.Write("2", 395, 365, { FONT: "18px Arial", COLOUR: "blue" } );
	this.TextWriter.Write("3", 195, 560, { FONT: "18px Arial", COLOUR: "blue" } );
	this.TextWriter.Write("4", 395, 560, { FONT: "18px Arial", COLOUR: "blue" } );
};
ImageGalleryView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//Check for button clicks
	for (this.i=0;this.i<this.Specs.BATCH.COUNT;++this.i)
		if (this.GalleryButtons[this.i].CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			ThumbnailView.SetGallery(this.i);
			SlideView.SetGallery(this.i);
			break;
		}
	if (this.i!=this.Specs.BATCH.COUNT)
		this.Close(this.OpenThumbnailView.bind(this), 60);
};
ImageGalleryView.prototype.OpenThumbnailView = function() {

	ThumbnailView.Open();
	ThumbnailView.Update();
};
