
//---------------------------------------------------------
//---------- FOOTBALL LEAGUE INFO VIEW --------------------
var FootballLeagueInfoView = function() {
	var OptionImages, SelectionImages;
	var OptionSelected, OptionBoxes;

	var i;
};
FootballLeagueInfoView.prototype = new GenieSubView();
FootballLeagueInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.OptionSelected = 0;
	this.OptionBoxes = ArrayUtils.Create(this.Specs.IMAGE.OPTIONS.PATCHES, GenieRect);
};
FootballLeagueInfoView.prototype.SetImages = function() {

	if (Game.CheckMobile()) {
		this.OptionImages = new GenieImage();
		this.OptionImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOBILE], this.Specs.IMAGE.OPTIONS);
		this.SelectionImages = new GenieImage();
		this.SelectionImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOBILE], this.Specs.IMAGE.SELECTION);
	}
};
FootballLeagueInfoView.prototype.Update = function() {

	if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		for (this.i=0;this.i<this.OptionBoxes.length;++this.i)
			if (SpaceUtils.CheckPointInBox(Mouse.Click, this.OptionBoxes[this.i])) {
				if (this.i!=this.OptionSelected) {
					this.SelectionImages.DrawPatchNumber(1, this.OptionBoxes[this.OptionSelected].L-3, this.OptionBoxes[this.OptionSelected].T-3);
					this.OptionSelected = this.i;
					this.SelectionImages.DrawPatchNumber(0, this.OptionBoxes[this.OptionSelected].L-3, this.OptionBoxes[this.OptionSelected].T-3);
					this.MainView.ConsoleView.Context.fillStyle = this.Specs.COLOUR;
					this.MainView.ConsoleView.Context.fillRect(0, 0, CONTROlPANEL.WIDTH, 190);;
					this.MainView.ConsoleView.DisplayBestPlayers();
				}
			}
};
FootballLeagueInfoView.prototype.Draw = function() {
	var i;
	var y;
	var name;

	//-basic stats in Info Box (such as ranking, G/D/M/A rating and maybe ranking)
//	SquadView.DisplayTeamInfo();			//TEMP

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour("blue");
	if (Game.CheckMobile()) {
		for (i=0;i<this.Specs.IMAGE.OPTIONS.PATCHES;++i) {
			y = 4 + ((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i);
			this.OptionImages.DrawPatchNumber(i, 4, y);
			this.OptionBoxes[i].Set(4, y, this.Specs.IMAGE.OPTIONS.PATCH.W, this.Specs.IMAGE.OPTIONS.PATCH.H);
			switch (i) {
				case FOOTBALL.TYPE.FEATURED:
					name = StringUtils.InitializeFirstName(Featured[0][2], Featured[0][3], 105, this.Context);
					this.TextWriter.Write("Title: "+name, 95, 20+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					this.TextWriter.Write("League Position: "+Featured[0][4], 95, 37+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					this.TextWriter.Write("Date: "+Featured[0][5], 95, 54+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					break;
				case FOOTBALL.TYPE.DAILY:
					name = StringUtils.InitializeFirstName(Daily[0][2], Daily[0][3], 105, this.Context);
					this.TextWriter.Write("Title: "+name, 95, 20+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					this.TextWriter.Write("League Position: "+Daily[0][4], 95, 37+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					this.TextWriter.Write("Date: "+Daily[0][5], 95, 54+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					break;
				case FOOTBALL.TYPE.WEEKLY:
					name = StringUtils.InitializeFirstName(Weekly[0][2], Weekly[0][3], 105, this.Context);
					this.TextWriter.Write("Title: "+name, 95, 20+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					this.TextWriter.Write("League Position: "+Weekly[0][4], 95, 37+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					this.TextWriter.Write("Date: "+Weekly[0][5], 95, 54+((this.Specs.IMAGE.OPTIONS.PATCH.H+4)*i));
					break;
			}
		}
	}
	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();

	this.DrawSelectionRect();
};
FootballLeagueInfoView.prototype.DrawSelectionRect = function(iOptn) {

	if (iOptn==null)
		iOptn = this.OptionSelected;

	if (iOptn!=this.OptionSelected) {
		this.SelectionImages.DrawPatchNumber(1, this.OptionBoxes[this.OptionSelected].L-3, this.OptionBoxes[this.OptionSelected].T-3);
		this.OptionSelected = iOptn;
	}

	if (Game.CheckMobile())
		this.SelectionImages.DrawPatchNumber(0, this.OptionBoxes[this.OptionSelected].L-3, this.OptionBoxes[this.OptionSelected].T-3);
};
