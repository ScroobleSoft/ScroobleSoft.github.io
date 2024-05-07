
SlideShowView.prototype.UpdateNavigationButtons = function() {

	if (this.PreviousButton.CheckClicked()) {
		--this.PicIndex;
		if (this.PicIndex==Batches[this.GalleryIndex].START)
			this.PreviousButton.Disable();
		if (this.PicIndex==(Paintings.length-2))
			this.NextButton.Enable();
		this.DrawPic();
		this.Timer.Reset();
	}
	if (this.NextButton.CheckClicked()) {
		++this.PicIndex;
		if (this.PicIndex==1)
			this.PreviousButton.Enable();
		if (this.PicIndex==(Batches[this.GalleryIndex].END-1))
			this.NextButton.Disable();
		this.DrawPic();
		this.Timer.Reset();
	}
};
SlideShowView.prototype.UpdatePauseButton = function() {

	if (this.PauseButton.CheckClicked()) {
		if	(this.State==this.Specs.STATE.ACTIVE) {
			this.State = this.Specs.STATE.PAUSED;
			this.PauseButton.ReLabel("Restart");
		} else {
			this.State = this.Specs.STATE.ACTIVE;
			this.PauseButton.ReLabel("Pause");
		}
	}
};
SlideShowView.prototype.UpdateTimer = function() {

	if (this.State==this.Specs.STATE.ACTIVE) {
		this.Timer.Update();
		if (this.Timer.DotIndex==0 && this.Timer.Frames==this.Specs.TIMER.F)	{	//NOTE: indicates a new pic has to be drawn
			++this.PicIndex;
			if (this.PicIndex==Batches[this.GalleryIndex].START+1)
				this.PreviousButton.Enable();
			if (this.PicIndex==(Batches[this.GalleryIndex].END-1))
				this.NextButton.Disable();
			if (this.PicIndex==Batches[this.GalleryIndex].END)
				cancelAnimationFrame(this.AnimationFrameHandle);
			else
				this.DrawPic();
		}
	}
};
