import React from 'react';
import { connect } from 'react-redux';
import DoubleButton from './DoubleButton';
import { runGame, endGame } from '../actionCreator/index';
import { combinedSettings } from '../actionCreator/settings';
import * as GV from '../constant/gameValue';
import StateInterface from '../interface/InitialState';
import ActionInterface from '../interface/Action';

interface Props {
	store: StateInterface
	play: boolean
	runGame: ActionInterface
	endGame: ActionInterface
	combinedSettings: ActionInterface
}

interface State {
	invalidDensity: boolean
	invalidHiding: boolean
	invalidTime: boolean
}

class Settings extends React.Component<Props, State> {
	density: HTMLInputElement
	hiding: HTMLInputElement
	time: HTMLInputElement
	st: State
	constructor(props: Props) {
		super(props);
		this.state = {
			invalidDensity: false,
			invalidHiding: false,
			invalidTime: false,
		}
	}
	checkForm = e => {
		const trg = e.target, isNan = Number.isNaN(Number(trg.value));
		if (trg.id === 'density') {
			if (isNan || trg.value < GV.MIN_DENSITY || trg.value > GV.MAX_DENSITY || trg.value % 2) 
				return this.setState({ invalidDensity: true });
			this.setState({ invalidDensity: false });
			this.props.combinedSettings({ ...this.props.store.settings, density: +trg.value });
		}
		if (trg.id === 'hiding') {
			const validHiddingTime = isNan || trg.value < GV.MIN_HIDING_TIME || trg.value > GV.MAX_HIDING_TIME;
			this.setState({ invalidHiding: validHiddingTime });
		}
		if (trg.id === 'time') {
			const validGameTime = isNan || trg.value < GV.MIN_GAME_TIME || trg.value > GV.MAX_GAME_TIME;
			this.setState({ invalidTime: validGameTime });
		}
	}
	toSubmit = () => {
		if (this.props.play) return this.props.endGame(null);
		window.scrollTo(0, 0);
		const form = {
			density: +this.density.value,
			hiding: +this.hiding.value,
			time: +this.time.value
		};
		this.props.runGame(form);
	}
	render() {
		const str = this.props.store.settings, st = this.state;
		const submitOpportunity: boolean = !st.invalidDensity && !st.invalidHiding && !st.invalidTime;
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
		)
	}
}

export default connect(
	(state: StateInterface) => ({
		store: state,
		play: state.gameState.play
	}),
	{ runGame, endGame, combinedSettings }
)(Settings);