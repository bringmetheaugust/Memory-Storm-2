import React from 'react';
import {connect} from 'react-redux';

const Alert = (props) =>
	<div id='alert'>
		<div className='title'>
			{
				props.result ? 'You win!!!' : 'You lose :('
			}
		</div>
		<div onClick = {() => props.closeAlert()} className = 'button'>
			<div>b</div>
			<div>a</div>
			<div>c</div>
			<div>k</div>
		</div>
	</div>

export default connect(
	state => ({ result: state.gameState.result }),
)(Alert);