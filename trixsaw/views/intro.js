
//--------------------------------------------------
//---------- TRIXSAW INTRO VIEW --------------------
var TrixsawIntroView = function() {
	/* all UNLOGGED
	var DailyDate;
	var DailyButton, RandomButton, GuideButton;																		//open page
	var GameRadioOption, PastGamesFlag, GameInfo;																	//start page
	var PastGameDate, SelectedSlot, StartingSlot, EndingSlot, PastGameIndex, FirstDayIndex;			//past page
	*/
};
TrixsawIntroView.prototype = new GenieView();
TrixsawIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

//	this.State = this.Specs.STATE.OPEN;
//	this.InfoCount = 0;
};
TrixsawIntroView.prototype.Draw = function() {  //UNLOGGED
	var x, y;

	PuzzleImage.Draw();

	Graphics.Set(SawScape.Screen, SawScape.InfoBox, SawScape.ControlPanel);		//TEMP

	this.Context.globalAlpha = 0.5;

	for (x=0;x<SCREEN.WIDTH;x+=CrossImage.Specs.W)
		for (y=0;y<SCREEN.HEIGHT;y+=CrossImage.Specs.H)
			CrossImage.Draw(x, y);

	for (x=60.5;x<SCREEN.WIDTH;x+=CrossImage.Specs.W)
		Graphics.DrawVerticalLine( { X: x, Y: 0 }, SCREEN.HEIGHT, "white", 1 );

	for (y=60.5;y<SCREEN.HEIGHT;y+=CrossImage.Specs.H)
		Graphics.DrawHorizontalLine( { X: 0, Y: y }, SCREEN.WIDTH, "white", 1 );

	this.Context.globalAlpha = 1.0;
};
