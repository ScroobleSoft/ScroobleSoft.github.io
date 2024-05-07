
//-----------------------------------------------
//---------- SLIDE SHOW VIEW --------------------
var SlideShowView = function() {
	var PicIndex, GalleryIndex;
	var PreviousButtonImage, NextButtonImage;
	var PreviousButton, NextButton;
	var PauseButton;
	var Timer, TimerImage, DotImage;
	var Ratio;

	var x, y;
};
SlideShowView.prototype = new GenieView();
SlideShowView.prototype.Set = function(cnvs, specs, gTool, tWriter) {

	this.SetLinks(gTool, tWriter);

	GenieView.prototype.Set.call(this, cnvs, specs);

	this.PicIndex = 0;
	this.State = this.Specs.STATE.ACTIVE;
};
SlideShowView.prototype.SetControls = function() {

	//Images
	this.PreviousButtonImage = new GenieImage();
	this.PreviousButtonImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PUShBUTTON.PREVIOUS.IMAGE);
	this.NextButtonImage = new GenieImage();
	this.NextButtonImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PUShBUTTON.NEXT.IMAGE);

	//Push buttons
	this.PreviousButton = new GeniePushButton();
	this.PreviousButton.Set(this.Canvas, this.Specs.PUShBUTTON.PREVIOUS, this.PreviousButtonImage);
	this.PreviousButton.SetEdgePics(PushButtonImage);
	this.Controls.push(this.PreviousButton);
	this.NextButton = new GeniePushButton();
	this.NextButton.Set(this.Canvas, this.Specs.PUShBUTTON.NEXT, this.NextButtonImage);
	this.NextButton.SetEdgePics(PushButtonImage);
	this.Controls.push(this.NextButton);

	//Buttons
	this.PauseButton = new TextButton();
	this.PauseButton.Set(this.Canvas, this.Specs.BUTTON.PAUSE, this.TextWriter);
	this.PauseButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.PauseButton);

	//Timer
	this.TimerImage = new GenieImage();
	this.TimerImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.TIMER.IMAGE.FRAME);
	this.DotImage = new GenieImage();
	this.DotImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.TIMER.IMAGE.DOT);
	this.Timer = new SlidingDotTimer();
	this.Timer.Set(this.Specs.TIMER, this.TimerImage);
	this.Timer.SetDotImage(this.DotImage);
};
SlideShowView.prototype.SetGallery = function(iGllry) {

	this.GalleryIndex = iGllry;
	this.PicIndex = Batches[this.GalleryIndex].START;
};
SlideShowView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	this.PreviousButton.Disable();
};
SlideShowView.prototype.Draw = function() {

	this.GraphicsTool.DrawBasReliefSection(84, 84, 432, 432);

	this.DrawPic();

	this.Timer.Draw();
};
SlideShowView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateNavigationButtons();
	this.UpdatePauseButton();
	this.UpdateTimer();
};
SlideShowView.prototype.DrawPic = function() {

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(100, 100, 400, 400);

	this.Ratio = Paintings[this.PicIndex].Pic.width / Paintings[this.PicIndex].Pic.height;
	if (this.Ratio>1) {
		this.x = 100;
		this.y = 100 + ((400-(400/this.Ratio))/2);
		Paintings[this.PicIndex].DrawScaled(this.x, Math.round(this.y), 400, 400/this.Ratio);
	} else {
		this.x = 100 + ((400-(400*this.Ratio))/2);
		this.y = 100;
		Paintings[this.PicIndex].DrawScaled(this.x, Math.round(this.y), 400*this.Ratio, 400);
	}
};
