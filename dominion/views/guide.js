
//---------------------------------------------------
//---------- DOMINION GUIDE VIEW --------------------
var DominionGuideView = function() {
	var ContentsButton, TidBitsButton, CloseButton;
	var PreviousButton, NextButton;
	var GuideImage;	//maybe TEMP (UNLOGGED)
	var ContentSlots, TidBitSlots, Slots, SlotIndex;
	var Contents, TidBits;
	var Methods;
	var PageNo, Pages;

	var i;
};
DominionGuideView.prototype = new GenieView();
DominionGuideView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.State = this.Specs.STATE.CONTENTS;
	this.PageNo = 0;
	this.Pages = 0;
	this.SetContents();
	this.SetSlots();
	this.SetMethods();
};
DominionGuideView.prototype.SetControls = function() {

	this.ContentsButton = this.SetTextButton(this.Specs.BUTTON.CONTENTS, RaisedCornerImages, this.TextWriter);
	this.TidBitsButton = this.SetTextButton(this.Specs.BUTTON.TIDBITS, RaisedCornerImages, this.TextWriter);
	this.CloseButton = this.SetTextButton(this.Specs.BUTTON.CLOSE, RaisedCornerImages, this.TextWriter);
	this.PreviousButton = this.SetImageButton(this.Specs.BUTTON.PREVIOUS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.NextButton = this.SetImageButton(this.Specs.BUTTON.NEXT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
DominionGuideView.prototype.SetImages = function() {  //UNLOGGED

	this.GuideImage = new GenieImage();
	this.GuideImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.GUIDE], { L: 0, T: 0, W: 400, H: 250 } );
};
DominionGuideView.prototype.ShowControls = function() {  //UNLOGGED

	switch (this.State) {
		case this.Specs.STATE.CONTENTS:
			this.ContentsButton.DeActivate();
			this.TidBitsButton.Show();
			this.CloseButton.Show();
			break;
		case this.Specs.STATE.TIDBITS:
			this.TidBitsButton.DeActivate();
			this.ContentsButton.Show();
			this.CloseButton.Show();
			break;
		case this.Specs.STATE.CONTENT:
			this.ContentsButton.Show();
			this.TidBitsButton.Show();
			this.CloseButton.Show();
			if (this.PageNo!=0)
				this.PrevButton.Show();
			if (this.PageNo!=(this.Pages-1))
				this.NextButton.Show();
			break;
	}
};
DominionGuideView.prototype.SetContents = function() {

	this.Contents = [ "Overview", "Map", "Nations", "Governments", "Military", "Ministries", "Alliances", "Missions", "Office",
							"Finance", "Diplomacy", "Espionage", "Research", "Disasters", "Adviser", "Conquest",
							"History", "Continent", "Province", "Power", "Allied State", "City-State", "Head Of State", "Bases", "Army",
							"Air Force", "Navy", "Fleets", "Situations", "Investment", "Bonds", "Raiders",
							"Turns", "Budget", "Auction", "Draft", "Surveillance", "Air Strike", "Blockade", "Champions Duel",
							"Dogfight", "Hunting", "ICBM Strike", "Interdiction", "Sabotage", "Farming", "Manufacturing"
						 ];
	this.TidBits = [
						];
						//items: items-situations
	//TIdBITS: currency-Newspapers-satellites-oil rigs-atolls-patrol (boats)-secession-civil war-blitz (to actions?)-tech level (research)
	//			  stance (belligerence)-orientation (specialty)
};
DominionGuideView.prototype.SetSlots = function() {

	this.ContentSlots = ArrayUtils.Create(this.Contents.length, GenieRect);
	this.TidBitSlots = ArrayUtils.Create(this.TidBits.length, GenieRect);
};
DominionGuideView.prototype.SetMethods = function() {

	this.Methods = [ this.DisplayOverview.bind(this), this.DisplayMap.bind(this) ];
};
DominionGuideView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateClick();
	this.UpdateButtons();
};
DominionGuideView.prototype.DrawContents = function() {  //UNLOGGED
	var i;
	var w;
	var rows;
	var nSlots;

	this.TextWriter.SetColour(DOMINION.COLOUR.LINK);

	this.TextWriter.Write("CONTENTS", 135, 22, { FONT: "bold 24px Arial" } );
	this.GraphicsTool.DrawHorizontalLine( { X: 135, Y: 26 }, 130, DOMINION.COLOUR.LINK, 3);

	this.TextWriter.Write("Main", 15, 50, { FONT: "bold 18px Arial" } );
	this.TextWriter.Write("Details", 145, 50, { FONT: "bold 18px Arial" } );
	this.TextWriter.Write("Actions", 275, 50, { FONT: "bold 18px Arial" } );

	rows = Math.ceil(this.Contents.length/this.Specs.COLUMNS);
	for (i=0;i<rows;++i) {
		this.TextWriter.Write(this.Contents[i], 15, 68+(20*i), { STYLE: FONT.STYLE.UNDERLINED } );
		w = StringUtils.GetTextWidth(this.Contents[i], null, this.Context);
		this.ContentSlots[i].Set(15, 53+(20*i), w, 20);
		this.TextWriter.Write(this.Contents[i+rows], 145, 68+(20*i), { STYLE: FONT.STYLE.UNDERLINED } );
		w = StringUtils.GetTextWidth(this.Contents[i+rows], null, this.Context);
		this.ContentSlots[i+rows].Set(145, 53+(20*i), w, 20);
		if ((i+(2*rows))<this.Contents.length) {
			this.TextWriter.Write(this.Contents[i+(2*rows)], 275, 68+(20*i), { STYLE: FONT.STYLE.UNDERLINED } );
			w = StringUtils.GetTextWidth(this.Contents[i+(2*rows)], null, this.Context);
			this.ContentSlots[i+(2*rows)].Set(275, 53+(20*i), w, 20);
		}
	}

	this.TextWriter.ResetColour();
};
DominionGuideView.prototype.Draw = function() {  //UNLOGGED - only first screen, not TIdBITS screen

	switch (this.State) {
		case this.Specs.STATE.CONTENTS:
			this.DrawContents();
			break;
		case this.Specs.STATE.TIdBITS:
			this.DrawTidBits();
			break;
		case this.Specs.STATE.PAGE:
			this.DrawPage();
			break;
	}
};
DominionGuideView.prototype.DrawTidBits = function() {  //UNLOGGED
	var i;
	var rows;

	//'Bases' can move here
};
DominionGuideView.prototype.DrawPage = function() {  //UNLOGGED

	setTimeout(this.Methods[this.SlotIndex]);
};
DominionGuideView.prototype.UpdateClick = function() {  //UNLOGGED

	if (Mouse.CheckLeftClicked()) {
		switch (Mouse.CanvasId) {
			case CANVAS.PRIME:

				//Determine current page
				if (this.State==this.Specs.STATE.CONTENTS)
					this.Slots = this.ContentSlots;
				else if (this.State==this.Specs.STATE.TIDBITS)
					this.Slots = this.TidBitSlots;
				else {
					this.UpdatePageClick();
					return;
				}

				//Check if a slot was clicked
				for (this.i=0;this.i<this.Slots.length;++this.i)
					if (SpaceUtils.CheckPointInBox(Mouse.Click, this.Slots[this.i]))
						break;

				//Open relevant page
				if (this.i!=this.ContentSlots.length) {
					if (this.State==this.Specs.STATE.CONTENTS)
						this.SlotIndex = this.i;
					else
						this.SlotIndex = this.ContentSlots.length + this.i;
					this.State = this.Specs.STATE.PAGE;
					this.ColourScape();
					this.Draw();
					this.ShowControls();
				}
				break;
			case CANVAS.ZOOM:
				this.InfoView.UpdateClick();
				break;
			case CANVAS.CONSOLE:
				Mouse.ClearAll();
				break;
		}
	}
};
DominionGuideView.prototype.UpdateButtons = function() {  //UNLOGGED

	if (this.ContentsButton.CheckClicked()) {
	}

	if (this.TidBitsButton.CheckClicked()) {
	}

	if (this.CloseButton.CheckClicked()) {
		//-depends where the view was called from
	}

	if (this.PreviousButton.CheckClicked()) {
	}

	if (this.NextButton.CheckClicked()) {
	}
};
DominionGuideView.prototype.UpdatePageClick = function() {  //UNLOGGED
};
