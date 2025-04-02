
/*
 * 1-on-1 fights with super-planes? what circumstances would these occur in? this could be a pretty interesting scenario, such as if two carriers 
	with a modest number of planes face off some distance from each other, one sending one plane and awaiting response, neither knowing what type
	of fighter is on its way (could even be a decoy), turning it into a game of poker
*/
/*
 * DOMINION: champions? these are the upgraded units that emerge after battle (enhanced by Sufists), not the highest priced and most sophisticated
	units in possession, and are challenged by rival champions to a duel over a bounty, it being a total crap-shoot who will win since neither knows
	what quality the other possesses, simply that a power wants to put their accomplished fighter against a rival's, the challenged being allowed to
	either pick their champion, or have one selected randomly; previous idea of having a pack of champions matching up against each other sounds better,
	with match-ups being pre-set to add to poker element, either using AI to determine foe battle order or doing it randomly, both sides needing to be
	over a certain threshold in terms of number of eligible planes to qualify, in the beginning thinking it could be 4 or 6, but 8 would be more consistent
	with rest of the game even it is seems too high
*/
//Have been thinking of this as an aerial duel, but could be expanded to include army units, and navy units only if
// augmentation feature is added to them
//Split screen with a band at the bottom showing carrier/base take off and subsequent progress
//TODO: simultaneous take-off is shown in bottom windows, with close-up if possible in top ones, carriers then receding from
//	view
//Could even switch to a proper, non-split-screen scaled view of distance in bottom window, reducing planes to visible dots,
// perhaps allowing a toggle between that and split-screen view

//-------------------------------------------------------
//---------- DOMINION CHAMPIONS VIEW --------------------
var DominionChampionsView = function() {
	var Screen;
	var InfoBox;
	var GraphicsTool;

	var Frames;
	var Colour;	//TEMP!

	/* TEMPorarily putting in some planes */
	var TomcatFighter;
	var ChallengerFighter;

	var x, r, c;
};
DominionChampionsView.prototype = {
	Set(cntxt, iBox, gTool) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.GraphicsTool = gTool;

		this.Frames = 0;
		this.Colour = "rgb(127,191,255)";  //HARD-CODED!

		/* TEMPorarily putting in some planes */
		this.TomcatFighter = LeftFighters[0];
		this.ChallengerFighter = RightFighters[0];
	},
	DrawFrame() {
		this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, "black", 4);
		this.GraphicsTool.DrawVerticalLine( { X: SCREEN.WIDTH/2, Y: 0 }, SCREEN.HEIGHT, "black", 3);
		this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 3*(SCREEN.HEIGHT/4) }, SCREEN.WIDTH, "black", 3);
	},
	DrawSea() {
		this.Screen.fillStyle = "dodgerblue";
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

		//Draw ellipses
		for (r=0;r<4;++r)
			for (c=0;c<5;++c) {
				this.x = 60+((120*c)-this.Frames);
				if (this.x<444)
					this.GraphicsTool.DrawEllipse(this.x, 60+(120*r), 12, 6, this.Colour, 0);  //left half first row
				this.x += 60;
				if (this.x<444 && r!=3)
					this.GraphicsTool.DrawEllipse(this.x, (120*(r+1)), 12, 6, this.Colour, 0);  //left half second row
				this.x = (120*c)+this.Frames+450;
				if (this.x>456)
					this.GraphicsTool.DrawEllipse(this.x, 60+(120*r), 12, 6, this.Colour, 0);  //right half first row
				this.x -= 60;
				if (this.x>456 && r!=3)
					this.GraphicsTool.DrawEllipse(this.x, (120*(r+1)), 12, 6, this.Colour, 0);  //right half second row
			}

		++this.Frames;
		if (this.Frames==120)
	 this.Frames = 0;
	},
	Play() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		this.DrawSea();
		this.DrawFrame();
	}
};
