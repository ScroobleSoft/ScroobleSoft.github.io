/*
 *		TODO: the usual help/guide options
 *		TODO: actually, apart from buttons and controls mentioned in info.js, there will be a welome statement, and a 'Start' button
 *		this is good - player can immediately play the arcade version, then start the strategy game
 */
//-----------------------------------------------------------
//---------- GRIDIRON INTRO CONSOLE VIEW --------------------
var GridironIntroConsoleView = function() {
	var DailyButton, FeaturedButton, NewGameButton;
};
GridironIntroConsoleView.prototype = new GenieSubView();
GridironIntroConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironIntroConsoleView.prototype.SetControls = function() {

	this.DailyButton = this.SetImageButton(this.Specs.BUTTON.DAILY, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.FeaturedButton = this.SetImageButton(this.Specs.BUTTON.FEATURED, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.NewGameButton = this.SetImageButton(this.Specs.BUTTON.NEW, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
GridironIntroConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.NewGameButton.Disable();
	this.DailyButton.Disable();
};
GridironIntroConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.NewGameButton.CheckClicked()) {}  //random

	if (this.DailyButton.CheckClicked()) {}

	if (this.FeaturedButton.CheckClicked())
		this.MainView.Close(this.MainView.OpenLeagueView.bind(this), 100);
};
GridironIntroConsoleView.prototype.Draw = function() {

	Text.SetContext(this.Context);
	Graphics.SetContext(this.Context);

	var DailyIndex = 0;		//TEMP
	var FeaturedIndex = 0;		//TEMP

	//Daily
	Text.Write("Title: ", 4, 55);
	Text.Write(Daily[DailyIndex][1], 64, 55);
	Text.Write("Record: ", 4, 70);
	Text.Write(Daily[FeaturedIndex][2][0]+"-"+Daily[FeaturedIndex][2][1]+"-"+Daily[FeaturedIndex][2][2], 64, 70);
	Text.Write("Pluses: ", 4, 85);
	Text.Write(Daily[DailyIndex][3], 64, 85);
	Text.Write("Minuses: ", 4, 100);
	Text.Write(Daily[DailyIndex][4], 64, 100);
	Text.Write("Date: ", 4, 115);
	Text.Write(Daily[DailyIndex][5], 9, 131);
	Graphics.DrawBasReliefSection(1, 41, CONTROlPANEL.WIDTH-4, 98);

	//Featured
	Text.Write("Title:", 4, 155);
	Text.Write(Daily[FeaturedIndex][1], 64, 155);
	Text.Write("Record:", 4, 170);
	Text.Write(Daily[FeaturedIndex][2][0]+"-"+Daily[FeaturedIndex][2][1]+"-"+Daily[FeaturedIndex][2][2], 64, 170);
	Text.Write("Pluses:", 4, 185);
	Text.Write(Daily[FeaturedIndex][3], 64, 185);
	Text.Write("Minuses:", 4, 200);
	Text.Write(Daily[FeaturedIndex][4], 64, 200);
	Text.Write("Date:", 4, 215);
	Text.Write(Daily[FeaturedIndex][5], 9, 231);
	Graphics.DrawBasReliefSection(1, 140, CONTROlPANEL.WIDTH-4, 98);

	Graphics.ResetContext();
	Text.ResetContext();
};
/*
GridironIntroConsoleView.prototype.DisplayPoints = function() {  //UNLOGGED

	//-top section will display points, play results, plays run, drives completed etc.

	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(173, 220, 25, 15, this.Specs.COLOUR, 0);
	Graphics.ResetContext();

	Text.Write(this.Points, 175, 230);
};
*/
