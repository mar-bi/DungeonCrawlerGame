import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export function BottomPanel(props){
	return(
		<div className="bottom-panel">
			<div className="sign">
				<h4>Player</h4>
				<div id="b-player"></div>
			</div>
			<div className="sign">
				<h4>Enemies</h4>
				<div id="b-enemy1"></div>
				<div id="b-enemy2"></div>
				<div id="b-enemy3"></div>
			</div>
			<div className="sign">
				<h4>Boss</h4>
				<div id="b-boss"></div>
			</div>
			<div className="sign">
				<h4>Weapon</h4>
				<div id="b-weapon"></div>
			</div>
			<div className="sign">
				<h4>Medicine</h4>
				<div id="b-medicine"></div>
			</div>
			<div className="sign">
				<h4>Portal</h4>
				<div id="b-portal"></div>
			</div>
		</div>
	);
}