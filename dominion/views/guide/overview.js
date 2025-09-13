
DominionGuideView.prototype.DisplayOverview = function() {  //UNLOGGED

	this.TextWriter.SetColour(DOMINION.COLOUR.LINK);

	this.TextWriter.Write("Overview", 170, 20, { FONT: "bold 18px Arial" } );

	switch (this.PageNo) {
		case 0:
			this.DisplayOverview0();
			break;
		case 1:
			this.DisplayOverview1();
			break;
		case 2:
			this.DisplayOverview2();
			break;
	}

	this.TextWriter.ResetColour();
};
DominionGuideView.prototype.DisplayOverview = function() {  //UNLOGGED

	this.TextWriter.Write("     A habitable planet is discovered and colonized by the", 10, 40);
	this.TextWriter.Write("Dominion Corporation by terraforming the surface in an", 10, 57);
	this.TextWriter.Write("octagonal pattern. Starting out as a mining outpost, the", 10, 74);
	this.TextWriter.Write("colony has seen entire populations settle down and", 10, 91);
	this.TextWriter.Write("coalesce into nations with their own culture and political", 10, 108);
	this.TextWriter.Write("systems.", 10, 125);

	this.GuideImage.DrawPatch(235, 115, 2, 2, 160, 160);
	this.TextWriter.Write("     There are 9 continents, each", 10, 152);
	this.TextWriter.Write("with a central nation - a 'Power,' -", 10, 169);
	this.TextWriter.Write("with 8 surrounding 'satellite'", 10, 186);
	this.TextWriter.Write("countries, referred to as 'Allied", 10, 203);
	this.TextWriter.Write("States.' In addition, there are", 10, 220);
	this.TextWriter.Write("20 'City-States' organized in 4", 10, 237);
	this.TextWriter.Write("archipelagoes located in the", 10, 254);
	this.TextWriter.Write("corners of the map.", 10, 271);

	this.TextWriter.Write("     DomCorp (Dominion Corporation) discovered a valuable", 10, 297);
	this.TextWriter.Write("substance, christened Lavenoil, and encouraged competition", 10, 314);
	this.TextWriter.Write("between mining contractors to engender the most efficient", 10, 331);
	this.TextWriter.Write("and prolific manner of extraction. It has now decided to", 10, 348);
	this.TextWriter.Write("relinquish administration of the colony.", 10, 365);
};
DominionGuideView.prototype.DisplayOverview0 = function() {  //UNLOGGED

//	this.TextWriter.Write("relinquish administration of the colony to whichever nation proves", 10, 365);
//	this.TextWriter.Write("worthy of maintaining order, and guaranteeing a continuous", 10, 382);
//	this.TextWriter.Write("supply of valuable Lavenoil.", 10, 399);
};
DominionGuideView.prototype.DisplayOverview1 = function() {  //UNLOGGED
};
DominionGuideView.prototype.DisplayOverview3 = function() {  //UNLOGGED
};
