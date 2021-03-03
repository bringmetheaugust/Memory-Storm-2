import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './index.module.sass';
import { openCard } from '../../actionCreators/cards';
import { GAME_STATE_SELECTOR } from '../../store/selectors';

const Card = ({ id, img, isOpen, isDisable }) => {
	const { play } = useSelector(GAME_STATE_SELECTOR);
	const dispatch = useDispatch();
	
	const selectCard = () => {
		if (!isDisable && !isOpen) dispatch(openCard(id));
	};

	return(
		<li
			className={`${css.index} ${ isDisable && css.disabled} ${ isOpen && css.open }`}
			onClick={selectCard}
		>
			<img className={`${ !play && css.fixed }`} src={img} />
		</li>
	);
}

export default memo(Card);
