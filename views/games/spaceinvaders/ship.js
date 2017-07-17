function Ship() {
	this.x = width/2;
	this.xdir = 0;
	this.y = height-20;

	this.show = function() {
		noStroke();
		fill(255);
		rectMode(CENTER);
		rect(this.x, this.y, 20, 60);
	}

	this.setDir = function(dir){
		this.xdir = dir;
	}
	this.getDir = function(){
		return this.x;
	}

	this.move = function(dir) {
		this.x += this.xdir*5;

	}
}