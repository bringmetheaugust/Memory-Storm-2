import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DoubleButton from './DoubleButton.jsx';
import { resetGame } from '../actionCreators/common';

const Alert = ({ result }) => {
	const dispatch = useDispatch();

	const closeAlert = useCallback(() => dispatch(resetGame()));

	return(
		<div id='alert'>
			{ !result && <div>your time is over..</div> }
			<div>you { result ? 'win!!!' : 'lose :(' }</div>
			<DoubleButton firstBlock='back' handleSubmit={closeAlert} />
		</div>
	);
}

export default memo(Alert);
