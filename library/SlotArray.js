
//------------------------------------------
//---------- SLOT ARRAY --------------------
//var SlotArray = new function() {
function SlotArray() {
   var Index;
   var Sum;
};
SlotArray.prototype = new Array();
SlotArray.prototype.GetSlot = function(val) {
   this.Sum = 0;
   for (this.Index=0;this.Index<this.length;++this.Index) {
      this.Sum += this[this.Index];
      if (val<this.Sum)
	 break;
   }

   return (this.Index);
};
