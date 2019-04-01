import React from 'react';
import { connect } from 'react-redux';
import { activateCard } from '../redux/actionCreator/cards.js';

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.data };
	}
	static getDerivedStateFromProps = (nextPr, prevSt) => ({ ...nextPr.store.cards.find(i => i.id === prevSt.id) });
	toActivateCard = () => this.props.activateCard(this.props.data.id);
	render() {
		const cardOpportunity = this.state.isDisable || !this.props.store.gameState.play || this.state.isOpen;
		return(
			<li className={`card-wrap ${this.state.isDisable ? 'disabled' : ''}`}
				onClick = {cardOpportunity ? null : this.toActivateCard}
			>
				{ this.state.isOpen && <img ref={i => this.imgRef = i} src={this.props.data.img} /> }
			</li>
)}}

export default connect(
	state => ({ store: state }),
	{ activateCard }
)(Card);