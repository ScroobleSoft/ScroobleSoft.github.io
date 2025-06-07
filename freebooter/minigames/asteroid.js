/*
 *  3D frogger, using coloured outlines to show altitude
 *  single key altitude change, fluid direction change
 *  since movement is not tank-controlled based, might have to show jet exhaust to indicate ship being stopped
 *  progressively stronger shields can be bought that allow longer mining sessions
 *  asteroids could have anywhere from 8 to 20 sides, spin at different rates, travel at different speeds, with altitude calculated to make sure there
 *   are no inter-asteroid collisions
 *  ships move at only half the speed back as forward, and will be 'framed' so that it is always between 250px and 500px; ship won't be faster in
    reverse than slowest asteroid
 *  ships are only allowed in the asteroid lane (belt), and straying from it ends in immediate arrest
 */
SolarMiniGames.prototype.SetAsteroidMining = function() {
};
SolarMiniGames.prototype.PlayAsteroidMining = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayAsteroidMining.bind(this));

};
