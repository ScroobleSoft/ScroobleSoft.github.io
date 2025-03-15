
//-------------------------------------------------------------
//---------- FOOTBALL ROTATING BALL BUTTON --------------------
var FootballRotatingBallButton = function() {
	var ColourIndex;
};
FootballRotatingBallButton.prototype = new ImageButton();
FootballRotatingBallButton.prototype.Erase = function() {

	this.Context.fillStyle = TeamColours[this.ColourIndex][0];
	this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
};
