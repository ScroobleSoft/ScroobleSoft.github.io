
//-------------------------------------------------
//---------- DOMINION MINISTRY --------------------
var DominionMinistry = function() {
   var Cabinet;
	var Id;
   var Minister;
   var Level;
   var Inventory, Revenue;
	var LiquidateFlag;   //e.g. energy (untapped resources), food (granary equivalent)
};
DominionMinistry.prototype = {
   Set(cabinet) {
      this.Cabinet = cabinet;
      this.Level = 1;
      this.Inventory = 0;
		this.LiquidateFlag = false;
		this.SetMinister();
   },
	SetMinister() {

		this.Minister = new DominionCharacter();
		this.Minister.Set();
	},
	GetFortnightlyRevenue() {

		this.Revenue = this.Cabinet.Nation.GetFortnightlyRevenue() * (this.Cabinet.SurplusPercentages[this.Id]/100);
		this.Revenue /=  MINISTRY.PORTFOLIOS;

		return (Math.round(this.Revenue));
	}
};
