
//---------------------------------------------
//---------- GENIE FX LIST --------------------  //ISSUE: no need to be indexed now, but maybe in the future?
var GenieFXList = function() {
   var SetArguments, SetLinksArguments, SetExtraLinksArguments;

   var i;
};
GenieFXList.prototype = new GenieList();
GenieFXList.prototype.Set = function(quantity, type, specs, sprite, sSprite, gTool, sRect) {  //NOTE: not calling base classes because of argument setting issue
   var i;

   if (type)
      this.Type = type;

   //Create the list
   for (i=0;i<quantity;++i) {
      element = new this.Type();
      this.push(element);
   }

   //Set the elements
   if (arguments.length>2) {
      this.SetArguments = new Array(arguments.length-2);
      for (i=0;i<this.SetArguments.length;++i)
	 this.SetArguments[i] = arguments[i+2];
   }
   for (i=0;i<quantity;++i)
      if (this.SetArguments)
	 this[i].Set.apply(this[i], this.SetArguments);
      else
	 this[i].Set();

   this.Length = 0;
};
GenieFXList.prototype.SetLinks = function() {
   var i;

   //Store arguments
   this.SetLinksArguments = new Array(arguments.length);
   for (i=0;i<this.SetLinksArguments.length;++i)
      this.SetLinksArguments[i] = arguments[i];

   //Apply links
   for (i=0;i<this.length;++i)
      this[i].SetLinks.apply(this[i], this.SetLinksArguments);
};
GenieFXList.prototype.SetExtraLinks = function() {
   var i;

   //Store arguments
   this.SetExtraLinksArguments = new Array(arguments.length);
   for (i=0;i<this.SetExtraLinksArguments.length;++i)
      this.SetExtraLinksArguments[i] = arguments[i];

   //Apply links
   for (i=0;i<this.length;++i)
      this[i].SetExtraLinks.apply(this[i], this.SetExtraLinksArguments);
};
GenieFXList.prototype.Get = function() {
   var item;

   item = this.GetOpen();
   if (item)
      return (item);

   //Add an item and return it
   item = this.Add();
   return (item);
};
GenieFXList.prototype.GetOpen = function() {  //or, get an unused one
   var i;

   //Check if an open one exists (i.e. not extant)
   for (i=0;i<this.length;++i)
      if (!this[i].CheckExtant()) {
	 if (i>=this.Length)
	    this.Length = i + 1;
	 return (this[i]);
      }
};
GenieFXList.prototype.Add = function() {
   var item;

   item = new this.Type();
   item.Set.apply(item, this.SetArguments);
   if (this.SetLinksArguments)
      item.SetLinks.apply(item, this.SetLinksArguments);
   if (this.SetExtraLinksArguments)
      item.SetExtraLinks.apply(item, this.SetExtraLinksArguments);
   this.push(item);
   ++this.Length;
   return (item);
};
GenieFXList.prototype.Draw = function() {

   for (this.i=0;this.i<this.Length;++this.i)
      if (this[this.i].CheckExtant())
	 if (this[this.i].CheckVisible())
	    this[this.i].Draw();
};
GenieFXList.prototype.Update = function() {

   for (this.i=0;this.i<this.Length;++this.i)
      if (this[this.i].CheckExtant())
	 this[this.i].Update();
};
/*
GenieFXList.prototype = {
   Set(quantity, type) {
      var i;
      var aArray;	//a- arguments

      this.Type = type;
      this.Items = Utilities.CreateArray(quantity, this.Type);
      this.FirstItem = this.Items[0];

      if (arguments.length>2) {  //modification (to array creation) is UNTESTED
	 aArray = new Array(arguments.length-2);
	 for (i=2;i<arguments.length;++i)
//	    aArray.push(arguments[i]);
	    aArray[i-2] = arguments[i];
	 for (i=0;i<quantity;++i)
	    this.Items[i].Set.apply(this.Items[i], aArray);
      }

      aArray = null;
   },
   SetSpecs() {  //UNTESTED - may be REDUNDANT
      this.Items[0].SetSpecs();
   },
   SetFirstItem() {  //UNTESTED

      //UNLOGGED

      this.Items[0].Set.apply(this.Items[0], arguments);
   },
   Add() {
      var item;

      item = new this.Type();
      item.Clone(this.Items[0]);
      this.Items.push(item);
   },
   GetOpen() {  //or Unused
      var i;

      //Check if an open one exists
      for (i=0;i<this.Items.length;++i)
	 if (!this.Items[i].Extant) {
	    this.Items[i].Extant = true;
	    return (this.Items[i]);
	 }

      //Add an item and return it
      this.Add();
      this.Items[i].Extant = true;
      return (this.Items[i]);
   },
   UpdateAll() {
      this.Items.forEach(function(item) {if (item.Extant) item.Update();});
   },
   DeactivateAll() {
      this.Items.forEach(function(item) {item.Extant = false;});
   }
};
*/