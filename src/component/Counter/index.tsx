import React from 'react';
import { connect } from 'react-redux';
import StateInterface from '../../interface/InitialState';

interface Props {
	counterTime: number
}

const Counter = (props: Props) =>
	<div className='count'>time left :
		<div id='count'>{props.counterTime}</div>
	</div>

export default connect(
	(state: StateInterface) => ({ counterTime: state.gameState.counter })
)(Counter);