/*
 *  NOTE: primary purpose is to be used by GenieSpace, and to circumvent garbage collection
 */
//----------------------------------------
//--------- GENIE STACK ------------------
var GenieStack = function() {
   var Last;
   var Type;
   var Indx;		//used for scratch work

   var i;		//scratch variables
};
GenieStack.prototype = new Array();
GenieStack.prototype.Set = function(size, type) {
   var i;
   var node;

   for (i=0;i<size;++i) {
      if (type)
	 this.Type = type;
      else
	 this.Type = StackNode;
      node = new this.Type();
      node.Index = i;
      this.push(node);
   }
   this.Last = -1;
};
GenieStack.prototype.Add = function(asst) {

   this.Indx = this.GetOpen();

   this[this.Last] = num;
   ++this.Last;
   if (this.Last==this.Length)
      this.push(-1);
};
GenieStack.prototype.Clear = function() {

   this.Last = -1;
};
GenieStack.prototype.GetOpen = function() {	//returns index

   for (this.i=0;this.i<=this.Last;++this.i)
      if (this[this.i].Element==null)
	 break;
   if (this.i>this.Last)
      this.Extend();

   return (this[this.i]);
};
GenieStack.prototype.Extend = function() {  //NOTE: doesn't necessarily make the array longer (moves .Last)
   var node;

   ++this.Last;
   if (this.Last==this.length) {
      node = new this.Type();
      node.Index = this.Last;
      this.push(node);
   }
};
