import React, { useState } from 'react';
import {connect} from 'react-redux';
import DoubleButton from './DoubleButton.jsx';

const Alert = (props) =>{
	const [isHiden, hideAlert ] = useState(false);
	if (props.win === null && !isHiden) return null;
	return(
		<div id='alert'>
			<div className='title'>you {props.win ? 'win!!!' : 'lose :('}</div>
			<DoubleButton firstBlock='back' secondBlock='' event={() => hideAlert(true)} />
		</div>
	)
}

export default connect(
	state => ({ win: state.gameState.win }),
)(Alert);