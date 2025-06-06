
//-----------------------------------------------
//---------- TOLL ARMY STACK --------------------
var TollArmyStack = function() {
};
TollArmyStack.prototype = new TollStack();
TollArmyStack.prototype.Set = function() {
   TollStack.prototype.Set.call(this);
};
