import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import Card from './Card.jsx';
import Counter from './Counter.jsx';
import preloader from './preloader.jsx';

import { CARDS_SELECTOR, GAME_STATE_SELECTOR, SETTINGS_SELECTOR } from '../store/selectors';

const GameField = () => {
	const cards = useSelector(CARDS_SELECTOR);
	const { play, picturesIsFetching, counter } = useSelector(GAME_STATE_SELECTOR);
	const { density } = useSelector(SETTINGS_SELECTOR);

	return (
		<div className='game-field-wrap'>
			<ul
				id='game-field'
				className={`${ counter > 0 && counter < 6 && 'low-count' } ${ play && 'play' }`}
				style={{ gridTemplate : `repeat(${density}, 1fr)/repeat(${density}, 1fr)` }}
			>
				{ picturesIsFetching && preloader }
				{ cards.map(card => <Card key={card.id} {...card} />) }
			</ul>
			<Counter />
		</div>
	);
}

export default memo(GameField);
