
SolarWordsInfoView.prototype.UpdateClick = function() {
	var iCll;
	var cell;

	if (this.State==VIEW.WORDS.STATE.INTRO)
		return;

	iCll = this.GetCellClicked();
	if (!iCll)
		return;

	//Check if 'bumpers' were clicked
	if ( this.GameType==this.Specs.TYPE.VOWELS || this.GameType==this.Specs.TYPE.CORNERS )
		if ( iCll.Index==6 || iCll.Index==8 || iCll.Index==16 || iCll.Index==18 )
			return;

	this.ClearSelection(this.SelectedCell);
	cell = this.GetCellClicked();
	this.SelectCell(cell);
};
SolarWordsInfoView.prototype.UpdateKeyClick = function(key) {

	switch (this.GameType) {
		case this.Specs.TYPE.LEDGER:
			this.UpdateLedgerKeyClick(key);
			break;
		case this.Specs.TYPE.VOWELS:
		case this.Specs.TYPE.CORNERS:
			this.UpdateGridKeyClick(key);
			break;
		case this.Specs.TYPE.RAKE:
			this.UpdateRakeKeyClick(key);
			break;
	}
};
SolarWordsInfoView.prototype.UpdateJourney = function() {

	this.GraphicsTool.SetContext(this.Context);
	if (Journey.GetDistanceTravelled()<187)		//TODO: with journey complete, this method should not be called
		this.GraphicsTool.DrawRectangle(217, 219, 11, -186*Journey.GetDistanceTravelled(), "red", 0);
	this.GraphicsTool.ResetContext();
};
