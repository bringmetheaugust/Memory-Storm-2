import React from 'react';
import {connect} from 'react-redux';
import {setGameSettings} from '../redux/reducers/settings/actionCreator.js';
import {setGameAction} from '../redux/reducers/play/actionCreator.js';
// import {settingsButton} from './elements.jsx';

class Settings extends React.Component{
	constructor(props){
		super(props);
		this.density = React.createRef();
		this.hiding = React.createRef();
		this.time = React.createRef();
	}
	toSubmit = (e) =>{
		this.props.setSettings({
			density: +this.density.current.value,
			hiding: +this.hiding.current.value,
			time: +this.time.current.value,
		});
		this.props.setGameAction(true);
	}
	render(){
		const store = this.props.store;
		return(
			<form onSubmit={this.toSubmit} id='settings'>
				<label>select grid density
					<input id='density' ref = {this.density} type='number' defaultValue={store.density}/>
				</label>
				<label>select time for pictures hiding (sec)
					<input id='hiding' ref = {this.hiding} type='number' defaultValue={store.hiding}/>
				</label>
				<label>select game time (sec)
					<input id='time' ref = {this.time} type='number' defaultValue={store.time}/>
				</label>
				<div onClick = {this.toSubmit} className = 'button'></div>
			</form>
)}}

export default connect(
	state => ({store: state.settings}),
	dispatch =>({
		setSettings: obj => dispatch(setGameSettings(obj)),
		setGameAction: bool => dispatch(setGameAction(bool))
	})
)(Settings);