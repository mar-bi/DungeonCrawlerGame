import React from 'react';
import ReactDOM from 'react-dom';

import { TopPanel } from './TopPanel';
import { DungeonMap } from './DungeonMap';
import { BottomPanel } from './BottomPanel';
import { getMap } from '../helpers/mapHelper';
import { fightEnemy, getLevel } from '../helpers/fightHelper';

// state array ['type', 'name', 'color', health, damage, score]
const player_init = ["p", "stick", "blue", 100, 5, 0];

function player(x, y, state) {
	this.x = x;
	this.y = y;
	this.level = 0;
	this.levelUpgrade = 20;
	this.state = state;
}

export class App extends React.Component {
	constructor(props){
		super(props);
	  this.state = {
	  	boardWidth: 1000,
	  	boardHeight: 600,
	  	data: {},
	  	hero: {},
	  	enemies: [],
	  	keyboard: false,
	  	message: "Click on the board to start moving",
	  	dungeon: 1,
	  	gameover: false,
	  	darkness: true
	  }
	  this.moveHero = this.moveHero.bind(this);
	  this.resetGame = this.resetGame.bind(this);
	  this.nextLevel = this.nextLevel.bind(this);
	  this.gameOver = this.gameOver.bind(this);
	  this.darknessOff = this.darknessOff.bind(this);
	}

	componentWillMount() {
		const dungeon = this.state.dungeon;
		let newMap = getMap(dungeon);
		const newHero = new player(this.state.boardWidth/2,
			this.state.boardHeight/2, player_init.slice());

		this.setState({
			data: newMap,
			hero: newHero
		});
	}

	moveHero(key){
		if (key > 36 && key < 41) {
			const curMap = this.state.data; 
			let newHero = this.state.hero;
			let x = newHero.x;
			let y = newHero.y;
			let newMessage = "";
			let portal = false;
			let dungeon = this.state.dungeon;
			let gameOver = false;
			let startOver = false;
		
			if (key === 37) {x-= 10;}
			if (key === 38) {y-= 10;}
			if (key === 39) {x+= 10;}	
			if (key === 40) {y+= 10;}

			const coords = `${x}-${y}`;
			const nextCell = curMap[coords];
			if (nextCell === 0){  // moves only to empty cell
				newHero.x = x;
				newHero.y = y;	
			}
			if (nextCell === "P"){ // enter portal
				if ((dungeon === 1 && newHero.level > 3) ||
						(dungeon === 2 && newHero.level > 6)) {
				  portal = true;
				  dungeon++;
				  newHero.x = x;
					newHero.y = y;
					curMap[coords] = 0;
					newMessage = "Entering new dungeon.";
				}else {
					newMessage = "Not enough score. Increase your level";
				}  
			}
			if (nextCell[0] === "m"){ //pick up medicine 
				newHero.state[3] += nextCell[3];
				newHero.state[5] += nextCell[5];
				newHero.x = x;
				newHero.y = y;
				curMap[coords] = 0;
				newMessage = `${nextCell[3]} points of Health were added.`;
			}
			if (nextCell[0] === "w"){ // pick up weapon
				newHero.state[1] = nextCell[1];
				newHero.state[4] = nextCell[4];
				newHero.state[5] += nextCell[5];
				newHero.x = x;
				newHero.y = y;
				curMap[coords] = 0;
				newMessage = `Weapon changed to ${nextCell[1]}.`;
			}
			if (nextCell[0] === "e"){ // pick up weapon
				const updateHealth = fightEnemy(newHero.state, nextCell); 
				if (updateHealth[0] > updateHealth[1]) {
					newHero.state[3] = updateHealth[0];
					newHero.state[5] += nextCell[5];
					newHero.x = x;
					newHero.y = y;	
					curMap[coords] = 0;
					newMessage = "You killed the enemy!";
				} else {
					curMap[coords][3] = updateHealth[1];
					newHero.level = 0;
					newHero.state[2] = "#fff";
					newHero.state[3] = 0;
					newHero.state[5] = 0;
					newMessage = "Hero is dead... Game Over!";
					gameOver = true;
				}
 			}
 			if (nextCell[0] === "b"){ // fight with boss
 				if (newHero.level === 9) {
	 				const updateHealth = fightEnemy(newHero.state, nextCell);
	 				if (updateHealth[0] > updateHealth[1]) {
						newHero.state[3] = updateHealth[0];
						newHero.state[5] += nextCell[5];
						newHero.x = x;
						newHero.y = y;	
						curMap[coords] = 0;
						newMessage = "You killed the boss";
						gameOver = true;
					} else {
						curMap[coords][3] = updateHealth[1];
						newHero.level = 0;
						newHero.state[2] = "#fff";
						newHero.state[3] = 0;
						newHero.state[5] = 0;
						newMessage = "Hero is dead... Game Over!";
						startOver = true;
					}
				}else {
					newMessage = "You can't fight with the boss. Increase your level."
				}	
 			}

 			const level = getLevel(newHero.state[5]);
 			if (newHero.level < level[0]) {
 				newHero.level = level[0];
 				newHero.state[3] += 20;
 			}else{
 				newHero.level = level[0];
 			}
 			newHero.levelUpgrade = level[1];
				
			this.setState({
				data: curMap,
				hero: newHero,
				message: newMessage,
				dungeon: dungeon
			});

			if (portal) {
				const say = "Welcome to the next Dungeon!";
				window.setTimeout(() => {this.nextLevel(say)}, 2000);
			}
			if (gameOver) {
				window.setTimeout(this.gameOver, 1000);
			}
			if (startOver) {
				window.setTimeout(this.gameOver, 1000);	
			} 
		}	
	}

	resetGame(message){
		const gameOver = false;
		const dungeon = 1;
		const new_map = getMap(dungeon);
		const new_player = new player(this.state.boardWidth/2,
		 	this.state.boardHeight/2, player_init.slice());
				
		this.setState({
			data: new_map,
			hero: new_player,
			message: message,
			dungeon: dungeon,
			gameover: gameOver
		});
	}

	nextLevel(message){
		const dungeon = this.state.dungeon;
		const new_map = getMap(dungeon);
		const new_player = this.state.hero;
		new_player.x = this.state.boardWidth / 2;
		new_player.y = this.state.boardHeight / 2;
		
		this.setState({
			data: new_map,
			hero: new_player,
			message: message
		});
	}

	gameOver(){
		this.setState({
			gameover: true
		});
	}

	darknessOff(){
		const darkNow = this.state.darkness;
		const change = (darkNow ? false : true);
		this.setState({
			message: "Click on the board to continue playing",
			darkness: change
		});
	}
	
	render() {
		return (
			<div>
				<p className="game-rules">Kill enemies, pick up medicine and weapons to enter next dungeons
			 through portals.</p>
				<h3 className='game-title'>Kill the boss in dungeon 3</h3>
				<div className='game-buttons'>
					<button onClick={this.darknessOff}>Toggle Darkness</button>
					<button onClick={()=> 
						this.resetGame("Game is reset. Click on the board to start playing.")}>
						Reset Game
					</button>
				</div>
				<TopPanel
					hero={this.state.hero}
					dungeon={this.state.dungeon}
					/>
				<h3 className="game-over">{this.state.message}</h3>
				<DungeonMap 
					data={this.state.data}
					width={this.state.boardWidth}
					height={this.state.boardHeight}
					player={this.state.hero}
					enemies={this.state.enemies}
					onMove={this.moveHero}
					gameOver={this.state.gameover}
					darkNow={this.state.darkness}/>
				<BottomPanel />
			</div>
		)
	}
}
