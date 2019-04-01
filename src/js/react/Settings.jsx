import React from 'react';
import { connect } from 'react-redux';
import DoubleButton from './DoubleButton.jsx';
import { runGame, endGame, combinedSettings } from '../redux/actionCreator.js';
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
		const trg = e.target, isNan = Number.isNaN(Number(trg.value));
		if (trg.id === 'density') {
			if (isNan || trg.value < GV.MIN_DENSITY || trg.value > GV.MAX_DENSITY || trg.value % 2) 
				return this.setState({ invalidDensity: true });
			this.setState({ invalidDensity: false });
			this.props.combinedSettings({...this.props.store.settings, density: trg.value});
		}
		if (trg.id === 'hiding') this.setState({invalidHiding:
			(isNan || trg.value < GV.MIN_HIDING_TIME || trg.value > GV.MAX_HIDING_TIME)});
		if (trg.id === 'time') this.setState({invalidTime: 
			(isNan || trg.value < GV.MIN_GAME_TIME || trg.value > GV.MAX_GAME_TIME)});
	}
	toSubmit = () => {
		if (this.props.play) return this.props.endGame(null);
		const form = {
			density: +this.density.value,
			hiding: +this.hiding.value,
			time: +this.time.value
		};
		this.props.runGame(form);
	}
	render() {
		const str = this.props.store.settings, st = this.state;
		const submitOpportunity = !st.invalidDensity && !st.invalidHiding && !st.invalidTimeinthis;
		return(
			<form onInput={this.checkForm} id='settings' className={this.props.play ? 'play' : ''}>
				<label>select grid density
					<input
						key={str.density}
						id='density'
						ref={i => this.density = i}
						type='number'
						defaultValue={str.density}
						readOnly={this.props.play}
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
						readOnly={this.props.play}
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
						readOnly={this.props.play}
					/>
						<div className='error'> {st.invalidTime ? 'Please, set any number form 10 to 60' : ''} </div>
				</label>
				<DoubleButton
					play={this.props.play}
					event={submitOpportunity && this.toSubmit}
					firstBlock='play'
					secondBlock='stop'
				/>
			</form>
)}}

export default connect(
	state => ({
		store: state,
		play: state.gameState.play
	}),
	{ runGame, endGame, combinedSettings }
)(Settings);