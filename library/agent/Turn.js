
GenieAgent.prototype.SetTurning = function() {  //TODO: could double default value if main loop is toggled OR just set it in Specs

	this.Turning = new GenieTurn();
	this.Turning.TurnAngle = this.Specs.TURN || 1;
	this.Turning.Direction = 1;
	this.Turning.Ticks = 0;
	this.Turning.FrameTarget = this.Specs.F;			//NOTE: optional
	this.Turning.Frames = 0;								//NOTE: optional
};
GenieAgent.prototype.ActivateTurn = function(dAngle, nState) {	//d- destination, n- next
	var cAngle, aAngle;	//c- clockwise, a- anti

	//TODO: has to be revised based on CYBER\testing\search.js code
	//TODO: this is only 360deg case - have to add 2/4-form sprite cases, as well as 8-discrete (using frames)
	//		  these 4 turning styles will have to be enumerated - TURN: { STYLE: { BiDIRECTIONAL: 0, CARDINAL: 1, INTErCARDINAL: 2, THREeSIXTY: 3 } }

	this.Turning.NextState = nState;
	this.Turning.DestinationAngle = dAngle;
	if (this.Turning.DestinationAngle==this.Angle) {
		this.State.Motion = this.Turning.NextState;
		return;
	}

	//Determine clockwise or counter-clockwise
	if (this.Turning.DestinationAngle<this.Angle) {
		aAngle = this.Angle - this.Turning.DestinationAngle;
		cAngle = (360-this.Angle) + this.Turning.DestinationAngle;
	} else {
		cAngle = this.Turning.DestinationAngle - this.Angle;
		aAngle = (360-this.Turning.DestinationAngle) + this.Angle;
	}

	//Set turning angle
	if (cAngle<aAngle)
		this.Turning.Increment = this.Turning.TurnAngle;
	else
		this.Turning.Increment = -this.Turning.TurnAngle;
};
GenieAgent.prototype.ExecuteTurn = function() {

	this.Angle += this.Turning.Increment;

	//Check if at destination angle
	if (this.Turning.Increment>0) {
		if (this.Angle>=this.Turning.DestinationAngle) {
	 this.Angle = this.Turning.DestinationAngle;
	 this.State.Motion = this.Turning.NextState;
		}
	} else {
		if (this.Angle<=this.Turning.DestinationAngle) {
	 this.Angle = this.Turning.DestinationAngle;
	 this.State.Motion = this.Turning.NextState;
		}
	}

	this.Angle = GeoUtils.NormalizeAngle(this.Angle);
};
