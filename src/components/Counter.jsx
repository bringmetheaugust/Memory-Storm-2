import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { COUNTER_SELECTOR } from '../store/selectors';

const Counter = () => {
	const counter = useSelector(COUNTER_SELECTOR);

	return (
		<div className='count'>
			time left :
			<div id='count'>{counter}</div>
		</div>
	);
};

export default memo(Counter);
