
//--------------------------------------------
//---------- DOMINION UNIT -------------------		//NOTE: LOGGED this despite replicas present in Old Dominion
var DominionUnit = function() {
   var Nation;
   var Type;		//TODO: may not belong in base class
   var PrimaryIndex, SecondaryIndex;
};
DominionUnit.prototype = new GenieAgent();
DominionUnit.prototype.Set = function(specs, sprite, drctn) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   this.Direction = drctn;
};
DominionUnit.prototype.SetUnit = function(unit) {

   //UNLOGGED - pretty sure this method will be needed

   this.Unit = unit;
};
DominionUnit.prototype.SetLinks = function(iBox, cPanel, gTool, cPad) {

   this.InfoBox = iBox;
   this.ControlPanel = cPanel;
   this.GraphicsTool = gTool;
   this.CalcPad = cPad;
};
DominionUnit.prototype.SetNation = function(nation) {

   this.Nation = nation;
   this.PrimaryIndex = DominionUtils.GetBitmapIndex(this.Nation);
   this.SecondaryIndex = DominionUtils.GetSecondaryIndex(this.Nation);
};
