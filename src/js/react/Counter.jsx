import React from 'react';
import { connect } from 'react-redux';

const Counter = props =>
	<div className='count'>time left :
		<div id='count'>{props.counterTime}</div>
	</div>
	
export default connect(
	state => ({ counterTime: state.gameState.counter })
)(Counter);