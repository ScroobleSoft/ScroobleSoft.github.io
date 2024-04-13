
//------------------------------------------------
//----------- GENIE IMAGE MAP --------------------
var GenieImageMap = function () {
   var Map;

   var i;
};
GenieImageMap.prototype = new GenieImage();
GenieImageMap.prototype.Set = function(cntxt, pic, specs, aMap) {  //Specs: { L: -1, T: -1, W: -1, H: -1, X: -1, Y: -1, SLOT: { C: -1, R: -1, W: -1, H: -1 } }
   GenieImage.prototype.Set.call(this, cntxt, pic, specs);

   if (aMap)
      this.Map = aMap;

   //Adjust entry map if position fixed in specs
   if (!(this.Specs.X===undefined) && this.Map)
      this.AdjustEntryMap(this.Specs);
};
GenieImageMap.prototype.AdjustEntryMap = function(coords) {
   var i;

   for (i=0;i<this.Map.length;++i) {
      this.Map[i].L += coords.X;
      this.Map[i].T += coords.Y;
   }
};
GenieImageMap.prototype.AddMapEntry = function(entry) {

   //UNLOGGED - maybe unnecessary

   this.Map.push(entry);
};
GenieImageMap.prototype.GetMapEntry = function(bClicked) {  //return -1 if no entries matched
   var c, r;

   if (this.Map) {
      for (this.i=0;this.i<this.Map.length;++this.i)
	 if (GeoUtils.CheckPointInBox(Mouse.Click, this.Map[this.i]))
	    return (this.i);
   } else {
      c = Math.floor((Mouse.Click.X-this.X)/this.Specs.SLOT.W);
      r = Math.floor((Mouse.Click.Y-this.Y)/this.Specs.SLOT.H);
      return ((r*(this.Specs.SLOT.C))+c);
   }

   return (-1);
};
GenieImageMap.prototype.Draw = function(x, y, scale) {
   GenieImage.prototype.Draw.call(this, x, y, scale);

   //UNLOGGED

   //NOTE: moving image around will give errors

   if (!(x===undefined))
      this.AdjustEntryMap( { X: x, Y: y } );
};
