import React from 'react';
import Card from './Card.jsx';
import { connect } from 'react-redux';

class Game extends React.Component {
	constructor(props) {
		super(props);
	}
	// shouldComponentUpdate(nextPr) {
	// 	console.log(this.props.store.gameState.counter, nextPr.store.gameState.counter); 
	// 	// return this.props.store.gameState.counter === nextPr.store.gameState.counter ? true : false;
	// 	return true;
	// }
	render() {
		const density = this.props.store.settings.density;
		return(
			<div className='game-field-wrap'>
				<ul id='game-field'
					className={this.props.store.gameState.play ? 'play' : ''}
					style={{ gridTemplate : `repeat(${density}, 1fr)/repeat(${density}, 1fr)` }}
				>
					{ this.props.cards.map(i => <Card key={Math.random()} data={i} />) }
				</ul>
				<div className='count'>time left :
					<div id='count'>{this.props.store.gameState.counter}</div>
				</div>
			</div>

		)
	}
}

export default connect(
	state => ({
		cards : state.cards.sort(() => Math.random() - Math.random()),
		store: state
	}),
)(Game);