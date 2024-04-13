/*
 *  NOTE: ImageGallery is being ditched altogether
 *
 *  ASSUMPTIONS: GeoUtils.js (for radian conversions)
 */
//-------------------------------------------
//---------- GENIE SPRITE -------------------
var GenieSprite = function() {
	var Context;
	var Pic;
	var Specs;
	var Left, Top;
/*
	var ImageGallery;
	var BoundingShapes;		//can be circles or rects; circles only if rotatable
*/
	var Diagonal;		//longest diagonal, used in buffering and collision detection . . . maybe REDUNDANT
	var Offsets;
	var Scale, Angle, Flipped;

	var xScale, yScale;
};
GenieSprite.prototype = {
	Set(cntxt, pic, specs) {
		this.Context = cntxt;
		this.Pic = pic;
		this.Specs = specs;
		if (this.Specs.ALIGN)
			this.SetAlignment();
		this.Left = this.Specs.L;
		this.Top = this.Specs.T;
	},
	SetContext(cntxt) {

		this.Context = cntxt;
	},
	SetAlignment() {

		//UNLOGGED - TODO: only handling a few cases right now

		this.Offsets = new Coordinate2D();
		switch (this.Specs.ALIGN) {
	 case ALIGNMENT.CENTRE:
		 this.Offsets.Set(-this.Specs.W/2, this.Specs.H/2);
		 break;
	 case ALIGNMENT.CENTReLEFT:
		 this.Offsets.Set(-this.Specs.W/2, 0);
		 break;
	 case ALIGNMENT.TOpLEFT:
		 this.Offsets.Set(0, this.Specs.H/2);
		 break;
	 case ALIGNMENT.BOTTOmLEFT:
	 default:
		 this.Offsets.Set(0, 0);
		 break;
		}
	},
	Draw(x, y, bRounded) {  //TODO: add alignment argument, making next 3 (or 4) methods redundant

		if (bRounded) {
			x = Math.round(x);
			y = Math.round(y);
		}
		this.Context.drawImage(this.Pic, this.Left, this.Top, this.Specs.W, this.Specs.H, x, y-(this.Specs.H-1), this.Specs.W, this.Specs.H);
	},
	DrawAligned(x, y) {

		x += this.Offsets.X;
		y += this.Offsets.Y;
		this.Draw(x, y);
	},
	DrawFlipped(x, y, ornttn) {

		this.xScale = 1;
		this.yScale = 1;
		if (ornttn & FLIPPED.HORIZONTAL) {
			this.xScale = -this.xScale;
			x = - (x+this.Specs.W);
		}
		if (ornttn & FLIPPED.VERTICAL) {
			this.yScale = -this.yScale;
			y = - (y+this.Specs.H);
		}

		if (ornttn)					//NOTE: sometimes it can be useful to call this method with no flipping specified
			this.Context.scale(this.xScale, this.yScale);
		this.Draw(x, y);
		if (ornttn)
			this.Context.scale(this.xScale, this.yScale);
	},
	DrawRotated(x, y, angle) {  //NOTE: this is a very basic implementation with no alignment adjustment

		//TODO: could adjust alignment offsets here to see if it works Ok

		angle = GeoUtils.DegreesToRadians(angle);

		//Move to centre of sprite - or specified rotation centre
		if (this.Specs.RC) {
	 x += this.Specs.RC.X;
	 y += this.Specs.RC.Y;
		} else {
	 x += Math.round(this.Specs.W/2);
	 y -= Math.round(this.Specs.H/2);
		}

		//Draw after translating and rotating
		this.Context.translate(x, y);
		this.Context.rotate(angle);
		this.Context.drawImage(this.Pic, this.Left, this.Top, this.Specs.W, this.Specs.H, -(this.Specs.W/2), -(this.Specs.H/2), this.Specs.W, this.Specs.H);
		this.Context.rotate(-angle);
		this.Context.translate(-x, -y);
	},
	DrawResized(x, y, scale) {

		this.Context.drawImage(this.Pic, this.Left, this.Top, this.Specs.W, this.Specs.H, x, y-(scale*this.Specs.H), scale*this.Specs.W, scale*this.Specs.H);
	}
};
