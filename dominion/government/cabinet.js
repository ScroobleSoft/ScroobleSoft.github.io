/*
 *  UNLOGGED - should be used in Nation object
 */
//------------------------------------------------
//---------- DOMINION CABINET --------------------
var DominionCabinet = function() {
   var Agriculture;
   var Defence;
   var Energy;
   var Information;	//espionage, internal and external
   var Finance;		//includes taxes, trade, investments, loans/debts etc
   var Foreign;
   var Interior;	//sports, education, health, culture;  maybe even infrastructure; internal politics
   var Science;
};
DominionCabinet.prototype = {
   Set() {

      //Create ministries
      this.Agriculture = new AgricultureMinistry();
      this.Defence = new DefenceMinistry();
      this.Energy = new EnergyMinistry();
      this.Information = new InformationMinistry();
      this.Finance = new FinanceMinistry();
      this.Foreign = new ForeignMinistry();
      this.Interior = new InteriorMinistry();
      this.Science = new ScienceMinistry();

      //Set ministries
      this.Agriculture.Set();
      this.Defence.Set();
      this.Energy.Set();
      this.Information.Set();
      this.Finance.Set();
      this.Foreign.Set();
      this.Interior.Set();
      this.Science.Set();
   }
};
