
//----------------------------------------------
//---------- GENIE GAME PAD --------------------
var GenieGamePad = function() {
	var Up, Right, Down, Left;
	var LeftClick, RightClick;
	var TopLeft, TopRight, BottomLeft, BottomRight;	//applicable to numeric keypad (only)
	var Controls;
};
GenieGamePad.prototype = {
	Set(cntrls, snglFireKeys) {
		this.ResetControls();
		this.Controls = cntrls || GAMePAD.ARROWS;
		if (snglFireKeys)
			Keyboard.DesignateSingleFireKeys(snglFireKeys);
	},
	ResetControls() {

		this.Left = false;
		this.Up = false;
		this.Right = false;
		this.Down = false;
		this.LeftClick = false;
		this.RightClick = false;
		this.TopLeft = false;
		this.TopRight = false;
		this.BottomLeft = false;
		this.BottomRight = false;
	},
	CheckControls() {

		this.ResetControls();

		switch (this.Controls) {
			case GAMePAD.ARROWS:
				this.CheckArrowControls();
				break;
			case GAMePAD.WASD:
				this.CheckWASDControls();
				break;
			case GAMePAD.NUMERIC:
				this.CheckNumericControls();
				break;
		}
	},
	CheckArrowControls() {

		if (Keyboard.CheckKeyPressed(ARROwPAD.LEFT))			this.Left = true;
		if (Keyboard.CheckKeyPressed(ARROwPAD.RIGHT))		this.Right = true;
		if (Keyboard.CheckKeyPressed(ARROwPAD.UP))			this.Up = true;
		if (Keyboard.CheckKeyPressed(ARROwPAD.DOWN))			this.Down = true;
		if (Keyboard.CheckKeyPressed(ARROwPAD.CLICkLEFT))  this.LeftClick = true;
		if (Keyboard.CheckKeyPressed(ARROwPAD.CLICkRIGHT)) this.RightClick = true;
	},
	CheckWASDControls() {

		if (Keyboard.CheckKeyPressed(WASdPAD.LEFT))		  this.Left = true;
		if (Keyboard.CheckKeyPressed(WASdPAD.RIGHT))		  this.Right = true;
		if (Keyboard.CheckKeyPressed(WASdPAD.UP))			  this.Up = true;
		if (Keyboard.CheckKeyPressed(WASdPAD.DOWN))		  this.Down = true;
		if (Keyboard.CheckKeyPressed(WASdPAD.CLICkLEFT))  this.LeftClick = true;
		if (Keyboard.CheckKeyPressed(WASdPAD.CLICkRIGHT)) this.RightClick = true;
	},
	CheckNumericControls() {

		if (Keyboard.CheckKeyPressed(NUMERIcPAD.LEFT))			this.Left = true;
		if (Keyboard.CheckKeyPressed(NUMERIcPAD.RIGHT))			this.Right = true;
		if (Keyboard.CheckKeyPressed(NUMERIcPAD.UP))				this.Up = true;
		if (Keyboard.CheckKeyPressed(NUMERIcPAD.DOWN))			this.Down = true;
		if (Keyboard.CheckKeyPressed(NUMERIcPAD.TOpLEFT))		this.TopLeft = true;
		if (Keyboard.CheckKeyPressed(NUMERIcPAD.TOpRIGHT))		this.TopRight = true;
		if (Keyboard.CheckKeyPressed(NUMERIcPAD.BOTTOmLEFT))  this.BottomLeft = true;
		if (Keyboard.CheckKeyPressed(NUMERIcPAD.BOTTOmRIGHT)) this.BottomRight = true;
	},
	HandleKeyPress(key, keyPrimeState) {		//REDUNDANT?

		if (keyPrimeState) {
			key = true;
			keyPrimeState = false;
		}
	},
	CheckKeyReady(key) {		//REDUNDANT?
		if (!this.KeysState)
			return (true);
		else {
	 if (this.SingleFire)
//		 switch (key) {
			 //check all keys individually
		 var temp = 0;
//		 }
	 else
		 //check if key is in array, check its state
		 var temp = 0;
		}
	}
};
