import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import css from './index.module.sass';
import Card from '../Card/index.jsx';
import Counter from '../Counter/index.jsx';
import preloader from '../preloader/index.jsx';
import { setFakeCards } from '../../actionCreators/cards';

import { COUNTER_WARNING } from '../../constants/gameSettings';
import { CARDS_SELECTOR, GAME_STATE_SELECTOR, SETTINGS_SELECTOR } from '../../store/selectors';

const GameField = () => {
	const cards = useSelector(CARDS_SELECTOR);
	const { play, picturesIsFetching, counter } = useSelector(GAME_STATE_SELECTOR, shallowEqual);
	const { density } = useSelector(SETTINGS_SELECTOR, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setFakeCards());
	}, [density]);

	const withWarning = useMemo(() => counter > 0 && counter <= COUNTER_WARNING, [counter]);
	const densityFromCardLength = useMemo(() => Math.pow(cards.length, .5), [cards.length]);

	return (
		<div className={css.index}>
			<ul
				className={`${css.field} ${ withWarning && css.warning } ${ play && css.play }`}
				style={{ gridTemplate : `repeat(${densityFromCardLength}, 1fr)/repeat(${densityFromCardLength}, 1fr)` }}
			>
				{ picturesIsFetching && preloader }
				{ cards.map(card => <Card key={card.id} {...card} />) }
			</ul>
			<Counter />
		</div>
	);
}

export default GameField;
