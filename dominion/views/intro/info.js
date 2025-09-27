
DominionIntroView.prototype.OpenInfoScreen = function() {

	this.MoveInfoButton();
	this.GraphicsTool.DrawRectangle(80, 310, 240, 40, this.Specs.COLOUR, 0);
	this.State = this.Specs.STATE.INFO;
	this.DisplayInfo();
	this.ShowControls();
	++this.InfoCount;
};
DominionIntroView.prototype.UpdateInfoButton = function() {

	if (this.GuideButton.CheckClicked()) {
		this.Close(this.OpenGuideView.bind(this), 100);
		return;
	}

	if (this.InfoButton.CheckClicked()) {
		if (this.InfoCount==0)
			setTimeout(this.OpenInfoScreen.bind(this), 100);
		else {
			this.DisplayInfo();
			++this.InfoCount;
		}
		return;
	}

	if (this.PlayButton.CheckClicked()) {
		this.PlayButton.DeActivate();
		this.InfoButton.DeActivate();
		this.ResetInfoButton();
		this.InfoCount = 0;
		this.State = this.Specs.STATE.OPEN;
		WorldMap.Draw();
		setTimeout(this.Open.bind(this), 100);
	}
};
DominionIntroView.prototype.DisplayInfo = function() {

	this.GraphicsTool.DrawRectangle(80, 50, 240, 260, this.Specs.COLOUR, 0);
	this.GraphicsTool.DrawRectangle(80, 50, 240, 300, "white", 3);

	this.TextWriter.SetColour("white");

	this.TextWriter.WriteParagraphs(IntroInfo[this.InfoCount], 87, 68, null, null, 6)

	this.TextWriter.ResetColour();
};
DominionIntroView.prototype.MoveInfoButton = function() {

	this.InfoButton.Specs.T = 315;
};
DominionIntroView.prototype.ResetInfoButton = function() {

	this.InfoButton.Specs.T = 295;
};
