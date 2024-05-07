
//---------------------------------------------
//----------- GENIE VIEW ----------------------  NOTE: meant as main view
var GenieView = function() {
	var Canvas, Context;
	var InfoScape, ConsoleScape;						//REDUNDANT?
	var GraphicsTool, TextWriter, Randomizer;
	var ScreenRect, Perspective;
	var Specs;
	var Controls;
	var AnimationFrameHandle;
	var InfoView, ConsoleView, NestedView;
	var ToggleFlag, Scrolling;						//.Scrolling REDUNDANT? should be .ScrollingFlag if not
	var Scale, State, Frames;
};
GenieView.prototype = {
	Set(cnvs, specs, sRect) {
		this.Canvas = cnvs;
		this.Context = this.Canvas.Context;
		this.ScreenRect = sRect;
		this.Specs = specs;
		this.Controls = new Array();
		this.ToggleFlag = true;
		this.SetData();
		this.SetControls();
		this.SetImages();
		this.SetComponents();
	},
	SetLinks(gTool, tWriter, rGenerator) {

		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
	},
	SetSubScapes(iScape, cScape) {	//TODO: probably REDUNDANT

		this.InfoScape = iScape;
		this.ConsoleScape = cScape;
	},
	SetSubViews(iView, cView) {  //NOTE: applicable only to main view

		this.InfoView = iView;
		this.ConsoleView = cView;
	},
	SetPerspective(prspctv) {

		this.Perspective = prspctv;
	},
	SetData() {  //NOTE: meant to be over-ridden (optionally)
	},
	SetControls() {  //NOTE: meant to be over-ridden (optionally)
	},
	SetImages() {  //NOTE: meant to be over-ridden (optionally)
	},
	SetComponents() {  //NOTE: meant to be over-ridden (optionally)
	},
	DeActivateControls() {

		this.Controls.forEach( function(cntrl) {cntrl.DeActivate();} );
	},
	ActivateControls() {

		this.Controls.forEach( function(cntrl) {cntrl.Activate();} );
	},
	Scale(scale) {

		this.Scale = scale;
		this.Context.scale(this.Scale, this.Scale);
	},
	ResetScale() {

		this.Context.scale(1/this.Scale, 1/this.Scale);
	},
	Open() {

		Game.View = this;
		this.Canvas.View = this;
		if (this.Specs.COLOUR)
			this.ColourScape(null, this.Specs.COLOUR);
		this.Draw();
		this.Controls.forEach(function(cntrl) {cntrl.Show();});
		if (this.InfoView)
			this.InfoView.Open();
		if (this.ConsoleView)
			this.ConsoleView.Open();
		if (typeof Game)
			Game.Interface.ResumeInput();
		else
			this.Canvas.ResumeInput();
	},
	Update() {

		if (this.InfoView)
			this.InfoView.Update();
		if (this.ConsoleView)
			this.ConsoleView.Update();
		if (this.NestedView)
			this.NestedView.Close();
	},
	Close(func, ms) {

		cancelAnimationFrame(this.AnimationFrameHandle);

		//Disable interface
		if (typeof Game)
			Game.Interface.SuspendInput();
		else
			this.Canvas.SuspendInput();
		Mouse.ClearAll();
		if (GAME.CONTROLLER & GAMePAD.TOUChSCREEN)
			TouchScreen.ClearAll();

		//De-activate controls
		if (this.Controls.length)
			this.Controls.forEach( function(cntrl) {cntrl.DeActivate();} );

		//Close sub-views
		if (this.InfoView)
			this.InfoView.Close();
		if (this.ConsoleView)
			this.ConsoleView.Close();
		if (this.NestedView)
			this.NestedView.Close();

		//Call supplied function
		if ( func && ms )
			setTimeout(func, ms);
	},
	Enable() {

		this.Open();
		this.Update();
	},
	Disable() {

		cancelAnimationFrame(this.AnimationFrameHandle);

		if (this.Controls.length)
			this.Controls.forEach(function(cntrl){cntrl.DeActivate();});
		if (this.NestedView)
			this.NestedView.Controls.forEach(function(cntrl){cntrl.DeActivate();});
		this.Darken();

		if (this.InfoView)
			this.InfoView.Disable();
		if (this.ConsoleView)
			this.ConsoleView.Disable();
	},
	Draw() {  //NOTE: meant to be over-ridden
	},
	ColourScape(scape, colour) {

		colour = colour || this.Specs.COLOUR;

		if (scape) {
			scape.Context.fillStyle = colour;
			scape.Context.fillRect(0, 0, scape.Element.width, scape.Element.height);
		} else {
			this.Context.fillStyle = colour;
			this.Context.fillRect(0, 0, this.Canvas.Element.width, this.Canvas.Element.height);
		}
	},
	Darken() {
		var opcty;

		opcty = this.Context.globalAlpha;
		this.Context.globalAlpha = 0.5;
		this.Context.fillStyle = "black";
		this.Context.fillRect(0, 0, this.Canvas.Element.width, this.Canvas.Element.height);
		this.Context.globalAlpha = opcty;
	},
	UpdateMouse() {

		//Update screen rect
		if (Mouse.X<0 && Mouse.CanvasId==CANVAS.PRIME) {
			--this.ScreenRect.L;
			this.Scrolling = true;
		}
		if (Mouse.X>=INFoBOX.WIDTH && Mouse.CanvasId==CANVAS.ZOOM) {
			++this.ScreenRect.L;
			this.Scrolling = true;
		}
		if (Mouse.X>=CONTROlPANEL.WIDTH && Mouse.CanvasId==CANVAS.CONSOLE) {
			++this.ScreenRect.L;
			this.Scrolling = true;
		}
		if (Mouse.Y<0 && Mouse.CanvasId==CANVAS.PRIME) {
			--this.ScreenRect.T;
			this.Scrolling = true;
		}
		if (Mouse.Y>=SCREEN.HEIGHT && Mouse.CanvasId==CANVAS.PRIME) {
			++this.ScreenRect.T;
			this.Scrolling = true;
		}

		//Safety checks
		if (this.ScreenRect.L+SCREEN.WIDTH>=MAP.W)
			this.ScreenRect.L = MAP.W - SCREEN.WIDTH;
		if (this.ScreenRect.T+SCREEN.HEIGHT>=MAP.H)
			this.ScreenRect.T = MAP.H - SCREEN.HEIGHT;
		if (this.ScreenRect.L<0)
			this.ScreenRect.L = 0;
		if (this.ScreenRect.T<0)
			this.ScreenRect.T = 0;
	},
	LaunchDialogBox(id) {

		//-this is meant to be an alert box, but will need flexibility in terms of size and controls (especially buttons) within it - ideally,
		// will disable the view and launch a subview whose specs will include their size, so all mouse activity within this sub-window will be ignored
		//-will there be multiple sub-windows and sub-views . . . no plans as such, but might need to expand this feature
		//-eventually might even have subsubviews of subviews
	}
};
