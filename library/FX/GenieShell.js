/*
 *  UNLOGGED - this is just a temporary structure - has to be implemented properly
 *
 *  WARNING!!! - a GenieShell already exists in agents folder
 */
var GenieShell = function() {  //TODO: probably can be parabolic or not (might need a separate GenieParabolicShell structure)
};
GenieShell.prototype = new GenieAgent();
GenieShell.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

};
