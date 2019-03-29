import React from 'react';
import { connect } from 'react-redux';
import { settingsButton } from './elements.jsx';
import { runGame, endGame } from '../redux/actionCreator.js';
import * as GV from '../gameValue.js';

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
			(isNan || trg.value < GV.MIN_DENSITY || trg.value > GV.MAX_DENSITY || trg.value % 2)});
			//TODO: add method to render cards during input changing
		if (trg.id === 'hiding') this.setState({invalidHiding:
			(isNan || trg.value < GV.MIN_HIDING_TIME || trg.value > GV.MAX_HIDING_TIME)});
		if (trg.id === 'time') this.setState({invalidTime: 
			(isNan || trg.value < GV.MIN_GAME_TIME || trg.value > GV.MAX_GAME_TIME)});
	}
	toSubmit = (e) => {
		if (this.props.store.gameState.play) return this.props.endGame();
		const form = {
			density: +this.density.value,
			hiding: +this.hiding.value,
			time: +this.time.value
		};
		this.props.runGame(form);
	}
	render() {
		const str = this.props.store.settings, st = this.state, play = this.props.store.gameState.play;
		return(
			<form onInput={this.checkForm} id='settings'>
				<label>select grid density
					<input
						key={str.density}
						id='density'
						ref={i => this.density = i}
						type='number'
						defaultValue={this.props.store.settings.density}
						readOnly={play}
					/>
						<div className='error'>
							{st.invalidDensity ? 'Please, set any number from 2 to 6 multiples of two' : ''}
						</div>
				</label>
				<label>select time for pictures hiding (sec)
					<input
						key={str.hiding}
						id='hiding'
						ref={i => this.hiding = i}
						type='number'
						defaultValue={str.hiding}
						readOnly={play}
					/>
						<div className='error'> {st.invalidHiding ? 'Please, set any number from 1 to 10' : ''} </div>
				</label>
				<label>select game time (sec)
					<input
						key={str.time}
						id='time'
						ref={i => this.time = i}
						type='number'
						defaultValue={str.time}
						readOnly={play}
					/>
						<div className='error'> {st.invalidTime ? 'Please, set any number form 10 to 60' : ''} </div>
				</label>
				<div className={`button ${play? 'abort' : ''}`}
					onClick={(!st.invalidDensity && !st.invalidHiding && !st.invalidTimeinthis) ? this.toSubmit : null}
				>
					{settingsButton}
				</div>
			</form>
)}}

export default connect(
	state => ({ store: state }),
	dispatch => ({
		runGame: form => dispatch(runGame(form)),
		endGame: () => dispatch(endGame()),
	})
)(Settings);