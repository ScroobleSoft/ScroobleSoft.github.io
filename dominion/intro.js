
//---------------------------------------------
//---------- DOMINION INTRO -------------------
var DominionIntro = function() {
};
DominionIntro.prototype = new GenieIntro();
DominionIntro.prototype.Start = function() {

	this.Screen.fillStyle = PAINT.SKY;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.DrawJets();

	this.ControlPanel.fillStyle = PAINT.SEA;
	this.ControlPanel.fillRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);
	if (!Game.CheckMobile())
		this.SetSlideShows();

	GenieIntro.prototype.Start.call(this);

	this.Play();
};
DominionIntro.prototype.Play = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

	NewsCarousel.Update();
}
DominionIntro.prototype.SetSlideShows = function() {
	var i;

	this.Ticker.fillStyle = "red";
	this.Ticker.fillRect(0, 0, TICKER.WIDTH, TICKER.HEIGHT),
	this.Tabloid.fillStyle = PAINT.SEA;
	this.Tabloid.fillRect(0, 0, TABLOID.WIDTH, TABLOID.HEIGHT),
	NewsCarousel.Show();
	for (i=0;i<IntroInfo.length;++i)
		NewsCarousel.AddEntry(IntroInfo[i][0], IntroInfo[i][1]);
};
DominionIntro.prototype.DrawJets = function() {
	var i;
	var x, y;

	//Power jets
	for (i=0;i<LeftJetSprites.length;++i) {
		LeftJetSprites[i].Shapes.forEach(function(shape){shape.ResetSides(4+i);});
		this.ReColourSprite(LeftJetSprites[i], i);
		x = 213 * ((i % 3)+0.5);
		y = 213 * (Math.floor(i/3)+0.5);
		LeftJetSprites[i].Draw(x, y);
	}

	//Portalite jet
	LeftJetSprites[1].Shapes.forEach(function(shape){shape.ResetSides(3);});
//		this.ReColourSprite(LeftJetSprites[i], i);
	x = 213 * ((i % 3)+0.5);
	y = 213 * (Math.floor(i/3)+0.5);
	LeftJetSprites[1].Draw(x, y);
};
DominionIntro.prototype.ReColourSprite = function(sprite, iPower) {
	var i;

	for (i=0;i<sprite.Shapes.length;++i) {
		if (sprite.Shapes[i].Colour=="grey")
			sprite.Shapes[i].Colour = PowerColours[iPower][0];
		else
			sprite.Shapes[i].Colour = PowerColours[iPower][1];
	}
};
