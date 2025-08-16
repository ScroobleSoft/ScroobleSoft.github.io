
//-------------------------------------------------
//---------- DOMINION MINISTRY --------------------
var DominionMinistry = function() {
   var Cabinet;
   var Minister;
   var Level;
   var Inventory, LiquidateFlag;   //e.g. energy (untapped resources), food (granary equivalent)
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
	GetIncome() {

		return (0);  //TEMP
	}
};
