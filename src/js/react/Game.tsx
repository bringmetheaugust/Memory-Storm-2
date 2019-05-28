import React from 'react';
import Card from './Card';
import Counter from './Counter';
import { connect } from 'react-redux';
import StateInterface from '../interface/InitialState';
import CardInterface from '../interface/card';

interface Props {
	cards : CardInterface[]
	density: number
	play: boolean
}

class Game extends React.Component<Props, {}> {
	shouldComponentUpdate = () => !this.props.play;
	render() {
		return(
			<div className='game-field-wrap'>
				<ul id='game-field'
					className={this.props.play ? 'play' : ''}
					style={{ gridTemplate : `repeat(${this.props.density}, 1fr)/repeat(${this.props.density}, 1fr)` }}
				>
					{this.props.cards.map((card: CardInterface) => <Card key={card.id} data={card} />)}
				</ul>
				<Counter />
			</div>
		)
	}
}

export default connect(
	(state: StateInterface) => ({
		cards : state.cards,
		density: state.settings.density,
		play: state.gameState.play
	}),
)(Game);