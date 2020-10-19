import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openCard } from '../actionCreators/cards';
import { GAME_STATE_SELECTOR } from '../store/selectors';

const Card = ({ id, img, isOpen, isDisable }) => {
	const { play } = useSelector(GAME_STATE_SELECTOR);
	const dispatch = useDispatch();
	
	const selectCard = () => {
		if (!isDisable && !isOpen) dispatch(openCard(id));
	};

	return(
		<li
			className={`card ${ isDisable && 'disabled'} ${ isOpen && 'open' }`}
			onClick={selectCard}
		>
			<img className={`${ !play && 'fixed' }`} src={img} />
		</li>
	);
}

export default memo(Card);
