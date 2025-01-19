
//--------------------------------------------------
//---------- GAME SPEED SETTING --------------------
var GameSpeedSetting = function() {
	var SelectionImage;
	var Cell;					//numbered starting from 1
};
GameSpeedSetting.prototype = new GenieControl();
GameSpeedSetting.prototype.Set = function(cnvs, specs, pic, sPic) {
	GenieControl.prototype.Set.call(this, cnvs, specs, pic);

	this.SelectionImage = sPic;
};
GameSpeedSetting.prototype.Draw = function() {
	GenieControl.prototype.Draw.call(this);

	//Selector
	if (Game.Speed==0) {
		this.x = this.Specs.CELL.W;
		this.y = this.Specs.CELL.H;
	} else if (Game.Speed<5) {
		this.x = ((GameSpeed-1) % 3)*this.Specs.CELL.W;
		this.y = Math.floor((GameSpeed-1)/3)*this.Specs.CELL.H;
	} else {
		this.x = (GameSpeed % 3)*this.Specs.CELL.W;
		this.y = Math.floor(GameSpeed/3)*this.Specs.CELL.H;
	}
	++this.x;
	++this.y;
	this.SelectionImage.Draw(this.Specs.L+this.x, this.Specs.T+this.y);
};
GameSpeedSetting.prototype.ClickedOn = function() {

	this.Cell = Math.floor((Mouse.Click.Y-this.Specs.T)/this.Specs.CELL.H) * this.Specs.CELL.C;
	this.Cell += Math.floor((Mouse.Click.X-this.Specs.L)/this.Specs.CELL.W);

	//If central cell is clicked, pause game, otherwise correct number if necessary
	if (this.Cell==4) {
		this.Cell = 0;
		Game.Pause();
	} else if (this.Cell<4)
		++this.Cell;

	//Re-draw control if cell switched
	if (this.Cell!=Game.Speed) {
		Game.Speed = this.Cell;
		this.Draw();
	}
};
