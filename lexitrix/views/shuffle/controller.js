
GenieShuffleView.prototype.UpdateController = function() {

	switch (this.State) {
		case this.Specs.STATE.CONTROLLER.INACTIVE:
			if (MobileController.CheckClicked())
				this.State = this.Specs.STATE.CONTROLLER.SELECTED;
			break;
		case this.Specs.STATE.CONTROLLER.CLICKED:
			this.UpdateControllerTile();
			if (MobileController.KeyClicked==4) {
				this.State = this.Specs.STATE.CONTROLLER.TRANSFERRING;
				this.FirstTile.Set(this.ControllerTile.C, this.ControllerTile.R);
			} else {
				this.Board.Draw();
				this.DrawControllerSelector();
			}
			break;
		case this.Specs.STATE.CONTROLLER.TRANSFERRING:
			this.Board.Draw();
			this.DrawControllerSelector();
			this.DrawTransferringTile();
			this.UpdateControllerTile();
			if (MobileController.KeyClicked==4) {
				if (this.ControllerTile.C==this.FirstTile.C && this.ControllerTile.R==this.FirstTile.R) {
					this.Board.Draw();
					this.DrawControllerSelector();
					this.State = this.Specs.STATE.CONTROLLER.INACTIVE;
				} else {
					this.SecondTile.Set(this.ControllerTile.C, this.ControllerTile.R);
					this.State = this.Specs.STATE.CONTROLLER.SWITCH;
				}
			}
			break;
		case this.Specs.STATE.CONTROLLER.SWITCH:
			this.SwapTiles(this.FirstTile, this.SecondTile);
			this.State = this.Specs.STATE.CONTROLLER.INACTIVE;
			break;
	}
};
GenieShuffleView.prototype.ExpandInterface = function() {

	//UNLOGGED

};
GenieShuffleView.prototype.ActivateController = function() {

	//UNLOGGED

	this.ControllerFlag = true;
//	this.ControllerButton.ReLabel("");
	//-erase play area and re-open view
};
GenieShuffleView.prototype.DeactivateController = function() {

	//UNLOGGED

	this.ControllerFlag = false;
	//-erase play area and re-open view
};
GenieShuffleView.prototype.UpdateControllerTile = function() {

	this.ControllerTile.C += this.ControllerOffsets[MobileController.KeyClicked][0];
	this.ControllerTile.R += this.ControllerOffsets[MobileController.KeyClicked][1];
	if (this.ControllerTile.C<0) this.ControllerTile.C = 0;
	if (this.ControllerTile.C==this.Specs.BOARD.TILE.C) --this.ControllerTile.C;
	if (this.ControllerTile.R<0) this.ControllerTile.R = 0;
	if (this.ControllerTile.R==this.Specs.BOARD.TILE.R) --this.ControllerTile.R;
};
GenieShuffleView.prototype.DrawControllerSelector = function() {

	this.x = this.Left + this.Specs.BOARD.L + (this.Specs.BOARD.TILE.W*this.ControllerTile.C);
	this.y = this.Top + this.Specs.BOARD.T + (this.Specs.BOARD.TILE.H*this.ControllerTile.R);
	this.GraphicsTool.DrawRectangle(this.x, this.y, this.Specs.BOARD.TILE.C, this.Specs.BOARD.TILE.R, 3, "red");
};
GenieShuffleView.prototype.DrawTransferringTile = function() {

	this.Context.globalAlpha = 0.5;
	if (this.ControllerTile.C==0 || this.ControllerTile.C==(this.Specs.BOARD.TILE.C-1) || this.ControllerTile.R==0 || this.ControllerTile.R==(this.Specs.BOARD.TILE.R-1))
		this.Context.fillStyle = this.Specs.BOARD.TILE.COLOUR.OUTER;
	else
		this.Context.fillStyle = this.Specs.BOARD.TILE.COLOUR.INNER;
   this.letter = this.Board.Alphabet.indexOf(this.FirstTile.Letter);
	this.x = this.Indent + this.Specs.BOARD.L + ((this.Specs.BOARD.TILE.W+0.5)*this.ControllerTile.C);
	this.y = this.Specs.BOARD.T + ((this.Specs.BOARD.TILE.H+0.5)*this.ControllerTile.R);
	this.Context.fillRect(this.x, this.y, this.Specs.BOARD.TILE.W, this.Specs.BOARD.TILE.H);
	ShuffleLetterImages.DrawPatchNumber(this.letter, this.x+6, this.y+2);
	this.Context.globalAlpha = 1.0;
};
