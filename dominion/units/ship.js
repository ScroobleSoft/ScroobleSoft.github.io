/*
 *  UNLOGGED
 */
//---------------------------------------------
//---------- DOMINION SHIP --------------------
var DominionShip = function() {
   var Type;
   var Arsenal, Hardpoints;		//both fields are bit-packed, the latter is needed to manage fuselage display
   var PrimaryColour, SecondaryColour;
   var BowIndex;

   var dstntn;	//scratch variables
};
DominionShip.prototype = new DominionUnit();
DominionShip.prototype.Set = function(specs, sprite, drctn) {
   DominionUnit.prototype.Set.call(this, specs, sprite);

   this.Direction = drctn;

   this.dstntn = new Coordinate2D();
};
DominionShip.prototype.SetNation = function(nation) {	//TODO: at the moment, this applies only to powers
   DominionUnit.prototype.SetNation.call(this, nation);

   this.PrimaryColour = DominionUtils.GetPrimaryColour(this.Nation);
   this.SecondaryColour = DominionUtils.GetSecondaryColour(this.Nation);
   this.SetBowIndex();
};
DominionShip.prototype.SetBowIndex = function() {

   switch (this.Nation.Type) {
      case NATION.POWER:
	 this.BowIndex = this.Nation.Index;
	 break;
      case NATION.POWER:
	 this.BowIndex = this.Allied.Index % POWER.SATELLITES;
	 break;
      case NATION.CITySTATE:
	 this.BowIndex = this.Nation.Index + 9;
	 break;
      default:
	 this.BowIndex = 9;
	 break;
   }
};
DominionShip.prototype.Draw = function() {

   //UNLOGGED

   this.ReColour();
   this.DrawBows();

   DominionUnit.prototype.Draw.call(this);

   //-draw helicopter?
};
DominionShip.prototype.DrawBows = function() {	//TODO: ScreenCoords need to be determined

   //Left
   this.x = this.ScreenCoords.X + SHIP.BOwOFFSET.L.X;
   this.y = this.ScreenCoords.Y + SHIP.BOwOFFSET.L.Y;
   ShipBowSprite.Draw(this.x, this.y, 2*this.BowIndex);

   //Right
   this.x = this.ScreenCoords.X + SHIP.BOwOFFSET.R.X + (12*this.Type);
   this.y = this.ScreenCoords.Y + SHIP.BOwOFFSET.R.Y;
   ShipBowSprite.Draw(this.x, this.y, (2*this.BowIndex)+1);
};
DominionShip.prototype.ReColour = function() {

   //LOGGED

   this.Specs.GS[0].Colour = this.PrimaryColour;
   for (this.i=1;this.i<this.Specs.GS.length;++this.i)
      this.Specs.GS[this.i].Colour = this.SecondaryColour;
};
