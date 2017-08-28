import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { drawDark, drawLight, drawFinalMessage } from '../helpers/drawHelper'; 

export class DungeonMap extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		drawDark(this.props.data, this.props.player, this.props.width, 50);			
	}

	componentWillUpdate(nextProps){
		const canvas = document.getElementById("gameboard");
		const ctx = canvas.getContext('2d');	
		ctx.clearRect(0, 0, this.props.width, this.props.height);
		ctx.restore();
		if (!nextProps.darkNow){
			if (nextProps.gameOver) {
		 		drawFinalMessage();
		 	}else {
				drawLight(nextProps.data, nextProps.player, this.props.width, 50);
			}		
		}else {
			ctx.fillStyle = "#191919";
			ctx.fillRect(0, 0, this.props.width, this.props.height);
			
			if (nextProps.gameOver) {
		 		drawFinalMessage();
		 	}else {
		 		drawDark(nextProps.data, nextProps.player, this.props.width, 50);
		 	}
		}
	}
	
	onKeyPressed(e) {
		const key = e.keyCode;
		this.props.onMove(key);
	}

	render() {
		return (
			<canvas id="gameboard" 
				width={this.props.width} 
				height={this.props.height}
				onKeyDown={e => this.onKeyPressed(e)}
				tabIndex="0">
			</canvas>
		)
	}
}

DungeonMap.propTypes = {
	data: PropTypes.object.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	player: PropTypes.object.isRequired,
	enemies: PropTypes.array.isRequired,
	onMove: PropTypes.func.isRequired,
	gameOver: PropTypes.bool.isRequired,
	darkNow: PropTypes.bool.isRequired
}                                                                                                                                                                                    