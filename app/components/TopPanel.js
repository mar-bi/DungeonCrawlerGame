import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class TopPanel extends React.Component {
	render() {
		const player_state = this.props.hero.state 
		return (
			<div className="top-panel">
				<div className="control">
					<h4 className="c-title">Health</h4>
					<p className="c-value">{player_state[3]}</p>
				</div>
				<div className="control">
					<h4 className="c-title">Weapon</h4>
					<p className="c-value">{player_state[1]}</p>
				</div>
				<div className="control">
					<h4 className="c-title">Damage</h4>
					<p className="c-value">{player_state[4]}</p>
				</div>
				<div className="control">
					<h4 className="c-title">Level</h4>
					<p className="c-value">{this.props.hero.level}</p>
				</div>
				<div className="control">
					<h4 className="c-title">Next level</h4>
					<p className="c-value">{this.props.hero.levelUpgrade}</p>
				</div>
				<div className="control">
					<h4 className="c-title">Dungeon</h4>
					<p className="c-value">{this.props.dungeon}</p>
				</div>
				<div className="control">
					<h4 className="c-title">Score</h4>
					<p className="c-value">{player_state[5]}</p>
				</div>
			</div>
		)
	}
}

TopPanel.propTypes = {
	hero: PropTypes.object.isRequired,
	dungeon: PropTypes.number.isRequired
} 