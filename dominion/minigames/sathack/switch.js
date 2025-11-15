
//--------------------------------------------------------
//---------- SATELLITE HACKING SWITCH --------------------  UNLOGGED
var SatelliteHackingSwitch = function() {
	var Hacking;
	var BoundingBox;
	var OnFlag;
};
SatelliteHackingSwitch.prototype = {
	Set(hacking) {
		this.Hacking = hacking;
	},
	SetBoundingBox(bSet) {

		this.BoundingBox = new GenieRect();
		switch (bSet) {
			case this.Hacking.TYPE.TOP:
				this.BoundingBox.L = this.Hacking.Specs.SWITCH.TOP.L + (this.Hacking.Specs.SWITCH.GAP*this.Index);
				this.BoundingBox.T = this.Hacking.Specs.SWITCH.TOP.T ;
				break;
			case this.Hacking.TYPE.LEFT: 
				this.BoundingBox.L = this.Hacking.Specs.SWITCH.LEFT.L;
				this.BoundingBox.T = this.Hacking.Specs.SWITCH.LEFT.T + (this.Hacking.Specs.SWITCH.GAP*this.Index);
				break;
		}
		this.BoundingBox.W = this.Hacking.Specs.SWITCH.W;
		this.BoundingBox.H = this.Hacking.Specs.SWITCH.H;
	},
	CheckOn() {

		return (this.OnFlag);
	},
	CheckClicked() {

		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.BoundingBox))
			return (true);
	}
};
