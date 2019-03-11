import React from 'react';
import {connect} from 'react-redux';

class Card extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isActive: false,
			isDisabled: false
		}
		this.imgRef = React.createRef();
	}
	componentWillReceiveProps = (props) =>{
		if(props.store.play){
			this.toActive();
			setTimeout(() =>{
				this.toDeactivate()
			}, props.store.settings.hiding*1000);
		};
	}
	toActive = () => this.setState({isActive: true});
	toDeactivate = () =>{
		this.imgRef.current.className = 'disactive';
		setTimeout(() => this.setState({isActive: false}), 500);
	}
	toDisable = () => this.setState({isDisabled: true});
	render = () =>
		<li onClick = {(this.state.isDisabled || !this.props.store.play) ? null : this.toActive} className='card-wrap'>
			{
				this.state.isActive && <img ref = {this.imgRef} src={this.props.img}/>
			}
		</li>
}

export default connect(
	state => ({store: state})
)(Card);