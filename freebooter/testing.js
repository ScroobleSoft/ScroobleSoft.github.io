
//---------------------------------------------
//---------- SOLAR TESTING --------------------
var SolarTesting = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad, TextWriter;
	var Randomizer;
	var State, Frames;

	//PIRATES
	var PirateShips;
	var ShipVertices;

	//MISSIONS
	var PanelRect;
	var MissionLevels;		//levels indicate difficulty
	var MissionDifficulty;
	var MissionLength;
	var StationSize;
	var ShipLocations;
	var ShipTypes;

	//WEAPONS
	var PulseCoords;
	var PulseRadius;

	//DOCKING
	var ShipPosition;

	//LAUNCHING
	var Opening;
	var Corners;
	var Faces, ConvexFaces;
	var ScaledVertices;

	//SHIPS
	var ShipColour;
	var PolygonShip, PolygonShipInset, PolygonShipFaces;
	var DiamondShip, DiamondShipInset, DiamondShipFaces;

	//MISSION
	var Difficulty;
	var Events;
	var CardIndex;
	var Cards;

	//TRACKPAD
	var RETICLeIMAGE, TRACKPAD;
	var TestReticleImage, TestTrackPad;
	var TrackPadStars;

	//ORBS
	var OrbBuffer;
	var OrbCoords, OrbPosition, OrbScale, OrbColour;

	var i, x, y;
};
SolarTesting.prototype = {
	Set(cntxt, iBox, cPanel, gTool, cPad, tWriter, rGenerator) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
	},
	Start() {

		//LOGGED

		this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		TestingImage.Draw();
		Starfield.Speed = 1;
		this.Play();
	},
	Play() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		if (Mouse.CheckLeftClicked()) {
			if (TestingImage.CheckClicked()) {
				cancelAnimationFrame(this.AnimationFrameHandle);
				this.i = TestingImage.GetMapEntry(CLICKED);
				switch (this.i) {
					case TEST.PIRATES:
						this.SetPirates();
						this.TestPirates();
						break;
					case TEST.MISSIONS:
						this.SetMissionsTryOut();
						this.PlayMissionsTryOut();
						break;
					case TEST.WEAPONS:
						this.SetWeaponsTest();
						this.PlayWeaponsTest();
						break;
					case TEST.DOCKING:
						this.SetDockingDemo();
						this.PlayDockingDemo();
						break;
					case TEST.LAUNCHING:
						this.SetLaunchDemo();
						this.PlayLaunchDemo();
						break;
					case TEST.SHIPS:
						this.SetShipDesigns();
						this.PlayShipDesigns();
						break;
					case TEST.MISSION:
						this.SetMissionGenerate();
						this.PlayMissionGenerate();
						break;
					case TEST.TRACKPAD:
						this.SetTrackpadTest();
						this.PlayTrackpadTest();
						break;
					case TEST.ORBS:
						this.SetOrbTest();
						this.PlayOrbTest();
						break;
				}
			}
		} else {
			this.i = TestingImage.GetMapEntry();
			if (this.i!=-1) {
				this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
				this.TextWriter.SwitchContext(CANVAS.ZOOM);
				this.TextWriter.Write(TestingDescriptions[this.i], 5, 20);
				this.TextWriter.RestoreContext();
			}
		}
	},
	SetPirates() {

		//UNLOGGED

		this.PirateShips = new Array(5);		//only z value for now
//		this.PirateShips.forEach(function(ship){ship=1000;});	//at 60fps have about 16s
		for (this.i=0;this.i<this.PirateShips.length;++this.i)
	 this.PirateShips[this.i] = 0;
		this.ShipVertices = Utilities.CreateArray(6, Coordinate2D);
		Starfield.Generate();
	},
	TestPirates() {

		//UNLOGGED
/*
		general idea is won't know how many pirates will encounter (if any), so the number can be anywhere from 0 to say 6 in linear/triangular/
		square/pentagonal formation (with ship at centre); also, don't know if where on the avenue the encounter will be made, so there is danger in
		going further and further away from the starlane, since am going to use the logic that cannot turn (or maybe it is too slow), and reversing is
		done at half speed, so if run out of weaponry, or find too many pirates (or their ships are too powerful), have only a limited amount of time
		to get back
*/
		this.AnimationFrameHandle = requestAnimationFrame(this.TestPirates.bind(this));

		Starfield.Draw();
		this.FireLaser();
//		this.GraphicsTool.DrawHexagon(300, 300, (1000-this.PirateShips[0])/10, "yellow", 0);
		for (this.i=0;this.i<this.ShipVertices.length;++this.i) {
	 this.ShipVertices[this.i].X = BlueKraitVertices[this.i].X*(this.PirateShips[0]/1000);
	 this.ShipVertices[this.i].Y = BlueKraitVertices[this.i].Y*(this.PirateShips[0]/1000);
		}
		this.GraphicsTool.DrawPolygon(300, 300, this.ShipVertices, PAINT.SEA, 0);
		Cockpit.Draw();
		Starfield.Update();
//		this.PirateShips.forEach(function(ship){--ship;});
		for (this.i=0;this.i<this.PirateShips.length;++this.i)
	 ++this.PirateShips[this.i];

		if (this.PirateShips[0]==1000)
	 cancelAnimationFrame(this.AnimationFrameHandle);
	},
	FireLaser() {

		//UNLOGGED

		for (this.i=0;this.i<10;++this.i)
	 this.GraphicsTool.DrawLine( { X: 300+this.i, Y: 580 }, { X: 500, Y: 300 }, "red", 2, 0.1+(0.1*this.i));
		this.GraphicsTool.DrawLine( { X: 310, Y: 580 }, { X: 500, Y: 300 }, "red", 2, 0.5);
		this.GraphicsTool.DrawLine( { X: 311, Y: 580 }, { X: 500, Y: 300 }, "red", 2, 0.25);

		//TEMP - also, draw missile
		this.GraphicsTool.DrawCircle(100, 200, 30, PAINT.SKY, 0);
		this.GraphicsTool.DrawCircle(100, 200, 20, "white", 0, null, null, 0.5);
	}
};
