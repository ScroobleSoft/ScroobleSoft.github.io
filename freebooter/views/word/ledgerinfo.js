
//----------------------------------------------------
//---------- SOLAR LEDGER INFO VIEW ------------------
var SolarLedgerInfoView = function() {
	var Grid;
	var SelectedCell;  //TODO: top-left, to start with
};
SolarLedgerInfoView.prototype = new GenieSubView();
SolarLedgerInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.SetGrid();
};
SolarLedgerInfoView.prototype.SetGrid = function() {  //UNLOGGED
};
