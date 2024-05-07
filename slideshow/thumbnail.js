
//----------------------------------------------------
//---------- SLIDE THUMBNAIL VIEW --------------------
var SlideThumbnailView = function() {
	var StartButton, BackButton;
	var GallerySelected;		//index
	var Thumbnails;

	var c, r, x, y;
};
SlideThumbnailView.prototype = new GenieView();
SlideThumbnailView.prototype.Set = function(cnvs, specs, tWriter) {

	this.SetLinks(null, tWriter);

	GenieView.prototype.Set.call(this, cnvs, specs);

	this.GallerySelected = 0;
};
SlideThumbnailView.prototype.SetControls = function() {

	this.StartButton = new TextButton();
	this.StartButton.Set(this.Canvas, this.Specs.BUTTON.START, this.TextWriter);
	this.StartButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.StartButton);

	this.BackButton = new TextButton();
	this.BackButton.Set(this.Canvas, this.Specs.BUTTON.BACK, this.TextWriter);
	this.BackButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.BackButton);
};
SlideThumbnailView.prototype.SetGallery = function(iGllry) {

	this.GallerySelected = iGllry;
};
SlideThumbnailView.prototype.SetImages = function() {

	this.Thumbnails = new GenieImage();
	this.Thumbnails.Set(this.Context, ImageManager.Pics[IMAGeINDEX.THUMBNAILS], this.Specs.IMAGE.THUMBNAILS);
};
SlideThumbnailView.prototype.Draw = function() {
	var iPic;

	iPic = 0;
	for (r=0;r<this.Specs.R;++r)
		for (c=0;c<this.Specs.C;++c) {
			this.x = this.Specs.OFFSET.X + (this.Specs.GAP.X*c);
			this.y = this.Specs.OFFSET.Y + (this.Specs.GAP.Y*r);
			this.Thumbnails.DrawPatchNumber(Batches[this.GallerySelected].START+iPic, this.x, this.y);
			++iPic;
			if (iPic==Batches[this.GallerySelected].COUNT)
				return;
		}
};
SlideThumbnailView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.StartButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Close(this.OpenSlideView.bind(this), 60);
	}

	if (this.BackButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Close(this.OpenGalleryView.bind(this), 60);
	}
};
SlideThumbnailView.prototype.OpenSlideView = function() {

	SlideView.Open();
	SlideView.Update();
	Soundtracks[this.GallerySelected].Play();
};
SlideThumbnailView.prototype.OpenGalleryView = function() {

	GalleryView.Open();
	GalleryView.Update();
};
