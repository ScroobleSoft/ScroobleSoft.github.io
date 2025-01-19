
//--------------------------------------------------------
//---------- GRIDIRON DRAFT INFO VIEW --------------------
var GridironDraftInfoView = function() {
	var Prospect;
};
GridironDraftInfoView.prototype = new GenieSubView();
GridironDraftInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironDraftInfoView.prototype.Draw = function() {

	if (this.MainView.State>=this.MainView.Specs.STATE.SELECTION) {
		this.DisplayTitle();
		this.DisplayPicks();
		return;
	}

	GenieSubView.prototype.Draw.call(this);
};
GridironDraftInfoView.prototype.DisplayTitle = function() {

	this.ColourScape();
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Selections:", 5, 20, { FONT: "14px Arial", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.RestoreContext();
};
GridironDraftInfoView.prototype.DisplayPicks = function() {
	var i;
	var y;
	var info;
	var val;

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("12px Arial");

	for (i=0;i<this.MainView.PlayerPicks;++i) {
		y = 40 + (16*i);
		this.Prospect = this.MainView.Draft.Picks[i];
		info = (Math.floor(this.MainView.Draft.PickNumbers[i]/LEAGUE.TEAMS)+1) + "." + ((this.MainView.Draft.PickNumbers[i] % LEAGUE.TEAMS)+1);
		this.TextWriter.Write(info, 10, y);																								//pick number
		this.TextWriter.Write(Positions[this.Prospect.Position], 42, y);														//position
		info = { FONT: "10px Arial" };
		this.TextWriter.Write(SubPositions[this.Prospect.Position][this.Prospect.SubPosition], 67, y, info);		//sub-position
		info = this.Prospect.Name.GetFullName();
		if (StringUtils.GetTextWidth(info, null, this.Context)<100)																//name
			this.TextWriter.Write(info, 95, y);
		else {
			info = this.Prospect.Name.First[0] + " ";
			info += this.Prospect.Name.Last;
			this.TextWriter.Write(info, 95, y);
		}
		this.info = Utils.NumberToGrade(this.Prospect.Quality);
		this.TextWriter.Write(this.info, 200, y);																						//quality
		this.TextWriter.Write("+"+this.Prospect.Potential, 220, y);																//potential
		this.TextWriter.Write(GridderTypes[this.Prospect.Type], 245, y);														//types
		info = { FONT: "10px Arial" };
		this.TextWriter.Write(Utils.NumberToGrade(this.Prospect.Value), 285, y, info);									//value
	}

	this.TextWriter.RestoreFont();
	this.TextWriter.RestoreContext();
};
