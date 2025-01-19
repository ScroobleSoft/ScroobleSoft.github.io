/*
 *  TODO: Info Box should display a preview of units in action related to whatever the mouse is hovering over
 *		** find some use for Console View
 */
//-----------------------------------------------------
//---------- DOMINION MISSION VIEW --------------------
var DominionMissionView = function() {
	var Missionary, Recipient;
	var PushButtons;
	var LabelImages, EdgeImages;
	var LabelLocations;
	var MissionIndex;

	var i;
};
DominionMissionView.prototype = new GenieView();
DominionMissionView.prototype.Set = function(cnvs, specs) {

	this.LabelLocations = ArrayUtils.Create(VIEW.MISSION.PUShBUTTON.MISSION.COUNT, Coordinate2D);

	GenieView.prototype.Set.call(this, cnvs, specs);
};
DominionMissionView.prototype.SetImages = function() {

	this.LabelImages = new GenieImage();
	this.LabelImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABEL);
	this.EdgeImages = new GenieImage();
	this.EdgeImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.EDGE);
};
DominionMissionView.prototype.SetControls = function() {
	var i;
	var x, y, l, t;
	var specs, iSpecs;
	var img;
	var xGap, yGap;

	this.PushButtons = new Array(this.Specs.PUShBUTTON.MISSION.COUNT);
	xGap = Math.round((SCREEN.WIDTH-(2*this.Specs.PUShBUTTON.MISSION.W))/3);
	yGap = Math.round((SCREEN.HEIGHT-(4*this.Specs.PUShBUTTON.MISSION.H))/5);
	for (i=0;i<this.Specs.PUShBUTTON.MISSION.COUNT;++i) {
		if (i % 2)
			x = (2*xGap) + this.Specs.PUShBUTTON.MISSION.W;
		else
			x = xGap;
		y = this.Specs.PUShBUTTON.MISSION.H + ((this.Specs.PUShBUTTON.MISSION.H+yGap)*Math.floor(i/2));
		l = this.Specs.PUShBUTTON.MISSION.IMAGE.L + ((i % 4)*(this.Specs.PUShBUTTON.MISSION.IMAGE.W+this.Specs.PUShBUTTON.MISSION.IMAGE.O));
		t = this.Specs.PUShBUTTON.MISSION.IMAGE.T + (Math.floor(i/4)*(this.Specs.PUShBUTTON.MISSION.IMAGE.H+this.Specs.PUShBUTTON.MISSION.IMAGE.O));
		specs = { L: x, T: y-5, W: this.Specs.PUShBUTTON.MISSION.W, H: this.Specs.PUShBUTTON.MISSION.H, LW: this.Specs.PUShBUTTON.MISSION.LW };
		specs.BACKGROUND = this.Specs.PUShBUTTON.MISSION.BACKGROUND;
		iSpecs = { L: l, T: t, W: this.Specs.PUShBUTTON.MISSION.IMAGE.W, H: this.Specs.PUShBUTTON.MISSION.IMAGE.H };
		img = new GenieImage();
		img.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], iSpecs);
		this.PushButtons[i] = new GeniePushButton();
		this.PushButtons[i].Set(this.Canvas, specs, img);
		this.PushButtons[i].SetEdgePics(this.EdgeImages);
		this.Controls.push(this.PushButtons[i]);
		this.LabelLocations[i].Set(x-14, y+this.Specs.PUShBUTTON.MISSION.H);
	}
};
DominionMissionView.prototype.SetNations = function(msnry, rcpnt) {  //UNLOGGED

	this.Missionary = msnry;
	this.Recipient = rcpnt;
};
DominionMissionView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);
/*
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, PAINT.NAVY, 4);
	MissionsImage.Draw();
	AllianceCancelButton.Show();
*/
	this.Update();
};
DominionMissionView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));
/*
	this.DrawSelections();

	if (AllianceCancelButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Close();
		BoardView.Open();
	}

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		if (Mouse.X>MISSIONsIMAGE.X && Mouse.X<(MISSIONsIMAGE.X+MISSIONsIMAGE.W) && Mouse.Y>MISSIONsIMAGE.Y && Mouse.Y<(MISSIONsIMAGE.Y+MISSIONsIMAGE.H)) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Close();
	 this.LaunchMission();
		}
	}
*/
	for (this.i=0;this.i<this.PushButtons.length;++this.i)
		if (this.PushButtons[this.i].CheckPressed()) {
			this.MissionIndex = this.i;
			setTimeout(this.LaunchMission.bind(this), 100);
			return;
		}
};
DominionMissionView.prototype.Draw = function() {
	var i;

	for (i=0;i<this.Specs.PUShBUTTON.MISSION.COUNT;++i)
		this.LabelImages.DrawPatchNumber(i, this.LabelLocations[i].X, this.LabelLocations[i].Y);
};
DominionMissionView.prototype.LaunchMission = function() {

	//UNLOGGED

	this.Close();
	switch (this.MissionIndex) {
		case MISSION.SABOTAGE:
			alert("Not implemented.");
			break;
		case MISSION.AIrMISSION:

		//TEMP
		var lSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];
		var rSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];
		//TEMP

		AirMissionView.SetNations(Powers[POWER.TOMCAT], Powers[POWER.HORNET]);
		AirMissionView.SetSquadrons(lSqdrn, rSqdrn);
		AirMissionView.DrawFrame();
		AirMissionView.DrawInfoBox();
		AirMissionView.DrawJets();

			break;
		case MISSION.CHAMPIONS:
			alert("Not implemented.");
			break;
		case MISSION.BLOCKADE:
			alert("Not implemented.");
			break;
		case MISSION.INTERDICTION:
			alert("Not implemented.");
			break;
		case MISSION.ICBM:
			alert("Not implemented.");
			break;
		case MISSION.DOGFIGHT:
			alert("Not implemented.");
			break;
		case MISSION.HUNTING:
			alert("Not implemented.");
			break;
	}
};
