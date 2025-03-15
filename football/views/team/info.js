
//-------------------------------------------------------
//---------- FOOTBALL TEAM INFO VIEW --------------------
var FootballTeamInfoView = function() {
	var Footballer;
	var SymbolIconPanel;
	var ImageContext;
	var Padding;

	var info;
};
FootballTeamInfoView.prototype = new GenieSubView();
FootballTeamInfoView.prototype.Set = function(cnvs, specs) {
	GenieSubView.prototype.Set.call(this, cnvs, specs);

	if (Game.CheckMobile()) {
		this.Padding = 55;
		this.TypeFlag = true;
	} else
		this.Padding = 0;
};
FootballTeamInfoView.prototype.SetControls = function() {

	if (Game.CheckMobile())
		this.SymbolIconPanel = this.SetBevelledIconPanel(this.Specs.ICOnPANEL.SYMBOLS, this.Specs.ICOnPANEL.SYMBOLS.IMAGE, this.Specs.ICOnPANEL.SYMBOLS.BEVEL);
};
FootballTeamInfoView.prototype.SetFootballer = function(ftbllr) {

	this.Footballer = ftbllr;
};
FootballTeamInfoView.prototype.Open = function() {
	GenieSubView.prototype.Open.call(this);

	if (Game.CheckMobile())
		this.DisplayLegends();
};
FootballTeamInfoView.prototype.Update = function() {

	if (Game.CheckMobile())
		if (this.SymbolIconPanel.CheckMouseDown())
			if (this.SymbolIconPanel.CheckIconChanged())
				this.DisplayLegends();
};
FootballTeamInfoView.prototype.ColourBackground = function() {

	if (Game.CheckMobile()) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(0, 60, INFoBOX.WIDTH, INFoBOX.HEIGHT-60);
	} else
		this.ColourScape();
};
FootballTeamInfoView.prototype.Draw = function() {

	this.DrawSections();
	this.DrawMugshot();
	this.DisplayVitals();
	this.DisplayFinancials();
	this.DisplayStats();
};
FootballTeamInfoView.prototype.DisplayLegends = function() {
	var i;
	var x, y;

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, 200, 60);

	//Set contexts
	this.ImageContext = TypeSymbolImages.Context;
	TypeSymbolImages.Context = this.Context;
	DesignationSymbolImages.Context = this.Context;
	this.TextWriter.SetContext(this.Context);

	if (this.SymbolIconPanel.DepressedIcon==0)
		for (i=0;i<TypeSymbolImages.Specs.C;++i) {
			x = 5 + (90*Math.floor(i/4));
			y = 5 + (13*(i % 4));
			TypeSymbolImages.DrawPatchNumber(i, x, y);
			this.TextWriter.Write(PlayerTypes[i+1], x+15, y+10, { FONT: "12px Arial", COLOUR: "white" } );
		}
	else
		for (i=0;i<DesignationSymbolImages.Specs.C;++i) {
			x = 5 + (90*Math.floor(i/4));
			y = 5 + (13*(i % 4));
			DesignationSymbolImages.DrawPatchNumber(i, x, y);
			this.TextWriter.Write(Designations[i+1], x+15, y+10, { FONT: "12px Arial", COLOUR: "white" } );
		}

	//Reset contexts
	TypeSymbolImages.Context = this.ImageContext;
	DesignationSymbolImages.Context = this.ImageContext;
	this.TextWriter.ResetContext();
};
FootballTeamInfoView.prototype.DrawSections = function() {

	this.Context.fillStyle = PAINT.SKY;
	this.Context.fillRect(this.Specs.SECTION.L, this.Specs.SECTION.T+this.Padding, this.Specs.SECTION.W, this.Specs.SECTION.H);

	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawBasReliefSection(this.Specs.SECTION.L, this.Specs.SECTION.T+this.Padding, this.Specs.SECTION.W, this.Specs.SECTION.H);
	this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L, this.Specs.FRAME.T+this.Padding, this.Specs.FRAME.W, this.Specs.FRAME.H, "black", 5);
	this.GraphicsTool.RestoreContext();
};
FootballTeamInfoView.prototype.DrawMugshot = function() {
	var iCmplxn, iHair, iEyes;

	//Shirt
	this.GraphicsTool.SetContext(this.Context);
	if (this.Footballer.CheckMale())
		this.GraphicsTool.DrawPolygon(0, this.Padding, this.Specs.FOOTBALLER.SHIRT, TeamColours[this.Footballer.Team.Index][0], colour, 0);
	else
		this.GraphicsTool.DrawPolygon(0, this.Padding, this.Specs.FOOTBALLINA.SHIRT, TeamColours[this.Footballer.Team.Index][0], colour, 0);
	this.GraphicsTool.RestoreContext();

	//Face, hair and pupils
	iCmplxn = this.Footballer.GetComplexion();
	if (this.Footballer.CheckMale())
		FootballerFaceImages.DrawPatchNumber(iCmplxn, this.Specs.FOOTBALLER.FACE.X, this.Specs.FOOTBALLER.FACE.Y+this.Padding);
	else
		RoundFaceImages.DrawPatchNumber(iCmplxn, this.Specs.FOOTBALLINA.FACE.X, this.Specs.FOOTBALLINA.FACE.Y+this.Padding);
	iHair = this.Footballer.GetHairColour();
	if (this.Footballer.CheckMale())
		HairImages.DrawPatchNumber(iHair, this.Specs.FOOTBALLER.HAIR.X, this.Specs.FOOTBALLER.HAIR.Y+this.Padding);
	else {
		HairDoImages.DrawPatchNumber(iHair, this.Specs.FOOTBALLINA.HAIR.BUN.X, this.Specs.FOOTBALLINA.HAIR.BUN.Y+this.Padding);
		BangsImages.DrawPatchNumber(2*iHair, this.Specs.FOOTBALLINA.HAIR.BANG.R.X, this.Specs.FOOTBALLINA.HAIR.BANG.R.Y+this.Padding);
		BangsImages.DrawPatchNumber((2*iHair)+1, this.Specs.FOOTBALLINA.HAIR.BANG.L.X, this.Specs.FOOTBALLINA.HAIR.BANG.L.Y+this.Padding);
	}
	iEyes = this.Footballer.GetEyeColour();
	if (this.Footballer.CheckMale()) {
		PupilImages.DrawPatchNumber(iEyes, this.Specs.FOOTBALLER.PUPIL.R.X, this.Specs.FOOTBALLER.PUPIL.R.Y+this.Padding);
		PupilImages.DrawPatchNumber(iEyes, this.Specs.FOOTBALLER.PUPIL.L.X, this.Specs.FOOTBALLER.PUPIL.L.Y+this.Padding);
		if (this.Footballer.CheckMonolidEyes()) {
			MaleMonolidImages.DrawPatchNumber(iCmplxn, this.Specs.FOOTBALLER.MONOLID.R.X, this.Specs.FOOTBALLER.MONOLID.R.Y+this.Padding);
			MaleMonolidImages.DrawPatchNumber(iCmplxn, this.Specs.FOOTBALLER.MONOLID.L.X, this.Specs.FOOTBALLER.MONOLID.L.Y+this.Padding);
		}
	} else {
		PupilImages.DrawPatchNumber(iEyes, this.Specs.FOOTBALLINA.PUPIL.R.X, this.Specs.FOOTBALLINA.PUPIL.R.Y+this.Padding);
		PupilImages.DrawPatchNumber(iEyes, this.Specs.FOOTBALLINA.PUPIL.L.X, this.Specs.FOOTBALLINA.PUPIL.L.Y+this.Padding);
		if (this.Footballer.CheckMonolidEyes()) {
			FemaleMonolidImages.DrawPatchNumber(2*iCmplxn, this.Specs.FOOTBALLINA.MONOLID.R.X, this.Specs.FOOTBALLINA.MONOLID.R.Y+this.Padding);
			FemaleMonolidImages.DrawPatchNumber((2*iCmplxn)+1, this.Specs.FOOTBALLINA.MONOLID.L.X, this.Specs.FOOTBALLINA.MONOLID.L.Y+this.Padding);
		}
	}
	
};
FootballTeamInfoView.prototype.DisplayVitals = function() {

	this.TextWriter.SetContext(this.Context);

	//Name, Quality, Age . . . TODO: reduce font if name(s) doesn't fit
	this.TextWriter.Write(this.Footballer.Name.First, this.Specs.NAME.FIRST.X, this.Specs.NAME.FIRST.Y+this.Padding, { FONT: "18px Arial bold" } );
	this.TextWriter.Write(this.Footballer.Name.Last, this.Specs.NAME.LAST.X, this.Specs.NAME.LAST.Y+this.Padding, { FONT: "18px Arial bold" } );
	this.TextWriter.Write(Positions[this.Footballer.Position], this.Specs.POSITION.X, this.Specs.POSITION.Y+this.Padding, { FONT: "18px Arial bold" } );
	this.TextWriter.Write(Utils.NumberToGrade(this.Footballer.Quality), this.Specs.QUALITY.X, this.Specs.QUALITY.Y+this.Padding, { FONT: "18px Arial bold" } );
	this.TextWriter.Write(this.Footballer.Age, this.Specs.AGE.X, this.Specs.AGE.Y+this.Padding, { FONT: "18px Arial bold" } );

	//Birth Week
	this.TextWriter.Write("Birth Week:", this.Specs.BIRTH.HEADING.X, this.Specs.BIRTH.HEADING.Y+this.Padding, { FONT: "12px Arial" } );
	this.TextWriter.Write(this.Footballer.BirthWeek, this.Specs.BIRTH.X, this.Specs.BIRTH.Y+this.Padding, { FONT: "12px Arial" } );

	//Attributes
	this.TextWriter.Write("Potential:", this.Specs.POTENTIAL.LABEL.X, this.Specs.POTENTIAL.LABEL.Y+this.Padding, { FONT: "12px Arial" } );
	if (this.Footballer.Potential>0)
		this.TextWriter.Write("+"+this.Footballer.Potential, this.Specs.POTENTIAL.X, this.Specs.POTENTIAL.Y+this.Padding, { FONT: "12px Arial" } );
	else
		this.TextWriter.Write(this.Footballer.Potential, this.Specs.POTENTIAL.X, this.Specs.POTENTIAL.Y+this.Padding, { FONT: "12px Arial" } );
	this.TextWriter.Write("Variation:", this.Specs.VARIATION.LABEL.X, this.Specs.VARIATION.LABEL.Y+this.Padding, { FONT: "12px Arial" } );
	if (this.Footballer.Variation>0)
		this.TextWriter.Write("+"+this.Footballer.Variation, this.Specs.VARIATION.X, this.Specs.VARIATION.Y+this.Padding, { FONT: "12px Arial" } );
	else
		this.TextWriter.Write(this.Footballer.Variation, this.Specs.VARIATION.X, this.Specs.VARIATION.Y+this.Padding, { FONT: "12px Arial" } );

	this.TextWriter.Write("Stats:", this.Specs.STATS.LABEL.X, this.Specs.STATS.LABEL.Y+this.Padding, { FONT: "12px Arial" } );

	//Injury Status
	this.TextWriter.Write("Availability:", this.Specs.INJURY.LABEL.X, this.Specs.INJURY.LABEL.Y+this.Padding, { FONT: "12px Arial" } );
	if (this.Footballer.Status & FOOTBALLER.BIT.INJURY)
		this.TextWriter.Write("Out", this.Specs.INJURY.X, this.Specs.INJURY.Y+this.Padding, { FONT: "12px Arial" } );
	else
		this.TextWriter.Write("Available", this.Specs.INJURY.X, this.Specs.INJURY.Y+this.Padding, { FONT: "12px Arial" } );

	this.TextWriter.ResetContext();
};
FootballTeamInfoView.prototype.DisplayFinancials = function() {

	this.TextWriter.SetContext(this.Context);

	this.TextWriter.Write("Price:", this.Specs.PRICE.LABEL.X, this.Specs.PRICE.LABEL.Y+this.Padding, { FONT: "12px Arial" } );
	this.TextWriter.Write(Utils.FormatMoney(this.Footballer.GetPrice()*1000), this.Specs.PRICE.X, this.Specs.PRICE.Y+this.Padding, { FONT: "12px Arial" } );
	this.TextWriter.Write("Wages:", this.Specs.WAGES.LABEL.X, this.Specs.WAGES.LABEL.Y+this.Padding, { FONT: "12px Arial" } );
	this.TextWriter.Write(this.Footballer.GetWages()+"K", this.Specs.WAGES.X, this.Specs.WAGES.Y+this.Padding, { FONT: "12px Arial" } );

	this.TextWriter.ResetContext();
};
FootballTeamInfoView.prototype.DisplayStats = function() {
	//UNLOGGED
};
