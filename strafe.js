// Inspired from https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
// And clear() with ansi codes you basically controll the terminal
var stdin = process.stdin;
var width;

const {clear, ansi_reset,
  ansi_red,
  ansi_yellow, chance,
  ansi_yellow_bg, SNAKE_FIGHT, CANYON_WALL, ROCK_1, ROCK_2, ROCK_3,
  ansi_purple,
  ansi_dark_purple}= require('./terminalStuff');
const { setTimeout: setTimeoutPromise } = require('node:timers/promises');

let rocks = []

let intersecting = false;

function is_between(num, low, high){
	return num >= low && num <= high
}


function handle_rock(line, lindex){
	if (line){
		for (let rock of rocks){
			if (is_between(lindex, rock[2], rock[2]+rock[4]-1)){
				let rline = rock[0].split("\n")[lindex-rock[2]];

				if (rock[2]+rock[4] >= 25)
					intersecting= intersecting || line.substring(rock[1], rock[1]+rline.length).trim()
				line = line.substring(0, rock[1]) + rline + line.substring(rock[1]+rline.length, line.length);
				
			}
		}
	}
 	return line;
}


function new_rock(){
	let texture = [ROCK_1, ROCK_2, ROCK_3][Math.floor(Math.random()*3)];
	for (let attempt = 75; attempt != 0; attempt--){ // Enought attempts to be sure, could cause lag spikes
		let x = Math.floor(Math.random()*(width-14))+"M@@@@M".length;
		let y = -5;
		let height = texture.split("\n").length;
		let mwidth = 0;

		for (let line of texture.split("\n"))
			mwidth=Math.max(mwidth, line.length)
		let is_invalid = false;
		for (let other_rock of rocks){
			
		if (is_between(x, other_rock[1], other_rock[1]+other_rock[3]) 
		    || is_between(x+mwidth, other_rock[1], other_rock[1]+other_rock[3])
		    || is_between(other_rock[1], x, x+mwidth)
		    || is_between(other_rock[1]+other_rock[3], x, x+mwidth)) 
				is_invalid = true;
		}
		if (!is_invalid){
			rocks.push([texture, x, y, mwidth, height])
			return true;
		}
	}
	return false;

}


function start(){
	stdin.setRawMode( true );
	stdin.setEncoding( 'utf8' );
	stdin.resume();
}

function stop(){
	stdin.setRawMode( false );
	stdin.pause();
}
var drawrate = 100;
async function dondge_rock(doShake, shakeChance, shakeMax, shakeStrength, walkSpeed, timer, rockCount, _width){
	width = _width;
	start();
	clear();
	rocks = []

	intersecting = false;


	let shakeAmount = 0;



	let x = 20;
	let dir = 0;


	let running = true;
	stdin.on('data', function(key) {
		dir = 0;
	    if (key == "d")
	    	dir=1
	    else if (key == "a")
	    	dir=-1
	    else if (key == 'p'){
	    	drawrate*=2
	    	drawrate=Math.min(drawrate, 400)
	    }else if (key == "o")
	    	drawrate=100;
	    else
	    	dir = 0;
	 
	});
	while (rockCount > 0){
		new_rock()
		rockCount-=1
	}
	let startTime = Date.now();
	let lastTick = startTime;
	while (true){
		let t = Date.now();
		let deltaTime = t-lastTick;
		lastTick = t;

		await setTimeoutPromise(drawrate); // You need sometime for stdin to run
		x+=Math.floor(dir*walkSpeed*deltaTime/100);
		x=Math.min(x,  width-1)
		x=Math.max(x, 0);
		clear();
		let windex = 0
		let walls = CANYON_WALL.split("\n")
		for (; windex != 25; windex++)
			console.log(" ".repeat(shakeAmount) + handle_rock(walls[windex] + " ".repeat(width+3*(walls[windex].length)) + walls[windex], windex))


		for (let line of SNAKE_FIGHT.split("\n")){
			if (line){
				let tline = walls[windex]+" ".repeat(x)+line.substring(line.length-19, line.length);
				tline += " ".repeat(width+3*(walls[windex].length)+walls[windex].length-tline.length);
				console.log(" ".repeat(shakeAmount)+handle_rock(tline + walls[windex], windex));
			}
			windex+=1;
		}
		let timeLeft = Math.floor(timer-(Date.now()-startTime)/1000);
		if (timeLeft < 0){
			stop();
			return true
		}
		let bottom = "Use A, and D to move. Or any other key to stop. Avoid the rocks!";
		let timeStr = timeLeft + " secounds left"
		console.log(bottom + " ".repeat((width + 4*"M@@@@M".length)-bottom.length-timeStr.length) + timeStr);
		console.log("P to halt draw rate (for slot connections) O to reset draw rate")


		// Remove too low rock
		let removedRock = true;
		while (removedRock){
			removedRock=false;
			for (let rocki in rocks){
				rocks[rocki][2]+=1
				if (rocks[rocki][2] >= windex){
					removedRock=true;
					rocks.splice(rocki, 1)
					new_rock();
					continue;
				}
				}
		}
				// Inc rocks
		for (let rocki in rocks)
			rocks[rocki][2]+=1

		if (intersecting){
			stop()
			return false

		}
		intersecting = false;


		if (doShake)
			if (chance(shakeChance)){
				let s = Math.floor(Math.random()*shakeStrength)+1;
				if (chance(50))
					s = -s;
				shakeAmount += s;
				shakeAmount = Math.max(0, shakeAmount);
				shakeAmount = Math.min(shakeMax, shakeAmount);

			}
	}
}

module.exports = {dondge_rock}