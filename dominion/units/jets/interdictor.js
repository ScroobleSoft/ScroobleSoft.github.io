/*
 *  UNLOGGED
 */
//----------------------------------------------------
//---------- DOMINION INTERDICTOR --------------------
var DominionInterdictor = function() {
   var Theatre;
   var Landscape;	//pointer to buffer used in some theatres
   var Arsenal, Enhancement, Bonus;

   var Chaffs;
   var Blazebolts;		//ISSUE: not sure yet about Poseidrents and Tempests

   var TinySprite;
   var TacticalPolygon;
   var MiniMapCircle;

   var i, x, y;
};
DominionInterdictor.prototype = new DominionJet();
DominionInterdictor.prototype.Set = function(specs, sprite) {
   DominionJet.prototype.Set.call(this, specs, sprite);

   this.Type = JET.INTERDICTOR;
};
DominionInterdictor.prototype.SetLinks = function(tBuffer, sList) {	//TODO: move to DominionPlane, drop cPad, keep only sList here
   this.RotationBuffer = tBuffer;
   this.TinySprite = sList[0];
/*
   this.TacticalPolygon.Set(this.Sprite.Context, this.CalcPad, { SIDES: 3, SIZE: 12, COLOUR: "grey", LINeW: 0 } );
   this.MiniMapCircle.Set(this.Sprite.Context, { R: 4, COLOUR: "grey", LINeW: 0 } );
*/
};
