import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DoubleButton from './DoubleButton.jsx';
import { setGameResult } from '../actionCreators/gameState';

const Alert = ({ result }) => {
	const dispatch = useDispatch();

	const closeAlert = useCallback(() => dispatch(setGameResult(null)));

	return(
		<div id='alert'>
			<div className='title'>you {result ? 'win!!!' : 'lose :('}</div>
			<DoubleButton firstBlock='back' handleSubmit={closeAlert} />
		</div>
	);
}

export default memo(Alert);
