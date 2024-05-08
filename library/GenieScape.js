
//-------------------------------------------
//---------- GENIE SCAPE --------------------
var GenieScape = function () {
	var PrimeScape, ZoomScape, Console;
	var Dashboard, HelpDeck;
	var Screen, InfoBox, ControlPanel, Ticker, Tabloid;
	var Width, Height, Orientation;
	var Controls;
	var ControllerA, ControllerB;
	var Scale;										//percentage
	var ReSizedFlag, ReOrientedFlag;
	var ExpandedFlag;
};
GenieScape.prototype = {
	Set(pCnvs, zCnvs, cCnvs, tCnvs, hCnvs, cntrls) {
		this.SetMainCanvases(pCnvs, zCnvs, cCnvs);
		this.SetScrollingCanvases(tCnvs, hCnvs);
		this.SetContexts();
		this.SetDimensions();
		this.SetControls(cntrls);
		this.ExpandedFlag = false;

		window.addEventListener("resize", this.ReSized.bind(this));
	},
	SetMainCanvases(pCnvs, zCnvs, cCnvs) {

		this.PrimeScape = new GenieCanvas();
		this.PrimeScape.Set(pCnvs, CANVAS.PRIME);
		if (zCnvs) {
			this.ZoomScape = new GenieCanvas();
			this.ZoomScape.Set(zCnvs, CANVAS.ZOOM);
		}
		if (cCnvs) {
			this.Console = new GenieCanvas();
			this.Console.Set(cCnvs, CANVAS.CONSOLE);
		}
	},
	SetScrollingCanvases(tCnvs, hCnvs) {

		if (tCnvs) {
			this.Dashboard = new GenieCanvas();
			this.Dashboard.Set(tCnvs, CANVAS.TICKER);
		}
		if (hCnvs) {
			this.HelpDeck = new GenieCanvas();
			this.HelpDeck.Set(hCnvs, CANVAS.HELP);
		}
	},
	SetContexts() {

		this.Screen = this.PrimeScape.Context;
		if (this.ZoomScape)
			this.InfoBox = this.ZoomScape.Context;
		if (this.Console)
			this.ControlPanel = this.Console.Context;
		if (this.Dashboard)
			this.Ticker = this.Dashboard.Context;
		if (this.HelpDeck)
			this.Tabloid = this.HelpDeck.Context;
	},
	SetDimensions(cntrls) {

		this.Width = window.innerWidth;
		this.Height = window.innerHeight;
		if (this.Width>this.Height)
			this.Orientation = ORIENTATION.LANDSCAPE;
		else
			this.Orientation = ORIENTATION.PORTRAIT;
	},
	SetControls(cntrls) {
		var i;

		if (cntrls) {
			this.Controls = cntrls;
			for (i=0;i<this.Controls.length;++i) {
				document.getElementById(this.Controls[i][CONTROL.ID]).style.position = "absolute";
				document.getElementById(this.Controls[i][CONTROL.ID]).style.top = this.Controls[i][CONTROL.TOP];
				document.getElementById(this.Controls[i][CONTROL.ID]).style.left = this.Controls[i][CONTROL.LEFT];
			 }
		}
	},
	SetScale(scale) {

		this.Scale = scale;
		this.PrimeScape.SetScale(this.Scale/100);
		if (this.ZoomScape)
			this.ZoomScape.SetScale(this.Scale/100);
		if (this.Console)
			this.Console.SetScale(this.Scale/100);
		if (this.Dashboard)
			this.Dashboard.SetScale(this.Scale/100);
		if (this.HelpDeck)
			this.HelpDeck.SetScale(this.Scale/100);
	},
	ResetScale(scale) {

 		this.Scale = 100;
		this.PrimeScape.ResetScale();
		if (this.ZoomScape)
			this.ZoomScape.ResetScale();
		if (this.Console)
			this.Console.ResetScale();
		if (this.Dashboard)
			this.Dashboard.ResetScale();
		if (this.HelpDeck)
			this.HelpDeck.ResetScale();
	},
	AddController(cntrls, snglFireKeys) {

		if (this.ControllerA==null) {
			this.ActivateKeyHandler();
			this.ControllerA = new GenieGamePad();
			this.ControllerA.Set(cntrls, snglFireKeys);
		} else {
			this.ControllerB = new GenieGamePad();
			this.ControllerB.Set(cntrls, snglFireKeys);
		}
	},
	ActivateKeyHandler() {

		document.addEventListener("keydown", this.KeyPushed);
		document.addEventListener("keyup", this.KeyReleased);
		Keyboard.Set();
	},
	KeyPushed(Event) {

		Keyboard.KeyPushed(Event.keyCode);
	},
	KeyReleased(Event) {

		Keyboard.KeyReleased(Event.keyCode);
	},
	SuspendInput() {

		this.PrimeScape.SuspendInput();
		if (this.ZoomScape)
			this.ZoomScape.SuspendInput();
		if (this.Console)
			this.Console.SuspendInput();
		if (this.Dashboard)								//TODO: most likely is needed
			this.Dashboard.SuspendInput();
		if (this.HelpDeck)								//TODO: may not be necessary
			this.HelpDeck.SuspendInput();
	},
	ResumeInput() {

		this.PrimeScape.ResumeInput();
		if (this.ZoomScape)
			this.ZoomScape.ResumeInput();
		if (this.Console)
			this.Console.ResumeInput();
		if (this.Dashboard)								//TODO: most likely is needed
			this.Dashboard.ResumeInput();
		if (this.HelpDeck)								//TODO: may not be necessary
			this.HelpDeck.ResumeInput();
	},
	SetViewport() {  //NOTE: launches Help Deck if space exists

		//Check if there is space for slideshow canvas
		if (Game.Settings & GAME.FLEXIBLE)
			if (window.innerWidth<SCREEN.WIDTH+INFoBOX.WIDTH+TABLOID.WIDTH)
				return;

		//Move Canvases
		if (this.Dashboard)
			document.getElementById("TickerDiv").style.left = TABLOID.WIDTH + 12 + "px";
		document.getElementById("PrimeDiv").style.left = TABLOID.WIDTH + 12 + "px";
		document.getElementById("ZoomDiv").style.left = TABLOID.WIDTH + SCREEN.WIDTH + 12 + "px";
		document.getElementById("ConsoleDiv").style.left  = TABLOID.WIDTH + SCREEN.WIDTH + 12 + "px";
		document.getElementById("HelpDiv").style.left = "8px";
		document.getElementById("HelpDiv").style.top  = "8px";
		this.HelpDeck.Element.height = TABLOID.HEIGHT;

		//Move standard buttons - NOTE: buttons may not exist in mobile apps
		if (document.getElementById("StartButton"))
			document.getElementById("StartButton").style.left = TABLOID.WIDTH + SCREEN.WIDTH + 16 + "px";
		if (document.getElementById("LoadButton"))
			document.getElementById("LoadButton").style.left  = TABLOID.WIDTH + SCREEN.WIDTH + 76 + "px";
		if (document.getElementById("SaveButton"))
			document.getElementById("SaveButton").style.left  = TABLOID.WIDTH + SCREEN.WIDTH + 136 + "px";
		if (document.getElementById("TestButton"))
			document.getElementById("TestButton").style.left  = TABLOID.WIDTH + SCREEN.WIDTH + 196 + "px";

		//TODO: buttons may be optional (actually, REDUNDANT)
		if (document.getElementById("NormalButton")) {
			document.getElementById("NormalButton").style.left = "10px";
			document.getElementById("NormalButton").style.top  = TABLOID.HEIGHT + 15 + "px";
		}
		if (document.getElementById("WindowButton")) {
			document.getElementById("WindowButton").style.left = "105px";
			document.getElementById("WindowButton").style.top  = TABLOID.HEIGHT + 15 + "px";
		}
		if (document.getElementById("ScreenButton")) {
			document.getElementById("ScreenButton").style.left = "200px";
			document.getElementById("ScreenButton").style.top  = TABLOID.HEIGHT + 15 + "px";
		}

		//Move viewport and option buttons
		if (document.getElementById("ExpandButton"))
			document.getElementById("ExpandButton").style.left = TABLOID.WIDTH + SCREEN.WIDTH + 16 + "px";
		if (document.getElementById("FullScreenButton"))
			document.getElementById("FullScreenButton").style.left = TABLOID.WIDTH + SCREEN.WIDTH + 96 + "px";
		if (document.getElementById("SettingsButton"))
			document.getElementById("SettingsButton").style.left = TABLOID.WIDTH + SCREEN.WIDTH + 196 + "px";
	},
	ReSized() {

		this.ReSizedFlag = true;

		//Update dimensions and orientation
		this.Width = window.innerWidth;
		this.Height = window.innerHeight;
		if (this.Width<this.Height) {
			if (this.Orientation==ORIENTATION.LANDSCAPE)
				this.ReOrientedFlag = true;
			this.Orientation = ORIENTATION.PORTRAIT;
		} else {
			if (this.Orientation==ORIENTATION.PORTRAIT)
				this.ReOrientedFlag = true;
			this.Orientation = ORIENTATION.LANDSCAPE;
		}

		//TODO: this portion will be configured in Game.Options, and meant for mobile platforms
		if (this.ReOrientedFlag)
			this.ReOrient();
	},
	CheckReSized() {

		if (this.ReSizedFlag) {
			this.ReSizedFlag = false;
			return (true);
		} else
			return (false);
	},
	CheckReOriented() {

		if (this.ReOrientedFlag) {
			this.ReOrientedFlag = false;
			return (true);
		} else
			return (false);
	},
	CheckLandscape() {

		return (this.Orientation==ORIENTATION.LANDSCAPE);
	},
	CheckPortrait() {

		return (this.Orientation==ORIENTATION.PORTRAIT);
	},
	ReOrient() {  //TODO: have to adjust for Prime Canvas position, which may not be 8px (get using document.getElementById("PrimeDiv").style.top)

		if (this.Orientation==ORIENTATION.LANDSCAPE) {
			document.getElementById("ZoomDiv").style.left = SCREEN.WIDTH + 12 + "px";
			document.getElementById("ZoomDiv").style.top = "8px";
			this.ZoomScape.Element.width = INFoBOX.WIDTH;
			this.ZoomScape.Element.height = INFoBOX.HEIGHT;
			document.getElementById("ConsoleDiv").style.left  = SCREEN.WIDTH + 12 + "px";
			document.getElementById("ConsoleDiv").style.top  = INFoBOX.HEIGHT + 12 + "px";
			this.Console.Element.width = CONTROlPANEL.WIDTH;
			this.Console.Element.height = CONTROlPANEL.HEIGHT;
		} else {
			document.getElementById("ZoomDiv").style.left = "8px";
			document.getElementById("ZoomDiv").style.top = SCREEN.HEIGHT + 12 + "px";
			this.ZoomScape.Element.width = INFoBOX.HEIGHT;
			this.ZoomScape.Element.height = INFoBOX.WIDTH;
			document.getElementById("ConsoleDiv").style.left  = INFoBOX.WIDTH + 12 + "px";
			document.getElementById("ConsoleDiv").style.top  = SCREEN.HEIGHT + 12 + "px";
			this.Console.Element.width = CONTROlPANEL.HEIGHT;
			this.Console.Element.height = CONTROlPANEL.WIDTH;
		}
	},
	Expand() {

		this.DetermineScale();
		document.getElementsByTagName('body')[0].style.zoom = this.Scale + "%";
		this.ExpandedFlag = true;
	},
	DetermineScale() {
		var w, h;
		var xScale, yScale;

		//Determine unused horizontal space
		w = SCREEN.WIDTH;
		if (this.ZoomScape)
			w += INFoBOX.WIDTH;
		w += 12;																	//the usual padding
		if (this.HelpDeck)
			w += TABLOID.WIDTH;

		//Determine unused vertical space
		h = SCREEN.HEIGHT;
		if (this.Dashboard)
			h += TICKER.HEIGHT;
		h += 12;																	//the usual padding

		//Pick the smaller scale
		if (this.CheckFullScreen()) {
			xScale = Math.floor((window.screen.width/w)*100);
			yScale = Math.floor((window.screen.height/h)*100);
		} else {																		//browser window
			xScale = Math.floor((window.innerWidth/w)*100);
			yScale = Math.floor((window.innerHeight/h)*100);
		}
		this.SetScale(Math.min(xScale, yScale));
	},
	Contract() {

		document.getElementsByTagName('body')[0].style.zoom = "100%";
		this.ResetScale();
		this.ExpandedFlag = false;
	},
	SetFullScreen() {

		document.documentElement.requestFullscreen()
			.then(() => {})
			.catch(err => { alert("Full screen mode not available") } );
			
		if (this.ExpandedFlag) {
			this.DetermineScale();
			document.getElementsByTagName('body')[0].style.zoom = this.Scale + "%";
		}
	},
	SetBrowserSize() {

		document.exitFullscreen()
			.then(() => {})
			.catch((err) => { alert("Can not exit full screen mode") } );
			
		if (this.ExpandedFlag) {
			this.DetermineScale();
			document.getElementsByTagName('body')[0].style.zoom = this.Scale + "%";
		}
	},
	CheckFullScreen() {

		if (window.screen.width==window.innerWidth)		//NOTE: .width better than .height since some OS's retain taskbars
			return (true);
	}
};
