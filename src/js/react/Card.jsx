import React from 'react';
import { connect } from 'react-redux';
import { activateCard } from '../redux/actionCreator/cards.js';
import PropTypes from 'prop-types';

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.data.id;
	}
	activateCard = () =>
		this.card.isDisable || !this.props.play || this.card.isOpen ? null : this.props.activateCard(this.props.data.id);
	render() {
		this.card = this.props.cards.find(i => i.id === this.id);
		return(
			<li className={`card-wrap ${this.card.isDisable ? 'disabled' : ''}`} onClick={this.activateCard}>
				{
					this.card.isOpen &&
					<img ref={i => this.imgRef = i}
						src={this.props.data.img}
						className={this.card.isActive ? 'disactive' : ''}
					/>
				}
			</li>

		)
	}	
}

Card.propTypes = {
	store: PropTypes.object,
	activateCard: PropTypes.func
};

export default connect(
	state => ({
		cards: state.cards,
		play: state.gameState.play
	}),
	{ activateCard }
)(Card);