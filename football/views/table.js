/*
 ** would also like teams sorted and displayed by salary, cost, quality, attendance/revenue, squad size, average age etc. in addition to having league
	 table showing position - this could be a set of options in TableView
 *
*/
//-------------------------------------------------------
//---------- FOOTBALL TABLE SUB VIEW --------------------
var FootballTableSubView = function() {
	var TableHeadingsImage;
	var Indent, Top, Gap;
};
FootballTableSubView.prototype = new GenieNestedView();
FootballTableSubView.prototype.Set = function(cnvs, specs, mView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, mView);

	if (Game.CheckMobile()) {
		this.Indent = 0;
		this.Top = 0;
		this.Gap = 18;
	} else {
		this.Indent = 400;
		this.Top = 20;
		this.Gap = 25;
	}
};
FootballTableSubView.prototype.SetImages = function() {

	this.TableHeadingsImage = new GenieImage();
	this.TableHeadingsImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.HEADING);
};
FootballTableSubView.prototype.Open = function() {	//REDUNDANT
	GenieNestedView.prototype.Open.call(this);

};
FootballTableSubView.prototype.Update = function() {	//probably REDUNDANT
};
FootballTableSubView.prototype.Draw = function() {

	if (Game.CheckMobile())
		this.ColourScape(null, "rgb(000,159,111)");
	LeagueTable.Sort();
	this.DisplayTable();
};
FootballTableSubView.prototype.DisplayTable = function() {
	var i;
	var style;
	var info;
	var gd;

	//Background and headings
	this.Context.fillStyle = TABLeVIEW.COLOUR.PANEL;
	if (Game.CheckMobile()) {
		this.Context.fillRect(this.Indent+20, this.Top+30, 360, 360);
		this.TableHeadingsImage.Draw(220, 10);
	} else {
		this.Context.fillRect(this.Indent+20, this.Top+30, 360, 500);
		this.TableHeadingsImage.Draw(620, 30);
	}

	//Outlines and text
	style = { COLOUR: TABLeVIEW.COLOUR.TEXT, FONT: "14px Arial bold" };
	for (i=0;i<LEAGUE.TEAMS;++i) {
		this.DrawPanelOutline(this.Indent+20, this.Top+30+(this.Gap*i));
		if (Game.CheckMobile())
			this.Top -= 5;
		this.TextWriter.Write((i+1)+".", this.Indent+30, this.Top+48+(this.Gap*i), style);
		info = ClubNames[LeagueTable.Positions[i].Index] + " " + ClubNickNames[LeagueTable.Positions[i].Index];
		this.TextWriter.Write(info, this.Indent+50, this.Top+48+(this.Gap*i), style);
		this.TextWriter.Write(League.Week, this.Indent+225, this.Top+48+(this.Gap*i), style);
		this.TextWriter.Write(LeagueTable.Positions[i].Record.W, this.Indent+245, this.Top+48+(this.Gap*i), style);
		this.TextWriter.Write(LeagueTable.Positions[i].Record.T, this.Indent+270, this.Top+48+(this.Gap*i), style);
		this.TextWriter.Write(LeagueTable.Positions[i].Record.L, this.Indent+290, this.Top+48+(this.Gap*i), style);
		gd = LeagueTable.Positions[i].GoalsFor - LeagueTable.Positions[i].GoalsAgainst;
		if (gd>0)
			gd = "+" + gd;
		this.TextWriter.Write(gd, this.Indent+310, this.Top+48+(this.Gap*i), style);
		this.TextWriter.Write(LeagueTable.Positions[i].Points, this.Indent+350, this.Top+48+(this.Gap*i), style);  //NOTE: .Points have already been determined
		if (Game.CheckMobile())
			this.Top += 5;
	}
};
FootballTableSubView.prototype.DrawPanelOutline = function(x, y) {  //TODO: this should be handled by a GenieRectangle object

	this.Context.fillStyle = "white";
	this.Context.fillRect(x+360-2, y, 2, this.Gap);		//right edge
	this.Context.fillRect(x, y+this.Gap-2, 360, 2);		//bottom edge
	this.Context.fillStyle = GREY.ASH;
	this.Context.fillRect(x, y, 2, this.Gap);				//left edge
	this.Context.fillRect(x, y, 360, 2);					//top edge
};
