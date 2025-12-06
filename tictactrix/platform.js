
//-------------------------------------------------
//---------- TACTICAL PLATFORM --------------------
var TacticalPlatform = function() {
	var Clan;
	var Tile;
	var ContentsVisibleFlag;
	var TurnsLeft;
};
TacticalPlatform.prototype = {
	Set() {
	},
	SetClan(clan) {

		this.Clan = clan;
		this.TurnsLeft = PLATFORM.PRODUCTION.TURNS;
	},
	SetTile(tile) {

		this.Tile = tile;
		this.Tile.Platform = this;
	},
	CheckOnScreen() {

		if ( this.Tile.C<TopLeftTile.C || this.Tile.C>=(TopLeftTile.C+VIEW.PLAY.TILE.C) )
			return (false);
		if ( this.Tile.R<TopLeftTile.R || this.Tile.R>=(TopLeftTile.R+VIEW.PLAY.TILE.R) )
			return (false);

		return (true);
	},
	Update() {  //UNLOGGED

		--this.TurnsLeft;
		if (!this.TurnsLeft) {
			this.ProduceUnit();
			this.TurnsLeft = PLATFORM.PRODUCTION.TURNS;
		}
	},
	Draw() {
		var x, y;
		var iCln;

		x = MAP.TILE.W * (this.Tile.C-TopLeftTile.C);
		y = MAP.TILE.H * (this.Tile.R-TopLeftTile.R);
		iCln = this.Clan ? this.Clan.Index : CLAN.NEUTRAL;
		PlatformImages.DrawPatchNumber(iCln, x, y);
	},
	MiniDraw() {  //currently REDUNDANT
		var x, y;
		var iCln;

		x = VIEW.MAP.TILE.W * (this.Tile.C+0.5);
		y = VIEW.MAP.TILE.H * (this.Tile.R+0.5);
		iCln = this.Clan ? this.Clan.Index : CLAN.NEUTRAL;
		Graphics.DrawDiamond(x, y, VIEW.MAP.TILE.W/2, ClanColours[iCln][0], 0);
		Graphics.DrawDiamond(x, y, VIEW.MAP.TILE.W/2, ClanColours[iCln][1], 2);
	},
	ProduceUnit() {  //UNLOGGED
	}
};
