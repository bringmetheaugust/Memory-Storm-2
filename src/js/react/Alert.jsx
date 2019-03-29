import React, { useState } from 'react';
import {connect} from 'react-redux';
import DoubleButton from './DoubleButton.jsx';

const Alert = (props) =>{
	const [isVisible, hideAlert ] = useState(true);
	if (!isVisible) return null;
	return(
		<div id='alert'>
			<div className='title'>you {props.store.gameState.win ? 'win!!!' : 'lose :('}</div>
			<DoubleButton firstBlock='back' secondBlock='' event={() => hideAlert(false)} />
		</div>
	)
}

export default connect(
	state => ({ store: state }),
)(Alert);