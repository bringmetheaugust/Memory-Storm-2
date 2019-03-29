import React from 'react';
import Card from './Card.jsx';
import Counter from './Counter.jsx';
import { connect } from 'react-redux';

class Game extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate = nextPr => this.props.play === nextPr.play ? false : true;
	render() {
		return(
			<div className='game-field-wrap'>
				<ul id='game-field'
					className={this.props.play ? 'play' : ''}
					style={{ gridTemplate : `repeat(${this.props.density}, 1fr)/repeat(${this.props.density}, 1fr)` }}
				>
					{this.props.cards.map(i => <Card key={Math.random()} data={i} />)}
				</ul>
				<Counter />
			</div>
		)
	}
}

export default connect(
	state => ({
		cards : state.cards.sort(() => Math.random() - Math.random()),
		density: state.settings.density,
		play: state.gameState.play
	}),
)(Game);