
GenieAgent.prototype.Update = function() {
	//TODO: this is where 'selected' status should be verified/updated
	//TODO: there could be default behaviour of 0.5 opacity yellow rectangle around selected agent

	//First check if on a path; if so, check to see if at destination - if so, set the destination for the next node if there is one
	if (this.Path) {  //TODO: should check motion status rather than this (PATHFOLLOWING?)
		if (this.CheckAtDestination()) {
			++this.PathNode;
			if (this.PathNode==this.Path.length) {
				if (this.State.Motion==STATE.MOTION.PATROLLING) {
					this.PathNode = 0;
					this.SetDestination(this.Path[this.PathNode]);
				} else {
					this.Velocity.X = 0;
					this.Velocity.Y = 0;
					this.State.Motion = STATE.MOTION.STATIONARY;
					this.Path = null;					//ISSUE: could become garbage collection inefficient in some cases
				}
			} else
			this.SetDestination(this.Path[this.PathNode]);
		} else
		this.Move();
	}

	//Process movement
	if (this.Controller && this.CheckSelected()) {
		this.Controller.CheckControls();
		if (!this.Specs.CONTROLLER)		//NOTE: this is DEFAULT and includes SLIDE controls
			this.UpdateSlideControls();
		else if (this.Specs.CONTROLLER.TYPE==CONTROLLER.CARDINAL)
			this.UpdateCardinalControls();
		else if (this.Specs.CONTROLLER.TYPE==CONTROLLER.TANK)
			this.UpdateTankControls();
	}

	if (this.State.Motion==STATE.MOTION.ADVANCING) {
		this.Move();
		if (this.Animation)		//update sprite state if animated
			this.UpdateAnimation();
		if (this.MaxSteps) {		//NOTE: this step is necessary since there might not be a destination
			++this.Steps;
			if (this.Steps==this.MaxSteps) {
				this.State.Motion = STATE.MOTION.STATIONARY;
				this.State.Animation.State = 0;
			}
		}
	}

	if (this.Form)
		if (this.Form.Type==SPRITeFORM.ROTATED)
			this.Form.Angle = this.Angle;

	//Fire cannon if present and charged
	if (this.Cannon)
		this.Cannon.Update();
};
GenieAgent.prototype.UpdateSlideControls = function() {  //NOTE: this is not really applicable to any isometric perspective (possible TODO)

	this.y = 1;
	if (this.Specs.PERSPECTIVE)
		if (this.Specs.PERSPECTIVE==PERSPECTIVE.SIDeVIEW)
			this.y = 0.5;

	this.Controller.CheckControls();
	if (this.Controller.Up || this.Controller.Down || this.Controller.Left || this.Controller.Right) {
		this.State.Motion = STATE.MOTION.CONTROLLER;
		if (this.Specs.ANIMATION)
			this.UpdateAnimation();
		//TODO: update .Tile if Tiled, also Space if GenieSpace is used - could set Velocity, then call ::Move
		if (this.Controller.Up)		this.Position.Y -= this.y*this.Speed;
		if (this.Controller.Right) this.Position.X += this.Speed;
		if (this.Controller.Down)  this.Position.Y += this.y*this.Speed;
		if (this.Controller.Left)  this.Position.X -= this.Speed;
	} else {
		this.State.Motion = STATE.MOTION.STATIONARY;
		if (this.Specs.ANIMATION)
			this.ResetAnimation();
	}
};
GenieAgent.prototype.UpdateCardinalControls = function() {

	//LOGGED - UNTESTED

	this.Controller.CheckControls();
	if (this.Controller.Up || this.Controller.Down || this.Controller.Left || this.Controller.Right) {

		//Update state
		this.State.Motion = STATE.MOTION.CONTROLLER;
		if (this.Specs.ANIMATION)
			this.UpdateAnimation();

		//Update direction and velocity
		if (this.Controller.Left) {
			--this.Direction;
			if (this.Direction<0)
				this.Direction += DIRECTION.COUNT;
		}
		if (this.Controller.Right) {
			++this.Direction;
			if (this.Direction==DIRECTION.COUNT)
				this.Direction -= DIRECTION.COUNT;
		}
		if (this.Controller.Left || this.Controller.Right)
			switch (this.Direction) {
				case DIRECTION.N:
					this.Velocity.Set(0, -this.Speed);
					break;
				case DIRECTION.NE:
					this.Velocity.Set(Math.SQRT2*this.Speed, -Math.SQRT2*this.Speed);
					break;
				case DIRECTION.E:
					this.Velocity.Set(this.Speed, 0);
					break;
				case DIRECTION.SE:
					this.Velocity.Set(Math.SQRT2*this.Speed, Math.SQRT2*this.Speed);
					break;
				case DIRECTION.S:
					this.Velocity.Set(0, this.Speed);
					break;
				case DIRECTION.SW:
					this.Velocity.Set(-Math.SQRT2*this.Speed, Math.SQRT2*this.Speed);
					break;
				case DIRECTION.N:
					this.Velocity.Set(-this.Speed, 0);
					break;
				case DIRECTION.N:
					this.Velocity.Set(-Math.SQRT2*this.Speed, -Math.SQRT2*this.Speed);
					break;
			 }

		//Update movement
		if (this.Controller.Up)
			this.Move();
		if (this.Controller.Down) {
			this.coords.Set(-this.Velocity.X/2, -this.Velocity.Y/2);
			this.Move(coords);
		}
	} else {
		this.State.Motion = STATE.MOTION.STATIONARY;
		if (this.Specs.ANIMATION)
			this.ResetAnimation();
	}
};
GenieAgent.prototype.UpdateTankControls = function() {  //Left-Right for turning, Down for reverse at half-speed

	this.Controller.CheckControls();
	if (this.Controller.Up || this.Controller.Down || this.Controller.Left || this.Controller.Right) {
		this.State.Motion = STATE.MOTION.CONTROLLER;
		if (this.Specs.ANIMATION)
			this.UpdateAnimation();
		if (this.Controller.Left) {
			if (this.Turning)
				this.Angle -= this.Turning.TurnAngle;
			else
				--this.Angle;
			this.angle = GeoUtils.DegreesToRadians(this.Angle);
			this.Velocity.X = this.Speed*Math.sin(this.angle);
			this.Velocity.Y = -this.Speed*Math.cos(this.angle);
		}
		if (this.Controller.Right) {
			if (this.Turning)
				this.Angle += this.Turning.TurnAngle;
			else
				++this.Angle;
			this.angle = GeoUtils.DegreesToRadians(this.Angle);
			this.Velocity.X = this.Speed*Math.sin(this.angle);
			this.Velocity.Y = -this.Speed*Math.cos(this.angle);
		}
		if (this.Controller.Up)
			this.Move();
		if (this.Controller.Down) {
			this.coords.Set(-this.Velocity.X/2, -this.Velocity.Y/2);
			this.Move(this.coords);
		}
	} else {
		this.State.Motion = STATE.MOTION.STATIONARY;
		if (this.Specs.ANIMATION)
			this.ResetAnimation();
	}

	if (this.Angle<0)
		this.Angle += DEGREES;
	if (this.Angle>=DEGREES)
		this.Angle -= DEGREES;
};
GenieAgent.prototype.UpdateCabinetControls = function() {

	this.Controller.CheckControls();
	if (this.Controller.Up || this.Controller.Down || this.Controller.Left || this.Controller.Right) {
		this.State.Motion = STATE.MOTION.CONTROLLER;
		if (this.Specs.ANIMATION)
			this.UpdateAnimation();
		if (this.Controller.Up)	 { this.Position.Y -= this.Speed; this.Position.X += this.Speed; }
		if (this.Controller.Right) this.Position.X += this.Speed;
		if (this.Controller.Down)  { this.Position.Y += this.Speed; this.Position.X -= this.Speed; }
		if (this.Controller.Left)  this.Position.X -= this.Speed;
	} else {
		this.State.Motion = STATE.MOTION.STATIONARY;
		if (this.Specs.ANIMATION)
			this.ResetAnimation();
	}
};
GenieAgent.prototype.Move = function() {
	//UNLOGGED
	MobileObject.prototype.Move.call(this);

	if (this.Specs.TILES) {
		this.Tile.C = Math.floor((this.Position.X+this.CentreOffset.X)/this.Specs.TILES.W);
		this.Tile.R = Math.floor((this.Position.Y+this.CentreOffset.Y)/this.Specs.TILES.H);
		if (Game.CheckFogOfWar())
			Map.UpdateLightMap(this.Tile, this.Side);
		//-if Space, update linked list
	}
};
