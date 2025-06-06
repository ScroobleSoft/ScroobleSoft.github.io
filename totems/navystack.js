
//-----------------------------------------------
//---------- TOLL NAVY STACK --------------------
var TollNavyStack = function() {
};
TollNavyStack.prototype = new TollStack();
TollNavyStack.prototype.Set = function() {
   TollStack.prototype.Set.call(this);
};
