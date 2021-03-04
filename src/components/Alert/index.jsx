import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import css from './index.module.sass';
import DoubleButton from '../DoubleButton/index.jsx';
import { resetGame } from '../../actionCreators/common';

const Alert = ({ result }) => {
	const dispatch = useDispatch();
	
	const closeAlert = useCallback(() => dispatch(resetGame()));

	return(
		<div className={css.index}>
			{ !result && <div>your time is over..</div> }
			<div>you { result ? 'win!!!' : 'lose :(' }</div>
			<DoubleButton
				firstBlock='back'
				handleSubmit={closeAlert}
				classNames={css.button}
			/>
		</div>
	);
}

export default memo(Alert);
