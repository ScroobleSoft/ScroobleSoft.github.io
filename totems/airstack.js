/*
 *  UNLOGGED
 */
//----------------------------------------------
//---------- TOLL AIR STACK --------------------
var TollAirStack = function() {
};
TollAirStack.prototype = new TollStack();
TollAirStack.prototype.Set = function() {
   TollStack.prototype.Set.call(this);
};
