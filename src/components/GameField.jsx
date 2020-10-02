import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './Card.jsx';
import Counter from './Counter.jsx';

class GameField extends Component {
	shouldComponentUpdate() {
		return !this.props.play;
	}

	render() {
		const { play, density, cards } = this.props;

		return(
			<div className='game-field-wrap'>
				<ul
					id='game-field'
					className={ play ? 'play' : '' }
					style={{ gridTemplate : `repeat(${density}, 1fr)/repeat(${density}, 1fr)` }}
				>
					{ cards.map(card => <Card key={card.id} data={card} />) }
				</ul>
				<Counter />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cards : state.cards,
	density: state.settings.density,
	play: state.gameState.play
});

export default connect(mapStateToProps)(GameField);
