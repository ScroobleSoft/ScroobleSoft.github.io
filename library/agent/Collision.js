
GenieAgent.prototype.DetermineFootprint = function() {

	this.Footprint.L = this.Position.X + this.BottomLeftOffset.X;
	this.Footprint.T = (this.Position.Y+this.BottomLeftOffset.Y) - this.Footprint.H;
};
GenieAgent.prototype.CheckCollision = function(asst) {  //asst can be agent, structure or (terrain) feature

	//NOTE: only RECTANGLE and CIRCLE bounding shapes are being used - polygons will be considered for addition later

	if (!this.Specs.FP && !asst.Specs.FP) {
		this.DetermineFootprint();
		asst.DetermineFootprint();
		return (SpaceUtils.CheckBoxBoxIntersection(this.Footprint, asst.Footprint));
	} else if (!this.Specs.FP)
		return (this.CheckAssetFPCollision(asst));
	else if (!asset.Specs.FP)
		return (this.CheckAgentFPCollision(asst));
	else
		return (this.CheckDualFPCollision(asst));
};
GenieAgent.prototype.CheckAgentFPCollision = function(asst) {  //used when agent has .FP, but asset doesn't

	asst.DetermineFootprint();
	for (this.i=0;this.i<this.Specs.FP.length;++this.i)
		switch (this.Specs.FP[this.i].SHAPE) {
			case SHAPE.CIRCLE:
				this.coords.Set(this.Position.X+this.Specs.FP[this.i].X, this.Position.Y+this.Specs.FP[this.i].Y);
				if (SpaceUtils.CheckBoxCircleIntersection(asst.Footprint, this.coords, this.Specs.FP[this.i].RDS))
					return (true);
			case SHAPE.RECTANGLE:
				this.rct.L = this.Position.X+this.Specs.FP[this.i].X;
				this.rct.T = this.Position.Y+this.Specs.FP[this.i].Y;
				this.rct.W = this.Specs.FP[this.i].W;
				this.rct.H = this.Specs.FP[this.i].H;
				if (SpaceUtils.CheckBoxBoxIntersection(asst.Footprint, this.rct))
					return (true);
		}
	return (false);
};
GenieAgent.prototype.CheckAssetFPCollision = function(asst) {

	this.DetermineFootprint();
	for (this.i=0;this.i<asst.Specs.FP.length;++this.i)
		switch (asst.Specs.FP[this.i].SHAPE) {
			case SHAPE.CIRCLE:
				if (asst.Location)
					this.coords.Set(asst.Location.X+asst.Specs.FP[this.i].X, asst.Location.Y+asst.Specs.FP[this.i].Y);
				else
					this.coords.Set(asst.Position.X+asst.Specs.FP[this.i].X, asst.Position.Y+asst.Specs.FP[this.i].Y);
				if (SpaceUtils.CheckBoxCircleIntersection(this.Footprint, this.coords, asst.Specs.FP[this.i].RDS))
					return (true);
			case SHAPE.RECTANGLE:
				this.rct.W = asst.Specs.FP[this.i].W;
				this.rct.H = asst.Specs.FP[this.i].H;
				if (asst.Location) {
					this.rct.L = this.Location.X + asst.Specs.FP[this.i].X;
					this.rct.T = this.Location.Y + asst.Specs.FP[this.i].Y;
				} else {
					this.rct.L = this.Position.X + asst.Specs.FP[this.i].X;
					this.rct.T = this.Position.Y + asst.Specs.FP[this.i].Y;
				}
				if (SpaceUtils.CheckBoxBoxIntersection(this.Footprint, this.rct))
					return (true);
		}
	return (false);
};
GenieAgent.prototype.CheckDualFPCollision = function(asst) {

	for (this.i=0;this.i<this.Specs.FP.length;++this.i)
		for (this.j=0;this.j<asst.Specs.FP.length;++this.j)
			if (this.Specs.FP[this.i].SHAPE==SHAPE.RECTANGLE && asst.Specs.FP[this.j].SHAPE==SHAPE.RECTANGLE) {
				if (this.CheckBoxBoxCollision(asst, this.Specs.FP[this.i], this.Specs.FP[this.j]))
					return (true);
			} else if (this.Specs.FP[this.i].SHAPE==SHAPE.RECTANGLE && asst.Specs.FP[this.j].SHAPE==SHAPE.CIRCLE) {
				if (this.CheckBoxCircleCollision(asst, this.Specs.FP[this.i], this.Specs.FP[this.j]))
					return (true);
			} else if (this.Specs.FP[this.i].SHAPE==SHAPE.CIRCLE && asst.Specs.FP[this.j].SHAPE==SHAPE.RECTANGLE) {
				if (this.CheckCircleBoxCollision(asst, this.Specs.FP[this.i], this.Specs.FP[this.j]))
					return (true);
			} else
				if (this.CheckCircleCircleCollision(asst, this.Specs.FP[this.i], this.Specs.FP[this.j]))
					return (true);

	return (false);
};
GenieAgent.prototype.CheckBoxBoxCollision = function(asst, spcs1, spcs2) {

	this.rct.Set(this.Position.X+spcs1.X, this.Position.Y+spcs1.Y, spcs1.W, spcs1.H);
	if (asst.Location)
		this.rct2.Set(this.Location.X+spcs2.X, this.Location.Y+spcs2.Y, spcs2.W, spcs2.H);
	else
		this.rct2.Set(this.Position.X+spcs2.X, this.Position.Y+spcs2.Y, spcs2.W, spcs2.H);

	return (SpaceUtils.CheckBoxBoxIntersection(this.rct, this.rct2));
};
GenieAgent.prototype.CheckBoxCircleCollision = function(asst, spcs1, spcs2) {

	this.rct.Set(this.Position.X+spcs1.X, this.Position.Y+spcs1.Y, spcs1.W, spcs1.H);
	if (asst.Location)
		this.coords.Set(this.Location.X+spcs2.X, this.Location.Y+spcs2.Y);
	else
		this.coords.Set(this.Position.X+spcs2.X, this.Position.Y+spcs2.Y);

	return (SpaceUtils.CheckBoxCircleIntersection(this.rct, this.coords, spcs2.RDS));
};
GenieAgent.prototype.CheckCircleBoxCollision = function(asst, spcs1, spcs2) {

	this.coords.Set(this.Position.X+spcs1.X, this.Position.Y+spcs1.Y);
	if (asst.Location)
		this.rct.Set(this.Location.X+spcs2.X, this.Location.Y+spcs2.Y, spcs2.W, spcs2.H);
	else
		this.rct.Set(this.Position.X+spcs2.X, this.Position.Y+spcs2.Y, spcs2.W, spcs2.H);

	return (SpaceUtils.CheckBoxCircleIntersection(this.rct, this.coords, spcs1.RDS));
};
GenieAgent.prototype.CheckCircleCircleCollision = function(asst, spcs1, spcs2) {

	this.coords.Set(this.Position.X+spcs1.X, this.Position.Y+spcs1.Y);
	if (asst.Location)
		this.coords2.Set(this.Location.X+spcs2.X, this.Location.Y+spcs2.Y);
	else
		this.coords2.Set(this.Position.X+spcs2.X, this.Position.Y+spcs2.Y);

	return (SpaceUtils.CheckCirclesIntersection(this.coords, spcs1.RDS, this.coords2, spcs2.RDS));
};
