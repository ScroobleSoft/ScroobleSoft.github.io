
//-------------------------------------------------------------
//---------- GRIDIRON DRAFT PROSPECTS VIEW --------------------
var GridironDraftProspectsView = function() {
	var MarkerImage, SymbolImages, VolatileImage;
	var Prospects;
	var Slot, Pages, Page, Position, ProspectIndex;
	var MarkedProspects;

	var i, x, y;
};
GridironDraftProspectsView.prototype = new GenieView();
GridironDraftProspectsView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetData();
	this.SetLists();
};
GridironDraftProspectsView.prototype.Reset = function() {

	this.SetData();
	this.SetList();
};
GridironDraftProspectsView.prototype.SetImages = function() {

	this.MarkerImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MARKER);
	this.SymbolImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SYMBOLS);
	this.VolatileImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.VOLATILE);
};
GridironDraftProspectsView.prototype.SetData = function() {

	this.Slot = 0;
	this.Pages = this.Specs.PAGES;
	this.Page = 0;
	this.Position = -1;
};
GridironDraftProspectsView.prototype.SetLists = function() {
	var i;
	var aPrspcts;

	this.Prospects = Draft.ValueList;
	this.MarkedProspects = new Array();
};
GridironDraftProspectsView.prototype.Open = function() {

	this.SetInfoView(GridderInfoView);
	this.InfoView.SetGridder(this.Prospects[this.Slot]);

	GenieView.prototype.Open.call(this);
};
GridironDraftProspectsView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
	} else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}

	this.InfoView.Update();
	this.ConsoleView.Update();
};
GridironDraftProspectsView.prototype.Draw = function() {

	this.DisplayProspects();
	this.DisplaySlotSelector();
};
GridironDraftProspectsView.prototype.DisplayProspects = function() {
	var i;
	var y;
	var start, ofst;
	var glty, colour, info;

	//Safety check
	if (this.Prospects.length==0)
		return;

	start = this.Page * this.Specs.ENTRIES;
	ofst = 0;
	for (i=start;i<(start+this.Specs.ENTRIES);++i) {

		if (this.Position==-1) {
			if (i==this.Prospects.length)
				break;
		} else
			if (i==this.Prospects.Length)
				break;

		//Switch to second column if necessary
		if ((i-start)==this.Specs.COLUMN.ENTRIES)
			ofst = SCREEN.WIDTH / 2;

		//Determine parameters
		y = this.Specs.ENTRY.T + (this.Specs.ENTRY.H*(i % this.Specs.COLUMN.ENTRIES));
		if (this.Prospects[i].Value>GRADE.Eminus) 
			qlty = 5;
		else
			qlty = Math.floor(this.Prospects[i].Value/3);
		colour = RosterColours[qlty];

		//Write info
		Text.SetColour(colour);
		Text.SetFont("12px Arial");
		Text.Write((i+1)+".", 17+ofst, y);																															//index
		Text.Write(Positions[this.Prospects[i].Position], 42+ofst, y);																						//position
		Text.Write(SubPositions[this.Prospects[i].Position][this.Prospects[i].SubPosition], 67+ofst, y, { FONT: "10px Arial" } );		//sub-position
		Text.Write(this.Prospects[i].Name.First[0]+this.Prospects[i].Name.Last[0], 94+ofst, y);
		Text.Write(Utils.NumberToGrade(this.Prospects[i].Quality), 119+ofst, y);																		//quality
		if (this.Prospects[i].Type==GRIDDER.TYPE.VOLATILE) {
			this.VolatileImage.Draw(136+ofst, y-7);
			Text.Write(this.Prospects[i].Potential, 143+ofst, y);
		} else
			Text.Write("+"+this.Prospects[i].Potential, 136+ofst, y);																																//potential
		Text.ResetFont();
		Text.Write(Utils.NumberToGrade(this.Prospects[i].Value), 167+ofst, y, { FONT: "10px Arial" } );											//value
		Text.ResetColour();
		if (this.Prospects[i].Type) {
			this.SymbolImages.DrawPatchNumber((this.Specs.IMAGE.SYMBOLS.C*qlty)+(this.Prospects[i].Type-1), 184+ofst, y-9);				//type
		}

		//Display marker if necessary
		if (this.Prospects[i].Experience==-1)
			this.MarkerImage.Draw(6+ofst, y-9);
	}

	Graphics.DrawVerticalLine( { X: (SCREEN.WIDTH/2)-1, Y: 5 }, SCREEN.HEIGHT-10, GREY.MEDIUM, 1);
	Graphics.DrawVerticalLine( { X: SCREEN.WIDTH/2, Y: 5 }, SCREEN.HEIGHT-10, "white", 1);

	this.ProspectIndex = (this.Specs.ENTRIES*this.Page) + this.Slot;

	if (this.Position==-1)
		this.Pages = Math.ceil(this.Prospects.length/this.Specs.ENTRIES);
	else
		this.Pages = Math.ceil(this.Prospects.Length/this.Specs.ENTRIES);
};
GridironDraftProspectsView.prototype.DisplaySlotSelector = function() {

	this.x = 2;																								//HARD-CODING
	if (this.Slot>=this.Specs.COLUMN.ENTRIES)
		this.x += SCREEN.WIDTH / 2;
	this.y = 1 + (this.Specs.ENTRY.H*(this.Slot % this.Specs.COLUMN.ENTRIES));			//HARD-CODING
	Graphics.DrawRectangle(this.x, this.y, 197, 15, "yellow", 2);							//HARD-CODING
};
GridironDraftProspectsView.prototype.DisplayMarkers = function() {  //UNLOGGED

	if (this.Position==-1)
		for (this.i=0;this.i<this.Specs.ENTRIES;++this.i) {

			//Exit if have exceeded number of prospects
			if (((this.Page*this.Specs.ENTRIES)+this.i)==this.Prospects.length)
				return;

			//Draw marker
			if (this.Prospects.includes((this.Page*this.Specs.ENTRIES)+this.i)) {
				this.x = 6;							//HARD-CODING
				if (this.i>=this.Specs.COLUMN.ENTRIES)
					this.x += SCREEN.WIDTH / 2;
				this.y = this.Specs.ENTRY.T + (this.Specs.ENTRY.H*(this.i % this.Specs.COLUMN.ENTRIES)) - 10;
				MarkerImage.Draw(this.x, this.y);
			}
		}
};
GridironDraftProspectsView.prototype.UpdateClick = function() {

	//Determine slot
	this.Slot = Math.floor(Mouse.Click.Y/this.Specs.ENTRY.H);
	if (Mouse.Click.X>this.Specs.ENTRY.L2)
		this.Slot += this.Specs.COLUMN.ENTRIES;

	this.ColourScape();
	this.Draw();
		
	this.InfoView.ResetGridder(this.Prospects[this.ProspectIndex]);		//NOTE: .ProspectIndex set in ::DisplayProspects
};
GridironDraftProspectsView.prototype.OpenDraftView = function() {

	this.Close(this.LaunchDraftView.bind(this), 100);
};
GridironDraftProspectsView.prototype.LaunchDraftView = function() {

	DraftView.Open();
	DraftView.Update();
};
