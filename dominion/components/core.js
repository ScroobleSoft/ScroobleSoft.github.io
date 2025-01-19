
DominionComponents.prototype.SetAlliedStates = function() {
	var i, j;
	var iAllied, iColour, sColour;

	AlliedStates.Set(ALLIED.COUNT, DominionAlliedState, INDEXED, this.Randomizer);

	iAllied = 0;
	for (i=0;i<POWER.COUNT;++i) {
		iColour = i;
		for (j=0;j<POWER.SATELLITES;++j) {
			iColour = Utils.SafeIncrement(iColour, POWER.COUNT);
			AlliedStates[iAllied].AssociatedIndex = iColour;
			AlliedStates[iAllied].PrimaryColour = PowerColours[iColour][0];
			if (i==POWER.TOMCAT) {
				sColour = iColour;
				sColour = Utils.SafeIncrement(j, POWER.COUNT, j+1);
				AlliedStates[iAllied].SecondaryIndex = sColour;
				AlliedStates[iAllied].SecondaryColour = PowerColours[sColour][1];
			} else {
				sColour = iColour;
				sColour = Utils.SafeIncrement(sColour, POWER.COUNT, i+1);
				AlliedStates[iAllied].SecondaryIndex = sColour;
				AlliedStates[iAllied].SecondaryColour = PowerColours[sColour][1];
			}
			++iAllied;
		}
	}
};
