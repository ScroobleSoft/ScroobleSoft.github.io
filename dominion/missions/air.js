/*
	DESIGN: (TODO) radar view pane's height will vary depending on number of planes in sortie (squadron)
	** there could be a limit of 8 jets to avoid radar detection
*/
//---------------------------------------------------------
//---------- DOMINION AIR MISSION VIEW --------------------
var DominionAirMissionView = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad;

	var LeftNation, LeftJetSides, LeftSquadron, LeftColour, LeftPolygon;
	var RightNation, RightJetSides, RightSquadron, RightColour, RightPolygon;

	//Sprites
	var LeftFighterSprite, RightFighterSprite;		//TODO: will need pointer to all jet types

	//Data
	var EvenPositions, OddPositions;
	var GradeOffsets;					//left only
	var LeftJetPositions, RightJetPositions;
};
DominionAirMissionView.prototype = {
	Set(cnvs, iBox, cPanel, gTool, cPad) {
		this.Screen = cnvs.Context;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;

		this.SetData();
		this.SetArrays();
	},
	Open() {

		//UNLOGGED

		JetAccuracyMeter.Show();
		this.SetImageContexts();
	},
	Update() {

		//UNLOGGED

		if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		} else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
		} else
	 Mouse.ClearClicks();
	},
	Close() {

		//UNLOGGED

		this.ResetImageContexts();
		JetAccuracyMeter.Hide();
	},
	SetData() {

		//UNLOGGED

		this.EvenPositions = [ 105,126,84,147,63,168,42,189 ];
		this.OddPositions = [ 113,134,92,155,71,176,50 ];
		this.GradeOffsets = [ [-55,0],[50,-5],[50,5],[45,-10],[45,10],[40,-15],[40,15],[35,-20],[35,20]]
	},
	SetArrays() {

		//UNLOGGED

		this.LeftSquadron = new Array(JET.SQUADRON);
		this.RightSquadron = new Array(JET.SQUADRON);
		this.LeftJetPositions = ArrayUtils.Create(THEATRE.AIR.JETS, Coordinate2D);
		this.RightJetPositions = ArrayUtils.Create(THEATRE.AIR.JETS, Coordinate2D);
	},
	SetNations(lNation, rNation) {

		this.LeftNation = lNation;
		this.RightNation = rNation;
		this.LeftColour = DominionUtils.GetPrimaryColour(this.LeftNation);
		this.RightColour = DominionUtils.GetPrimaryColour(this.RightNation);
		this.LeftJetSides = DominionUtils.GetJetPolygonSides(this.LeftNation);
		this.RightJetSides = DominionUtils.GetJetPolygonSides(this.RightNation);
		this.LeftPolygon = this.CalcPad.GetPolygonVertices(this.LeftJetSides, 15);
		this.RightPolygon = this.CalcPad.GetPolygonVertices(this.RightJetSides, 15);
	},
	SetSquadrons(lSqdrn, rSqdrn) {
		var lNation, rNation;

		function SetSquadron(sqdrn, dSqdrn, jets) {  //d- duel
	 var i;
	 var aJets;

	 aJets = new Array(JET.TYPES);
	 aJets.fill(0);
	 for (i=0;i<sqdrn.length;++i) {
		 dSqdrn[i] = jets[sqdrn[i].Type][aJets[sqdrn[i].Type]];
		 if (sqdrn[i].Type==JET.FIGHTER)
			 dSqdrn[i].SetGrade(sqdrn[i].Grade);
		 ++aJets[sqdrn[i].Type];
	 }
		}

		SetSquadron(lSqdrn, this.LeftSquadron, LeftJets);
		SetSquadron(rSqdrn, this.RightSquadron, RightJets);
		lNation = this.LeftNation;
		rNation = this.RightNation;
		this.LeftSquadron.forEach(function(jet){jet.SetNation(lNation);});
		this.RightSquadron.forEach(function(jet){jet.SetNation(rNation);});
		this.LeftSquadron.forEach(function(jet){jet.Angle=90;});
		this.RightSquadron.forEach(function(jet){jet.Angle=270;});

		this.SetPositions();
	},
	SetPositions() {

		//UNLOGGED

		this.LeftSquadron[0].SetPosition( { X: 120, Y: 440 } );
		this.RightSquadron[0].SetPosition( { X: 480, Y: 440 } );
	},
	DrawFrame() {

		//UNLOGGED

		//TODO: background(s) may be replaced by octagons
		this.Screen.fillStyle = PAINT.SEA;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

		this.DrawWeaponsPanel();

		//Border and dividers
		this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, "black", 4);
		this.GraphicsTool.DrawVerticalLine( { X: (SCREEN.WIDTH/2)-1, Y: 0 }, 25, "black", 4);
		this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 25 }, SCREEN.WIDTH, "black", 4);
		this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 204 }, SCREEN.WIDTH, "black", 4);

		//TODO: there might be more than one inset window depending on number of jets in squadron
		this.GraphicsTool.DrawRectangle(40, 360, 160, 160, PAINT.LIVID, 4);
		this.GraphicsTool.DrawRectangle(400, 360, 160, 160, PAINT.LIVID, 4);
	},
	DrawWeaponsPanel() {
		var pIndex, sIndex;	//p- primary, s- secondary

		//Background
		this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH/2, 25, this.LeftColour, 0);
		this.GraphicsTool.DrawRectangle(SCREEN.WIDTH/2, 0, SCREEN.WIDTH/2, 25, this.RightColour, 0);
		this.GraphicsTool.DrawRectangle(38, 0, 70, 25, "black", 0, 0.5);					//left short cannon
		this.GraphicsTool.DrawRectangle(178, 0, 70, 25, "black", 0, 0.5);					//left firebrand
		this.GraphicsTool.DrawRectangle(392, 0, 70, 25, "black", 0, 0.5);					//right firebrand
		this.GraphicsTool.DrawRectangle(532, 0, 70, 25, "black", 0, 0.5);					//left short cannon

		//Left weapon images
		pIndex = DominionUtils.GetBitmapIndex(this.LeftNation);
		sIndex = DominionUtils.GetSecondaryIndex(this.LeftNation);
		ShortCannonImages.DrawPatchNumber(sIndex, 251, 8);
		LongCannonImages.DrawPatchNumber(sIndex, 186, 6);
		this.DrawPanelSilklight(pIndex, sIndex, 49, DIRECTION.E);
		this.DrawPanelFirebrand(pIndex, sIndex, 119, DIRECTION.E);

		//Right weapon images
		pIndex = DominionUtils.GetBitmapIndex(this.RightNation);
		sIndex = DominionUtils.GetSecondaryIndex(this.RightNation);
		ShortCannonImages.DrawPatchNumber(sIndex+10, 325, 8);
		LongCannonImages.DrawPatchNumber(sIndex+10, 400, 6);
		this.DrawPanelFirebrand(pIndex, sIndex, 483, DIRECTION.W);
		this.DrawPanelSilklight(pIndex, sIndex, 553, DIRECTION.W);
	},
	DrawPanelFirebrand(sIndx, pIndx, x, drctn) {
		var iOffst;

		iOffst = (drctn==DIRECTION.E) ? 0 : 10;
		AAMHorizontalShaftImages.DrawPatchNumber(sIndx+iOffst, x, 10);
		if (drctn==DIRECTION.E)
	 FirebrandHorizontalWarheadImages.DrawPatchNumber(0, x+38, 10);
		else
	 FirebrandHorizontalWarheadImages.DrawPatchNumber(1, x-10, 10);
		FirebrandHorizontalFinImages.DrawPatchNumber(pIndx+iOffst, x+2, 5);
		FirebrandHorizontalFinImages.DrawPatchNumber(pIndx+iOffst, x+16, 5);
		FirebrandHorizontalFinImages.DrawPatchNumber(pIndx+iOffst, x+30, 5);
		FirebrandHorizontalFinImages.DrawPatchNumber(pIndx+20+iOffst, x+2, 18);
		FirebrandHorizontalFinImages.DrawPatchNumber(pIndx+20+iOffst, x+16, 18);
		FirebrandHorizontalFinImages.DrawPatchNumber(pIndx+20+iOffst, x+30, 18);
	},
	DrawPanelSilklight(sIndx, pIndx, x, drctn) {
		var iOffst;

		iOffst = (drctn==DIRECTION.E) ? 0 : 10;
		AAMHorizontalShaftImages.DrawPatchNumber(sIndx+iOffst, x, 10);
		if (drctn==DIRECTION.E)
	 SilklightHorizontalWarheadImages.DrawPatchNumber(0, x+38, 10);
		else
	 SilklightHorizontalWarheadImages.DrawPatchNumber(1, x-10, 10);
		SilklightHorizontalFinImages.DrawPatchNumber(pIndx+iOffst, x+2, 5);
		SilklightHorizontalFinImages.DrawPatchNumber(pIndx+iOffst, x+29, 5);
		SilklightHorizontalFinImages.DrawPatchNumber(pIndx+20+iOffst, x+2, 18);
		SilklightHorizontalFinImages.DrawPatchNumber(pIndx+20+iOffst, x+29, 18);
	},
	DrawRadarPane() {

		//UNLOGGED

		//TODO: background(s) may be replaced by octagons
		this.Screen.fillStyle = PAINT.SEA;
		this.Screen.fillRect(0, 25, SCREEN.WIDTH, 175);
	},
	DrawInfoBox() {
		var i;

		//UNLOGGED - sprite drawing may move to jet objects

		this.InfoBox.fillStyle = PAINT.SKY;
		this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

//		FighterInfoSprite.Specs.GS.forEach(function(spec){spec.SIDES=4;});
		FighterInfoSprite.Shapes.forEach(function(shape){shape.ResetSides(4);});
		for (i=0;i<8;++i)
	 FighterInfoSprite.Draw(15, (30*i)+15);
		FighterInfoSprite.Shapes.forEach(function(shape){shape.X=-shape.X;});
		for (i=0;i<8;++i)
	 FighterInfoSprite.Draw(INFoBOX.WIDTH-15, (30*i)+15);
		FighterInfoSprite.Shapes.forEach(function(shape){shape.X=-shape.X;});
	},
	DrawJets() {

		//UNLOGGED

		this.DrawRadarJets();
		this.LeftSquadron[0].Draw();
		this.RightSquadron[0].Draw();
	},
	DrawRadarJets() {
		var i;

		//UNLOGGED

		for (i=0;i<8;++i) {
	 this.GraphicsTool.DrawPolygon(40, this.EvenPositions[i], this.LeftPolygon, this.LeftColour, 0);
	 this.GraphicsTool.DrawPolygon(600, this.EvenPositions[i], this.RightPolygon, this.RightColour, 0);
		}
	}
};
DominionAirMissionView.prototype.SetImageContexts = function() {  //NOTE: for control panel undercarriage

		//UNLOGGED

};
DominionAirMissionView.prototype.ResetImageContexts = function() {

		//UNLOGGED

};
