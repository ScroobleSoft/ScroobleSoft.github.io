
//--------------------------------------------------
//---------- DOMINION CHARACTER --------------------
var DominionCharacterGenerator = function() {
	var GraphicsTool, Randomizer;
	var Nation, Colour;
	var Profile;
	var Gender, HairIndex, FaceIndex, EyesIndex, NoseIndex, EyelidIndex;
	var State, EyeState, MouthState;
	var Frames, EyeFrames, MouthFrames;
	var X, Y;
	var HairX, HairY, EyeLX, EyeLY, EyeRX, EyeRY, MouthX, MouthY;		//used in ::Update
};
DominionCharacterGenerator.prototype = {
	Set(gTool, rGenerator) {
		this.GraphicsTool = gTool;
		this.Randomizer = rGenerator;
		this.State = DOMINION.CHARACTER.STATE.QUIET;
		this.EyeState = DOMINION.CHARACTER.EYE.STATE.OPEN;
		this.MouthState = DOMINION.CHARACTER.MOUTH.STATE.CLOSED;
		this.MouthFrames = 20;
		this.EyeFrames = 240;
	},
	SetProfile(profile) {

		this.Profile = profile;
		this.Gender = this.Profile & DOMINION.CHARACTER.BITS.GENDER;
		this.HairIndex = BitUtils.GetBits(this.Profile, DOMINION.CHARACTER.BITS.HAIR.S, DOMINION.CHARACTER.BITS.HAIR.E);
		this.FaceIndex = BitUtils.GetBits(this.Profile, DOMINION.CHARACTER.BITS.FACE.S, DOMINION.CHARACTER.BITS.FACE.E);
		this.EyesIndex = BitUtils.GetBits(this.Profile, DOMINION.CHARACTER.BITS.EYES.S, DOMINION.CHARACTER.BITS.EYES.E);
		this.EyelidIndex = (8*Math.floor(this.EyesIndex/8)) + this.FaceIndex;
		this.NoseIndex = BitUtils.GetBits(this.Profile, DOMINION.CHARACTER.BITS.NOSE.S, DOMINION.CHARACTER.BITS.NOSE.E);
	},
	SetNation(nation) {

		this.Nation = nation;
		this.Colour = DominionUtils.GetPrimaryColour(this.Nation);
	},
	SetSpeakingDuration(secs) {

		this.Frames = 60 * secs;
	},
	GenerateName() {
		var iName;
		var name;

		iName = this.Randomizer.GetIndex(CapitalConsonants.length);
		name = CapitalConsonants[iName];
		if (name=="Q")
			name += "u";
		else {
			iName = this.Randomizer.GetIndex(Vowels.length);
			name += Vowels[iName];
		}
		iName = this.Randomizer.GetIndex(Consonants.length);
		name += Consonants[iName];
		if (name=="q")
			name += "u";
		else {
			iName = this.Randomizer.GetIndex(Vowels.length);
			name += Vowels[iName];
		}
		iName = this.Randomizer.GetIndex(Consonants.length);
		name += Consonants[iName];

		return (name);
	},
	GenerateProfile(bGender) {

		//Gender
		this.Profile = 0;
		if (bGender) {
			switch (bGender) {
				case GENDER.MALE:
					this.Profile = 0;
					break;
				case GENDER.FEMALE:
					this.Profile = 1;
					break;
			}
			this.Gender = this.Profile;
		} else {
			if (this.Randomizer.CheckBoolean())
				this.Profile = 1;
		}

		//Hair and Face
		this.HairIndex = this.Randomizer.GetIndex(8);
		this.Profile = BitUtils.AddAtBits(this.Profile, this.HairIndex, DOMINION.CHARACTER.BITS.HAIR.E)
		this.FaceIndex = this.Randomizer.GetIndex(8);
		this.Profile = BitUtils.AddAtBits(this.Profile, this.FaceIndex, DOMINION.CHARACTER.BITS.FACE.E)

		//Features
		this.EyesIndex = this.Randomizer.GetIndex(64);
		this.Profile = BitUtils.AddAtBits(this.Profile, this.EyesIndex, DOMINION.CHARACTER.BITS.EYES.E)
		this.NoseIndex = this.Randomizer.GetIndex(8);
		this.Profile = BitUtils.AddAtBits(this.Profile, this.NoseIndex, DOMINION.CHARACTER.BITS.NOSE.E)

		return (this.Profile);
	},
	GenerateMaleProfile() {

		this.GenerateProfile(GENDER.MALE);
	},
	GenerateFemaleProfile() {

		this.GenerateProfile(GENDER.FEMALE);
	},
	Draw(x, y) {

		this.X = x;
		this.Y = y;

		if (this.CheckMale())
			this.DrawAttire(this.X, this.Y);
		else
			LongHairImages.DrawPatchNumber(this.HairIndex, this.X+DOMINION.CHARACTER.HAIR.LONG.X, this.Y+DOMINION.CHARACTER.HAIR.LONG.Y);

		//Face
		if (this.CheckMale()) {
			UrnFaceImages.DrawPatchNumber(this.FaceIndex, this.X+DOMINION.CHARACTER.FACE.M.X, this.Y+DOMINION.CHARACTER.FACE.M.Y);
			this.X += DOMINION.CHARACTER.FACE.M.X;
			this.Y += DOMINION.CHARACTER.FACE.M.Y;
		} else {
			FaceImages.DrawPatchNumber(this.FaceIndex, this.X+DOMINION.CHARACTER.FACE.F.X, this.Y+DOMINION.CHARACTER.FACE.F.Y);
			this.X += DOMINION.CHARACTER.FACE.F.X;
			this.Y += DOMINION.CHARACTER.FACE.F.Y;
		}

		EyeBrowImages.DrawPatchNumber(this.HairIndex, this.X+DOMINION.CHARACTER.EYEBROW.L.X, this.Y+DOMINION.CHARACTER.EYEBROW.L.Y);
		EyeBrowImages.DrawPatchNumber(this.HairIndex, this.X+DOMINION.CHARACTER.EYEBROW.R.X, this.Y+DOMINION.CHARACTER.EYEBROW.R.Y);

		//Eyes
		this.EyeLX = this.X + DOMINION.CHARACTER.EYE.L.X;
		this.EyeLY = this.Y + DOMINION.CHARACTER.EYE.L.Y;
		EyeImages.DrawPatchNumber(this.EyesIndex, this.EyeLX, this.EyeLY);
		this.EyeRX = this.X + DOMINION.CHARACTER.EYE.R.X;
		this.EyeRY = this.Y + DOMINION.CHARACTER.EYE.R.Y;
		EyeImages.DrawPatchNumber(this.EyesIndex, this.EyeRX, this.EyeRY);

		NoseImages.DrawPatchNumber(this.NoseIndex, this.X+DOMINION.CHARACTER.NOSE.X, this.Y+DOMINION.CHARACTER.NOSE.Y);
		this.MouthX = this.X + DOMINION.CHARACTER.MOUTH.X;
		this.MouthY = this.Y + DOMINION.CHARACTER.MOUTH.Y;
		MouthImages.DrawPatchNumber(2*this.FaceIndex, this.MouthX, this.MouthY);

		//Hair
		this.HairX = this.X;
		if (this.CheckMale()) {
			this.HairY = this.Y + DOMINION.CHARACTER.HAIR.M;
			HairStyleImages.DrawPatchNumber(this.HairIndex, this.HairX, this.HairY);
		} else {
			this.HairY = this.Y + DOMINION.CHARACTER.HAIR.F;
			HairDoImages.DrawPatchNumber(this.HairIndex, this.HairX, this.HairY);
		}

		if (!this.CheckMale())
			this.DrawAttire(x, y);
	},
	Update() {

		this.UpdateEyes();
		this.UpdateMouth();
	},
	UpdateEyes() {

		//Eyes
		switch (this.EyeState) {
			case DOMINION.CHARACTER.EYE.STATE.OPEN:
				--this.EyeFrames;
				if (!this.EyeFrames) {
					this.EyeState = DOMINION.CHARACTER.EYE.STATE.CLOSING;
					this.EyeFrames = 15;
					HalfEyeImages.DrawPatchNumber(this.HairIndex, this.EyeLX, this.EyeLY);
					HalfEyeImages.DrawPatchNumber(this.HairIndex, this.EyeRX, this.EyeRY);
				}
				break;
			case DOMINION.CHARACTER.EYE.STATE.CLOSING:
				--this.EyeFrames;
				if (!this.EyeFrames) {
					this.EyeState = DOMINION.CHARACTER.EYE.STATE.CLOSED;
					this.EyeFrames = 15;
					ClosedEyeImages.DrawPatchNumber(this.HairIndex, this.EyeLX, this.EyeLY);
					ClosedEyeImages.DrawPatchNumber(this.HairIndex, this.EyeRX, this.EyeRY);
				}
				break;
			case DOMINION.CHARACTER.EYE.STATE.CLOSED:
				--this.EyeFrames;
				if (!this.EyeFrames) {
					this.EyeState = DOMINION.CHARACTER.EYE.STATE.OPENING;
					this.EyeFrames = 15;
					EyeImages.DrawPatchNumber(this.EyesIndex, this.EyeLX, this.EyeLY);
					EyeImages.DrawPatchNumber(this.EyesIndex, this.EyeRX, this.EyeRY);
					HalfEyeImages.DrawPatchNumber(this.EyelidIndex, this.EyeLX, this.EyeLY);
					HalfEyeImages.DrawPatchNumber(this.EyelidIndex, this.EyeRX, this.EyeRY);
				}
				break;
			case DOMINION.CHARACTER.EYE.STATE.OPENING:
				--this.EyeFrames;
				if (!this.EyeFrames) {
					this.EyeState = DOMINION.CHARACTER.EYE.STATE.OPEN;
					this.EyeFrames = 240;
					EyeImages.DrawPatchNumber(this.EyesIndex, this.EyeLX, this.EyeLY);
					EyeImages.DrawPatchNumber(this.EyesIndex, this.EyeRX, this.EyeRY);
				}
				break;
		}

		if (!this.CheckMale())
			HairDoImages.DrawPatchNumber(this.HairIndex, this.X+DOMINION.CHARACTER.FACE.F.X, this.Y+DOMINION.CHARACTER.FACE.F.Y+DOMINION.CHARACTER.HAIR.F);
	},
	UpdateMouth() {

		if (this.State==DOMINION.CHARACTER.STATE.TALKING) {

			//update mouth
			--this.MouthFrames;
			if (!this.MouthFrames) {
				if (this.MouthState==DOMINION.CHARACTER.MOUTH.STATE.CLOSED) {
					this.MouthFrames = 20;
					MouthImages.DrawPatchNumber((2*this.FaceIndex)+1, this.MouthX, this.MouthY);
					this.MouthState = DOMINION.CHARACTER.MOUTH.STATE.OPEN;
				} else {
					this.MouthFrames = 20;
					MouthImages.DrawPatchNumber(2*this.FaceIndex, this.MouthX, this.MouthY);
					this.MouthState = DOMINION.CHARACTER.MOUTH.STATE.CLOSED;
				}
			}

			//update speaking duration
			--this.Frames;
			if (!this.Frames)
				this.State = DOMINION.CHARACTER.STATE.QUIET;
		}
	},
	DrawAttire(x, y) {
		var pnts;

		//Shirt
		if (this.CheckMale())
			pnts = [ { X: 0, Y: 100 }, { X: 0, Y: 79 }, { X: 39, Y: 68 }, { X: 61, Y: 68 }, { X: 100, Y: 79 }, { X: 100, Y: 100 } ];
		else
			pnts = [ { X: 0, Y: 100 }, { X: 0, Y: 82 }, { X: 13, Y: 70 }, { X: 87, Y: 70 }, { X: 100, Y: 82 }, { X: 100, Y: 100 } ];
		this.GraphicsTool.DrawPolygon(x, y, pnts, this.Colour, 0);

		//Outline
		if (this.CheckMale()) {
			this.GraphicsTool.DrawLine( { X:    x, Y: y+79 }, { X: x+39, Y: y+68 }, "black", 1);
			this.GraphicsTool.DrawLine( { X: x+61, Y: y+68 }, { X: x+100, Y: y+79 }, "black", 1);
		} else {
			this.GraphicsTool.DrawLine( { X:    x, Y: y+82 }, { X:  x+13, Y: y+70 }, "black", 1);
			this.GraphicsTool.DrawLine( { X: x+87, Y: y+70 }, { X: x+100, Y: y+82 }, "black", 1);
		}

		TieImages.DrawPatchNumber(DominionUtils.GetSecondaryIndex(this.Nation), x+DOMINION.CHARACTER.TIE.X, y+DOMINION.CHARACTER.TIE.Y);
	},
	CheckMale() {

		return (!BitUtils.CheckBit(this.Profile, DOMINION.CHARACTER.BITS.GENDER));
	},
	SetMugShotContext(context) {

		this.cntxt = HairStyleImages.Context;

		this.GraphicsTool.SetContext(context);

		HairStyleImages.Context = context;
		HairDoImages.Context = context;
		LongHairImages.Context = context;
		EyeBrowImages.Context = context;
		EyeImages.Context = context;
		HalfEyeImages.Context = context;
		ClosedEyeImages.Context = context;
		FaceImages.Context = context;
		UrnFaceImages.Context = context;
		NoseImages.Context = context;
		MouthImages.Context = context;
		TieImages.Context = context;
	},
	ResetMugShotContext() {

		this.GraphicsTool.ResetContext();

		HairStyleImages.Context = this.cntxt;
		HairDoImages.Context = this.cntxt;
		LongHairImages.Context = this.cntxt;
		EyeBrowImages.Context = this.cntxt;
		EyeImages.Context = this.cntxt;
		HalfEyeImages.Context = this.cntxt;
		ClosedEyeImages.Context = this.cntxt;
		FaceImages.Context = this.cntxt;
		UrnFaceImages.Context = this.cntxt;
		NoseImages.Context = this.cntxt;
		MouthImages.Context = this.cntxt;
		TieImages.Context = this.cntxt;
	}
};
