
//----------------------------------------------
//---------- GENIE KEYBOARD --------------------  TODO: maybe RE-DESIGN so there is in entry in .Keys for every key
var GenieKeyboard = function () {
	var Keys;
};
GenieKeyboard.prototype = {
	Set() {
		this.Keys =  new Array();
	},
	DesignateSingleFireKeys(keyArray) {
		var i;
		var key;

		for (i=0;i<keyArray.length;++i) {
			key = new GenieKey();
			key.Set(keyArray[i], KEyPRESS.SINGLeFIRE);
			this.Keys.push(key);
		}
	},
	KeyPushed(keycode) {
		var key;

		key = this.GetKey(keycode);
		if (!key) {
	 key = new GenieKey();
	 key.Set(keycode, KEyPRESS.CONTINUOUS);
	 key.State = KEySTATE.PRESSED;
	 this.Keys.push(key);
		} else {
	 if (key.State==KEySTATE.READY)
		 key.State = KEySTATE.PRESSED;
		}
	 },
	KeyReleased(keycode) {
		var i;

		for (i=0;i<this.Keys.length;++i)
	 if (this.Keys[i].Code==keycode) {
		 this.Keys[i].State = KEySTATE.READY;
		 return;
	 }
	},
	GetKey(keycode) {
		var i;

		for (i=0;i<this.Keys.length;++i)
	 if (this.Keys[i].Code==keycode)
		 return (this.Keys[i]);

		return (null);
	},
	CheckKeyPressed(keyCode) {
		var key;
		var bKeyPressed;

		key = this.GetKey(keyCode);
		if (!key)
	 return (false);
		else {
	 bKeyPressed = (key.State==KEySTATE.PRESSED);
	 if (bKeyPressed && (key.Action==KEyPRESS.SINGLeFIRE))
		 key.State = KEySTATE.FIRED;
	 return (bKeyPressed);
	 }
	}
};
Keyboard = new GenieKeyboard();
