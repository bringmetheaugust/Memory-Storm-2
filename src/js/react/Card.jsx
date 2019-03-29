import React from 'react';
import { connect } from 'react-redux';
import { openCard } from '../redux/actionCreator.js';

class Card extends React.Component {
	constructor(props) {
		super(props);
	}
	// toOpenCard = () => this.setState({ isOpen: true });
	toActivateCard = () => this.props.openCard(this.props.data.id);
	// toCloseCard = () =>{
	// 	if (this.imgRef !== null) this.imgRef.className = 'disactive';
	// 	setTimeout(() => this.setState({isOpen: false}), 500);
	// }
	// toDisable = () => this.setState({ isDisabled: true });
	// componentDidMount() {
	// 	if (this.props.store.play) {
	// 		// this.toOpenCard();
	// 		this.props.openCard(this.props.data.id);
	// 	// 	this.mountCount = setTimeout(() =>{
	// 	// 		this.toCloseCard();
	// 	// 	}, this.props.store.settings.hiding * 1000);
	// 	}
	// }
	// componentWillUnmount = () => clearTimeout(this.mountCount);
	render() {
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