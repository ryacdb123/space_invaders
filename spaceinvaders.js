var ship;
var drops = [];
var flowers = [];
var right;
var left;

function setup(){
	createCanvas(600, 600);
	ship = new Ship();
	//drop = new Drop(width/2, height/2 - 240);
	for (var i = 0; i < 7; i++){
		for(var j = 0; j < 2; j++){
			flowers[i] = new Flower(i*80+80, 75);
		}
		

	}
	

}
function draw(){
	background(51);
	ship.show();

	
	
	for (var i = 0; i < drops.length; i++){
		drops[i].show();
		drops[i].move();
		
		for (var j = 0; j < flowers.length; j++){
			if(drops[i].hits(flowers[j])){
				flowers[j].grow();
				drops[i].delete();
			}
		}
	}
	for (var i = 0; i < flowers.length; i++){
		for(var j = 0; j < 2; j++){
			if(flowers[i].r > 25){
				flowers[i].x = Ship.x;
				flowers[i].y = Ship.y;
			}
			else{
				flowers[i].show();
			}
		}

		flowers[i].move();
		if(flowers[i].x >= width){
			right = true;
		}
		if(flowers[i].x <= 0){
			left = true;
		}
	
	}

	if(right){
		for (var i = 0; i < flowers.length; i++){
			flowers[i].xdir = -1;
			right = false;
		}
	}

	if(left){
		for (var i = 0; i < flowers.length; i++){
			flowers[i].xdir = 1;
			left = false;
		}
	}
}

function Ship(){
	this.x = width/2;

	this.show = function(){
		fill(255);
		rectMode(CENTER);
		rect(this.x, height-20, 20, 60);
	}

	this.move = function(dir){
		this.x += dir*5;
	}
}

function keyPressed(){
	if(keyCode===RIGHT_ARROW){
		ship.move(1);
	} else if(keyCode === LEFT_ARROW){
		ship.move(-1);
	} 

	if(key === ' '){
		var drop = new Drop(ship.x, height-60);
		drops.push(drop);
	}
}

function Flower(x, y){
	this.x = x;
	this.y = y;
	this.r = 20;
	this.xdir = 1;
	this.ydir = 0;

	this.show = function(){
		fill(255, 0, 200);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	this.grow = function()
	{
		this.r = this.r + 1;
	}

	this.move = function(){
		this.x = this.x + this.xdir;
		this.y += this.ydir;
	}
}

function Drop(x, y){
	this.x = x;
	this.y = y;
	this.r = 4;

	this.delete = function(){
		this.x = Ship.x;
		this.y = Ship.y;
	}

	this.show = function(){
		fill(50, 0, 200);
		ellipse(this.x, this.y, 8, 8);
	}

	this.move = function(){
		this.y = this.y -3;
	}

	this.hits = function(target){
		var d = dist(this.x, this.y, target.x, target.y);
		if(d < this.r + target.r){
			return true;
		}
		else {
			return false;
		}
	}
}