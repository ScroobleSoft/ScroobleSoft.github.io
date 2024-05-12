
//-------------------------------------------------
//---------- SALE GALLERY VIEW --------------------
var SaleGalleryView = function() {
	var MoreButton, BackButton;
	var ThumbnailImages;
	var ImageMaps;
	var FirstOpenFlag;
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

	for (i=0;i<9;++i) {
		x = 30 + (190*(i % 3));
		y = 40 + (190*Math.floor(i/3));
		this.ImageMaps[i].Set(x, y, 160, 160);
	}
};
SaleGalleryView.prototype.Open = function() {

	this.Draw();
	this.Canvas.View = this;
	if (this.PageNo==0)
		this.MoreButton.Show();
	else
		this.BackButton.Show();
	this.Canvas.ResumeInput();

	this.Update();
};
SaleGalleryView.prototype.Draw = function() {
	var i;
	var nPics, nStart;

	this.ColourScape(null, this.Specs.COLOUR);

	//Show relevant button
	if (this.PageNo==0)
		this.MoreButton.Show();
	else
		this.BackButton.Show();

	//Show thumbnails
	this.TextWriter.Write("Choose a painting:", 230, 25, { FONT: "18px Arial", COLOUR: "blue" } );
	if (this.PageNo==(this.Specs.PAGE.COUNT-1))
		nPics = this.Specs.PICS % this.Specs.PAGE.PICS;
	else
		nPics = this.Specs.PAGE.PICS;
	for (i=0;i<nPics;++i) {
		this.GraphicsTool.DrawRectangle(this.ImageMaps[i].L-4, this.ImageMaps[i].T-4, 168, 168, "blue", 4);
		nStart = this.Specs.PAGE.PICS * this.PageNo;
		this.ThumbnailImages.DrawPatchNumber(nStart+i, this.ImageMaps[i].L, this.ImageMaps[i].T);
	}
};
SaleGalleryView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//Check buttons clicked
	if (this.MoreButton.CheckClicked()) {
		this.PageNo = 1;
		this.MoreButton.Hide();
		setTimeout(this.Draw.bind(this), 100);
		return;
	}
	if (this.BackButton.CheckClicked()) {
		this.PageNo = 0;
		this.BackButton.Hide();
		setTimeout(this.Draw.bind(this), 100);
		return;
	}

	//Check surface clicks
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
SaleGalleryView.prototype.UpdateMusic = function() {
};
SaleGalleryView.prototype.UpdateButtons = function() {
};
SaleGalleryView.prototype.UpdateImageClicks = function() {
};
