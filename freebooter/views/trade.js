
//------------------------------------------------
//---------- SOLAR TRADE VIEW --------------------
var SolarTradeView = function() {
	var Planet, Station;
	var SideImages;
	var DockButton;
	var VoyageSelected, VoyagePlanets, Slots;
	var Cargo;
	var Distance, DistanceIndex;

	var i;
};
SolarTradeView.prototype = new GenieView();
SolarTradeView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.VoyageSelected = 0;
	this.VoyagePlanets = new Array(VOYAGE.OFFERS);
	this.Cargo = new Array(CARGO.TYPES);
	this.SetSlots();
	this.DistanceIndex = 0;
	this.Frames = 15;
};
SolarTradeView.prototype.SetImages = function() {

	if (Game.CheckMobile())
		this.SideImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SIDE);
};
SolarTradeView.prototype.SetControls = function() {

	this.DockButton = this.SetImageButton(this.Specs.BUTTON.DOCK, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
SolarTradeView.prototype.SetSlots = function() {
	var i;

	this.Slots = ArrayUtils.Create(VOYAGE.OFFERS, Coordinate2D);
	for (i=0;i<VOYAGE.OFFERS;++i) {
		this.Slots[i].L = 5;
		this.Slots[i].T = 35 + (48*i);
		this.Slots[i].W = 390;
		this.Slots[i].H = 26;
	}
};
SolarTradeView.prototype.SetPlanetStation = function(planet, station) {

	this.Planet = planet;
	this.Station = station;
};
SolarTradeView.prototype.Open = function() {  //UNLOGGED

	this.SetVoyages();

	GenieView.prototype.Open.call(this);

	this.Update();
};
SolarTradeView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateClick();
	this.UpdateButtons();
	this.UpdateDistances();
	this.InfoView.Update();
	this.ConsoleView.Update();
};
SolarTradeView.prototype.Draw = function() {  //UNLOGGED

	this.TextWriter.Write("Select a Voyage:", 5, 20, { FONT: "18px Arial", COLOUR: "white" } );
	this.DisplayVoyages();
};
SolarTradeView.prototype.SetVoyages = function() {
	var i;
	var iPlnt;

	//Planets
	this.VoyagePlanets.fill(-1);
	for (i=0;i<this.VoyagePlanets.length;++i) {
		do {
			iPlnt = this.Randomizer.GetIndex(SOLArSYSTEM.PLANETS/2);
			iPlnt *= 2;
			if (this.Planet.Index % 2==0)
				++iPlnt;
		} while (this.VoyagePlanets.includes(iPlnt));
		this.VoyagePlanets[i] = iPlnt;
	}

	SolarSystem.SetDestinationPlanet(Planets[this.VoyagePlanets[0]]);		//initial selection

	//Goods
	this.Randomizer.Shuffle(this.Cargo, INITIALIZE);
};
SolarTradeView.prototype.DisplayVoyages = function() {
	var i;
	var info;

	for (i=0;i<VOYAGE.OFFERS;++i) {

		//Label
		this.GraphicsTool.DrawRectangle(5, 38+(48*i), 18, 20, VoyageColours[i], 0);
		info = (i+1) + ":";
		this.TextWriter.Write(info, 10, 52+(48*i), { COLOUR: VoyageTextColours[i] } );

		//Bas-relief border
		if (i==this.VoyageSelected) {
			this.GraphicsTool.DrawRectangle(33, 35+(48*i), 230, 3, "black", 0);
			this.GraphicsTool.DrawRectangle(33, 35+(48*i)+23, 230, 3, "white", 0);
			this.SideImages.DrawPatchNumber(2, 30, 35+(48*i));
			this.SideImages.DrawPatchNumber(3, 30+230+3, 35+(48*i));
		} else {
			this.GraphicsTool.DrawRectangle(33, 35+(48*i), 230, 3, "white", 0);
			this.GraphicsTool.DrawRectangle(33, 35+(48*i)+23, 230, 3, "black", 0);
			this.SideImages.DrawPatchNumber(0, 30, 35+(48*i));
			this.SideImages.DrawPatchNumber(1, 30+230+3, 35+(48*i));
		}

		//Voyage description
		this.GraphicsTool.DrawRectangle(33, 35+(48*i)+3, 230, 20, VoyageColours[i], 0);
		info = "Transport " + Cargo[this.Cargo[i]] + " to " + PlanetNames[this.VoyagePlanets[i]];
		this.TextWriter.Write(info, 40, 52+(48*i), { COLOUR: VoyageTextColours[i] } );

		//Distances
		this.UpdateDistance(i);
	}
};
SolarTradeView.prototype.UpdateClick = function() {

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		for (this.i=0;this.i<VOYAGE.OFFERS;++this.i)
			if (SpaceUtils.CheckPointInBox(Mouse.Click, this.Slots[this.i])) {
				if (this.i==this.VoyageSelected)		//already selected option is clicked
					return;
				else {										//choose new option
					this.VoyageSelected = this.i;
					SolarSystem.SetDestinationPlanet(Planets[this.VoyagePlanets[this.i]])
					this.Context.fillStyle = this.Specs.COLOUR;
					this.Context.fillRect(0, 30, SCREEN.WIDTH, SCREEN.HEIGHT-30);
					this.Draw();
					break;
				}
			}
};
SolarTradeView.prototype.UpdateButtons = function() {  //UNLOGGED

	if (this.DockButton.CheckClicked()) {
		//-go back to docked view
	}
};
SolarTradeView.prototype.UpdateDistances = function() {

	--this.Frames;
	if (this.Frames==0) {
		++this.DistanceIndex;
		if (this.DistanceIndex==VOYAGE.OFFERS)
			this.DistanceIndex = 0;
		this.Frames = 15;
		this.UpdateDistance(this.DistanceIndex);
	}
};
SolarTradeView.prototype.UpdateDistance = function(iPlanet) {

	this.Distance = SpaceUtils.GetDistance(this.Planet.Location, Planets[this.VoyagePlanets[iPlanet]].Location);
	this.Distance = Math.round(this.Distance*(50/1.5));
	this.GraphicsTool.DrawRectangle(272, 35+(48*iPlanet)+3, 40, 20, VoyageColours[iPlanet], 0);
	this.TextWriter.Write(this.Distance, 277, 52+(48*iPlanet), { COLOUR: VoyageTextColours[iPlanet] } );
};
SolarTradeView.prototype.CloseAll = function() {

	GenieView.prototype.Close.call(this, this.OpenVoyageView.bind(this), 100);

};
SolarTradeView.prototype.OpenVoyageView = function() {

	VoyageView.SetDestination(Planets[this.VoyagePlanets[(2*this.VoyageSelected)+1]]);
	VoyageView.Open();
};
