import React from 'react';
import Card from './Card.jsx';
import { connect } from 'react-redux';
import pictures from '../pictures.js';
import { setGameAction } from '../redux/actionCreator.js';

class Game extends React.Component {
	constructor(props) {
		super(props);
	}
	// shouldComponentUpdate = (nextPr) => this.props.play !== nextPr.play ? true : false;
	// componentWillUpdate = (nextPr) => nextPr.play ? this.runCount(nextPr.store.settings.time) : this.stopCount();
	// runCount = (time) =>{
	// 	this.countInterval = setInterval(() =>{
	// 		if (time === 1) {
	// 			this.props.setGameAction(false);
	// 			this.stopCount();
	// 		}
	// 		this.count.textContent = --time;
	// 	}, 1000);
	// }
	// stopCount = () =>{
	// 	clearInterval(this.countInterval);
	// 	this.count.textContent = '0';
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
					<div ref={i => this.count = i} id='count'> 0 </div>
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
	// dispatch => ({ setGameAction: (bool) => dispatch(setGameAction(bool)) })
)(Game);