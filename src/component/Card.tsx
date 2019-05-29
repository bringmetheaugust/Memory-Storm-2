import React from 'react';
import { connect } from 'react-redux';
import { activateCard } from '../actionCreator/cards';
import CardInterface from '../interface/Card';
import State from '../interface/InitialState';
import ActionInterface from '../interface/Action';

interface Props {
	cards: CardInterface[]
	play: boolean
	activateCard: any
	data: CardInterface
}

class Card extends React.Component<Props, {}> {
	id: number;
	card: CardInterface;
	imgRef: HTMLImageElement;
	constructor(props: Props) {
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

export default connect(
	(state: State) => ({
		cards: state.cards,
		play: state.gameState.play
	}),
	{ activateCard }
)(Card);