
//----------------------------------------
//---------- ZFL PLAY --------------------
var ZFLPlay = function() {
   var Randomizer;
   var State;				// PReSNAP, ACTIVE, COMPLETE (NOTE: some OFF's will have shifting too)
   var FormationOFF, FormationDEF;
   var Outcome;				//yards (+ve or -ve due to sack/TOF/penalty); also, turnovers need to be accounted for
};
ZFLPlay.prototype = {
   Set(rGenerator) {
      this.Randomizer = rGenerator;
      this.FormationOFF = FORMATION.OFF.IfORM;
      this.FormationDEF = FORMATION.DEF.MM43;
   },
   SetFormations(off, def) {

      //UNLOGGED

      this.FormationOFF = off;
      this.FormationDEF = def;

      //position types and locations may be set here
   },
   Update() {
   }
};
