
//------------------------------------------------
//---------- FOREIGN MINISTRY --------------------
var ForeignMinistry = function() {
   var Investments;
};
ForeignMinistry.prototype = new DominionMinistry();
ForeignMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

   this.Investments = new Array(CITySTATE.COUNT);
};
