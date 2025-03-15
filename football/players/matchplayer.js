
//-----------------------------------------------------
//---------- FOOTBALL MATCH PLAYER --------------------
var FootballMatchPlayer = function() {
	var Team;
	var Quality;
	var HairColour, Complexion;
};
FootballMatchPlayer.prototype = new GenieAgent();
FootballMatchPlayer.prototype.Set = function(sprite, unit) {
	GenieAgent.prototype.Set.call(this, sprite, unit);

	this.Extant = true;

	//ISSUE: below will only work for Testing::WingPlay because it's only then that 'drctn' is supplied
	if (this.Direction==DIRECTION.E)
		this.Form = { Type: SPRITeFORM.ORIGINAL, Orientation: FLIPPED.FALSE };
	else
		this.Form = { Type: SPRITeFORM.FLIPPED, Orientation: FLIPPED.HORIZONTAL };
	this.Status = STATUS.TRANSFORM.TRANsBUFFER;
};
FootballMatchPlayer.prototype.SetLinks = function(tWriter, rGenerator, tBuffer, sRect) {

	this.TextWriter = tWriter;
	this.Randomizer = rGenerator;
	this.Buffer = tBuffer;
	this.ScreenRect = sRect;
};
FootballMatchPlayer.prototype.Draw = function() {

	if (this.Home) {
		this.ReColour( [ "grey", TeamColours[this.Team.Index][0] ] );
		this.ReColour( [ "darkgrey", TeamColours[this.Team.Index][1] ] );
	} else {
		this.ReColour( [ "grey", TeamColours[this.Team.Index][1] ] );
		this.ReColour( [ "darkgrey", TeamColours[this.Team.Index][0] ] );
	}
	GenieAgent.prototype.Draw.call(this);
	if (this.Home) {
		this.ReColour( [ TeamColours[this.Team.Index][0], "grey" ] );
		this.ReColour( [ TeamColours[this.Team.Index][1], "darkgrey" ] );
	} else {
		this.ReColour( [ TeamColours[this.Team.Index][1], "grey" ] );
		this.ReColour( [ TeamColours[this.Team.Index][0], "darkgrey" ] );
	}

	if (this.Unit) {  //check is TEMP
		strng = this.Unit.Name.Last + " " + Utilities.NumberToGrade(this.Unit.Quality);
		if (this.Home)
	 colour = TeamColours[this.Team.Index][0];
		else
	 colour = TeamColours[this.Team.Index][1];
		this.TextWriter.Write(strng, this.ScreenCoords.X, this.ScreenCoords.Y-this.Sprite.Height-3, { FONT: "10px Arial", COLOUR: colour } );
	}
/*
	if (this.State.Motion==STATE.MOTION.STATIONARY) {
		if (this.Direction==DIRECTION.E)
	 GenieAgent.prototype.Draw.call(this, 0);
		else if (this.Direction==DIRECTION.W)
//	 this.Sprite.DrawFlipped(this.Position.X, this.Position.Y, FLIPPED.HORIZONTAL, 0);
	 GenieAgent.prototype.Draw.call(this, 0);
	} else {
	if (this.Frames<15)
		GenieAgent.prototype.Draw.call(this, 0);
	else if (this.Frames<30)
		GenieAgent.prototype.Draw.call(this, 1);
	else if (this.Frames<45)
		GenieAgent.prototype.Draw.call(this, 0);
	else
		GenieAgent.prototype.Draw.call(this, 2);
	}

	if (this.ScreenRect)
		FootieText.Write(this.Name+" "+Utilities.NumberToGrade(this.Quality), this.Position.X-this.ScreenRect.L, this.Position.Y-this.Sprite.Height-3, { FONT: "10px Arial", COLOUR: "Yellow" } );  //TEMP

	++this.Frames;
	if (this.Frames==60)
		this.Frames = 0;
*/
};
FootballMatchPlayer.prototype.Update = function() {
	GenieAgent.prototype.Update.call(this);

	//UNLOGGED
	
};
FootballMatchPlayer.prototype.TurnAround = function() {  //TEMP

	//UNLOGGED

	if (this.Direction==DIRECTION.E) {
		this.SetDirection(DIRECTION.W);
		this.Form.Type = SPRITeFORM.FLIPPED;
		this.Form.Orientation = FLIPPED.HORIZONTAL;
	} else {
		this.SetDirection(DIRECTION.E);
		this.Form.Type = SPRITeFORM.ORIGINAL;
		this.Form.Orientation = FLIPPED.FALSE;
	}
};
