import React from 'react';
import {connect} from 'react-redux';
import {setGameSettings} from '../redux/reducers/settings/actionCreator.js';

class Settings extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			button: true
		};
	}
	toSubmit = (e) =>{
		e.preventDefault();
		this.props.setSettings('сюда форму');
	}
	render(){
		const pr = this.props.store;
		return(
			<form onInput={this.checkForm} onSubmit={this.toSubmit} id='settings'>
				<label>select grid density
					<input id='density' type='number' defaultValue={pr.density}/>
				</label>
				<label>select time for pictures hiding (sec)
					<input id='hiding' type='number' defaultValue={pr.hiding}/>
				</label>
				<label>select game time (sec)
					<input id='time' type='number' defaultValue={pr.time}/>
				</label>
				<button disabled={!this.state.button} onSubmit={this.toSubmit}></button>
			</form>
)}}

export default connect(
	state => ({store: state.settings}),
	dispatch =>({
		setSettings: obj =>
			dispatch(setGameSettings(obj))
	})
)(Settings);