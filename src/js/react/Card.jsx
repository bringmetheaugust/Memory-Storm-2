import React from 'react';
import {connect} from 'react-redux';
import {addItemOnBuffer} from '../redux/reducers/buffer/actionCreator.js';

class Card extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isOpen: false,
			isDisabled: false
		}
	}
	toOpenCard = () =>{
		this.setState({isOpen: true});
	}
	toActivateCard = () =>{
		this.toOpenCard();
		this.props.addItemOnBuffer({
			img: this.props.img,
			close: this.toCloseCard,
			disable: this.toDisable
		});
	}
	toCloseCard = () =>{
		if(this.imgRef !== null) this.imgRef.className = 'disactive';
		setTimeout(() => this.setState({isOpen: false}), 500);
	}
	toDisable = () => this.setState({isDisabled: true});
	componentDidMount(){
		if(this.props.store.gameState){
			this.toOpenCard();
			this.mountCount = setTimeout(() =>{
				this.toCloseCard();
			}, this.props.store.settings.hiding * 1000);
		}
	}
	componentWillUnmount(){
		clearTimeout(this.mountCount);
	}
	render(){
		const cardOpportunity = this.state.isDisabled || !this.props.store.gameState || this.state.isOpen;
		return(
			<li className={`card-wrap ${this.state.isDisabled ? 'disabled' : ''}`}
				onClick = {cardOpportunity ? null : this.toActivateCard}>
				{
					this.state.isOpen && <img ref = {(img) => this.imgRef = img} src={this.props.img}/>
				}
			</li>
)}}

export default connect(
	state => ({
		store: state
	}),
	dispatch =>({
		addItemOnBuffer: item => dispatch(addItemOnBuffer(item)),
	})
)(Card);