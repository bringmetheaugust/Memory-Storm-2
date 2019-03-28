import React from 'react';
import { connect } from 'react-redux';
import { setGameAction } from '../redux/actionCreator.js';
import { openAllCards } from '../redux/actionCreator.js';
// import { setGameResultScore, clearBuffer } from '../redux/reducers/buffer/actionCreator.js';
import { settingsButton } from './elements.jsx';
import { setGameSettings } from '../redux/actionCreator.js';
const MIN_GAME_TIME = 10;
const MAX_GAME_TIME = 60;
const MIN_HIDING_TIME = 1;
const MAX_HIDING_TIME = 10;
const MIN_DENSITY = 2;
const MAX_DENSITY = 6;

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			invalidDensity: false,
			invalidHiding: false,
			invalidTime: false,
		}
	}
	checkForm = (e) => {
		const trg = e.target;
		const isNan = Number.isNaN(Number(trg.value));
		if (trg.id === 'density') this.setState({ invalidDensity:
			(isNan || trg.value < MIN_DENSITY || trg.value > MAX_DENSITY || trg.value % 2)});
		if (trg.id === 'hiding') this.setState({invalidHiding:
			(isNan || trg.value < MIN_HIDING_TIME || trg.value > MAX_HIDING_TIME)});
		if (trg.id === 'time') this.setState({invalidTime: 
			(isNan || trg.value < MIN_GAME_TIME || trg.value > MAX_GAME_TIME)});
	}
	toSubmit = (e) =>{
		// TODO: REBUILD ALL SUBMIT METHOD
		// this.props.setGameAction(null);
		// this.props.openAllCards(!this.props.store.play);
		const form = {
			density: +this.density.value,
			hiding: +this.hiding.value,
			time: +this.time.value
		};
		localStorage.setItem('settings', JSON.stringify(form));
		// this.props.setGameSettings(form);
		// if (this.props.play) return;
		// window.scrollTo(0, 0);
		// this.props.clearBuffer();
		// e.preventDefault(), e.persist();
		// this.props.setSettings({
		// 	density: +this.density.value,
		// 	hiding: +this.hiding.value,
		// 	time: +this.time.value,
		// });
		// this.props.setGameResultScore(Math.pow(this.density.value, 2) / 2);
	}
	render() {
		const str = this.props.store.settings, st = this.state;
		return(
			<form onInput={this.checkForm} id='settings'>
				<label>select grid density
					<input id = 'density'
						ref={i => this.density = i}
						type='number'
						defaultValue={this.props.store.settings.density}
						readOnly={this.props.store.play}
					/>
						<div className = 'error'>
							{st.invalidDensity ? 'Please, set any number from 2 to 6 multiples of two' : ''}
						</div>
				</label>
				<label>select time for pictures hiding (sec)
					<input
						id ='hiding'
						ref={i => this.hiding = i}
						type='number'
						defaultValue={str.hiding}
						readOnly={this.props.store.play}
					/>
						<div className='error'>
							{st.invalidHiding ? 'Please, set any number from 1 to 10' : ''}
						</div>
				</label>
				<label>select game time (sec)
					<input
						id='time'
						ref={i => this.time = i}
						type='number'
						defaultValue={str.time}
						readOnly={this.props.store.play}
					/>
						<div className = 'error'>
							{st.invalidTime ? 'Please, set any number form 10 to 60' : ''}
						</div>
				</label>
				<div className={`button ${this.props.store.play ? 'abort' : ''}`}
					onClick={(!st.invalidDensity && !st.invalidHiding && !st.invalidTimeinthis) ? this.toSubmit : null}
				>
					{settingsButton}
				</div>
			</form>
)}}

export default connect(
	state => ({ store: state }),
	dispatch => ({ })
)(Settings);