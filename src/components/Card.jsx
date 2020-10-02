import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activateCard } from '../actionCreators/cards';
import { GAME_STATE_SELECTOR } from '../store/selectors';

const Card = ({ id, img, isOpen, isActive, isDisable }) => {
	const { play } = useSelector(GAME_STATE_SELECTOR);
	const dispatch = useDispatch();
	
	const selectCard = () => {
		if (!isDisable && play && !isOpen) dispatch(activateCard(id));
	}

	return(
		<li className={`card-wrap ${ isDisable ? 'disabled' : '' }`} onClick={selectCard}>
			{ isOpen && <img src={img} className={ isActive ? 'disactive' : '' } /> }
		</li>
	);
}

export default memo(Card);
