
//--------------------------------------------------
//---------- GRIDIRON SCORECARD --------------------
var GridironScorecard = function() {
	var Score, HomeQuarterScores, VisitorQuarterScores;
	var HomeYards, VisitorYards, HomePlays, VisitorPlays;
	var Passing, Running;
};
GridironScorecard.prototype = {
	Set() {
		this.SetData();
	},
	Reset() {

		this.Score.Home = 0;
		this.Score.Visitor = 0;
		this.Passing.Home.Yards = 0;
		this.Passing.Home.Plays = 0;
		this.Passing.Visitor.Yards = 0;
		this.Passing.Visitor.Plays = 0;
		this.Running.Home.Yards = 0;
		this.Running.Home.Plays = 0;
		this.Running.Visitor.Yards = 0;
		this.Running.Visitor.Plays = 0;
	},
	SetData() {

		this.Score = { Home: 0, Visitor: 0 };
		this.HomeQuarterScores = new Array(MATCH.QUARTERS);
		this.VisitorQuarterScores = new Array(MATCH.QUARTERS);
		this.Passing = { Home: { Yards: 0, Plays: 0 }, Visitor: { Yards: 0, Plays: 0 } };
		this.Running = { Home: { Yards: 0, Plays: 0 }, Visitor: { Yards: 0, Plays: 0 } };
	},
	UpdateScore(bHome, points) {

		if (bHome)
			this.Score.Home += points;
		else
			this.Score.Visitor += points;
	}
};
