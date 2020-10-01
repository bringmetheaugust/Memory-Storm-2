import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './Card.jsx';
import Counter from './Counter.jsx';

class Game extends Component {
	shouldComponentUpdate() {
		return !this.props.play;
	}

	render() {
		return(
			<div className='game-field-wrap'>
				<ul id='game-field'
					className={this.props.play ? 'play' : ''}
					style={{ gridTemplate : `repeat(${this.props.density}, 1fr)/repeat(${this.props.density}, 1fr)` }}
				>
					{this.props.cards.map(card => <Card key={card.id} data={card} />)}
				</ul>
				<Counter />
			</div>
		);
	}
}

export default connect(
	state => ({
		cards : state.cards,
		density: state.settings.density,
		play: state.gameState.play
	}),
)(Game);
