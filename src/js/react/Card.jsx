import React from 'react';
import {connect} from 'react-redux';
import {addItemOnBuffer} from '../redux/reducers/buffer/actionCreator.js';

class Card extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isActive: false,
			isDisabled: false
		}
		this.imgRef = React.createRef();
	}
	toActive = () =>{
		this.setState({isActive: true});
		// this.props.addItemOnBuffer(this);
	}
	toDeactivate = () =>{
		this.imgRef.current.className = 'disactive';
		setTimeout(() => this.setState({isActive: false}), 500);
	}
	toDisable = () => this.setState({isDisabled: true});
	componentDidMount(){
		if(this.props.store.play){
			this.toActive();
			setTimeout(() =>{
				this.toDeactivate();
			}, this.props.store.settings.hiding * 1000);
		}
	}
	render(){
		return(
			<li className='card-wrap'
				onClick = {(this.state.isDisabled || !this.props.store.play) ? null : this.toActive}>
				{
					this.state.isActive && <img ref = {this.imgRef} src={this.props.img}/>
				}
			</li>
)}}

export default connect(
	state => ({
		store: state
	}),
	dispatch =>({
		addItemOnBuffer : i => dispatch(addItemOnBuffer(i))
	})
)(Card);