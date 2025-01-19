
//--------------------------------------------------
//---------- DOMINION DAY METER --------------------
var DominionDayMeter = function() {
	var Day;
	var GameSpeed;
	var Frames;
};
DominionDayMeter.prototype = new GenieControl();
DominionDayMeter.prototype.Set = function(cnvs, specs, pic) {
	GenieControl.prototype.Set.call(this, cnvs, specs, pic);

	this.Day = 0;
	this.GameSpeed = 1;
	this.Frames = 0;
};
DominionDayMeter.prototype.SetSpeed = function(spd) {

	//UNLOGGED

	this.GameSpeed = spd;
};
DominionDayMeter.prototype.Draw = function() {

	//UNLOGGED

	GenieControl.prototype.Draw.call(this);

	if (!this.Frames)
		return;

	this.Context.fillStyle = "red";
	if (this.Frames>=168) {
		this.Context.fillRect(this.Specs.L+1, this.Specs.T+1, 168, 23);
		this.Context.fillRect(this.Specs.L+1, this.Specs.T+25, this.Frames-168, 23);
	} else
		this.Context.fillRect(this.Specs.L+1, this.Specs.T+1, this.Frames, 23);
};
DominionDayMeter.prototype.Update = function() {

	//UNLOGGED

	if (!this.GameSpeed)
		return;

	this.Frames += this.GameSpeed;
	if (this.Frames>=336) {
		//-end turn (update fortnight pad) . . . ++Game.Fortnight, this.FortnightPad.Draw()
		this.Frames = 0;
	}
	this.Erase();
	this.Draw();
};
