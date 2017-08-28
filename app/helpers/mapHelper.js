import Map1 from './map1.json'; 
import Map2 from './map2.json';
import Map3 from './map3.json';

//example of gameMap
// let gameMap = {
// 	'x-y': 0 - tile,
//         1 - wall,
// generic array: ['type', 'name', 'color', health, damage, score]
//         ['h', 0...100, "color"]
//         ["w", "name", "damage" "color"] 
//         ["e", "damage", "health", "color"] 
// }
// 
// health: [0, 100]
// weapon: "frozen tuna fish", "hammer", "sword"
// damage: [6, 10] - 6,7,8 for ordinary enemy, 10 for boss
// color: white - empty tile in the room, black - walls, [orange - magenta] - enemy, 
// yellow - boss, violet - weapon, green - medicine, blue - player
// score - points add to player score to construct level and level upgrade
// pick up stuff and kill enemy to get score -> level upgrade (gives more health)

function chooseMap(){
	const maps = [Map1, Map2, Map3];
	const index = getRandomInt(0,2);
	return maps[index];
}


export function createEmptyMap(width, height) {
	let gameMap = {};
	for (let x = 0; x <= width; x+=10){
		for (let y = 0; y <= height; y+=10){
			const pos = `${x}-${y}`;
			gameMap[pos] = 0; 
		}
	}
	return gameMap; 
}

export function getMap(dungeon) {
	let curMap = {};
	switch(dungeon){
		case 1:
			curMap = Map1;
			break;
		case 2:
			curMap = Map2;
			break;
		case 3:
			curMap = Map3;
			break;
	}
	let copy = Object.assign({}, curMap);
	const width = 1000, height = 600;
	let finalMap = addItems(copy, width, height, getEnemy);
	finalMap = addItems(finalMap, width, height, getWeapons);
	finalMap = addItems(finalMap, width, height, getMedicine);
	if (dungeon < 3) {
		finalMap = addOnePiece(finalMap, width, height, () => "P");
	} else {
		finalMap = addOnePiece(finalMap, width, height, getBoss);	
	}
	return finalMap; 
}

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function addItems(map_obj, w, h, callBack) {
	const numItems = getRandomInt(7,10);

	for (let i=0; i<numItems; i++){
		const item = callBack();
		const posX = Math.floor(Math.random()* w / 10) *10;
		const posY = Math.floor(Math.random()* h / 10) *10;
		const key = `${posX}-${posY}`;

		if (map_obj[key] === 0){
			map_obj[key] = item;
		}else{
			i--;
			continue;
		}
	}
	return map_obj;	
}

function getEnemy() {
	const health = getRandomInt(50, 90);
	const damage = getRandomInt(6, 8);
	const score = getRandomInt(10,15);
	let color = ''; 
	switch (damage) {
		case 6:
			color = "#d45012";
			break;
		case 7:
			color = "#d41235";
			break;
		case 8:
			color = "#d41296";
			break; 
	}
	return ["e", "", color, health, damage, score];
}


function getWeapons() {
	const weaponList = [["frozen tuna fish", 6], ["hammer", 7], ["sword", 8]];
	const index = getRandomInt(0,2);
	const name = weaponList[index][0];
	const damage = weaponList[index][1];
	const score = getRandomInt(5,10);
	const color = '#d5a9f5';
	return ["w", name, color, 0, damage, score];
}

function getMedicine() {
	const health = getRandomInt(20, 50);
	const score = getRandomInt(5,10);
	const color = '#348d01';
	return ["m", "", color, health, 0, score];
}

function getBoss() {
	const health = 149;
	const damage = 10;
	const score = 50;
	const color = '#ebe21b';
	return ["b", "", color, health, damage, score];
}

function addOnePiece(map_obj, w, h, item){
	const numItems = 1;

	for (let i=0; i<numItems; i++){
		const posX = Math.floor(Math.random()* w / 10) *10;
		const posY = Math.floor(Math.random()* h / 10) *10;
		const key = `${posX}-${posY}`;

		if (map_obj[key] === 0){
			map_obj[key] = item();
		}else{
			i--;
			continue;
		}
	}
	return map_obj;	
}
