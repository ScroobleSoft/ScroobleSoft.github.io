
//---------------------------------------------
//----------- GENIE VIEW ----------------------
var GenieView = function() {
	var Canvas, Context;
	var ZoomScape, Console;
	var GraphicsTool, TextWriter, Randomizer;
	var ScreenRect, Perspective;
	var Specs;
	var Controls;
	var AnimationFrameHandle;
	var InfoView, ConsoleView, NestedView;
	var ToggleFlag, Scrolling;						//.Scrolling REDUNDANT? should be .ScrollingFlag if not
	var Scale, State, Frames, Option;
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
		this.SetImages();
		this.SetControls();
		this.SetComponents();
	},
	SetLinks(gTool, tWriter, rGenerator) {

		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
	},
	SetSubScapes(zScape, cScape) {

		this.ZoomScape = zScape;
		this.Console = cScape;
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
		this.ShowControls();
		if (this.NestedView)
			this.NestedView.Open();
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
			this.NestedView.Update();
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
	OpenInfoView(iView) {

		if (this.InfoView)
			this.InfoView.Close();
		iView.Open();
		this.InfoView = iView;
	},
	OpenConsoleView(cView) {

		if (this.ConsoleView)
			this.ConsoleView.Close();
		cView.Open();
		this.ConsoleView = cView;
	},
	ShowControls() {

		this.Controls.forEach(function(cntrl) {cntrl.Show();});
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
		scape = scape || this.Canvas;

		scape.Context.fillStyle = colour;
		if (this.Specs.W)
			scape.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
		else
			scape.Context.fillRect(0, 0, this.Canvas.Element.width, this.Canvas.Element.height);
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
	},
	SetImage(img, specs) {
		var pic;

		pic = new GenieImage();
		pic.Set(this.Context, img, specs);

		return (pic);
	},
	SetTextButton(specs, iCrnrs, tWriter) {
		var btn;

		btn = new TextButton();
		btn.Set(this.Canvas, specs, tWriter);
		btn.SetCornersPic(iCrnrs);
		this.Controls.push(btn);

		return (btn);
	},
	SetImageButton(specs, img, iCrnrs) {
		var btn;

		btn = new ImageButton();
		btn.Set(this.Canvas, specs, img);
		btn.SetCornersPic(iCrnrs);
		this.Controls.push(btn);

		return (btn);
	},
	SetCheckBox(specs, img, tWriter) {  //UNLOGGED - UNTESTED
		var chkbx;

		chkbx = new GenieCheckBox();
		chkbx.Set(this.Canvas, specs, img);
		chkbx.SetLinks(null, this.TextWriter);
		this.Controls.push(chkbx);

		return (chkbx);
	},
	SetCornersIcon(specs, img, iSpecs, cImg) {
		var iIcon;
		var icon;

		iIcon = new GenieImage();
		iIcon.Set(this.Context, img, iSpecs);
		icon = new GenieIcon();
		icon.Set(this.Canvas, specs, iIcon);
		icon.SetCornersPic(cImg);
		this.Controls.push(icon);

		return (icon);
	},
	SetCornersIconPanel(specs, iSpecs, cImg, gTool, img) {
		var iPnl;

		iPnl = new GenieIconPanel();
		iPnl.Set(this.Canvas, specs, iSpecs, img);
		iPnl.SetCornersPic(cImg);
		iPnl.SetLinks(gTool);
		this.Controls.push(iPnl);

		return (iPnl);
	},
	SetBevelledIconPanel(specs, iSpecs, bSpecs) {
		var iPnl;
		var iBvl;

		iBvl = new GenieImage();
		iBvl.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], bSpecs);

		iPnl = new GenieIconPanel();
		iPnl.Set(this.Canvas, specs, iSpecs);
		iPnl.SetBevelPic(iBvl);
		this.Controls.push(iPnl);

		return (iPnl);
	},
	SetTouchBar(specs, iSpecs, img) {
		var tBar;

		tBar = new GenieTouchBar();
		tBar.Set(this.Canvas, specs, iSpecs, img);
		this.Controls.push(tBar);

		return (tBar);
	}
};
