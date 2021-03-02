import React, { memo, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from './Card.jsx';
import Counter from './Counter.jsx';
import preloader from './preloader.jsx';

import { CARDS_SELECTOR, GAME_STATE_SELECTOR, SETTINGS_SELECTOR } from '../store/selectors';
import { setFakeCards } from '../actionCreators/cards';

const GameField = () => {
	const cards = useSelector(CARDS_SELECTOR);
	const { play, picturesIsFetching, counter } = useSelector(GAME_STATE_SELECTOR);
	const { density } = useSelector(SETTINGS_SELECTOR);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setFakeCards());
	}, [density]);

	const densityFromCardLength = useMemo(() => Math.pow(cards.length, .5), [cards.length]);

	return (
		<div className='game-field-wrap'>
			<ul
				id='game-field'
				className={`${ counter > 0 && counter < 6 && 'low-count' } ${ play && 'play' }`}
				style={{ gridTemplate : `repeat(${densityFromCardLength}, 1fr)/repeat(${densityFromCardLength}, 1fr)` }}
			>
				{ picturesIsFetching && preloader }
				{ cards.map(card => <Card key={card.id} {...card} />) }
			</ul>
			<Counter />
		</div>
	);
}

export default memo(GameField);
