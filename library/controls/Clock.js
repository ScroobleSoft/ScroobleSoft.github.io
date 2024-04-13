/*
 *  2px separation between digits, 4px border around digits; each digit always has 20px width
 *  TODO: right now only set up to display in seconds counting down to 0
 */
//-----------------------------------------
//---------- LED CLOCK --------------------
var LEDClock = function() {
	var Time;
	var Timer;
	var HorizontalLEDImage;
	var VerticalLEDImage;
	var DotLEDImage;

	var i, j, digit;
};
LEDClock.prototype = new GenieControl();
LEDClock.prototype.Set = function(canvas, specs, hImg, vImg) {
	GenieControl.prototype.Set.call(this, canvas, specs);

	this.HorizontalLEDImage = hImg;
	this.VerticalLEDImage = vImg;
};
LEDClock.prototype.SetTime = function(hrs, mins, secs) {

	//UNLOGGED

};
LEDClock.prototype.SetTimer = function(num) {

	//UNLOGGED

	this.Timer = num;
};
LEDClock.prototype.Update = function() {

	//UNLOGGED

	if (this.Specs.DIGITS)
		--this.Timer;
	else {
		//-increment clock
	}
};
LEDClock.prototype.Draw = function() {

	//UNLOGGED

	//Background
/*
	this.GraphicsTool.SwitchContext(this.Context);
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 0);
	this.GraphicsTool.RestoreContext();
*/
	this.Context.fillStyle = "black";
	this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

	//Digits
	if (this.Specs.DIGITS) {	//DIGITS indicates timer, not clock
		for (this.i=this.Specs.DIGITS;this.i>0;--this.i) {
			this.digit = Math.floor(this.Timer/Math.pow(10,this.i-1)) % 10;
			for (this.j=0;this.j<LEDDigits[this.digit].length;++this.j)
				this.DrawLED(4+(22*(this.Specs.DIGITS-this.i)), LEDDigits[this.digit][this.j]);
		}
	} else {
	}
};
LEDClock.prototype.DrawLED = function(pos, led) {

	//TODO: right now only drawing red

	switch (led) {
		case 0:
			this.HorizontalLEDImage.DrawPatchNumber(0, this.Specs.L+pos+3, this.Specs.T+4);
			break;
		case 1:
			this.VerticalLEDImage.DrawPatchNumber(0, this.Specs.L+pos+15, this.Specs.T+7);
			break;
		case 2:
			this.VerticalLEDImage.DrawPatchNumber(0, this.Specs.L+pos+15, this.Specs.T+22);
			break;
		case 3:
			this.HorizontalLEDImage.DrawPatchNumber(0, this.Specs.L+pos+3, this.Specs.T+34);
			break;
		case 4:
			this.VerticalLEDImage.DrawPatchNumber(0, this.Specs.L+pos, this.Specs.T+22);
			break;
		case 5:
			this.VerticalLEDImage.DrawPatchNumber(0, this.Specs.L+pos, this.Specs.T+7);
			break;
		case 6:
			this.HorizontalLEDImage.DrawPatchNumber(0, this.Specs.L+pos+3, this.Specs.T+19);
			break;
	}
};
