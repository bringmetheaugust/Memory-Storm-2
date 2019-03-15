import React from 'react';
import {connect} from 'react-redux';
import {setGameSettings} from '../redux/reducers/settings/actionCreator.js';
import {setGameAction} from '../redux/reducers/play/actionCreator.js';
import {setGameResultScore} from '../redux/reducers/buffer/actionCreator.js';
import {settingsButton} from './elements.jsx';
const MIN_GAME_TIME = 10, MAX_GAME_TIME = 60;
const MIN_HIDING_TIME = 1, MAX_HIDING_TIME = 10;
const MIN_DENSITY= 2, MAX_DENSITY = 6;

class Settings extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			invalidDensity: false,
			invalidHiding: false,
			invalidTime: false,
		}
	}
	checkForm = (e) =>{
		var trg = e.target;
		if(trg.id === 'density') this.setState({invalidDensity:
			(trg.value < MIN_DENSITY || trg.value > MAX_DENSITY || trg.value % 2)});
		if(trg.id === 'hiding') this.setState({invalidHiding:
			(trg.value < MIN_HIDING_TIME || trg.value > MAX_HIDING_TIME)});
		if(trg.id === 'time') this.setState({invalidTime:
			(trg.value < MIN_GAME_TIME || trg.value > MAX_GAME_TIME)});
	}
	toSubmit = (e) =>{
		this.props.setGameAction();
		if(this.props.store.play) return;
		e.preventDefault(), e.persist();
		this.props.setSettings({
			density: +this.density.value,
			hiding: +this.hiding.value,
			time: +this.time.value,
		});
		this.props.setGameResultScore(Math.pow(this.density.current.value, 2) / 2);
	}
	render(){
		const str = this.props.store.settings, st = this.state;
		return(
			<form onInput = {this.checkForm} id='settings'>
				<label>select grid density
					<input id = 'density' ref = {(i) => this.density = i} type='number' defaultValue={str.density}/>
						<div className = 'error'>
							{st.invalidDensity ? 'Please, set any from 2 to 6 multiples of two' : ''}
						</div>
				</label>
				<label>select time for pictures hiding (sec)
					<input id = 'hiding' ref = {(i) => this.hiding = i} type='number' defaultValue={str.hiding}/>
						<div className = 'error'>
							{st.invalidHiding ? 'Please, set any number from 1 to 10' : ''}
						</div>
				</label>
				<label>select game time (sec)
					<input id = 'time' ref = {(i) => this.time = i} type='number' defaultValue={str.time}/>
						<div className = 'error'>
							{st.invalidTime ? 'Please, set any number form 10 to 60' : ''}
						</div>
				</label>
				<div className = {`button ${this.props.store.play && 'abort'}`}
					onClick = {(!st.invalidDensity && !st.invalidHiding && !st.invalidTimeinthis) ? this.toSubmit : null}>
					{settingsButton}
				</div>
			</form>
)}}

export default connect(
	state => ({
		store: state
	}),
	dispatch =>({
		setSettings: obj => dispatch(setGameSettings(obj)),
		setGameAction: () => dispatch(setGameAction()),
		setGameResultScore: score => dispatch(setGameResultScore(score))
	})
)(Settings);