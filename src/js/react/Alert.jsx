import React from 'react';

const Alert = (props) =>
	<div id='alert'>
		<div className='title'>
			{/*{
				props.win ? 'You win!!!' : 'You lose :('
			}*/}
			Game Over
		</div>
		<div onClick = {() => props.closeAlert()} className = 'button'>
			<div>b</div>
			<div>a</div>
			<div>c</div>
			<div>k</div>
		</div>
	</div>

export default Alert;