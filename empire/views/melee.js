/* all UNLOGGED
		This is top-down, with room only for 8 tiles across, so 2 pyramids fit smugly
		Since this can be as much as 80 soldiers against 10, any above 10 are shown in a lower half set of rows as 'reserves,' arranged in single file
		In each file, or rank, ratings are distributed from 1 to 10
		Once one 'line' of soldiers in the pyramid has won it's battle, the soldiers can join the previous line as it steps us, creating an advantage
		The soldiers can be interchanged before the battle begins, but not after
		View opens with ratings already distributed, and for each switch, the opponent gets to make their own switch
*/
//---------------------------------------------------
//---------- IMPERIAL MELEE VIEW --------------------
var ImperialMeleeView = function() {
	var LeftSquad, RightSquad;
};
ImperialMeleeView.prototype = new GenieView();
ImperialMeleeView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
ImperialMeleeView.prototype.SetSquads = function(lSqd, rSqd) {  //UNLOGGED

	this.LeftSquad = lSqd;
	this.RightSquad = rSqd;
};
ImperialMeleeView.prototype.Draw = function() {  //UNLOGGED

	this.DrawField();
};
ImperialMeleeView.prototype.DrawField = function() {  //TODO: tiles will be half the size for MOBILE . . . UNLOGGED
	var c, r;

	for (r=0;r<this.Specs.TILE.R;++r)
		for (c=0;c<this.Specs.TILE.C;++c)
			if (c % r)
				Graphics.DrawRectangle(this.Specs.TILE.W*c, this.Specs.TILE.H*r, this.Specs.TILE.W, this.Specs.TILE.H, BATTLeFIELD.COLOUR.DARK, 0);
			else
				Graphics.DrawRectangle(this.Specs.TILE.W*c, this.Specs.TILE.H*r, this.Specs.TILE.W, this.Specs.TILE.H, BATTLeFIELD.COLOUR.LIGHT, 0);
};
