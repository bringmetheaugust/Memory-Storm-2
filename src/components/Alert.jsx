import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DoubleButton from './DoubleButton.jsx';
import { setGameResult } from '../actionCreators/gameState';

const Alert = ({ result }) => {
	const dispatch = useDispatch();

	const closeAlert = useCallback(() => dispatch(setGameResult(null)));

	return(
		<div id='alert'>
			{ !result && <div>your time is over..</div> }
			<div>you { result ? 'win!!!' : 'lose :(' }</div>
			<DoubleButton firstBlock='back' handleSubmit={closeAlert} />
		</div>
	);
}

export default memo(Alert);
