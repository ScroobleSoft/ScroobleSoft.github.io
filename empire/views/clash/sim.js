
//-------------------------------------------------------
//---------- REGIMENT CLASH SIM VIEW --------------------
var RegimentClashSimView = function() {
	var SimButton, PlayButton, AttackButton;
	var LeftRegiments, RightRegiments;
	var LeftSatrapy, RightSatrapy;
	var LeftRegimentSoldiers, RightRegimentSoldiers;
	var MaxLeftSoldiers, MaxRightSoldiers, MaxSoldiers;
	var Terrain;
	var LeftAdvantages, RightAdvantages;
	var RegimentIndex, Casualties;								//variables used in fighting

	var i;
};
RegimentClashSimView.prototype = new GenieView();
RegimentClashSimView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
RegimentClashSimView.prototype.SetControls = function() {  //UNLOGGED

	this.SimButton = this.SetTextButton(this.Specs.BUTTON.SIM, RaisedCornerImages, Text);
	this.PlayButton = this.SetTextButton(this.Specs.BUTTON.PLAY, RaisedCornerImages, Text);
	this.AttackButton = this.SetTextButton(this.Specs.BUTTON.ATTACK, RaisedCornerImages, Text);
};
RegimentClashSimView.prototype.ShowControls = function() {  //UNLOGGED

	this.SimButton.Show();
	this.PlayButton.Show();
};
RegimentClashSimView.prototype.SetSatrapies = function(lStrpy, rStrpy) {  //UNLOGGED

	this.LeftSatrapy = lStrpy;
	this.RightSatrapy = rStrpy;
};
RegimentClashSimView.prototype.SetRegiments = function(lRgmnts, rRgmnts) {  //UNLOGGED
	var i;

	this.LeftRegiments = lRgmnts;
	this.MaxLeftSoldiers = new Array(this.LeftRegiments.length);
	for (i=0;i<this.LeftRegiments.length;++i)
		this.MaxLeftSoldiers[i] = this.LeftRegiments[i].GetSoldiers();

	this.RightRegiments = rRgmnts;
	this.MaxRightSoldiers = new Array(this.RightRegiments.length);
	for (i=0;i<this.RightRegiments.length;++i)
		this.MaxRightSoldiers[i] = this.RightRegiments[i].GetSoldiers();
};
RegimentClashSimView.prototype.SetAttackers = function(drctn) {  //UNLOGGED - REDUNDANT?

	this.Attackers = drctn;
};
RegimentClashSimView.prototype.SetTerrain = function(trrn) {  //UNLOGGED - ASSUMPTION: Regiments have been set
	var i;

	this.Terrain = trrn;

	this.LeftAdvantages = new Array(this.LeftRegiments.length);
	for (i=0;i<this.LeftRegiments.length;++i)
		if (UnitTerrainMapping[this.LeftRegiments[i].Unit.Type]==this.Terrain)
			this.LeftAdvantages[i] = true;

	this.RightAdvantages = new Array(this.RightRegiments.length);
	for (i=0;i<this.RightRegiments.length;++i)
		if (UnitTerrainMapping[this.RightRegiments[i].Unit.Type]==this.Terrain)
			this.RightAdvantages[i] = true;
};
RegimentClashSimView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

};
RegimentClashSimView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.SimButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.SetSimClash();
		this.PlaySimClash();
	}

	if (this.PlayButton.CheckClicked())
		this.Close(this.OpenRegimentClashView.bind(this), 100);
};
RegimentClashSimView.prototype.Draw = function() {  //UNLOGGED

//	this.ColourScape(null, GREY.SILVER);
	Graphics.DrawRectangle(0, 0, 400, 400, GREY.SILVER, 0);
	Text.Write(SatrapyNames[this.LeftSatrapy.Index], 10, 60);
	Text.Write(SatrapyNames[this.RightSatrapy.Index], 10, 115);
};
RegimentClashSimView.prototype.OpenRegimentClashView = function() {  //UNLOGGED

	RegimentClashView.Open();
	RegimentClashView.Update();
};
RegimentClashSimView.prototype.SetSimClash = function() {  //UNLOGGED
	var i;

	this.SimButton.Hide();
	this.PlayButton.Hide();
	this.AttackButton.Show();

	this.LeftRegimentSoldiers = 0;
	for (i=0;i<this.LeftRegiments.length;++i)
		this.LeftRegimentSoldiers += this.LeftRegiments[i].GetSoldiers();
	this.MaxLeftSoldiers = this.LeftRegimentSoldiers;
	Text.Write(this.LeftRegimentSoldiers, 325, 65);

	this.RightRegimentSoldiers = 0;
	for (i=0;i<this.RightRegiments.length;++i)
		this.RightRegimentSoldiers += this.RightRegiments[i].GetSoldiers();
	this.MaxRightSoldiers = this.RightRegimentSoldiers;
	Text.Write(this.RightRegimentSoldiers, 325, 115);

	this.MaxSoldiers = Math.max(this.LeftRegimentSoldiers, this.RightRegimentSoldiers);

	this.DisplaySoldiers();
};
RegimentClashSimView.prototype.PlaySimClash = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.PlaySimClash.bind(this));

	if (this.AttackButton.CheckClicked()) {
		this.UpdateSoldiers();
		this.DisplaySoldiers();
	}
};
RegimentClashSimView.prototype.UpdateSoldiers = function() {  //UNLOGGED

	for (this.i=0;this.i<this.LeftAdvantages.length;++this.i) {
		this.RandomIndex = this.Randomizer.GetIndex(this.RightRegiments.length);
		if (this.LeftAdvantages[this.i])
			this.Casualties = this.Randomizer.GetIndex(12);
		else
			this.Casualties = this.Randomizer.GetIndex(10);
		this.RightRegiments.SubtractSoldiers(this.Casualties);
	}

	for (this.i=0;this.i<this.RightAdvantages.length;++this.i) {
		this.RandomIndex = this.Randomizer.GetIndex(this.LeftRegiments.length);
		if (this.RightAdvantages[this.i])
			this.Casualties = this.Randomizer.GetIndex(12);
		else
			this.Casualties = this.Randomizer.GetIndex(10);
		this.LeftRegiments.SubtractSoldiers(this.Casualties);
	}
};
RegimentClashSimView.prototype.DisplaySoldiers = function() {  //UNLOGGED

	Graphics.DrawRectangle(80, 35, 240*(this.LeftRegimentSoldiers/this.MaxSoldiers), 35, "red", 0);
	Graphics.DrawRectangle(80, 35, 240, 35, "black", 1);
	Graphics.DrawRectangle(80, 90, 240*(this.RightRegimentSoldiers/this.MaxSoldiers), 35, "blue", 0);
	Graphics.DrawRectangle(80, 90, 240, 35, "black", 1);
	Text.Write(this.LeftRegimentSoldiers, 325, 60);
	Text.Write(this.RightRegimentSoldiers, 325, 115);
};
