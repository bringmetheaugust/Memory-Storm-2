import React from 'react';

export default class Card extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isActive: false,
			isDisabled: false
		}
	}
	toActive = () => this.setState({isActive: true});
	toDeactivate = () => setTimeout(() => this.setState({isActive: false}), 500);
	toDisable = () => this.setState({isDisabled: true});
	render = () =>
		<li onClick = {this.state.isDisabled ? false : this.toActive} className='card-wrap'>
			{
				this.state.isActive && <img src={this.props.img}/>
			}
		</li>
}