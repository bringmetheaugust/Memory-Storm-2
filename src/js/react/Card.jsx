import React from 'react';
import { connect } from 'react-redux';
import { activateCard } from '../redux/actionCreator/cards.js';
import PropTypes from 'prop-types';

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.data };
	}
	static getDerivedStateFromProps = (nextPr, prevSt) => ({ ...nextPr.store.cards.find(i => i.id === prevSt.id) });
	activateCard = () => this.props.activateCard(this.props.data.id);
	render() {
		const cardOpportunity = this.state.isDisable || !this.props.store.gameState.play || this.state.isOpen;
		return(
			<li className={`card-wrap ${this.state.isDisable ? 'disabled' : ''}`}
				onClick = {cardOpportunity ? null : this.activateCard}
			>
				{ this.state.isOpen &&
					<img ref={i => this.imgRef = i}
						src={this.props.data.img}
						className={this.state.isActive ? 'disactive' : ''}
					/> }
			</li>

		)
	}	
}

Card.propTypes = {
	store: PropTypes.object,
	activateCard: PropTypes.func
};

export default connect(
	state => ({ store: state }),
	{ activateCard }
)(Card);