/*
 *  NOTE: .Footprint is for collision detection, .BoundingBox is for screen click detection
 */
GenieAgent.prototype.SetPosition = function(pos) {
	MobileObject.prototype.SetPosition.call(this, pos);

	this.DetermineScreenCoords();
};
GenieAgent.prototype.SetDestination = function(pos) {
	MobileObject.prototype.SetDestination.call(this, pos);

	//TODO: may not need to use 'square' and calculate distance - one axis and velocity components should suffice

	this.State.Motion = STATE.MOTION.ADVANCING;
	this.Steps = 0;
	this.distance = SpaceUtils.GetDistance(this.Position, this.Destination);
	this.MaxSteps = Math.round(this.distance/this.Speed);
};
GenieAgent.prototype.DetermineBoundingBox = function() {  //REDUNDANT

	if (this.ScreenRect) {
		this.BoundingBox.L = (this.Position.X-this.ScreenRect.L) + this.BottomLeftOffset.X;
		this.BoundingBox.T = (this.Position.Y-this.ScreenRect.T) + this.BottomLeftOffset.Y;
	} else {
		this.BoundingBox.L = this.Position.X + this.BottomLeftOffset.X;
		this.BoundingBox.T = this.Position.Y + this.BottomLeftOffset.Y;
	}

	if (this.Specs)
		if (this.Specs.H) {
	 this.BoundingBox.T -= this.Specs.H;
	 return;
		}
	this.BoundingBox.T -= this.Sprite.Specs.H;
};
GenieAgent.prototype.UpdateBoundingBox = function() {  //ASSUMPTION: Screen Coords have been determined
/*
	this.BoundingBox.L = this.Position.X;
	this.BoundingBox.T = this.Position.Y;
	if (this.ScreenRect) {
		this.BoundingBox.L -= this.ScreenRect.L;
		this.BoundingBox.T -= this.ScreenRect.T;
	}
*/
	this.BoundingBox.L = this.ScreenCoords.X;
	this.BoundingBox.T = this.ScreenCoords.Y - this.BoundingBox.H;
	if (this.Specs.X || this.Specs.Y) {
		this.BoundingBox.L += this.Specs.X;
		this.BoundingBox.T += this.Specs.Y;
	}
};
GenieAgent.prototype.CheckClicked = function() {  //ASSUMPTION: Bounding Box has been updated

	switch (true) {	//TODO: leaving switch in here because there will be circles and boxes cases, maybe also a mix of the 2, plus polygons
		case this.Specs.BC:
			this.coords.Set(this.BoundingBox.L+this.CentreOffset.X, this.BoundingBox.T-this.CentreOffset.Y);
			return (SpaceUtils.CheckPointInCircle(Mouse.Click, this.coords, this.Specs.BC));
			break;
		case this.Specs.BB:
		case this.Specs.BR:
		default:
			return (SpaceUtils.CheckPointInBox(Mouse.Click, this.BoundingBox));
	}
};
GenieAgent.prototype.CheckMouseDowned = function() {
	//UNLOGGED
	if (this.Specs.BS) {
	} else {
		this.DetermineBoundingBox();
		return (SpaceUtils.CheckPointInBox(Mouse.Down, this.BoundingBox));
	}
};
GenieAgent.prototype.CheckUnderCursor = function() {  //ASSUMPTION: Bounding Box has been updated

	return (SpaceUtils.CheckPointInBox(Mouse, this.BoundingBox));
};
GenieAgent.prototype.CheckOnScreen = function() {  //NOTE: if top-down, implementation here saves need for including extra files (e.g. PerspectiveUtils.js)
/*
	if (this.Specs.PERSPECTIVE) {
		if (this.Sprite)
	 return (PerspectiveUtils.CheckOnScreen(this.Position, this.Sprite.Specs.W, this.Sprite.Specs.H));
		else
	 return (PerspectiveUtils.CheckOnScreen(this.Position, this.Specs.W, this.Specs.H));
	} else {
*/
		this.UpdateBoundingBox();
/*
		if ( (this.BoundingBox.L<SCREEN.WIDTH) && ((this.BoundingBox.L+this.BoundingBox.W)>0) && (this.BoundingBox.T<SCREEN.HEIGHT) &&
			 ((this.BoundingBox.T+this.BoundingBox.H)>0) ) {
*/
		if (SpaceUtils.CheckBoxBoxIntersection(this.BoundingBox, this.ScreenRect)) {
	 this.SetVisible();
	 //-possible extra step here to attach to ScreenManager's VisibleObjects list, but then also Z-Index calculation should be called
	 return (true);
		}
//		return (SpaceUtils.CheckBoxBoxIntersection(this.BoundingBox, this.ScreenRect));	REDUNDANT as soon as above safe
/*	} */
};
GenieAgent.prototype.GetShape = function() {

	if (!this.Specs.SHAPE)
		return (SHAPE.RECTANGLE);
	else
		return (this.Specs.SHAPE);
};
GenieAgent.prototype.GetMidpoint = function() {

	if (this.Specs.M)
		return (this.Specs.M);
	else {
		if (this.Specs.P)
	 return (this.Specs.P/2);
		else
	 return (this.Sprite.Specs.H/2);
	}
};
GenieAgent.prototype.GetRadius = function() {

	if (this.Specs.R)
		return (this.Specs.R);

	if (this.Specs.W)
		return (Math.max(this.Specs.W, this.Specs.H));

	return (Math.max(this.Sprite.Specs.W, this.Sprite.Specs.H));
};
