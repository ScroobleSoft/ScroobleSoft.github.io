
//-------------------------------------------------------
//---------- IMPERIAL SCREEN MANAGER --------------------
var ImperialScreenManager = function() {
	var Context;
};
ImperialScreenManager.prototype = {
	Set(cntxt) {
		this.Context = cntxt;
	},
	SwitchSpriteContext(cntxt) {

		BattlefieldSprites.forEach( function(sprite) {sprite.SetContext(cntxt);} );
	},
	ResetSpriteContext() {
		var cntxt;

		cntxt = this.Context;
		BattlefieldSprites.forEach( function(sprite) {sprite.SetContext(cntxt);} );
	},
	DrawUnit(cntxt, type, drctn, strpy, rgn, pos) {

		this.SwitchSpriteContext(cntxt);

		UnitTypes[type].SetDirection(drctn);
		UnitTypes[type].SetSatrapy(strpy);
		UnitTypes[type].SetRegion(rgn);
		UnitTypes[type].SetPosition(pos);
		UnitTypes[type].Draw();

		this.SwitchSpriteContext(this.Context);
	}
};
