
//----------------------------------------------------------
//---------- TACTICAL CITY CONSOLE VIEW --------------------
var TacticalCityConsoleView = function() {
	var NameImage, ProductionImage, TurnsImage, ClanImage, GarrisonImage, ClanLabelImages;
	var City;
};
TacticalCityConsoleView.prototype = new GenieSubView();
TacticalCityConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
TacticalCityConsoleView.prototype.SetImages = function() {

	this.NameImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.NAME);
	this.ProductionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PRODUCTION);
	this.TurnsImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TURNS);
	this.ClanImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CLAN);
	this.GarrisonImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.GARRISON);
	this.ClanLabelImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABELS);
};
TacticalCityConsoleView.prototype.SetCity = function(city) {  //UNLOGGED

	this.City = city;
};
TacticalCityConsoleView.prototype.Draw = function() {  //UNLOGGED
	var c, r;

	//Name
	c = this.City.Clan.Index % MAP.TILE.C;
	r = Math.floor(this.City.Clan.Index/MAP.TILE.C);
	Text.Write(CityNames[c]+"-"+r, 46, 11, { COLOUR: "white" } );

	//Display unit produced, - TODO: animate
	if (this.City.Clan)
		this.ClanLabelImages.DrawPatchNumber(this.City.Clan.Index, 45, 129);
	else
		this.ClanLabelImages.DrawPatchNumber(CLAN.NEUTRAL, 45, 129);
	Text.Write(UnitNames[this.City.Unit], 10, 50);  //TEMP

	Text.Write(this.City.TurnsLeft, 81, 98, { COLOUR: "white" } );

	//Clan
	if (this.City.Clan)
		this.ClanLabelImages.DrawPatchNumber(this.City.Clan.Index, 45, 107);
	else
		this.ClanLabelImages.DrawPatchNumber(CLAN.NEUTRAL, 45, 107);

	//-'garrison' strength (enough room for 4 tiles/stacks, maybe 9 closely packed)
	//-3x3 tiles 40x40 starting at 11,124, offset 2px
	
	//-icons at bottom to switch to different info display
};
