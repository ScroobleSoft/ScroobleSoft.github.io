
//-------------------------------------------------
//---------- SALE GALLERY VIEW --------------------
var SaleGalleryView = function() {
	var MoreButton, BackButton;
	var ThumbnailImages, SoldImage;
	var ImageMaps;
	var PageNo, PicIndex;

	var i;
};
SaleGalleryView.prototype = new GenieView();
SaleGalleryView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {

	this.SetLinks(gTool, tWriter, rGenerator);

	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetImageMaps();
	this.PageNo = 0;
};
SaleGalleryView.prototype.SetImages = function() {

	this.ThumbnailImages = new GenieImage();
	this.ThumbnailImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SALE], this.Specs.IMAGE.THUMBNAILS);
	this.SoldImage = new GenieImage();
	this.SoldImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SOLD);

	this.ImageMaps = ArrayUtils.Create(9, GenieRect);
};
SaleGalleryView.prototype.SetControls = function() {

	this.MoreButton = new ImageButton();
	this.MoreButton.Set(this.Canvas, this.Specs.BUTTON.MORE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.MoreButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.MoreButton);
	this.BackButton = new ImageButton();
	this.BackButton.Set(this.Canvas, this.Specs.BUTTON.BACK, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.BackButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.BackButton);
};
SaleGalleryView.prototype.SetImageMaps = function() {
	var i;
	var x, y;

	for (i=0;i<this.Specs.PAGE.PICS;++i) {
		x = 10 + (180*(i % 2));
		y = 55 + (180*Math.floor(i/2));
		this.ImageMaps[i].Set(x, y, 160, 160);
	}
};
SaleGalleryView.prototype.Open = function() {

	this.Draw();
	this.Canvas.View = this;
	this.Canvas.ResumeInput();

	this.Update();
};
SaleGalleryView.prototype.Draw = function() {
	var i;
	var nPics, nStart;

	this.ColourScape(null, this.Specs.COLOUR);

	//Show relevant button(s)
	switch (this.PageNo) {
		case 0:
			this.MoreButton.Show();
			this.BackButton.Hide(this.Specs.COLOUR);
			break;
		case 1:
		case 2:
			this.MoreButton.Show();
			this.BackButton.Show();
			break;
		case 3:
			this.MoreButton.Hide(this.Specs.COLOUR);
			this.BackButton.Show();
			break;
	}

	//Show thumbnails
	this.TextWriter.Write("Choose a painting:", 5, 30, { FONT: "18px Arial", COLOUR: BROWN.GINGErBREAD } );
//	if (this.PageNo==(this.Specs.PAGE.COUNT-1))
//		nPics = this.Specs.PICS % this.Specs.PAGE.PICS;
//	else
		nPics = this.Specs.PAGE.PICS;
	nStart = this.Specs.PAGE.PICS * this.PageNo;
	for (i=0;i<nPics;++i) {
		this.GraphicsTool.DrawRectangle(this.ImageMaps[i].L-4, this.ImageMaps[i].T-4, 168, 168, BROWN.GINGErBREAD, 4);
		this.ThumbnailImages.DrawPatchNumber(nStart+i, this.ImageMaps[i].L, this.ImageMaps[i].T);
		if (DetailsView.PaintingInfo[nStart+i][3])
			this.SoldImage.Draw(this.ImageMaps[i].L, this.ImageMaps[i].T);
	}
};
SaleGalleryView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateButtons();
	this.UpdateImageClicks();
};
SaleGalleryView.prototype.UpdateButtons = function() {

	if (this.MoreButton.CheckClicked()) {
		++this.PageNo;
		setTimeout(this.Draw.bind(this), 100);
		return;
	}

	if (this.BackButton.CheckClicked()) {
		--this.PageNo;
		setTimeout(this.Draw.bind(this), 100);
		return;
	}
};
SaleGalleryView.prototype.UpdateImageClicks = function() {

	if (Mouse.CheckDowned(CANVAS.PRIME)) {

		for (this.i=0;this.i<this.Specs.PAGE.PICS;++this.i)
			if (SpaceUtils.CheckPointInBox(Mouse.Down, this.ImageMaps[this.i])) {
				this.PicIndex = (this.Specs.PAGE.PICS*this.PageNo) + this.i;
				if (this.PicIndex<this.Specs.PICS) {
					cancelAnimationFrame(this.AnimationFrameHandle);
					DetailsView.SetPaintingIndex(this.PicIndex);
					DetailsView.Open();
					DetailsView.Update();
					break;
				}
			}
	}
};
