'use strict';

let diam,strokeW,hrCol,mnCol,scCol,bgCol;
let hands;
let hr,mn,sc;

let clocks = {
	"chorded": {
		"active": false
		,"draw": function () {
			noFill();

			stroke(scCol);
			//fill(scCol);
			let endSecs = map(sc, 0, 60, 0, 360);
			arc(0, 0, diam*.75, diam*.75, 0, endSecs, CHORD); 

			stroke(mnCol);
			//fill(mnCol);
			let endMins = map(mn, 0, 60, 0, 360);
			arc(0, 0, diam*.70, diam*.70, 0, endMins, CHORD);

			stroke(hrCol);
			//fill(hrCol);
			let endHrs = map(hr%12, 0,12 , 0, 360);
			arc(0, 0, diam*.65, diam*.65, 0, endHrs, CHORD);

			if (hands) {
				drawHands(endHrs, endMins, endSecs);
			}
		}
	}

	,"pie": {
		"active": false
		,"draw": function () {
			noFill();

			stroke(scCol);
			//fill(scCol);
			let endSecs = map(sc, 0, 60, 0, 360);
			arc(0, 0, diam*.75, diam*.75, 0, endSecs, PIE); 

			stroke(mnCol);
			//fill(mnCol);
			let endMins = map(mn, 0, 60, 0, 360);
			arc(0, 0, diam*.70, diam*.70, 0, endMins, PIE);

			stroke(hrCol);
			//fill(hrCol);
			let endHrs = map(hr%12, 0,12 , 0, 360);
			arc(0, 0, diam*.65, diam*.65, 0, endHrs, PIE);
			
			if (hands) {
				drawHands(endHrs, endMins, endSecs);
			}
		}
	}

	,"chordedpie": {
		"active": false
		,"draw": function () {
			noFill();

			stroke(scCol);
			//fill(scCol);
			let endSecs = map(sc, 0, 60, 0, 360);
			arc(0, 0, diam*.75, diam*.75, 0, endSecs, PIE); 
			arc(0, 0, diam*.75, diam*.75, 0, endSecs, CHORD); 

			stroke(mnCol);
			//fill(mnCol);
			let endMins = map(mn, 0, 60, 0, 360);
			arc(0, 0, diam*.70, diam*.70, 0, endMins, PIE);
			arc(0, 0, diam*.70, diam*.70, 0, endMins, CHORD);

			stroke(hrCol);
			//fill(hrCol);
			let endHrs = map(hr%12, 0,12 , 0, 360);
			arc(0, 0, diam*.65, diam*.65, 0, endHrs, PIE);
			arc(0, 0, diam*.65, diam*.65, 0, endHrs, CHORD);

			if (hands) {
				drawHands(endHrs, endMins, endSecs);
			}
		}
	}

	,"arc": {
		"active": false
		,"draw": function () {
			noFill();

			stroke(scCol);
			//fill(scCol);
			let endSecs = map(sc, 0, 60, 0, 360);
			arc(0, 0, diam*.75, diam*.75, 0, endSecs); 

			stroke(mnCol);
			//fill(mnCol);
			let endMins = map(mn, 0, 60, 0, 360);
			arc(0, 0, diam*.70, diam*.70, 0, endMins);

			stroke(hrCol);
			//fill(hrCol);
			let endHrs = map(hr%12, 0,12 , 0, 360);
			arc(0, 0, diam*.65, diam*.65, 0, endHrs);

			if (hands) {
				drawHands(endHrs, endMins, endSecs);
			}
		}
	}
}

function drawHands(endHrs, endMins, endSecs) {
	push();
	rotate(endHrs);
	stroke(hrCol);
	line(0,0,(diam*.65)/2,0);
	pop();

	push();
	rotate(endMins);
	stroke(mnCol);
	line(0,0,(diam*.70)/2,0);
	pop();

	push();
	rotate(endSecs);
	stroke(scCol);
	line(0,0,(diam*.75)/2,0);
	pop();
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	angleMode(DEGREES);

	bgCol = color(0,0,0);

	hrCol = color(150,100,255);
	scCol = color(255,150,100);
	mnCol = color(100,255,150);

	height < width ? diam = height : diam = width;

	strokeW = floor(map(diam, 10, 1900, 3, 25));
	strokeWeight(strokeW);

	hands = true;
	clocks['arc'].active = true;
}

function mouseReleased() {
	if (mouseButton === "left") {
		let setActive;

		for (let clock in clocks) {
			if (setActive) {
				clocks[clock].active = true;
				setActive = false;
			} else if (clocks[clock].active) { 
				clocks[clock].active = false;
				setActive = true;
			} 
		}

		if (setActive) {
			clocks[Object.keys(clocks)[0]].active = true;
		}
	}
}

function keyReleased() {
	if (key == " ") {
		hands ? hands = false : hands = true;
	} 
}

function draw() {
	background(bgCol);

	translate(width/2, height/2);
	rotate(-90);
	
	sc = second();
	mn = minute() + (sc/60);
	hr = hour() + (mn/60); 

	for (let clock in clocks) {
		if (clocks[clock].active) {
			clocks[clock].draw();
		}
	}
}
