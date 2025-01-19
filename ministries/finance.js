
//------------------------------------------------
//---------- FINANCE MINISTRY --------------------
var FinanceMinistry = function() {
};
FinanceMinistry.prototype = new DominionMinistry();
FinanceMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

};
