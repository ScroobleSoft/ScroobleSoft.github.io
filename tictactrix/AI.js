
//-------------------------------------------
//---------- TACTICAL AI --------------------  //UNLOGGED - actually, only one method mean can move to game object
var TacticalAI = function() {
};
TacticalAI.prototype = {
	Set() {
	},
	ExecuteTurns() {  //have a random order for rivals every turn
		var i;
		var aTurn;

		aTurn = new Array(CLAN.COUNT);
		Randomizer.Shuffle(aTurn, INITIALIZE);
		for (i=0;i<CLAN.COUNT;++i)
			if (aTurn[i]==PlayerClanIndex)
				continue;
			else
				Clans[aTurn[i]].ExecuteTurn();
	}
};
