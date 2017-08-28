const MAP_SIZE = 100,
	PLAYER_WIDTH = 10,
	PLAYER_HEIGHT = 10;

function drawGrid(width, ctx) {
	const SQUARE = width / MAP_SIZE; 

  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 0.5;
  for (var i = 0; i < MAP_SIZE; i++) {
    ctx.moveTo(i * SQUARE, 0);
    ctx.lineTo(i * SQUARE, MAP_SIZE * SQUARE);
    ctx.moveTo(0, i * SQUARE);
    ctx.lineTo(MAP_SIZE * SQUARE, i * SQUARE);
  }
  ctx.stroke();
}

function getXY(string){
	const index = string.indexOf('-');
	const x = string.substring(0, index);
	const y = string.substring(index + 1);
	return [Number(x), Number(y)];
}

function drawMap(obj, ctx) {
	for (let key in obj){
  	const cell = obj[key]
  	const coords = getXY(key);
  	if (typeof cell === "number"){
  		ctx.fillStyle = ((cell == 0) ? "white": "black");
  	}else if (typeof cell === "string"){
  		ctx.fillStyle = "grey";
  	}else {
  		ctx.fillStyle = cell[2];
  	}
  	ctx.fillRect(coords[0]+1, coords[1]+1, PLAYER_WIDTH-1, PLAYER_HEIGHT-1);
  }
}

function drawPlayer(player, ctx) {
	ctx.fillStyle = player.state[2];
  ctx.fillRect(player.x+1, player.y+1, PLAYER_WIDTH-1 , PLAYER_HEIGHT-1);
}

export function drawFinalMessage(){
	const canvas = document.getElementById("gameboard");
	const ctx = canvas.getContext('2d');
	ctx.font = "64px Arial";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
}

function showLimit(radius, player, ctx){
	const x = player.x;
	const y = player.y;

	// Create a circular clipping path
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.clip();
}

export function drawDark(map_obj, player, width, radius) {
	const canvas = document.getElementById("gameboard");
	const ctx = canvas.getContext('2d');
	ctx.save();
	showLimit(radius, player, ctx);
	drawMap(map_obj, ctx);
	drawPlayer(player, ctx);
	drawGrid(width, ctx);
}

export function drawLight(map_obj, player, width) {
	const canvas = document.getElementById("gameboard");
	const ctx = canvas.getContext('2d');
	drawMap(map_obj, ctx);
	drawPlayer(player, ctx);
	drawGrid(width, ctx);
}