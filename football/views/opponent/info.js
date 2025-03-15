/*
 *		NOTE: will show the team selected in chosen formation, initials and grades only, plus decals, no sprites
 */
//-----------------------------------------------------------
//---------- FOOTBALL OPPONENT INFO VIEW --------------------
var FootballOpponentInfoView = function() {
	var PositionSlots;
};
FootballOpponentInfoView.prototype = new GenieSubView();
FootballOpponentInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.PositionSlots = ArrayUtils.Create(MATCH.PLAYERS, Coordinate2D);
};
FootballOpponentInfoView.prototype.Draw = function() {
	var i;
	var num;
	var info;

	//Background
	this.Context.fillStyle = PITCH.COLOUR;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

	for (i=0;i<MATCH.PLAYERS;++i) {

		//Decals
		this.GraphicsTool.DrawCircle(this.PositionSlots[i].L, this.PositionSlots[i].T, 15, "rgb(255,255,000)", 0);
		AcronymImages.DrawPatchNumber(Formations[this.MainView.Team.Formation][i], this.PositionSlots[i].L-12, this.PositionSlots[i].T-4);

		//Footballer initials
		info = this.Team.Starters[i].Name.First.toLowerCase();
		num = info.charCodeAt(0) - 97;
		MediumLetterImages.DrawPatchNumber(num, this.PositionSlots[i].L-22, this.PositionSlots[i].T+20);
		info = this.Team.Starters[i].Name.Last.toLowerCase();
		num = info.charCodeAt(0) - 97;
		MediumLetterImages.DrawPatchNumber(num, this.PositionSlots[i].L-12, this.PositionSlots[i].T+20);

		//Grade
		num = Math.floor(this.MainView.Team.Starters[i].Quality/3);
		MediumLetterImages.DrawPatchNumber(num, this.PositionSlots[i].L, this.PositionSlots[i].T+20);
		num = this.MainView.Team.Starters[i].Quality % 3;
		switch (num) {
			case 0:
				PlusImage.Draw(this.HomeSlots[i].L+12, this.HomeSlots[i].T+20);
				break;
			case 2:
				MinusImage.Draw(this.HomeSlots[i].L+12, this.HomeSlots[i].T+20);
				break;
		}
	}
};
FootballOpponentInfoView.prototype.SetPositions = function() {
	var i;

	this.PositionSlots.Set(110, 220);
	for (i=1;i<MATCH.PLAYERS;++i) {
		this.PositionSlots[i].X = 10 + (25*(1+FormationZones[this.MainView.Team.Formation][i][1]));
		this.PositionSlots[i].Y = 240 - (25*(3+FormationZones[this.MainView.Team.Formation][i][0]));
	}
};
