import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import { openCard } from '../actionCreators/cards';

const Card = ({ id, img, isOpen, isDisable }) => {
	const dispatch = useDispatch();
	
	const selectCard = () => {
		if (!isDisable && !isOpen) dispatch(openCard(id));
	};

	return(
		<li
			className={`card ${ isDisable && 'disabled'} ${ isOpen && 'open' }`}
			onClick={selectCard}
		>
			<img src={img} />
		</li>
	);
}

export default memo(Card);
