
//------------------------------------------
//---------- GENIE GAME --------------------
var GenieNewGame = function () {						//TODO: will eventually replace GenieGame
	var Interface;
	var Components;
	var Settings, Level, Type;			//NOTE: .Type is mostly for random/scheduled etc.
	var AnimationFrameHandle;
};
GenieNewGame.prototype = {
	Set() {
		this.Interface = GameScape;		//TODO: bit of a hack (used in GenieView, needs to replaced with GameScape)
		this.Settings = 0;
		this.Level = 0;
	},
	CheckImagesLoaded() {

		this.AnimationFrameHandle = requestAnimationFrame(this.CheckImagesLoaded.bind(this));

		if (ImageManager.AllLoaded) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.Components.Set();
			this.Start();
		}
	},
	Start() {

		IntroView.Open();
		IntroView.Update();
	},
	SetDaily(date) {
		var dt;

		dt = new Date();
		this.Randomizer.SetDailySeed(dt);
		Calendar.SetBaseDate(date);
	},
	Pause() {

		this.Settings += GAME.STATE.PAUSED;
	},
	Resume() {

		this.Settings -= GAME.STATE.PAUSED;
	},
	CheckPaused() {

		return (this.Settings & GAME.STATE.PAUSED);
	},
	CheckExpanded() {

		return (this.Settings & GAME.SCREEN.EXPANDED);
	},
	CheckFullScreen() {

		return (this.Settings & GAME.SCREEN.FULL);
	},
	CheckTouchScreen() {

		return (this.Settings & GAME.CONTROLLER.TOUCHSCREEN);
	},
	CheckTrackPad() {

		return (this.Settings & GAME.CONTROLLER.TRACKPAD);
	},
	SwitchFogOfWarOn() {

		this.Settings += GAME.FOgOfWAR;
	},
	SwitchFogOfWarOff() {

		this.Settings -= GAME.FOgOfWAR;
	},
	CheckFogOfWar() {

		return (this.Settings & GAME.FOgOfWAR);
	},
	SetTiled() {

		this.Settings += GAME.TILED;
	},
	CheckTiled() {

		return (this.Settings & GAME.TILED);
	},
	SetMobile() {

		this.Settings = GAME.PLATFORM.PHONE;

		SCREEN.WIDTH = SCREEN.MOBILE.W;
		SCREEN.HEIGHT = SCREEN.MOBILE.H;
		INFoBOX.WIDTH = INFoBOX.MOBILE.W;
		INFoBOX.HEIGHT = INFoBOX.MOBILE.H;
		CONTROlPANEL.WIDTH = CONTROlPANEL.MOBILE.W;
		CONTROlPANEL.HEIGHT = CONTROlPANEL.MOBILE.H;
	},
	CheckMobile() {

		return (this.Settings & GAME.PLATFORM.PHONE);
	},
	CheckPhone() {

		return (this.Settings & GAME.PLATFORM.PHONE);
	},
	CheckTablet() {

		return (this.Settings & GAME.PLATFORM.TABLET);
	},
	CheckPC() {  //UNLOGGED - this could change when approach to tablets is decided (tablets can be called PC's too)

		return (!this.CheckMobile());
	},
	CheckDesktop() {  //UNLOGGED - desktop only, not tablet

		//-
	}
};
