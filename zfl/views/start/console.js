
//-----------------------------------------------------------
//---------- GRIDIRON START CONSOLE VIEW --------------------
var GridironStartConsoleView = function() {
	var DailyButton, FeaturedButton;
};
GridironStartConsoleView.prototype = new GenieSubView();
GridironStartConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironStartConsoleView.prototype.SetControls = function() {

	this.DailyButton = this.SetImageButton(this.Specs.BUTTON.DAILY, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.FeaturedButton = this.SetImageButton(this.Specs.BUTTON.FEATURED, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
GridironStartConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.FeaturedButton.CheckClicked())
		this.MainView.Close(this.MainView.OpenLeagueView.bind(this), 100);
};
GridironStartConsoleView.prototype.Draw = function() {

	Text.SetContext(this.Context);
	Graphics.SetContext(this.Context);

	var DailyIndex = 0;		//TEMP
	var FeaturedIndex = 0;		//TEMP

	//Daily
	Text.Write("Title: ", 4, 15);
	Text.Write(Daily[DailyIndex][1], 64, 15);
	Text.Write("Record: ", 4, 30);
	Text.Write(Daily[FeaturedIndex][2][0]+"-"+Daily[FeaturedIndex][2][1]+"-"+Daily[FeaturedIndex][2][2], 64, 30);
	Text.Write("Pluses: ", 4, 45);
	Text.Write(Daily[DailyIndex][3], 64, 45);
	Text.Write("Minuses: ", 4, 60);
	Text.Write(Daily[DailyIndex][4], 64, 60);
	Text.Write("Date: ", 4, 75);
	Text.Write(Daily[DailyIndex][5], 64, 75);
	Graphics.DrawBasReliefSection(1, 1, CONTROlPANEL.WIDTH-4, (CONTROlPANEL.HEIGHT/2)-2);

	//Featured
	Text.Write("Title:", 4, 135);
	Text.Write(Daily[FeaturedIndex][1], 64, 135);
	Text.Write("Record:", 4, 150);
	Text.Write(Daily[FeaturedIndex][2][0]+"-"+Daily[FeaturedIndex][2][1]+"-"+Daily[FeaturedIndex][2][2], 64, 150);
	Text.Write("Pluses:", 4, 165);
	Text.Write(Daily[FeaturedIndex][3], 64, 165);
	Text.Write("Minuses:", 4, 180);
	Text.Write(Daily[FeaturedIndex][4], 64, 180);
	Text.Write("Date:", 4, 195);
	Text.Write(Daily[FeaturedIndex][5], 64, 195);
	Graphics.DrawBasReliefSection(1, CONTROlPANEL.HEIGHT/2, CONTROlPANEL.WIDTH-4, (CONTROlPANEL.HEIGHT/2)-2);

	Graphics.ResetContext();
	Text.ResetContext();
};
