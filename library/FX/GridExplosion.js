
//--------------------------------------------
//-------- GRID EXPLOSION --------------------  NOTE: was PROLIFERATING EXPLOSION, also a 'Graphics Tool only' one
var GridExplosion = function() {
   var Colour;
   var OutlineColour;
};
GridExplosion.prototype = new GenieExplosion();
GridExplosion.prototype.Set = function(specs, sprite, gTool) {
   GenieExplosion.prototype.Set.call(this, specs, sprite, gTool);

   this.Colour = this.Specs ? this.Specs.COLOUR : GRIdEXPLOSION.COLOUR;
   this.OutlineColour = this.Specs ? this.Specs.OUTLINeCOLOUR : GRIdEXPLOSION.OUTLINeCOLOUR;
};
GridExplosion.prototype.Activate = function(pos) {
   GenieExplosion.prototype.Activate.call(this, pos);

   this.State = this.Specs ? this.Specs.S : GRIdEXPLOSION.S;
};
GridExplosion.prototype.Update = function() {
   var i, j;
   var size;

   switch (this.State) {
      case 2:
	 size = 8 - (this.Extant/16);
	 break;
      case 1:
	 size = 4 + (this.Extant/16);
	 break;
   }

   for (i=-1;i<2;++i)
      for (j=-1;j<2;++j) {
	 this.GraphicsTool.DrawCircle(this.Position.X+(20*i), this.Position.Y+(20*j), size, this.Colour, 0);
	 this.GraphicsTool.DrawCircle(this.Position.X+(20*i), this.Position.Y+(20*j), size, this.OutlineColour, 2);
      }

   --this.Extant;
   if (!this.Extant) {
      --this.State;
      if (this.State)
	 this.Extant = this.Specs ? this.Specs.F : GRIdEXPLOSION.F;
   }
};
