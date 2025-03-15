/*
 *  UNLOGGED: will replace FootballMatchPlayer
 */
//--------------------------------------------
//---------- MATCH PLAYER --------------------
var MatchPlayer = function() {
	var Team;
	var Complexion, HairColour, EyeColour;			//indices
	var ShirtColour, ShortsColour, BootsColour;
	var Status, Stats;									//.Subbed . . . .Fouls
	var Rating;
	var Minutes;
	var Match;
};
MatchPlayer.prototype = new GenieAgent();
MatchPlayer.prototype.Set = function(specs, sprite) {
	GenieAgent.prototype.Set.call(this, specs, sprite);

	this.Extant = true;
	this.Direction = DIRECTION.S;
	this.Minutes = 0;
};
MatchPlayer.prototype.SetLinks = function(tWriter, sRect) {

	this.TextWriter = tWriter;
	this.ScreenRect = sRect;
};
MatchPlayer.prototype.SetTeam = function(team) {

	this.Team = team;
	this.SetColours();
}
MatchPlayer.prototype.SetMatch = function(mtch) {

	this.Match = mtch;
};
MatchPlayer.prototype.SetAppearance = function(aprnc) {

	this.HairColour = BitUtils.GetBits(aprnc, 0, 2);
	this.Complexion = BitUtils.GetBits(aprnc, 3, 5);
};
MatchPlayer.prototype.SetUnit = function(unit) {

	this.Unit = unit;
	this.Complexion = BitUtils.GetBits(this.Unit.Appearance, 2, 0);
	this.HairColour = BitUtils.GetBits(this.Unit.Appearance, 5, 3);
	this.EyeColour = BitUtils.GetBits(this.Unit.Appearance, 8, 6);
}
MatchPlayer.prototype.SetColours = function() {

	if (this.Match) {
		if (this.Team===this.Match.HomeTeam) {
			this.ShirtColour = TeamColours[this.Team.Index][0];
			this.ShortsColour = TeamColours[this.Team.Index][1];
			this.BootsColour = TeamColours[this.Team.Index][2];
		} else {
			this.ShirtColour = TeamColours[this.Team.Index][KitMatchUps[this.Match.HomeTeam.Index][this.Team.Index][0]];
			this.ShortsColour = TeamColours[this.Team.Index][KitMatchUps[this.Match.HomeTeam.Index][this.Team.Index][1]];
			this.BootsColour = TeamColours[this.Team.Index][KitMatchUps[this.Match.HomeTeam.Index][this.Team.Index][2]];
		}
	} else {
		this.ShirtColour = TeamColours[this.Team.Index][0];
		this.ShortsColour = TeamColours[this.Team.Index][1];
		this.BootsColour = TeamColours[this.Team.Index][2];
	}
};
