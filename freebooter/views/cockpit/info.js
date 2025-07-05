
//-----------------------------------------------------
//---------- SOLAR COCKPIT INFO VIEW ------------------
var SolarCockpitInfoView = function() {
	var ViewsImage, VerticalViewsImage;
	var FrontSelectionImage, RightSelectionImage, BackSelectionImage, LeftSelectionImage;
	var TopLabelImages, BottomLabelImages;
	var FrontLabelImage, RightLabelImage, BackLabelImage, LeftLabelImage, CargoLabelImage;
	var SpeedImage;
	var ViewSelected;
	var FrontBox, RightBox, BackBox, LeftBox, TopBox, BottomBox, ViewBoxes, CargoBox;
	var PlusButton, MinusButton, SpeedStep;
	var HelpButton, OptionsButton, ExitButton;

	var i;
};
SolarCockpitInfoView.prototype = new GenieSubView();
SolarCockpitInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.ViewSelected = VIEW.COCKPIT.VIEW.FRONT;
	this.SpeedStep = 1;
	this.SetBoxes();
};
SolarCockpitInfoView.prototype.SetImages = function() {

	//Rectangles
	this.ViewsImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.VIEWS);
	this.VerticalViewsImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.VERTICAlVIEWS);

	//Trapezoids
	this.FrontSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION.FRONT);
	this.RightSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION.RIGHT);
	this.BackSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION.BACK);
	this.LeftSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION.LEFT);

	//Labels
	this.TopLabelImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL.TOP);
	this.BottomLabelImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL.BOTTOM);
	this.FrontLabelImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL.FRONT);
	this.RightLabelImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL.RIGHT);
	this.BackLabelImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL.BACK);
	this.LeftLabelImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL.LEFT);
	this.CargoLabelImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL.CARGO);

	this.SpeedImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SPEED);
};
SolarCockpitInfoView.prototype.SetControls = function() {  //UNLOGGED

	if (Game.CheckMobile()) {
//		this.PilotsButton
		this.HelpButton = this.SetImageButton(this.Specs.BUTTON.HELP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.OptionsButton = this.SetImageButton(this.Specs.BUTTON.OPTIONS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	}
	this.PlusButton = this.SetImageButton(this.Specs.BUTTON.PLUS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.MinusButton = this.SetImageButton(this.Specs.BUTTON.MINUS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
SolarCockpitInfoView.prototype.SetBoxes = function() {

	this.FrontBox = { L: 42, T: 48, W: 72, H: 36 };
	this.RightBox = { L: 114, T: 84, W: 36, H: 72 };
	this.BackBox = { L: 42, T: 156, W: 72, H: 36 };
	this.LeftBox = { L: 6, T: 84, W: 36, H: 72 };
	this.TopBox = { L: 6, T: 6, W: 144, H: 36 };
	this.BottomBox = { L: 6, T: 198, W: 144, H: 36 };
	this.CargoBox = { L: 43, T: 85, W: 70, H: 70 };
	this.ViewBoxes = [ this.FrontBox, this.RightBox, this.BackBox, this.LeftBox, this.TopBox, this.BottomBox, this.CargoBox ];
};
SolarCockpitInfoView.prototype.Update = function() {  //UNLOGGED

	//Update speed buttons
	if (this.PlusButton.CheckClicked()) {
		++this.SpeedStep;
		if (this.SpeedStep>8)				//TODO: actually, should disable the Plus button, making this check REDUNDANT
			this.SpeedStep = 8;
		else {
			Starfield.Speed = 0.25 * this.SpeedStep;
			this.DisplaySpeed();
		}
	}
	if (this.MinusButton.CheckClicked()) {
		--this.SpeedStep;
		if (this.SpeedStep<0)				//TODO: actually, should disable the Plus button, making this check REDUNDANT
			this.SpeedStep = 0;
		else {
			Starfield.Speed = 0.25 * this.SpeedStep;
			this.DisplaySpeed();
		}
	}

	//Update speed if necessary
	if (Math.ceil(this.MainView.Speed/0.25)>this.SpeedStep) {
		++this.SpeedStep;
		if (this.SpeedStep>VOYAGE.SPEED.MAXIMUM)
			this.SpeedStep = VOYAGE.SPEED.MAXIMUM;
		this.DisplaySpeed();
	}

	//-update buttons

	this.UpdateClick();
};
SolarCockpitInfoView.prototype.Draw = function() {

	//View sections and labels
	this.GraphicsTool.SetContext(this.Context);
	if (this.ViewSelected==VIEW.COCKPIT.VIEW.TOP) {
		this.GraphicsTool.DrawRectangle(7, 7, 142, 34, GREY.DARK, 0);
		this.TopLabelImages.DrawPatchNumber(1, 67, 19);
	} else {
		this.GraphicsTool.DrawRectangle(7, 7, 142, 34, GREY.SILVER, 0);
		this.TopLabelImages.DrawPatchNumber(0, 67, 19);
	}
	this.VerticalViewsImage.Draw(6, 6);
	this.ViewsImage.Draw();
	if (this.ViewSelected==VIEW.COCKPIT.VIEW.BOTTOM) {
		this.GraphicsTool.DrawRectangle(7, 199, 142, 34, GREY.DARK, 0);
		this.BottomLabelImages.DrawPatchNumber(1, 55, 211);
	} else {
		this.GraphicsTool.DrawRectangle(7, 199, 142, 34, GREY.SILVER, 0);
		this.BottomLabelImages.DrawPatchNumber(0, 55, 211);
	}
	this.VerticalViewsImage.Draw(6, 198);
	this.GraphicsTool.ResetContext();

	//Selection sections
	switch (this.ViewSelected) {
		case VIEW.COCKPIT.VIEW.FRONT:
			this.FrontSelectionImage.Draw();
			this.FrontLabelImage.Draw();
			break;
		case VIEW.COCKPIT.VIEW.RIGHT:
			this.RightSelectionImage.Draw();
			this.RightLabelImage.Draw();
			break;
		case VIEW.COCKPIT.VIEW.BACK:
			this.BackSelectionImage.Draw();
			this.BackLabelImage.Draw();
			break;
		case VIEW.COCKPIT.VIEW.LEFT:
			this.LeftSelectionImage.Draw();
			this.LeftLabelImage.Draw();
			break;
		case VIEW.COCKPIT.VIEW.TOP:
			break;
		case VIEW.COCKPIT.VIEW.BOTTOM:
			break;
		case VIEW.COCKPIT.VIEW.CARGO:
			this.GraphicsTool.SetContext(this.Context);
			this.GraphicsTool.DrawRectangle(43, 85, 70, 70, GREY.DARK, 0);
			this.GraphicsTool.ResetContext();
			this.CargoLabelImage.Draw();
			cancelAnimationFrame(this.MainView.AnimationFrameHandle);
			CargoBay.Draw();
			break;
	}

	//Labels
	this.SpeedImage.Draw();
	this.TextWriter.Write(Speeds[1], 165, 35, { COLOUR: "white" } );
};
SolarCockpitInfoView.prototype.DisplaySpeed = function() {

	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(160, 22, 75, 25, this.Specs.COLOUR, 0);
	this.GraphicsTool.ResetContext();
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write(Speeds[this.SpeedStep], 165, 39, { COLOUR: "white" } );
	this.TextWriter.ResetContext();
};
SolarCockpitInfoView.prototype.UpdateClick = function() {

	for (this.i=0;this.i<VIEW.COCKPIT.VIEW.COUNT;++this.i)
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.ViewBoxes[this.i])) {
			this.ViewSelected = this.i;
			Starfield.SetView(this.ViewSelected);
			this.ColourScape();
			this.Draw();
			return;
		}
};
