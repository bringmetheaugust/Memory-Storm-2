import React from 'react';
import { connect } from 'react-redux';
import { openCard } from '../redux/actionCreator.js';

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.img = this.props.data.img;
		this.id = this.props.data.id;
	}
	toActivateCard = () => this.props.openCard(this.props.data.id);
	render() {
		//FIX_ME: change oppportunity for click events on cards
		// const cardOpportunity = dt.isDisable || !this.props.store.play || dt.isOpen;
		const cardOpportunity = false;
		return(
			<li className={`card-wrap ${this.props.data.isDisable ? 'disabled' : ''}`}
				onClick = {cardOpportunity ? null : this.toActivateCard}
			>
				{ <img ref={i => this.imgRef = i} src={this.props.data.img} /> }
			</li>
)}}

export default connect(
	state => ({ store: state }),
	dispatch =>({ openCard: id => dispatch(openCard(id)) }),
)(Card);